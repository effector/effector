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
  Scope,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (
      String(message).includes('forward') ||
      String(message).includes('guard')
    )
      return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

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
describe('units without sids support', () => {
  test('store without sid should be supported', () => {
    //@ts-expect-error
    const $foo = createStore(0, {sid: null})
    expect(() => {
      fork({values: [[$foo, 1]]})
    }).not.toThrow()
    const scope = fork({values: [[$foo, 2]]})
    expect(scope.getState($foo)).toBe(2)
  })
  test('mapped stores derived from sidless ones should be supported', () => {
    //@ts-expect-error
    const $foo = createStore(0, {sid: null})
    const $bar = $foo.map(x => x)
    const scope = fork({values: [[$foo, 2]]})
    expect(scope.getState($bar)).toBe(2)
  })
  test('combined stores derived from sidless ones should be supported', () => {
    //@ts-expect-error
    const $foo = createStore(0, {sid: null})
    const $bar = combine($foo, x => x)
    const scope = fork({values: [[$foo, 2]]})
    expect(scope.getState($bar)).toBe(2)
  })
  test('effect without sid should be supported', async () => {
    const fooFx = createEffect({
      handler(): any {
        throw Error('default handler')
      },
      //@ts-expect-error
      sid: null,
    })
    expect(() => {
      fork({handlers: [[fooFx, () => 1]]})
    }).not.toThrow()
    const fn = jest.fn()
    const scope = fork({handlers: [[fooFx, fn]]})
    await allSettled(fooFx, {scope})
    expect(fn).toBeCalled()
  })
  test('mixed sid and no-sid case should work for tests', async () => {
    //@ts-expect-error
    const $foo = createStore(0, {sid: null})
    const $bar = $foo.map(x => x * 2)

    const $sid = createStore(0, {sid: '$sid'})
    const $sidBar = $sid.map(x => x * 2)

    const scope = fork({
      values: [
        [$foo, 1],
        [$sid, 2],
      ],
    })

    expect(scope.getState($bar)).toBe(2)
    expect(scope.getState($sidBar)).toBe(4)
  })
  test('edge-case: mixed sid and no-sid case should work for tests, even there are build-in sids in factory', async () => {
    const libFactory = () => {
      return createStore(0, {sid: '$sid'})
    }

    //@ts-expect-error
    const $foo = createStore(0, {sid: null})
    const $bar = $foo.map(x => x * 2)

    const $sid = libFactory()
    const $sidBar = $sid.map(x => x * 2)

    const $sidOther = libFactory()
    const $sidBarOther = $sidOther.map(x => x * 2)

    const scope = fork({
      values: [
        [$foo, 1],
        [$sid, 2],
        [$sidOther, 4],
      ],
    })

    expect(scope.getState($bar)).toBe(2)
    expect(scope.getState($sidBar)).toBe(4)
    expect(scope.getState($sidBarOther)).toBe(8)
  })
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
  test('handlers as a tuple list, but with sid doubles', async () => {
    const h1 = jest.fn()
    const h2 = jest.fn()
    const fx1 = createEffect({
      sid: 'fx',
      handler: () => {},
    })
    const fx2 = createEffect({
      sid: 'fx',
      handler: () => {},
    })

    const scope = fork({
      handlers: [
        [fx1, h1],
        [fx2, h2],
      ],
    })

    await Promise.all([allSettled(fx1, {scope}), allSettled(fx2, {scope})])

    expect(h1).toBeCalledTimes(1)
    expect(h2).toBeCalledTimes(1)
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
    }).not.toThrow()
  })
})

