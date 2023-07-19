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
  Scope,
  createEvent,
  createStore,
  createEffect,
  sample,
} from 'effector'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('forward')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

describe('sidless stores support', () => {
  test('with scope', () => {
    //@ts-expect-error
    const app = createDomain({sid: null})
    //@ts-expect-error
    const $foo = app.createStore(0, {sid: null})
    const scope = fork(app)
    hydrate(scope, {values: [[$foo, 2]]})
    expect(scope.getState($foo)).toBe(2)
  })
  test('with domain', () => {
    //@ts-expect-error
    const app = createDomain({sid: null})
    //@ts-expect-error
    const $foo = app.createStore(0, {sid: null})
    hydrate(app, {values: [[$foo, 2]]})
    expect($foo.getState()).toBe(2)
  })
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

  const mapped = store.map(x => `'${x}'`)

  store.watch(storeWatchFn)
  store.updates.watch(eventWatchFn)
  combined.watch(combineWatchFn)
  combined.updates.watch(combineUpdatesWatchFn)
  combinedFn.watch(combineFnWatchFn)
  combinedFn.updates.watch(combineFnUpdatesWatchFn)
  mapped.watch(mapWatchFn)
  mapped.updates.watch(mapUpdatesWatchFn)

  hydrate(app, {values: [[store, 0]]})
  await allSettled(start, {scope: fork(app)})
  /** store */
  expect({
    watch: argumentHistory(storeWatchFn),
    updates: argumentHistory(eventWatchFn),
  }).toEqual({watch: [-1, 0, 1], updates: [0, 1]})
  /** mapped */
  expect({
    watch: argumentHistory(mapWatchFn),
    updates: argumentHistory(mapUpdatesWatchFn),
  }).toEqual({watch: ["'-1'", "'0'", "'1'"], updates: ["'0'", "'1'"]})
  expect({
    fxHandlerFn: argumentHistory(fxHandlerFn),
  }).toEqual({fxHandlerFn: [0, 1]})
  /** combined */
  expect({
    watch: argumentHistory(combineWatchFn),
    updates: argumentHistory(combineUpdatesWatchFn),
  }).toEqual({
    watch: [
      {a: -1, b: -1},
      {a: 0, b: 0},
      {a: 1, b: 1},
    ],
    updates: [
      {a: 0, b: 0},
      {a: 1, b: 1},
    ],
  })
  /** combined with fn */
  expect({
    watch: argumentHistory(combineFnWatchFn),
    updates: argumentHistory(combineFnUpdatesWatchFn),
  }).toEqual({
    watch: [
      {a: -1, b: -1},
      {a: 0, b: 0},
      {a: 1, b: 1},
    ],
    updates: [
      {a: 0, b: 0},
      {a: 1, b: 1},
    ],
  })
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
        values: [[$n, 1]],
      })
      fn(`## second hydration, $n = 1`)
      hydrate(app, {
        values: [[$n, 1]],
      })
      fn(`## setN(2)`)
      setN(2)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$n: 0",
          "combined: {n:0}",
          "combfn: 0",
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
        values: [[$n, -2]],
      })
      fn(`## first hydration, $n = 1`)
      hydrate(scope, {
        values: [[$n, 1]],
      })
      fn(`## second hydration, $n = 1`)
      hydrate(scope, {
        values: [[$n, 1]],
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
        values: [[$n, 1]],
      })
      fn(`## second hydration, $n = -1`)
      hydrate(app, {
        values: [[$n, -1]],
      })
      fn(`## setN(2)`)
      setN(2)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          "$n: 0",
          "combined: {n:0}",
          "combfn: 0",
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
        values: [[$n, -2]],
      })
      fn(`## first hydration, $n = 1`)
      hydrate(scope, {
        values: [[$n, 1]],
      })
      fn(`## second hydration, $n = -1`)
      hydrate(scope, {
        values: [[$n, -1]],
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
    const filteredA$ = combine(listA$, greaterThan$, (xs, gt) =>
      xs.filter(x => x > gt),
    )
    const listB$ = listsContainer$.map(x => x.b)
    const filteredB$ = combine(listB$, greaterThan$, (xs, gt) =>
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

test('scope support', async () => {
  const fn = jest.fn()

  const app = createDomain()
  const name = app.createStore('guest')
  name.updates.watch(fn)

  const scope = fork(app, {values: [[name, 'alice']]})

  hydrate(scope, {values: [[name, 'bob']]})

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "bob",
    ]
  `)
  expect(scope.getState(name)).toMatchInlineSnapshot(`"bob"`)
  expect(name.getState()).toMatchInlineSnapshot(`"guest"`)
})

test('scope without domain should throw an error', () => {
  const scope = fork()
  expect(() => {
    hydrate(scope, {values: []})
  }).toThrowErrorMatchingInlineSnapshot(`"scope should be created from domain"`)
})

test('@effector/next custom hydration works', async () => {
  /**
   * @effector/next library now uses custom implementation of `hydrate` under the hood,
   * which relies on some internals of `Scope` object
   *
   * This implementation is planned to be, one way or another, merged into the core version,
   * but we're not quite there yet, and a bit more research should be done.
   *
   * We're also are not planning on dropping Next.js support, so stability of these internals becomes a concern.
   *
   * So, for now, we're only testing that the custom implementation works as expected.
   *
   * @see https://github.com/effector/next/blob/main/src/get-scope.ts
   */
  function customHydrate(scope: Scope, values: Record<string, unknown>) {
    // @ts-expect-error this is a really hacky way to "hydrate" scope
    Object.assign(scope.values.sidMap, values)
    // @ts-expect-error
    for (const id in scope.reg) {
      // @ts-expect-error
      if (Object.hasOwnProperty.call(scope.reg, id)) {
        // @ts-expect-error
        const ref = scope.reg[id]
        if (!ref.meta || (!ref.meta?.named && ref.meta?.derived)) {
          /**
           * Force recalculation of derived values
           */
          // @ts-expect-error
          delete scope.reg[id]
        } else {
          /**
           * Update non-derived values
           */
          const sid = ref?.meta?.sid
          if (sid && sid in values) {
            const serialize = ref?.meta?.serialize as any
            const read =
              serialize && serialize !== 'ignore' ? serialize?.read : null
            ref.current = read ? read(values[sid] as any) : values[sid]
          }
        }
      }
    }
  }

  const up = createEvent()
  const longUpFx = createEffect(async () => {
    await new Promise(r => setTimeout(r, 10))
  })
  const $count = createStore(0).on([up, longUpFx.done], s => s + 1)
  const $derived = $count.map(s => ({ref: s}))
  const $combined = combine({ref: $count})
  const $nestedCombined = combine({ref: $derived})

  const $sampled = sample({
    source: {ref: $combined},
    fn: ref => ref.ref.ref,
  })

  const getFixedDate = () => new Date(0)
  const updateDate = createEvent<Date>()
  const $specialData = createStore(getFixedDate(), {
    serialize: {
      write: _date => ({lol: 'jsonified view'}),
      read: _json => getFixedDate(),
    },
  }).on($count, () => getFixedDate())

  const serverScope = fork();

  await allSettled(up, { scope: serverScope });
  await allSettled(up, { scope: serverScope });
  await allSettled(up, { scope: serverScope });

  const serverValues = serialize(serverScope);

  const clientScope = fork();

  expect(clientScope.getState($count)).toEqual(0);
  expect(clientScope.getState($derived)).toEqual({ ref: 0 });
  expect(clientScope.getState($combined)).toEqual({ ref: 0 });
  expect(clientScope.getState($nestedCombined)).toEqual({
    ref: { ref: 0 },
  });
  expect(clientScope.getState($sampled)).toEqual(0);
  expect(clientScope.getState(longUpFx.pending)).toEqual(false);
  expect(clientScope.getState(longUpFx.inFlight)).toEqual(0);
  expect(clientScope.getState($specialData)).toEqual(getFixedDate());

  const promise = allSettled(longUpFx, { scope: clientScope });

  expect(clientScope.getState(longUpFx.inFlight)).toEqual(1);

  customHydrate(clientScope, serverValues);

  expect(clientScope.getState($count)).toEqual(3);
  expect(clientScope.getState($derived)).toEqual({ ref: 3 });
  expect(clientScope.getState($combined)).toEqual({ ref: 3 });
  expect(clientScope.getState($nestedCombined)).toEqual({
    ref: { ref: 3 },
  });
  expect(clientScope.getState($sampled)).toEqual(3);
  expect(clientScope.getState(longUpFx.pending)).toEqual(true);
  expect(clientScope.getState(longUpFx.inFlight)).toEqual(1);
  expect(clientScope.getState($specialData)).toEqual(getFixedDate());

  await promise;

  expect(clientScope.getState($count)).toEqual(4);
  expect(clientScope.getState($derived)).toEqual({ ref: 4 });
  expect(clientScope.getState($combined)).toEqual({ ref: 4 });
  expect(clientScope.getState($nestedCombined)).toEqual({
    ref: { ref: 4 },
  });
  expect(clientScope.getState($sampled)).toEqual(4);
  expect(clientScope.getState(longUpFx.pending)).toEqual(false);
  expect(clientScope.getState(longUpFx.inFlight)).toEqual(0);
  expect(clientScope.getState($specialData)).toEqual(getFixedDate());
})
