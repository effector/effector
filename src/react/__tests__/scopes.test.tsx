import React from 'react'
//@ts-ignore
import {render, container, act} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'
import {
  createDomain,
  createEvent,
  createStore,
  createEffect,
  forward,
  sample,
  attach,
  combine,
  fork,
  allSettled,
  serialize,
  hydrate,
  Scope,
} from 'effector'
import {
  Provider,
  useStore,
  useList,
  useGate,
  useEvent,
  useStoreMap,
  createGate,
} from 'effector-react/scope'

async function request(url: string) {
  const users: Record<string, {name: string; friends: string[]}> = {
    alice: {
      name: 'alice',
      friends: ['bob', 'carol'],
    },
    bob: {
      name: 'bob',
      friends: ['alice'],
    },
    carol: {
      name: 'carol',
      friends: ['alice'],
    },
    charlie: {
      name: 'charlie',
      friends: [],
    },
  }
  const user = url.replace('https://ssr.effector.dev/api/', '')
  const result = users[user]
  await new Promise(rs => setTimeout(rs, 30))
  return result
}

it('works', async () => {
  const indirectCallFn = jest.fn()

  const start = createEvent<string>()
  const indirectCall = createEvent()
  const sendStats = createEffect(async (user: any) => {
    await new Promise(resolve => {
      // let bob loading longer
      setTimeout(resolve, user === 'bob' ? 500 : 100)
    })
  })

  const fetchUser = createEffect(async (user: any) => {
    return request('https://ssr.effector.dev/api/' + user)
  })
  //assume that calling start() will trigger some effects
  forward({
    from: start,
    to: fetchUser,
  })

  const user = createStore('guest')
  const friends = createStore<string[]>([])
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

  const aliceScope = fork()
  const bobScope = fork()
  const carolScope = fork()
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
      "-k8j0rc": Array [
        "bob",
        "carol",
      ],
      "cs3r4y": "alice",
    }
  `)
  expect(serialize(bobScope)).toMatchInlineSnapshot(`
    Object {
      "-k8j0rc": Array [
        "alice",
      ],
      "cs3r4y": "bob",
    }
  `)
  expect(indirectCallFn).toBeCalled()
})

test('attach support', async () => {
  const indirectCallFn = jest.fn()

  const start = createEvent<string>()
  const indirectCall = createEvent()
  const sendStats = createEffect(async (user: string) => {
    await new Promise(resolve => {
      // let bob loading longer
      setTimeout(resolve, user === 'bob' ? 500 : 100)
    })
  })

  const baseUrl = createStore('https://ssr.effector.dev/api')

  const fetchJson = createEffect<string, any>(async url => await request(url))

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

  const user = createStore('guest')
  const friends = createStore([])
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

  const aliceScope = fork()
  const bobScope = fork()
  const carolScope = fork()
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
      "-rjikx0": "alice",
      "67hxq": Array [
        "bob",
        "carol",
      ],
    }
  `)
  expect(serialize(bobScope)).toMatchInlineSnapshot(`
    Object {
      "-rjikx0": "bob",
      "67hxq": Array [
        "alice",
      ],
    }
  `)
  expect(indirectCallFn).toBeCalled()
})