describe('passing attach async effect to handlers should work', () => {
  test('function in effect, function in handlers', async () => {
    const fn = jest.fn()
    const $user = createStore('guest')
    const sendMessageFx = attach({
      source: $user,
      async effect(user, message: {text: string}) {},
    })

    let scope: Scope
    expect(() => {
      scope = fork({
        values: [[$user, 'alice']],
        handlers: [
          [
            sendMessageFx,
            (user: string, message: {text: string}) => {
              fn({user, message})
            },
          ],
        ],
      })
    }).not.toThrow()
    await allSettled(sendMessageFx, {
      scope: scope!,
      params: {text: 'hello'},
    })
    expect(argumentHistory(fn)[0]).toEqual({
      user: 'alice',
      message: {text: 'hello'},
    })
  })
  test('function in effect, effect in handlers', async () => {
    const fn = jest.fn()
    const $user = createStore('guest')
    const fx = createEffect((user: string) => {
      fn({user})
    })
    const sendMessageFx = attach({
      source: $user,
      async effect(user, message: {text: string}) {},
    })

    let scope: Scope
    expect(() => {
      scope = fork({
        values: [[$user, 'alice']],
        handlers: [[sendMessageFx, fx]],
      })
    }).not.toThrow()
    await allSettled(sendMessageFx, {
      scope: scope!,
      params: {text: 'hello'},
    })
    expect(argumentHistory(fn)[0]).toEqual({user: 'alice'})
  })
  test('effect in effect, function in handlers', async () => {
    const fn = jest.fn()
    const $user = createStore('guest')
    const fx = createEffect((user: string) => {})
    const sendMessageFx = attach({
      source: $user,
      effect: fx,
    })

    let scope: Scope
    expect(() => {
      scope = fork({
        values: [[$user, 'alice']],
        handlers: [
          [
            sendMessageFx,
            (user: string) => {
              fn({user})
            },
          ],
        ],
      })
    }).not.toThrow()
    await allSettled(sendMessageFx, {
      scope: scope!,
    })
    expect(argumentHistory(fn)[0]).toEqual({user: 'alice'})
  })
  test('effect in effect, effect in handlers', async () => {
    const fn = jest.fn()
    const $user = createStore('guest')
    const fx1 = createEffect((user: string) => {})
    const fx2 = createEffect((user: string) => {
      fn({user})
    })
    const sendMessageFx = attach({
      source: $user,
      effect: fx1,
    })

    let scope: Scope
    expect(() => {
      scope = fork({
        values: [[$user, 'alice']],
        handlers: [[sendMessageFx, fx2]],
      })
    }).not.toThrow()
    await allSettled(sendMessageFx, {
      scope: scope!,
    })
    expect(argumentHistory(fn)[0]).toEqual({user: 'alice'})
  })
})

test('edge case', async () => {
  const enableFeature = createEvent()

  const $isCountryPage = createStore(false, {sid: 'country'})
  const $isFeatureEnabled = createStore(false, {sid: 'feature'}).on(
    enableFeature,
    () => true,
  )

  const $isWidgetEnabled = combine([$isCountryPage, $isFeatureEnabled], s =>
    s.every(Boolean),
  )

  const scope = fork({values: [[$isCountryPage, true]]})
  await allSettled(enableFeature, {scope})

  expect(scope.getState($isWidgetEnabled)).toBe(true)
})

