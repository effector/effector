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
  scopeBind,
  sample,
  createWatch,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

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
  test('store without sid should throw', () => {
    //@ts-expect-error
    const $foo = createStore(0, {sid: null})
    expect(() => {
      fork({values: [[$foo, 1]]})
    }).toThrowErrorMatchingInlineSnapshot(`"unit should have a sid"`)
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
    }).not.toThrow()
  })
  test('effect without sid should throw', () => {
    const fx = createEffect({
      handler() {},
      //@ts-expect-error
      sid: null,
    })
    expect(() => {
      fork({handlers: [[fx, () => {}]]})
    }).toThrowErrorMatchingInlineSnapshot(`"unit should have a sid"`)
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

describe('fork another scope', () => {
  test('new scope contains values of the old one', async () => {
    const changeValues = createEvent<{a: number; b: number}>()
    const $a = createStore(0).on(changeValues, (_, {a}) => a)
    const $b = createStore(0).on(changeValues, (_, {b}) => b)

    const oldScope = fork()

    await allSettled(changeValues, {scope: oldScope, params: {a: 1, b: 2}})

    const newScope = fork(oldScope)

    const oldState = serialize(oldScope)
    const newState = serialize(newScope)

    expect(oldState).toEqual(newState)
    expect(oldScope.getState($a)).toEqual(newScope.getState($a))
    expect(oldScope.getState($b)).toEqual(newScope.getState($b))
  })

  test('new scope allows to add new values on top of old ones', async () => {
    const changeValues = createEvent<{a: number; b: number}>()
    const $a = createStore(0, {sid: '$a'}).on(changeValues, (_, {a}) => a)
    const $b = createStore(0).on(changeValues, (_, {b}) => b)

    const oldScope = fork()

    await allSettled(changeValues, {scope: oldScope, params: {a: 1, b: 2}})

    const newScope = fork(oldScope, {
      values: {
        $a: 3,
      },
    })

    const oldState = serialize(oldScope)
    const newState = serialize(newScope)

    expect(oldState).not.toEqual(newState)
    expect(oldScope.getState($b)).toEqual(newScope.getState($b))
    expect(oldScope.getState($a)).toEqual(1)
    expect(newScope.getState($a)).toEqual(3)
  })

  test('new scope contains handlers of the old scope', async () => {
    const mockOriginal = jest.fn()
    const mockForked = jest.fn()
    const myFx = createEffect(() => mockOriginal())

    const oldScope = fork({
      handlers: [[myFx, mockForked]],
    })

    await allSettled(myFx, {scope: oldScope})

    expect(mockOriginal).not.toHaveBeenCalled()
    expect(mockForked).toBeCalledTimes(1)

    const newScope = fork(oldScope)

    await allSettled(myFx, {scope: newScope})

    expect(mockOriginal).not.toHaveBeenCalled()
    expect(mockForked).toBeCalledTimes(2)
  })

  test('new scope allows to add new handlers on top of old ones', async () => {
    const mockOriginal = jest.fn()
    const mockForked = jest.fn()
    const aFx = createEffect(() => mockOriginal())
    const bFx = createEffect(() => mockOriginal())

    const start = createEvent()

    sample({
      clock: start,
      target: [aFx, bFx],
    })

    const oldScope = fork({
      handlers: [[aFx, mockForked]],
    })

    await allSettled(start, {scope: oldScope})

    expect(mockOriginal).toBeCalledTimes(1)
    expect(mockForked).toBeCalledTimes(1)

    const newScope = fork(oldScope, {
      handlers: [
        [aFx, mockForked],
        [bFx, mockForked],
      ],
    })

    await allSettled(start, {scope: newScope})

    expect(mockOriginal).toBeCalledTimes(1)
    expect(mockForked).toBeCalledTimes(3)
  })

  test('new scope owns scopeBind of the old one', async () => {
    const changeValues = createEvent<{a: number; b: number}>()
    const $a = createStore(0).on(changeValues, (_, {a}) => a)
    const $b = createStore(0).on(changeValues, (_, {b}) => b)

    const oldScope = fork()

    const changeValuesOldScope = scopeBind(changeValues, {scope: oldScope})

    changeValuesOldScope({a: 1, b: 2})

    expect(oldScope.getState($a)).toEqual(1)
    expect(oldScope.getState($b)).toEqual(2)

    const newScope = fork(oldScope)

    changeValuesOldScope({a: 3, b: 4})

    expect(newScope.getState($a)).toEqual(3)
    expect(newScope.getState($b)).toEqual(4)
    // should stay unchanged
    expect(oldScope.getState($a)).toEqual(1)
    expect(oldScope.getState($b)).toEqual(2)
  })

  test('scopeBind to old scope after fork should not be allowed', () => {
    const event = createEvent()

    const scope = fork()
    const newScope = fork(scope)

    expect(() => {
      scopeBind(event, {scope: newScope})
    }).not.toThrow()
    expect(() => {
      scopeBind(event, {scope})
    }).toThrowErrorMatchingInlineSnapshot(
      `"scopeBind cannot be called on dead scope"`,
    )
  })

  test('new scope owns running effects of the old one', async () => {
    const anFx = createEffect(async () => new Promise(r => setTimeout(r, 10)))
    const anotherFx = createEffect(
      async () => new Promise(r => setTimeout(r, 5)),
    )

    const $fxStart = createStore(0).on([anFx, anotherFx], n => n + 1)
    const $fxEnd = createStore(0).on([anFx.done, anotherFx.done], n => n + 1)

    const oldScope = fork()

    allSettled(anFx, {scope: oldScope})
    allSettled(anotherFx, {scope: oldScope})
    expect(oldScope.getState($fxStart)).toEqual(2)
    expect(oldScope.getState($fxEnd)).toEqual(0)

    const newScope = fork(oldScope)

    await new Promise(r => setTimeout(r, 15))

    expect(newScope.getState($fxStart)).toEqual(2)
    expect(newScope.getState($fxEnd)).toEqual(2)

    // should remain unchanged
    expect(oldScope.getState($fxStart)).toEqual(2)
    expect(oldScope.getState($fxEnd)).toEqual(0)
  })

  test('allSettled to old scope after fork should not be allowed', () => {
    const event = createEvent()

    const scope = fork()
    const newScope = fork(scope)

    expect(() => {
      allSettled(event, {scope: newScope})
    }).not.toThrow()
    expect(() => {
      allSettled(event, {scope})
    }).toThrowErrorMatchingInlineSnapshot(
      `"allSettled cannot be called on dead scope"`,
    )
  })

  test('allSettled of the old scope is immediatly resolved after fork', async () => {
    const fx = createEffect(
      async () => await new Promise(r => setTimeout(r, 10)),
    )

    const scope = fork()

    const promise = allSettled(fx, {scope})

    fork(scope)

    const final = await promise

    expect(final).toEqual({
      status: 'forked',
    })
  })

  test('new scope owns createWatch of the old scope', async () => {
    const $source = createStore('a')
    const event = createEvent()

    const watch = jest.fn()
    const scopeA = fork()

    createWatch({
      unit: sample({
        source: $source,
        clock: event,
      }),
      scope: scopeA,
      fn: watch,
    })

    await allSettled(event, {scope: scopeA})

    expect(watch).toBeCalledTimes(1)
    expect(argumentHistory(watch)).toEqual(['a'])

    const scopeB = fork(scopeA, {
      values: [[$source, 'b']],
    })

    await allSettled(event, {scope: scopeB})

    expect(watch).toBeCalledTimes(2)
    expect(argumentHistory(watch)).toEqual(['a', 'b'])
  })
  test('createWatch to old scope after fork should not be allowed', () => {
    const event = createEvent()

    const scope = fork()
    const newScope = fork(scope)

    expect(() => {
      createWatch({
        unit: event,
        scope: newScope,
        fn: () => {},
      })
    }).not.toThrow()
    expect(() => {
      createWatch({
        unit: event,
        scope,
        fn: () => {},
      })
    }).toThrowErrorMatchingInlineSnapshot(
      `"createWatch cannot be called on a dead scope"`,
    )
  })

  test('Alive scope can be distinguished from the forked one', () => {
    const scope = fork()
    const newScope = fork(scope)

    expect(scope.alive).toEqual(false)
    expect(newScope.alive).toEqual(true)
  })

  test('edge case: scopeBind inside effect catches correct scope', async () => {
    const $source = createStore("a")
    const event = createEvent()
    const watch = jest.fn();
    sample({
      source: $source,
      clock: event,
    }).watch(watch)

    const waitFx = createEffect(async () => new Promise(r => setTimeout(r, 0)))
    const effect = createEffect(async () => {
      scopeBind(event)()
    })

    sample({
      clock: waitFx.done,
      target: effect
    })

    const scope = fork();
    allSettled(waitFx, {scope})

    expect(watch).toBeCalledTimes(0)

    const scopeB = fork(scope, {
      values: [[$source, "b"]]
    })

    await new Promise(r => setTimeout(r, 0))

    expect(watch).toBeCalledTimes(1)
    expect(watch).toBeCalledWith("b")
  })

  test('edge case: controller effect resets to correct scope', async () => {
    const $source = createStore("a")
    const event = createEvent()
    const watch = jest.fn();
    sample({
      source: $source,
      clock: event,
    }).watch(watch)

    const waitFx = createEffect(async () => new Promise(r => setTimeout(r, 5)))
    const effect = createEffect(async () => {
      await waitFx()
      event()
    })

    const scope = fork();
    allSettled(effect, {scope})

    expect(watch).toBeCalledTimes(0)

    const scopeB = fork(scope, {
      values: [[$source, "b"]]
    })

    await new Promise(r => setTimeout(r, 5))

    expect(watch).toBeCalledTimes(1)
    expect(watch).toBeCalledWith("b")
  })
})
