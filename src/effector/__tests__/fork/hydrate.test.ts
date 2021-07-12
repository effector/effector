import {argumentHistory} from 'effector/fixtures'
import {
  createDomain,
  forward,
  combine,
  fork,
  allSettled,
  serialize,
  hydrate,
  Store,
  Event,
} from 'effector'

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

  const mapped = store.map(x => `'${x}'`)

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
      ...serialize(fork(app), {onlyChanges: true}),
      [store.sid!]: 0,
    },
  })
  await allSettled(start, {scope: fork(app)})
  expect({
    store: {
      watch: argumentHistory(storeWatchFn),
      'updates.watch': argumentHistory(eventWatchFn),
    },
    combined: {
      watch: argumentHistory(combineWatchFn),
      'updates.watch': argumentHistory(combineUpdatesWatchFn),
    },
    combinedFn: {
      watch: argumentHistory(combineFnWatchFn),
      'updates.watch': argumentHistory(combineFnUpdatesWatchFn),
    },
    mapped: {
      watch: argumentHistory(mapWatchFn),
      'updates.watch': argumentHistory(mapUpdatesWatchFn),
    },
    fxHandlerFn: argumentHistory(fxHandlerFn),
  }).toMatchInlineSnapshot(`
    Object {
      "combined": Object {
        "updates.watch": Array [
          Object {
            "a": 1,
            "b": 1,
          },
        ],
        "watch": Array [
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
        ],
      },
      "combinedFn": Object {
        "updates.watch": Array [
          Object {
            "a": 1,
            "b": 1,
          },
        ],
        "watch": Array [
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
        ],
      },
      "fxHandlerFn": Array [
        1,
      ],
      "mapped": Object {
        "updates.watch": Array [
          "'1\'",
        ],
        "watch": Array [
          "'-1'",
          "'0'",
          "'1'",
        ],
      },
      "store": Object {
        "updates.watch": Array [
          1,
        ],
        "watch": Array [
          -1,
          0,
          1,
        ],
      },
    }
  `)
})