describe('scope watch calls', () => {
  test('without values', async () => {
    const aWatchFn = jest.fn()
    const aUpdWatchFn = jest.fn()
    const mappedWatchFn = jest.fn()
    const mappedUpdWatchFn = jest.fn()
    const combinedWatchFn = jest.fn()
    const combinedUpdWatchFn = jest.fn()

    const trigger = createEvent()

    const src = createStore(0).on(trigger, n => n + 1)
    const tag = createStore('a')
    const mapped = src.map(n => n + 1)
    const combined = combine([src, tag])

    addWatch(src, aWatchFn, aUpdWatchFn)
    addWatch(mapped, mappedWatchFn, mappedUpdWatchFn)
    addWatch(combined, combinedWatchFn, combinedUpdWatchFn)

    const scope = fork()

    await allSettled(trigger, {scope})
    await allSettled(trigger, {scope})

    expect({
      watch: argumentHistory(aWatchFn),
      updates: argumentHistory(aUpdWatchFn),
    }).toEqual({watch: [1, 2], updates: [1, 2]})
    expect({
      watch: argumentHistory(mappedWatchFn),
      updates: argumentHistory(mappedUpdWatchFn),
    }).toEqual({watch: [2, 3], updates: [2, 3]})
    expect({
      watch: argumentHistory(combinedWatchFn),
      updates: argumentHistory(combinedUpdWatchFn),
    }).toEqual({
      watch: [
        [1, 'a'],
        [2, 'a'],
      ],
      updates: [
        [1, 'a'],
        [2, 'a'],
      ],
    })
  })
  test('with updated values', async () => {
    const aWatchFn = jest.fn()
    const aUpdWatchFn = jest.fn()
    const mappedWatchFn = jest.fn()
    const mappedUpdWatchFn = jest.fn()
    const combinedWatchFn = jest.fn()
    const combinedUpdWatchFn = jest.fn()

    const trigger = createEvent()

    const src = createStore(0).on(trigger, n => n + 1)
    const tag = createStore('a')
    const mapped = src.map(n => n + 1)
    const combined = combine([src, tag])

    addWatch(src, aWatchFn, aUpdWatchFn)
    addWatch(mapped, mappedWatchFn, mappedUpdWatchFn)
    addWatch(combined, combinedWatchFn, combinedUpdWatchFn)

    const scope = fork({values: [[src, 1]]})

    await allSettled(trigger, {scope})
    await allSettled(trigger, {scope})

    expect({
      watch: argumentHistory(aWatchFn),
      updates: argumentHistory(aUpdWatchFn),
    }).toEqual({watch: [2, 3], updates: [2, 3]})
    expect({
      watch: argumentHistory(mappedWatchFn),
      updates: argumentHistory(mappedUpdWatchFn),
    }).toEqual({watch: [3, 4], updates: [3, 4]})
    expect({
      watch: argumentHistory(combinedWatchFn),
      updates: argumentHistory(combinedUpdWatchFn),
    }).toEqual({
      watch: [
        [2, 'a'],
        [3, 'a'],
      ],
      updates: [
        [2, 'a'],
        [3, 'a'],
      ],
    })
  })

  test('with sibling values', async () => {
    const aWatchFn = jest.fn()
    const aUpdWatchFn = jest.fn()
    const mappedWatchFn = jest.fn()
    const mappedUpdWatchFn = jest.fn()
    const combinedWatchFn = jest.fn()
    const combinedUpdWatchFn = jest.fn()

    const trigger = createEvent()

    const src = createStore(0).on(trigger, n => n + 1)
    const tag = createStore('a')
    const mapped = src.map(n => n + 1)
    const combined = combine([src, tag])

    addWatch(src, aWatchFn, aUpdWatchFn)
    addWatch(mapped, mappedWatchFn, mappedUpdWatchFn)
    addWatch(combined, combinedWatchFn, combinedUpdWatchFn)

    const scope = fork({values: [[tag, 'b']]})

    await allSettled(trigger, {scope})
    await allSettled(trigger, {scope})

    expect({
      watch: argumentHistory(aWatchFn),
      updates: argumentHistory(aUpdWatchFn),
    }).toEqual({watch: [1, 2], updates: [1, 2]})
    expect({
      watch: argumentHistory(mappedWatchFn),
      updates: argumentHistory(mappedUpdWatchFn),
    }).toEqual({watch: [2, 3], updates: [2, 3]})
    expect({
      watch: argumentHistory(combinedWatchFn),
      updates: argumentHistory(combinedUpdWatchFn),
    }).toEqual({
      watch: [
        [1, 'b'],
        [2, 'b'],
      ],
      updates: [
        [1, 'b'],
        [2, 'b'],
      ],
    })
  })

  test('with sibling values & nested combine', async () => {
    const aWatchFn = jest.fn()
    const aUpdWatchFn = jest.fn()
    const mappedWatchFn = jest.fn()
    const mappedUpdWatchFn = jest.fn()
    const combinedWatchFn = jest.fn()
    const combinedUpdWatchFn = jest.fn()

    const trigger = createEvent()

    const src = createStore(0).on(trigger, n => n + 1)
    const tag = createStore('a')
    const mapped = src.map(n => n + 1)
    const combinedA = combine([src, tag])
    const combinedB = combine([tag])
    const combined = combine(combinedA, combinedB, ([src], [tag]) => [src, tag])

    addWatch(src, aWatchFn, aUpdWatchFn)
    addWatch(mapped, mappedWatchFn, mappedUpdWatchFn)
    addWatch(combined, combinedWatchFn, combinedUpdWatchFn)

    const scope = fork({values: [[tag, 'b']]})

    await allSettled(trigger, {scope})
    await allSettled(trigger, {scope})

    expect({
      watch: argumentHistory(aWatchFn),
      updates: argumentHistory(aUpdWatchFn),
    }).toEqual({watch: [1, 2], updates: [1, 2]})
    expect({
      watch: argumentHistory(mappedWatchFn),
      updates: argumentHistory(mappedUpdWatchFn),
    }).toEqual({watch: [2, 3], updates: [2, 3]})
    expect({
      watch: argumentHistory(combinedWatchFn),
      updates: argumentHistory(combinedUpdWatchFn),
    }).toEqual({
      watch: [
        [1, 'b'],
        [2, 'b'],
      ],
      updates: [
        [1, 'b'],
        [2, 'b'],
      ],
    })
  })

  function addWatch(
    store: Store<any>,
    fnA: (value: any) => any,
    fnB: (value: any) => any,
  ) {
    let inited = false
    store.watch(upd => {
      if (!inited) {
        inited = true
        return
      }
      fnA(upd)
    })
    store.updates.watch(upd => fnB(upd))
  }
})
