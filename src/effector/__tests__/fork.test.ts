//@noflow

import {argumentHistory} from 'effector/fixtures'
import {createDomain, forward, combine, attach} from 'effector'
import {fork, allSettled, serialize, hydrate} from 'effector/fork'

it('serialize stores to object of sid as keys', () => {
  const app = createDomain()
  const $a = app.createStore('value', {sid: 'a'})
  const $b = app.createStore([], {sid: 'b'})
  const $c = app.createStore(null, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app)
  const values = serialize(scope)

  expect(values).toMatchInlineSnapshot(`
    Object {
      "a": "value",
      "b": Array [],
      "c": null,
      "d": false,
    }
  `)
})

it('serialize stores with ignore parameter', () => {
  const app = createDomain()
  const $a = app.createStore('value', {sid: 'a'})
  const $b = app.createStore([], {sid: 'b'})
  const $c = app.createStore(null, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app)
  const values = serialize(scope, {ignore: [$b, $d]})

  expect(values).toMatchInlineSnapshot(`
    Object {
      "a": "value",
      "c": null,
    }
  `)
})

it('serialize stores in nested domain', () => {
  const app = createDomain()
  const first = app.createDomain()
  const second = app.createDomain()
  const third = second.createDomain()
  const $a = first.createStore('value', {sid: 'a'})
  const $b = second.createStore([], {sid: 'b'})
  const $c = third.createStore(null, {sid: 'c'})
  const $d = app.createStore(false, {sid: 'd'})

  const scope = fork(app)
  const values = serialize(scope, {ignore: [$d, $a]})

  expect(values).toMatchInlineSnapshot(`
    Object {
      "b": Array [],
      "c": null,
    }
`)
})