describe('multiple hydrate calls', () => {
  test('reference: no hydrate calls', () => {
    const fn = jest.fn()
    const app = createDomain()
    const setN = app.createEvent<number>()
    const $n = app.createStore(0).on(setN, (_, n) => n)
    const combined = combine({n: $n})
    const combfn = combine($n, n => n)
    storeWatch('$n', $n, fn)
    storeWatch('combined', combined, fn)
    storeWatch('combfn', combfn, fn)
    unitWatch('setN', setN, fn)
    fn(`## setN(2)`)
    setN(2)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "$n: 0",
        "combined: {n:0}",
        "combfn: 0",
        "## setN(2)",
        "setN: 2",
        "$n: 2",
        "$n.updates: 2",
        "combined: {n:2}",
        "combined.updates: {n:2}",
        "combfn: 2",
        "combfn.updates: 2",
      ]
    `)
  })
  describe('with same value', () => {
    test('domain', () => {
      const fn = jest.fn()
      const app = createDomain()
      const setN = app.createEvent<number>()
      const $n = app.createStore(0).on(setN, (_, n) => n)
      const combined = combine({n: $n})
      const combfn = combine($n, n => n)
      storeWatch('$n', $n, fn)
      storeWatch('combined', combined, fn)
      storeWatch('combfn', combfn, fn)
      unitWatch('setN', setN, fn)
      fn(`## first hydration, $n = 1`)
      hydrate(app, {
        values: new Map([[$n, 1]]),
      })
      fn(`## second hydration, $n = 1`)
      hydrate(app, {
        values: new Map([[$n, 1]]),
      })
      fn(`## setN(2)`)
      setN(2)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$n: 0",
          "combined: {n:0}",
          "combfn: 0",
          "## first hydration, $n = 1",
          "combined: {n:1}",
          "combfn: 1",
          "$n: 1",
          "## second hydration, $n = 1",
          "combined: {n:1}",
          "combfn: 1",
          "$n: 1",
          "## setN(2)",
          "setN: 2",
          "$n: 2",
          "$n.updates: 2",
          "combined: {n:2}",
          "combined.updates: {n:2}",
          "combfn: 2",
          "combfn.updates: 2",
        ]
      `)
    })
    test('scope', async () => {
      const fn = jest.fn()
      const app = createDomain()
      const setN = app.createEvent<number>()
      const $n = app.createStore(0).on(setN, (_, n) => n)
      const combined = combine({n: $n})
      const combfn = combine($n, n => n)
      storeWatch('$n', $n, fn)
      storeWatch('combined', combined, fn)
      storeWatch('combfn', combfn, fn)
      unitWatch('setN', setN, fn)
      fn(`## forking, $n = -2`)
      const scope = fork(app, {
        values: new Map([[$n, -2]]),
      })
      fn(`## first hydration, $n = 1`)
      hydrate(scope, {
        values: new Map([[$n, 1]]),
      })
      fn(`## second hydration, $n = 1`)
      hydrate(scope, {
        values: new Map([[$n, 1]]),
      })
      fn(`## setN(2)`)
      await allSettled(setN, {
        params: 2,
        scope,
      })
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$n: 0",
          "combined: {n:0}",
          "combfn: 0",
          "## forking, $n = -2",
          "## first hydration, $n = 1",
          "$n: 1",
          "$n.updates: 1",
          "combined: {n:1}",
          "combined.updates: {n:1}",
          "combfn: 1",
          "combfn.updates: 1",
          "## second hydration, $n = 1",
          "## setN(2)",
          "setN: 2",
          "$n: 2",
          "$n.updates: 2",
          "combined: {n:2}",
          "combined.updates: {n:2}",
          "combfn: 2",
          "combfn.updates: 2",
        ]
      `)
    })
  })
  describe('with different values', () => {
    test('domain', () => {
      const fn = jest.fn()
      const app = createDomain()
      const setN = app.createEvent<number>()
      const $n = app.createStore(0).on(setN, (_, n) => n)
      const combined = combine({n: $n})
      const combfn = combine($n, n => n)
      storeWatch('$n', $n, fn)
      storeWatch('combined', combined, fn)
      storeWatch('combfn', combfn, fn)
      unitWatch('setN', setN, fn)
      fn(`## first hydration, $n = 1`)
      hydrate(app, {
        values: new Map([[$n, 1]]),
      })
      fn(`## second hydration, $n = -1`)
      hydrate(app, {
        values: new Map([[$n, -1]]),
      })
      fn(`## setN(2)`)
      setN(2)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$n: 0",
          "combined: {n:0}",
          "combfn: 0",
          "## first hydration, $n = 1",
          "combined: {n:1}",
          "combfn: 1",
          "$n: 1",
          "## second hydration, $n = -1",
          "combined: {n:-1}",
          "combfn: -1",
          "$n: -1",
          "## setN(2)",
          "setN: 2",
          "$n: 2",
          "$n.updates: 2",
          "combined: {n:2}",
          "combined.updates: {n:2}",
          "combfn: 2",
          "combfn.updates: 2",
        ]
      `)
    })
    test('scope', async () => {
      const fn = jest.fn()
      const app = createDomain()
      const setN = app.createEvent<number>()
      const $n = app.createStore(0).on(setN, (_, n) => n)
      const combined = combine({n: $n})
      const combfn = combine($n, n => n)
      storeWatch('$n', $n, fn)
      storeWatch('combined', combined, fn)
      storeWatch('combfn', combfn, fn)
      unitWatch('setN', setN, fn)
      fn(`## forking, $n = -2`)
      const scope = fork(app, {
        values: new Map([[$n, -2]]),
      })
      fn(`## first hydration, $n = 1`)
      hydrate(scope, {
        values: new Map([[$n, 1]]),
      })
      fn(`## second hydration, $n = -1`)
      hydrate(scope, {
        values: new Map([[$n, -1]]),
      })
      fn(`## setN(2)`)
      await allSettled(setN, {
        params: 2,
        scope,
      })
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$n: 0",
          "combined: {n:0}",
          "combfn: 0",
          "## forking, $n = -2",
          "## first hydration, $n = 1",
          "$n: 1",
          "$n.updates: 1",
          "combined: {n:1}",
          "combined.updates: {n:1}",
          "combfn: 1",
          "combfn.updates: 1",
          "## second hydration, $n = -1",
          "$n: -1",
          "$n.updates: -1",
          "combined: {n:-1}",
          "combined.updates: {n:-1}",
          "combfn: -1",
          "combfn.updates: -1",
          "## setN(2)",
          "setN: 2",
          "$n: 2",
          "$n.updates: 2",
          "combined: {n:2}",
          "combined.updates: {n:2}",
          "combfn: 2",
          "combfn.updates: 2",
        ]
      `)
    })
  })
  function storeWatch<T>(
    tag: string,
    store: Store<T>,
    fn: jest.Mock<any, any>,
  ) {
    unitWatch(`${tag}`, store, fn)
    unitWatch(`${tag}.updates`, store.updates, fn)
  }
  function unitWatch<T>(
    tag: string,
    unit: Store<T> | Event<T>,
    fn: jest.Mock<any, any>,
    log: boolean = false,
  ) {
    unit.watch(value => {
      let text: string
      if (typeof value === 'object' && value !== null) {
        text = `{n:${(value as any).n}}`
      } else {
        text = `${value}`
      }
      fn(`${tag}: ${text}`)
      if (log) {
        console.log(tag, text)
      }
    })
  }
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
        ...serialize(fork(app), {onlyChanges: true}),
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

test('scope support', async () => {
  const fn = jest.fn()

  const app = createDomain()
  const name = app.createStore('guest')
  name.updates.watch(fn)

  const scope = fork(app, {values: new Map([[name, 'alice']])})

  hydrate(scope, {values: new Map([[name, 'bob']])})

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "bob",
    ]
  `)
  expect(scope.getState(name)).toMatchInlineSnapshot(`"bob"`)
  expect(name.getState()).toMatchInlineSnapshot(`"guest"`)
})
