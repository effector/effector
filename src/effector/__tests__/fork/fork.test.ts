import {
  createDomain,
  forward,
  attach,
  createEvent,
  createStore,
  createEffect,
  fork,
  allSettled,
  serialize,
  hydrate,
  combine,
  Store,
} from 'effector'

test('usage with domain', async () => {
  const app = createDomain()
  const add = app.createEvent<number>()
  const $count = app.createStore(0).on(add, (n, x) => n + x)
  const addFx = app.createEffect(() => 0)
  forward({from: addFx.doneData, to: add})

  const scope = fork(app, {
    values: [[$count, 10]],
    handlers: [[addFx, () => 5]],
  })
  await allSettled(addFx, {scope})
  expect(scope.getState($count)).toBe(15)
  expect($count.getState()).toBe(0)
})

test('usage without domain', async () => {
  const add = createEvent<number>()
  const $count = createStore(0).on(add, (n, x) => n + x)
  const addFx = createEffect(() => 0)
  forward({from: addFx.doneData, to: add})

  const scope = fork({
    values: [[$count, 10]],
    handlers: [[addFx, () => 5]],
  })
  await allSettled(addFx, {scope})
  expect(scope.getState($count)).toBe(15)
  expect($count.getState()).toBe(0)
})

describe('fork values support', () => {
  test('values as js Map', async () => {
    const app = createDomain()

    const logsCache = app.createStore<string[]>([])
    const settings = app.createStore({
      MAX_COUNT_CACHED_LOGS: 12,
    })

    const scope = fork(app, {
      values: new Map()
        .set(settings, {MAX_COUNT_CACHED_LOGS: 2})
        .set(logsCache, ['LOG_MSG_MOCK']),
    })

    hydrate(app, {
      values: serialize(scope),
    })

    expect(settings.getState()).toEqual({MAX_COUNT_CACHED_LOGS: 2})
    expect(logsCache.getState()).toEqual(['LOG_MSG_MOCK'])
  })
  test('values as tuple list', async () => {
    const app = createDomain()

    const logsCache = app.createStore<string[]>([])
    const settings = app.createStore({
      MAX_COUNT_CACHED_LOGS: 12,
    })

    const scope = fork(app, {
      values: [
        [settings, {MAX_COUNT_CACHED_LOGS: 2}],
        [logsCache, ['LOG_MSG_MOCK']],
      ],
    })

    hydrate(app, {
      values: serialize(scope),
    })

    expect(settings.getState()).toEqual({MAX_COUNT_CACHED_LOGS: 2})
    expect(logsCache.getState()).toEqual(['LOG_MSG_MOCK'])
  })
  test('values as sid map', async () => {
    const app = createDomain()

    const logsCache = app.createStore([])
    const settings = app.createStore({
      MAX_COUNT_CACHED_LOGS: 12,
    })

    const scope = fork(app, {
      values: {
        [logsCache.sid!]: ['LOG_MSG_MOCK'],
        [settings.sid!]: {MAX_COUNT_CACHED_LOGS: 2},
      },
    })

    hydrate(app, {
      values: serialize(scope),
    })

    expect(settings.getState()).toEqual({MAX_COUNT_CACHED_LOGS: 2})
    expect(logsCache.getState()).toEqual(['LOG_MSG_MOCK'])
  })
  test('values validation', async () => {
    expect(() => {
      fork({
        values: new Map().set(null, () => {}),
      })
    }).toThrowErrorMatchingInlineSnapshot(`"Map key should be a unit"`)
  })
  test('passed non store to values map should throw', () => {
    const app = createDomain()
    const unit = createEvent()
    expect(() => {
      fork(app, {
        values: new Map().set(unit, 0),
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"Values map can contain only stores as keys"`,
    )
  })
  describe('consistency simple', () => {
    test('consistency simple with getState', async () => {
      const secondOne1 = createStore(1, {sid: `1.2`})
      const both1 = combine(secondOne1, y => 2 * y)

      const finalStore = combine([secondOne1, both1], ([secondOne, both]) => ({
        secondOne,
        both,
      }))
      const scope = fork({
        values: [[secondOne1, 0]],
      })
      expect(scope.getState(secondOne1)).toEqual(0)
      expect(scope.getState(finalStore)).toEqual({secondOne: 0, both: 0})
    })
  })
  test('values initialization consistency', async () => {
    /**
     * goal of this test is to create a lot of stores to pass to values
     * and ensure that combined stores will work as expected
     * */
    let sumStore = createStore([0, []] as [number, any[]], {sid: 'sum'})
    const stores: Store<number>[] = []
    const storesToShow: Store<number>[] = []
    function fab(n: number) {
      const store = createStore(n, {sid: `${n}.1`})
      sumStore = combine(
        sumStore,
        store,
        (prevVal, x) => [x, prevVal] as [number, any[]],
      )
      const secondOne = createStore(n, {sid: `${n}.2`})
      const third = store.map(x => x + 1)
      const both = combine(third, secondOne, (x, y) => x * y)
      sumStore = combine(
        sumStore,
        both,
        (prevVal, x) => [x, prevVal] as [number, any[]],
      )
      stores.push(store, secondOne)
      storesToShow.push(store, secondOne, third, both)
    }
    for (let i = 0; i < 10; i++) fab(i)
    const finalStore = combine(storesToShow, items => {
      const results: Array<{
        store: number
        secondOne: number
        third: number
        both: number
      }> = []
      for (let i = 0; i < items.length; i += 4) {
        results.push({
          store: items[i],
          secondOne: items[i + 1],
          third: items[i + 2],
          both: items[i + 3],
        })
      }
      return results
    })
    const scope = fork({
      values: stores.filter((_, i) => i % 3 === 0).map(store => [store, 0]),
    })
    const basicCase = serialize(scope)
    expect(scope.getState(finalStore)).toMatchInlineSnapshot(`
Array [
  Object {
    "both": 0,
    "secondOne": 0,
    "store": 0,
    "third": 1,
  },
  Object {
    "both": 0,
    "secondOne": 0,
    "store": 1,
    "third": 2,
  },
  Object {
    "both": 6,
    "secondOne": 2,
    "store": 2,
    "third": 3,
  },
  Object {
    "both": 3,
    "secondOne": 3,
    "store": 0,
    "third": 1,
  },
  Object {
    "both": 0,
    "secondOne": 0,
    "store": 4,
    "third": 5,
  },
  Object {
    "both": 30,
    "secondOne": 5,
    "store": 5,
    "third": 6,
  },
  Object {
    "both": 6,
    "secondOne": 6,
    "store": 0,
    "third": 1,
  },
  Object {
    "both": 0,
    "secondOne": 0,
    "store": 7,
    "third": 8,
  },
  Object {
    "both": 72,
    "secondOne": 8,
    "store": 8,
    "third": 9,
  },
  Object {
    "both": 9,
    "secondOne": 9,
    "store": 0,
    "third": 1,
  },
]
`)
    expect(basicCase).toMatchInlineSnapshot(`
Object {
  "0.1": 0,
  "1.2": 0,
  "3.1": 0,
  "4.2": 0,
  "6.1": 0,
  "7.2": 0,
  "9.1": 0,
}
`)
    expect(scope.getState(sumStore)).toMatchInlineSnapshot(`
Array [
  9,
  Array [
    0,
    Array [
      72,
      Array [
        8,
        Array [
          0,
          Array [
            7,
            Array [
              6,
              Array [
                0,
                Array [
                  30,
                  Array [
                    5,
                    Array [
                      0,
                      Array [
                        4,
                        Array [
                          3,
                          Array [
                            0,
                            Array [
                              6,
                              Array [
                                2,
                                Array [
                                  0,
                                  Array [
                                    1,
                                    Array [
                                      0,
                                      Array [
                                        0,
                                        Array [
                                          0,
                                          Array [],
                                        ],
                                      ],
                                    ],
                                  ],
                                ],
                              ],
                            ],
                          ],
                        ],
                      ],
                    ],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
]
`)
  })
})

describe('fork handlers support', () => {
  test('handlers as js Map', async () => {
    const fx = createEffect(() => 'not to call')

    const acc = createStore<string[]>([]).on(fx.doneData, (list, val) => [
      ...list,
      val,
    ])

    const scope = fork({handlers: [[fx, () => 'fn']]})

    await allSettled(fx, {scope})

    expect(scope.getState(acc)).toEqual(['fn'])
  })
  test('handlers as tuple list', async () => {
    const fx = createEffect(() => 'not to call')

    const acc = createStore<string[]>([]).on(fx.doneData, (list, val) => [
      ...list,
      val,
    ])

    const scope = fork({handlers: [[fx, () => 'fn']]})

    await allSettled(fx, {scope})

    expect(scope.getState(acc)).toEqual(['fn'])
  })
  test('handlers as sid map', async () => {
    const fx = createEffect(() => 'not to call')

    const acc = createStore<string[]>([]).on(fx.doneData, (list, val) => [
      ...list,
      val,
    ])

    const scope = fork({
      handlers: {
        [fx.sid!]: () => 'fn',
      },
    })

    await allSettled(fx, {scope})

    expect(scope.getState(acc)).toEqual(['fn'])
  })
})

describe('handlers validation', () => {
  test('passing non-unit value to handlers should throw', async () => {
    expect(() => {
      fork({
        handlers: new Map().set(null, () => {}),
      })
    }).toThrowErrorMatchingInlineSnapshot(`"Map key should be a unit"`)
  })
  test('passing non-effect unit to handlers should throw', () => {
    const unit = createEvent()
    expect(() => {
      fork({
        handlers: new Map().set(unit, () => {}),
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"Handlers map can contain only effects as keys"`,
    )
  })
  test('passing attached effect to handlers should throw', () => {
    const fx = createEffect((n: number) => {})
    const source = createStore(0)
    const attached = attach({
      effect: fx,
      source,
    })
    expect(() => {
      fork({
        handlers: new Map().set(attached, () => {}),
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"Handlers can\`t accept attached effects"`,
    )
  })
})
