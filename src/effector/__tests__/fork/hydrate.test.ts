import {argumentHistory} from 'effector/fixtures'
import {
  createDomain,
  forward,
  combine,
  fork,
  allSettled,
  serialize,
  hydrate,
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
