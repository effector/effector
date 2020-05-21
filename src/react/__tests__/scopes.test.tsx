import fetch from 'cross-fetch'
import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'
import {createDomain, forward, sample, attach, combine} from 'effector'

import {fork, allSettled, serialize, hydrate, Scope} from 'effector/fork'
import {Provider, useStore, useList} from 'effector-react/ssr'

it('works', async() => {
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

test('attach support', async() => {
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

test('computed values support', async() => {
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

test('allSettled effect calls', async() => {
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
