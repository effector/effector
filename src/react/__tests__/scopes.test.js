//@flow

import fetch from 'cross-fetch'
import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'
import {
  createDomain,
  createNode,
  forward,
  sample,
  launch,
  step,
  clearNode,
} from 'effector'

import {fork, invoke, serialize} from 'effector/fork'
import {Provider, useStore, useList} from 'effector-react/ssr'

it('works', async() => {
  const indirectCallFn = jest.fn()
  /*
  real remote json documents
  GET https://api.myjson.com/bins/{user}
  */
  const users = {
    alice: '9s0p2',
    bob: 'sw17q',
    carol: 'k38w6',
  }

  const app = createDomain()
  const start = app.event()
  const indirectCall = app.event()
  const sendStats = app.effect({
    async handler(user) {
      await new Promise(resolve => {
        // let bob loading longer
        setTimeout(resolve, user === 'bob' ? 500 : 100)
      })
    },
  })

  const fetchUser = app.effect({
    async handler(bin) {
      return (await fetch('https://api.myjson.com/bins/' + bin)).json()
    },
  })
  //assume that calling start() will trigger some effects
  forward({
    from: start,
    to: fetchUser,
  })

  const user = app.store('guest')
  const friends = app.store([])
  const friendsTotal = friends.map(list => list.length)

  user.on(fetchUser.done, (_, {result}) => result.name)
  friends.on(fetchUser.done, (_, {result}) => result.friends)

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

  const aliceScope = await fork(app, {
    start,
    ctx: users.alice,
  })
  const [bobScope, carolScope] = await Promise.all([
    fork(app, {
      start,
      ctx: users.bob,
    }),
    fork(app, {
      start,
      ctx: users.carol,
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

  clearNode(carolScope)
  await render(<App root={carolScope} />)
  expect(carolScope).toMatchInlineSnapshot(`
    Object {
      "find": [Function],
      "getDomain": [Function],
      "graphite": Object {
        "family": Object {
          "links": Array [],
          "owners": Array [],
          "type": "domain",
        },
        "meta": Object {
          "unit": "domain",
        },
        "next": Array [],
        "reg": Object {},
        "scope": null,
        "seq": Array [],
      },
    }
  `)
  await render(<App root={bobScope} />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <h2>
      bob
    </h2>
  `)

  expect(serialize(aliceScope)).toMatchInlineSnapshot(`
    Object {
      "-akz8z4": "alice",
      "ymx8hu": Array [
        "bob",
      ],
    }
  `)
  expect(serialize(bobScope)).toMatchInlineSnapshot(`
    Object {
      "-akz8z4": "bob",
      "ymx8hu": Array [
        "alice",
      ],
    }
  `)
  expect(indirectCallFn).toBeCalled()
})