test('allSettled first argument validation', async () => {
  const app = createDomain()

  await expect(
    //@ts-ignore
    allSettled(null, {
      scope: fork(app),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"first argument should be unit"`,
  )
})

test('watch calls during hydration', async () => {
  const fxHandlerFn = jest.fn()
  const storeWatchFn = jest.fn()
  const eventWatchFn = jest.fn()
  const combineWatchFn = jest.fn()
  const combineUpdatesWatchFn = jest.fn()
  const combineFnWatchFn = jest.fn()
  const combineFnUpdatesWatchFn = jest.fn()
  const mapWatchFn = jest.fn()
  const mapUpdatesWatchFn = jest.fn()

  const app = createDomain()
  const start = app.createEvent()
  const fx = app.createEffect({
    handler: fxHandlerFn,
  })

  const store = app.store(-1).on(start, x => x + 1)

  forward({
    from: store,
    to: fx,
  })

  const combined = combine({a: store, b: store})
  const combinedFn = combine(store, store, (a, b) => ({a, b}))

  const mapped = store.map(x => `"${x}"`)

  store.watch(storeWatchFn)
  store.updates.watch(eventWatchFn)
  combined.watch(combineWatchFn)
  combined.updates.watch(combineUpdatesWatchFn)
  combinedFn.watch(combineFnWatchFn)
  combinedFn.updates.watch(combineFnUpdatesWatchFn)
  mapped.watch(mapWatchFn)
  mapped.updates.watch(mapUpdatesWatchFn)

  hydrate(app, {
    values: {
      ...serialize(fork(app)),
      [store.sid!]: 0,
    },
  })

  await allSettled(start, {
    scope: fork(app),
  })

  expect(argumentHistory(storeWatchFn)).toMatchInlineSnapshot(`
    Array [
      -1,
      0,
      1,
    ]
  `)
  expect(argumentHistory(eventWatchFn)).toMatchInlineSnapshot(`
    Array [
      1,
    ]
  `)
  expect(argumentHistory(combineWatchFn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": -1,
        "b": -1,
      },
      Object {
        "a": 0,
        "b": 0,
      },
      Object {
        "a": 1,
        "b": 1,
      },
    ]
  `)
  expect(argumentHistory(combineUpdatesWatchFn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": 1,
        "b": 1,
      },
    ]
  `)
  expect(argumentHistory(combineFnWatchFn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": -1,
        "b": -1,
      },
      Object {
        "a": 0,
        "b": 0,
      },
      Object {
        "a": 1,
        "b": 1,
      },
    ]
  `)
  expect(argumentHistory(combineFnUpdatesWatchFn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": 1,
        "b": 1,
      },
    ]
  `)
  expect(argumentHistory(mapWatchFn)).toMatchInlineSnapshot(`
    Array [
      "\\"-1\\"",
      "\\"0\\"",
      "\\"1\\"",
    ]
  `)
  expect(argumentHistory(mapUpdatesWatchFn)).toMatchInlineSnapshot(`
    Array [
      "\\"1\\"",
    ]
  `)
  expect(argumentHistory(fxHandlerFn)).toMatchInlineSnapshot(`
    Array [
      1,
    ]
  `)
})

describe('hydrate edge cases', () => {
  test('#1', async () => {
    const app = createDomain()

    const listsContainer$ = app.createStore({
      a: [],
      b: [],
    })

    const greaterThan$ = app.createStore(2)

    const listA$ = listsContainer$.map(x => x.a)
    const filteredA$ = {combine}.combine(listA$, greaterThan$, (xs, gt) =>
      xs.filter(x => x > gt),
    )
    const listB$ = listsContainer$.map(x => x.b)
    const filteredB$ = {combine}.combine(listB$, greaterThan$, (xs, gt) =>
      xs.filter(x => x > gt),
    )

    hydrate(app, {
      values: {
        ...serialize(fork(app)),
        [listsContainer$.sid!]: {
          a: [0, 1, 2, 3],
          b: [1, 8, 5],
        },
      },
    })
    expect(filteredA$.getState()).toMatchInlineSnapshot(`
      Array [
        3,
      ]
    `)
    expect(filteredB$.getState()).toMatchInlineSnapshot(`
      Array [
        8,
        5,
      ]
    `)
  })
  test('#2', async () => {
    const app = createDomain()

    const greaterThan = app.createStore(2)

    const listsContainer = app.createStore({
      a: [],
      b: [],
    })

    const byType = listsContainer.map(val => val.a)
    const filtered = combine(byType, greaterThan, (map, gt) =>
      map.filter(x => x > gt),
    )

    const forked = fork(app)

    hydrate(app, {
      values: {
        [listsContainer.sid!]: {
          a: [0, 1, 2, 3],
          b: [1, 8, 5],
        },
      },
    })

    expect(filtered.getState()).toMatchInlineSnapshot(`
      Array [
        3,
      ]
    `)
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
})

describe('fork handlers support', () => {
  test('handlers as js Map', async () => {
    const app = createDomain()

    const fx = app.createEffect({handler: () => 'not to call'})

    const acc = app
      .createStore<string[]>([])
      .on(fx.doneData, (list, val) => [...list, val])

    const scope = fork(app, {
      handlers: new Map([[fx, () => 'fn']]),
    })

    await allSettled(fx, {
      scope,
    })

    expect(scope.getState(acc)).toEqual(['fn'])
  })
  test('handlers as sid map', async () => {
    const app = createDomain()

    const fx = app.createEffect({handler: () => 'not to call'})

    const acc = app
      .createStore<string[]>([])
      .on(fx.doneData, (list, val) => [...list, val])

    const scope = fork(app, {
      handlers: {
        [fx.sid!]: () => 'fn',
      },
    })

    await allSettled(fx, {
      scope,
    })

    expect(scope.getState(acc)).toEqual(['fn'])
  })
})

describe('imperative call support', () => {
  it('support imperative event calls in watchers', async () => {
    const app = createDomain()

    const inc = app.createEvent()
    const count = app.createStore(0).on(inc, x => x + 1)

    const start = app.createEvent()
    start.watch(() => {
      inc()
    })

    const scope = fork(app)

    await allSettled(start, {
      scope,
    })

    expect(scope.getState(count)).toBe(1)
    expect(count.getState()).toBe(0)
  })
  describe('support imperative event calls in effects', () => {
    test('sync effects', async () => {
      const app = createDomain()

      const inc = app.createEvent()
      const count = app.createStore(0).on(inc, x => x + 1)

      const start = app.createEffect({
        handler() {
          inc()
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    test('start of async effects', async () => {
      const app = createDomain()

      const inc = app.createEvent()
      const count = app.createStore(0).on(inc, x => x + 1)

      const start = app.createEffect({
        async handler() {
          inc()
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
  })
  describe('support imperative effect calls in effects', () => {
    test('simple case', async () => {
      const app = createDomain()

      const inc = app.createEffect<void, void>({handler() {}})
      const count = app.createStore(0).on(inc.done, x => x + 1)

      const start = app.createEffect({
        async handler() {
          await inc()
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(1)
      expect(count.getState()).toBe(0)
    })
    describe('sequential', () => {
      test('with sync inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await inc()
            await inc()
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
      test('with async inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({async handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await inc()
            await inc()
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
    })
    describe('parallel', () => {
      test('with sync inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await Promise.all([inc(), inc()])
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
      test('with async inner effect', async () => {
        const app = createDomain()

        const inc = app.createEffect({async handler() {}})
        const count = app.createStore(0).on(inc.done, x => x + 1)

        const start = app.createEffect({
          async handler() {
            await Promise.all([inc(), inc()])
          },
        })

        const scope = fork(app)

        await allSettled(start, {
          scope,
        })

        expect(scope.getState(count)).toBe(2)
        expect(count.getState()).toBe(0)
      })
    })
    test('with forward', async () => {
      const app = createDomain()

      const inc = app.createEffect({async handler() {}})
      const count = app.createStore(0).on(inc.done, x => x + 1)

      const start = app.createEffect({
        async handler() {
          await inc()
        },
      })

      const next = app.createEffect({
        async handler() {
          await inc()
        },
      })

      forward({from: start.doneData, to: next})

      const scope = fork(app)

      await allSettled(start, {
        scope,
      })

      expect(scope.getState(count)).toBe(2)
      expect(count.getState()).toBe(0)
    })
    test('attach imperative call', async () => {
      const app = createDomain()

      const add = app.createEffect({handler: (_: number) => _})

      const count = app.createStore(2).on(add.doneData, (x, y) => x + y)

      const addWithCurrent = attach({
        source: count,
        effect: add,
        mapParams: (params: number, current) => params + current,
      })

      const start = app.createEffect({
        async handler(val: number) {
          await addWithCurrent(val)
        },
      })

      const scope = fork(app)

      await allSettled(start, {
        scope,
        params: 3,
      })

      expect(scope.getState(count)).toBe(7)
      expect(count.getState()).toBe(2)
    })
    test('scope isolation', async () => {
      const app = createDomain()

      const addWord = app.createEffect({handler: async (word: string) => word})
      const words = app
        .createStore<string[]>([])
        .on(addWord.doneData, (list, word) => [...list, word])

      const start = app.createEffect({
        async handler(word: string) {
          await addWord(`${word} 1`)
          await addWord(`${word} 2`)
          return word
        },
      })

      const next = app.createEffect({
        async handler(word: string) {
          await addWord(`${word} 3`)
          await addWord(`${word} 4`)
        },
      })

      forward({from: start.doneData, to: next})

      const scopeA = fork(app)
      const scopeB = fork(app)
      const scopeC = fork(app)

      await Promise.all([
        allSettled(start, {
          scope: scopeA,
          params: 'A',
        }),
        allSettled(start, {
          scope: scopeB,
          params: 'B',
        }),
      ])

      await allSettled(start, {
        scope: scopeC,
        params: 'C',
      })

      expect(scopeA.getState(words)).toMatchInlineSnapshot(`
        Array [
          "A 1",
          "A 2",
          "A 3",
          "A 4",
        ]
      `)
      expect(scopeB.getState(words)).toMatchInlineSnapshot(`
        Array [
          "B 1",
          "B 2",
          "B 3",
          "B 4",
        ]
      `)
      expect(scopeC.getState(words)).toMatchInlineSnapshot(`
        Array [
          "C 1",
          "C 2",
          "C 3",
          "C 4",
        ]
      `)
      expect(words.getState()).toEqual([])
    })
  })
})