test('computed values support', async () => {
  const app = createDomain()

  const fetchUser = app.createEffect<string, {name: string; friends: string[]}>(
    async user => await request(`https://ssr.effector.dev/api/${user}`),
  )
  const start = app.createEvent<string>()
  forward({from: start, to: fetchUser})
  const name = app
    .createStore('guest')
    .on(fetchUser.done, (_, {result}) => result.name)

  const friends = app
    .createStore<string[]>([])
    .on(fetchUser.done, (_, {result}) => result.friends)
  const friendsTotal = friends.map(list => list.length)

  const Total = () => <small>Total:{useStore(friendsTotal)}</small>
  const User = () => <b>User:{useStore(name)}</b>
  const App = ({root}: {root: Scope}) => (
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

test('useGate support', async () => {
  const getMessagesFx = createEffect<{chatId: string}, string[]>(
    async ({chatId}) => {
      return ['hi bob!', 'Hello, Alice']
    },
  )

  const messagesAmount = createStore(0).on(
    getMessagesFx.doneData,
    (_, messages) => messages.length,
  )

  const activeChatGate = createGate<{chatId: string}>({})

  forward({from: activeChatGate.open, to: getMessagesFx})

  const ChatPage = ({chatId}: {chatId: string}) => {
    useGate(activeChatGate, {chatId})
    return (
      <div>
        <header>Chat:{chatId}</header>
        <p>Messages total:{useStore(messagesAmount)}</p>
      </div>
    )
  }
  const App = ({root}: {root: Scope}) => (
    <Provider value={root}>
      <ChatPage chatId="chat01" />
    </Provider>
  )

  const serverScope = fork()
  await render(<App root={serverScope} />)

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <header>
        Chat:
        chat01
      </header>
      <p>
        Messages total:
        2
      </p>
    </div>
  `)

  const clientScope = fork({
    values: serialize(serverScope),
  })

  await render(<App root={clientScope} />)

  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <header>
        Chat:
        chat01
      </header>
      <p>
        Messages total:
        2
      </p>
    </div>
  `)
})

test('allSettled effect calls', async () => {
  const fn = jest.fn()

  const fetchUser = createEffect<string, {name: string; friends: string[]}>(
    async user => await request(`https://ssr.effector.dev/api/${user}`),
  )

  const serverScope = fork()

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
describe('useEvent', () => {
  test('useEvent and effect calls', async () => {
    const inc = createEvent()
    const count = createStore(0).on(inc, x => x + 1)
    const fx = createEffect(async () => {
      inc()
    })
    const scope = fork()
    const App = () => {
      const fxe = useEvent(fx)
      const x = useStore(count)
      return (
        <div>
          <button id="btn" onClick={() => fxe()}>
            clicked-{x}-times
          </button>
        </div>
      )
    }
    await render(
      <Provider value={scope}>
        <App />
      </Provider>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          clicked-
          0
          -times
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          clicked-
          1
          -times
        </button>
      </div>
    `)
    expect(count.getState()).toBe(0)
    expect(scope.getState(count)).toBe(1)
  })
  test('useEvent function return value', async () => {
    const fn = jest.fn()
    const fx = createEffect(() => 'ok')
    const scope = fork()
    const App = () => {
      const fxe = useEvent(fx)
      return (
        <div>
          <button id="btn" onClick={() => fxe().then(fn)}>
            click
          </button>
        </div>
      )
    }
    await render(
      <Provider value={scope}>
        <App />
      </Provider>,
    )
    await act(async () => {
      container.firstChild.querySelector('#btn').click()
    })
    expect(argumentHistory(fn)).toEqual(['ok'])
  })

  test('object in useEvent', async () => {
    const inc = createEvent()
    const dec = createEvent()
    const fx = createEffect(async () => 100)
    const count = createStore(0)
      .on(inc, x => x + 1)
      .on(dec, x => x - 1)
      .on(fx.doneData, (x, v) => x + v)
    const scope = fork()
    const App = () => {
      const hndl = useEvent({fx, inc, dec})
      const x = useStore(count)
      return (
        <div>
          <span id="value">current value:{x}</span>
          <button id="fx" onClick={() => hndl.fx()}>
            fx
          </button>
          <button id="inc" onClick={() => hndl.inc()}>
            inc
          </button>
          <button id="dec" onClick={() => hndl.dec()}>
            dec
          </button>
        </div>
      )
    }
    await render(
      <Provider value={scope}>
        <App />
      </Provider>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <span
          id="value"
        >
          current value:
          0
        </span>
        <button
          id="fx"
        >
          fx
        </button>
        <button
          id="inc"
        >
          inc
        </button>
        <button
          id="dec"
        >
          dec
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#fx').click()
      container.firstChild.querySelector('#inc').click()
      container.firstChild.querySelector('#inc').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <span
          id="value"
        >
          current value:
          102
        </span>
        <button
          id="fx"
        >
          fx
        </button>
        <button
          id="inc"
        >
          inc
        </button>
        <button
          id="dec"
        >
          dec
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#dec').click()
    })
    expect(count.getState()).toBe(0)
    expect(scope.getState(count)).toBe(101)
  })

  test('array in useEvent', async () => {
    const inc = createEvent()
    const dec = createEvent()
    const fx = createEffect(async () => 100)
    const count = createStore(0)
      .on(inc, x => x + 1)
      .on(dec, x => x - 1)
      .on(fx.doneData, (x, v) => x + v)
    const scope = fork()
    const App = () => {
      const [a, b, c] = useEvent([fx, inc, dec])
      const x = useStore(count)
      return (
        <div>
          <span id="value">current value:{x}</span>
          <button id="fx" onClick={() => a()}>
            fx
          </button>
          <button id="inc" onClick={() => b()}>
            inc
          </button>
          <button id="dec" onClick={() => c()}>
            dec
          </button>
        </div>
      )
    }
    await render(
      <Provider value={scope}>
        <App />
      </Provider>,
    )
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <span
          id="value"
        >
          current value:
          0
        </span>
        <button
          id="fx"
        >
          fx
        </button>
        <button
          id="inc"
        >
          inc
        </button>
        <button
          id="dec"
        >
          dec
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#fx').click()
      container.firstChild.querySelector('#inc').click()
      container.firstChild.querySelector('#inc').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <span
          id="value"
        >
          current value:
          102
        </span>
        <button
          id="fx"
        >
          fx
        </button>
        <button
          id="inc"
        >
          inc
        </button>
        <button
          id="dec"
        >
          dec
        </button>
      </div>
    `)
    await act(async () => {
      container.firstChild.querySelector('#dec').click()
    })
    expect(count.getState()).toBe(0)
    expect(scope.getState(count)).toBe(101)
  })
})
describe('useStoreMap', () => {
  it('should render', async () => {
    const userRemove = createEvent<string>()
    const userAgeChange = createEvent<{nickname: string; age: number}>()
    const $users = createStore<Record<string, {age: number; name: string}>>({
      alex: {age: 20, name: 'Alex'},
      john: {age: 30, name: 'John'},
    })
    const $userNames = createStore(['alex', 'john'])

    $userNames.on(userRemove, (list, username) =>
      list.filter(item => item !== username),
    )
    $users
      .on(userRemove, (users, nickname) => {
        const upd = {...users}
        delete upd[nickname]
        return upd
      })
      .on(userAgeChange, (users, {nickname, age}) => ({
        ...users,
        [nickname]: {...users[nickname], age},
      }))

    const Card = ({nickname}: {nickname: string}) => {
      const {name, age} = useStoreMap({
        store: $users,
        keys: [nickname],
        fn: (users, [nickname]) => users[nickname],
      })
      return (
        <li>
          {name}: {age}
        </li>
      )
    }

    const Cards = () => (
      <ul>
        {useList($userNames, name => (
          <Card nickname={name} key={name} />
        ))}
      </ul>
    )

    const App = ({root}: {root: Scope}) => (
      <Provider value={root}>
        <Cards />
      </Provider>
    )

    const scope = fork()

    await render(<App root={scope} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <ul>
        <li>
          Alex
          : 
          20
        </li>
        <li>
          John
          : 
          30
        </li>
      </ul>
    `)
    await act(async () => {
      await allSettled(userAgeChange, {
        scope,
        params: {nickname: 'alex', age: 21},
      })
    })

    expect(container.firstChild).toMatchInlineSnapshot(`
      <ul>
        <li>
          Alex
          : 
          21
        </li>
        <li>
          John
          : 
          30
        </li>
      </ul>
    `)
    await act(async () => {
      await allSettled(userRemove, {scope, params: 'alex'})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <ul>
        <li>
          John
          : 
          30
        </li>
      </ul>
    `)
  })
  it('should support domains', async () => {
    const app = createDomain()
    const toggle = app.createEvent()
    const inc = app.createEvent()
    const $show = app
      .createStore('A')
      .on(toggle, current => (current === 'A' ? 'B' : 'A'))
    const $a = app.createStore(10).on(inc, x => x + 1)
    const $b = app.createStore(20).on(inc, x => x + 1)
    const View = () => {
      const current = useStore($show)
      const selectedStore = current === 'A' ? $a : $b
      const value = useStoreMap({
        store: selectedStore,
        keys: [selectedStore],
        fn: x => x,
      })
      return <div>{value}</div>
    }
    const App = ({root}: {root: Scope}) => (
      <Provider value={root}>
        <View />
      </Provider>
    )

    const scope = fork(app)
    await render(<App root={scope} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        10
      </div>
    `)
    await act(async () => {
      await allSettled(inc, {scope})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        11
      </div>
    `)
    await act(async () => {
      await allSettled(toggle, {scope})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        21
      </div>
    `)
    await act(async () => {
      await allSettled(inc, {scope})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        22
      </div>
    `)
    await act(async () => {
      await allSettled(toggle, {scope})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        12
      </div>
    `)
  })
  test('updateFilter support', async () => {
    const setValue = createEvent<number>()
    const $store = createStore(0).on(setValue, (_, x) => x)

    const View = () => {
      const x = useStoreMap({
        store: $store,
        keys: [],
        fn: x => x,
        updateFilter: (update: number, current: number) => update % 2 === 0,
      })
      return <div>{x}</div>
    }
    const App = ({root}: {root: Scope}) => (
      <Provider value={root}>
        <View />
      </Provider>
    )
    const scope = fork()

    await render(<App root={scope} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        0
      </div>
    `)
    await act(async () => {
      await allSettled(setValue, {scope, params: 2})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)
    await act(async () => {
      await allSettled(setValue, {scope, params: 3})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)
  })
})

describe('behavior on scope changes', () => {
  test('useStore should not stale', async () => {
    const inc = createEvent()
    const $store = createStore(0).on(inc, x => x + 1)
    const Count = () => <p>{useStore($store)}</p>
    const Inc = () => {
      const boundInc = useEvent(inc)
      return (
        <button id="click" onClick={() => boundInc()}>
          click
        </button>
      )
    }
    const App = ({scope}: {scope: Scope}) => (
      <Provider value={scope}>
        <div>
          <Count />
          <Inc />
        </div>
      </Provider>
    )
    const firstScope = fork()
    const secondScope = fork({values: [[$store, 2]]})

    await render(<App scope={firstScope} />)
    await render(<App scope={secondScope} />)

    await act(async () => {
      container.firstChild.querySelector('#click').click()
    })

    expect(secondScope.getState($store)).toBe(3)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <p>
          3
        </p>
        <button
          id="click"
        >
          click
        </button>
      </div>
    `)
  })
  test('useStoreMap should not stale', async () => {
    const inc = createEvent()
    const $store = createStore(0).on(inc, x => x + 1)
    const Count = () => {
      const value = useStoreMap($store, n => n)
      return <p>{value}</p>
    }
    const Inc = () => {
      const boundInc = useEvent(inc)
      return (
        <button id="click" onClick={() => boundInc()}>
          click
        </button>
      )
    }
    const App = ({scope}: {scope: Scope}) => (
      <Provider value={scope}>
        <div>
          <Count />
          <Inc />
        </div>
      </Provider>
    )
    const firstScope = fork()
    const secondScope = fork({values: [[$store, 2]]})

    await render(<App scope={firstScope} />)
    await render(<App scope={secondScope} />)

    await act(async () => {
      container.firstChild.querySelector('#click').click()
    })

    expect(secondScope.getState($store)).toBe(3)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <p>
          3
        </p>
        <button
          id="click"
        >
          click
        </button>
      </div>
    `)
  })
  test('useList should not stale', async () => {
    const inc = createEvent()
    const $store = createStore([0]).on(inc, ([x]) => [x + 1])
    const Count = () => useList($store, value => <p>{value}</p>)
    const Inc = () => {
      const boundInc = useEvent(inc)
      return (
        <button id="click" onClick={() => boundInc()}>
          click
        </button>
      )
    }
    const App = ({scope}: {scope: Scope}) => (
      <Provider value={scope}>
        <div>
          <Count />
          <Inc />
        </div>
      </Provider>
    )
    const firstScope = fork()
    const secondScope = fork({values: [[$store, [2]]]})

    await render(<App scope={firstScope} />)
    await render(<App scope={secondScope} />)

    await act(async () => {
      container.firstChild.querySelector('#click').click()
    })

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <p>
          3
        </p>
        <button
          id="click"
        >
          click
        </button>
      </div>
    `)
  })
})
