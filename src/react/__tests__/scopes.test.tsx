import fetch from 'cross-fetch'
import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'
import {createDomain, forward, sample, attach, combine} from 'effector'

import {fork, allSettled, serialize, hydrate, Scope} from 'effector/fork'
import {Provider, useStore, useList} from 'effector-react/ssr'

it('works', async () => {
  const indirectCallFn = jest.fn()

  const app = createDomain()
  const start = app.createEvent<string>()
  const indirectCall = app.createEvent()
  const sendStats = app.createEffect({
    async handler(user) {
      await new Promise(resolve => {
        // let bob loading longer
        setTimeout(resolve, user === 'bob' ? 500 : 100)
      })
    },
  })

  const fetchUser = app.createEffect({
    async handler(user) {
      return (
        await fetch('https://ssr.effector.dev/api/' + user, {
          method: 'POST',
        })
      ).json()
    },
  })
  //assume that calling start() will trigger some effects
  forward({
    from: start,
    to: fetchUser,
  })

  const user = app.createStore('guest')
  const friends = app.createStore<string[]>([])
  const friendsTotal = friends.map(list => list.length)

  user.on(fetchUser.doneData, (_, result) => result.name)
  friends.on(fetchUser.doneData, (_, result) => result.friends)

  sample({
    source: user,
    clock: fetchUser.done,
    target: sendStats,
  })
  sample({
    source: user,
    clock: indirectCall,
  }).watch(indirectCallFn)

  sendStats.done.watch(() => {
    indirectCall()
  })

  const aliceScope = fork(app)
  const bobScope = fork(app)
  const carolScope = fork(app)
  await Promise.all([
    allSettled(start, {
      scope: aliceScope,
      params: 'alice',
    }),
    allSettled(start, {
      scope: bobScope,
      params: 'bob',
    }),
    allSettled(start, {
      scope: carolScope,
      params: 'carol',
    }),
  ])
  const User = () => <h2>{useStore(user)}</h2>
  const Friends = () => useList(friends, friend => <li>{friend}</li>)
  const Total = () => <small>Total: {useStore(friendsTotal)}</small>

  const App = ({root}: {root: Scope}) => (
    <Provider value={root}>
      <User />
      <b>Friends:</b>
      <ol>
        <Friends />
      </ol>
      <Total />
    </Provider>
  )

  await render(<App root={bobScope} />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h2>
      bob
    </h2>
  `)

  expect(serialize(aliceScope)).toMatchInlineSnapshot(`
    Object {
      "-y3ctwb": "alice",
      "3x4g6j": Array [
        "bob",
        "carol",
      ],
    }
  `)
  expect(serialize(bobScope)).toMatchInlineSnapshot(`
    Object {
      "-y3ctwb": "bob",
      "3x4g6j": Array [
        "alice",
      ],
    }
  `)
  expect(indirectCallFn).toBeCalled()
})

test('attach support', async () => {
  const indirectCallFn = jest.fn()

  const app = createDomain()
  const start = app.createEvent()
  const indirectCall = app.createEvent()
  const sendStats = app.createEffect({
    async handler(user) {
      await new Promise(resolve => {
        // let bob loading longer
        setTimeout(resolve, user === 'bob' ? 500 : 100)
      })
    },
  })

  const baseUrl = app.createStore('https://ssr.effector.dev/api')

  const fetchJson = app.createEffect({
    async handler(url) {
      return (
        await fetch(url, {
          method: 'POST',
        })
      ).json()
    },
  })

  const fetchUser = attach({
    source: {baseUrl},
    effect: fetchJson,
    mapParams: (user, {baseUrl}) => `${baseUrl}/${user}`,
  })

  //assume that calling start() will trigger some effects
  forward({
    from: start,
    to: fetchUser,
  })

  const user = app.createStore('guest')
  const friends = app.createStore([])
  const friendsTotal = friends.map(list => list.length)

  user.on(fetchUser.doneData, (_, result) => result.name)
  friends.on(fetchUser.doneData, (_, result) => result.friends)

  sample({
    source: user,
    clock: fetchUser.done,
    target: sendStats,
  })
  sample({
    source: user,
    clock: indirectCall,
  }).watch(indirectCallFn)

  sendStats.done.watch(() => {
    indirectCall()
  })

  const aliceScope = fork(app)
  const bobScope = fork(app)
  const carolScope = fork(app)
  await Promise.all([
    allSettled(start, {
      scope: aliceScope,
      params: 'alice',
    }),
    allSettled(start, {
      scope: bobScope,
      params: 'bob',
    }),
    allSettled(start, {
      scope: carolScope,
      params: 'carol',
    }),
  ])
  const User = () => <h2>{useStore(user)}</h2>
  const Friends = () => useList(friends, friend => <li>{friend}</li>)
  const Total = () => <small>Total: {useStore(friendsTotal)}</small>

  const App = ({root}) => (
    <Provider value={root}>
      <User />
      <b>Friends:</b>
      <ol>
        <Friends />
      </ol>
      <Total />
    </Provider>
  )

  await render(<App root={bobScope} />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h2>
      bob
    </h2>
  `)
  expect(serialize(aliceScope)).toMatchInlineSnapshot(`
    Object {
      "-ggkn4w": "https://ssr.effector.dev/api",
      "-vjt6hb": Array [
        "bob",
        "carol",
      ],
      "1tmqd0": "alice",
    }
  `)
  expect(serialize(bobScope)).toMatchInlineSnapshot(`
    Object {
      "-ggkn4w": "https://ssr.effector.dev/api",
      "-vjt6hb": Array [
        "alice",
      ],
      "1tmqd0": "bob",
    }
  `)
  expect(indirectCallFn).toBeCalled()
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
      [store.sid as string]: 0,
    },
  })

  await allSettled(start, {
    scope: fork(app),
    params: null,
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

test('hydrate edge case', async () => {
  const app = createDomain()

  const listsContainer$ = app.createStore({
    a: [],
    b: [],
  })

  const greaterThan$ = app.createStore(2)

  const listA$ = listsContainer$.map(x => x.a)
  const filteredA$ = {combine}.combine(listA$, greaterThan$, (xs, gt) => {
    return xs.filter(x => x > gt)
  })
  const listB$ = listsContainer$.map(x => x.b)
  const filteredB$ = {combine}.combine(listB$, greaterThan$, (xs, gt) => {
    return xs.filter(x => x > gt)
  })

  hydrate(app, {
    values: {
      ...serialize(fork(app)),
      [listsContainer$.sid as any]: {
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

test('computed values support', async () => {
  const app = createDomain()

  const fetchUser = app.createEffect<string, {name: string; friends: string[]}>(
    {
      async handler(user) {
        const req = await fetch(`https://ssr.effector.dev/api/${user}`, {
          method: 'POST',
        })
        return req.json()
      },
    },
  )
  const start = app.createEvent()
  forward({from: start, to: fetchUser})
  const name = app
    .createStore('guest')
    .on(fetchUser.done, (_, {result}) => result.name)

  const friends = app
    .createStore<string[]>([])
    .on(fetchUser.done, (_, {result}) => result.friends)
  const friendsTotal = friends.map(list => list.length)

  const Total = () => <small>Total: {useStore(friendsTotal)}</small>
  const User = () => <b>User: {useStore(name)}</b>
  const App = ({root}) => (
    <Provider value={root}>
      <section>
        <User />
        <Total />
      </section>
    </Provider>
  )

  const serverScope = fork(app)
  await allSettled(start, {
    scope: serverScope,
    params: 'alice',
  })
  const serialized = serialize(serverScope)

  hydrate(app, {
    values: serialized,
  })

  const clientScope = fork(app)

  await render(<App root={clientScope} />)

  expect(container.firstChild).toMatchInlineSnapshot(`
    <section>
      <b>
        User: 
        alice
      </b>
      <small>
        Total: 
        2
      </small>
    </section>
  `)
})

test('allSettled effect calls', async () => {
  const fn = jest.fn()
  const app = createDomain()

  const fetchUser = app.createEffect<string, {name: string; friends: string[]}>(
    {
      async handler(user) {
        const req = await fetch(`https://ssr.effector.dev/api/${user}`, {
          method: 'POST',
        })
        return req.json()
      },
    },
  )

  const serverScope = fork(app)

  await allSettled(fetchUser, {
    scope: serverScope,
    params: 'alice',
  })
    .then(fn)
    .catch(err => {
      console.error(err)
    })
  expect(fn).toBeCalled()
})
