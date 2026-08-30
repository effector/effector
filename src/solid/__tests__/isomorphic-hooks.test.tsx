import {render} from 'solid-testing-library'
import {argumentHistory} from 'effector/fixtures'
import {
  createEvent,
  createStore,
  createEffect,
  sample,
  fork,
  allSettled,
  serialize,
  Scope,
} from 'effector'
import {
  Provider,
  useUnit,
  useGate,
  useStoreMap,
  createGate,
} from 'effector-solid'
import {createSignal, createMemo, For} from 'solid-js'

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

  sample({clock: activeChatGate.open, target: getMessagesFx})

  const ChatPage = (props: {chatId: string}) => {
    useGate(activeChatGate, props)
    const messages = useUnit(messagesAmount)
    return (
      <div>
        <header>Chat:{props.chatId}</header>
        <p>Messages total:{messages}</p>
      </div>
    )
  }
  const App = (props: {root: Scope}) => (
    <Provider value={props.root}>
      <ChatPage chatId="chat01" />
    </Provider>
  )

  const [scope, setScope] = createSignal(fork(), {equals: false})
  const {container} = await render(() => <App root={scope()} />)

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

  setScope(() =>
    fork({
      values: serialize(scope()),
    }),
  )

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
describe('useUnit', () => {
  test('useUnit and effect calls', async () => {
    const inc = createEvent()
    const count = createStore(0).on(inc, x => x + 1)
    const fx = createEffect(async () => {
      inc()
    })
    const scope = fork()
    const App = () => {
      const fxe = useUnit(fx)
      const x = useUnit(count)
      return (
        <div>
          <button id="btn" onClick={() => fxe()}>
            clicked-{x}-times
          </button>
        </div>
      )
    }
    const {container} = await render(() => (
      <Provider value={scope}>
        <App />
      </Provider>
    ))
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          clicked-
          0
          <!---->
          -times
        </button>
      </div>
    `)
    container.firstChild.querySelector('#btn').click()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <button
          id="btn"
        >
          clicked-
          1
          <!---->
          -times
        </button>
      </div>
    `)
    expect(count.getState()).toBe(0)
    expect(scope.getState(count)).toBe(1)
  })

  test('object in useUnit', async () => {
    const inc = createEvent()
    const dec = createEvent()
    const fx = createEffect(async () => 100)
    const count = createStore(0)
      .on(inc, x => x + 1)
      .on(dec, x => x - 1)
      .on(fx.doneData, (x, v) => x + v)
    const scope = fork()
    const App = () => {
      const hndl = useUnit({fx, inc, dec})
      const x = useUnit(count)
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
    const {container} = await render(() => (
      <Provider value={scope}>
        <App />
      </Provider>
    ))
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
    container.firstChild.querySelector('#fx').click()
    container.firstChild.querySelector('#inc').click()
    container.firstChild.querySelector('#inc').click()
    await Promise.resolve()
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
    container.firstChild.querySelector('#dec').click()
    await Promise.resolve()
    expect(count.getState()).toBe(0)
    expect(scope.getState(count)).toBe(101)
  })

  test('array in useUnit', async () => {
    const inc = createEvent()
    const dec = createEvent()
    const fx = createEffect(async () => 100)
    const count = createStore(0)
      .on(inc, x => x + 1)
      .on(dec, x => x - 1)
      .on(fx.doneData, (x, v) => x + v)
    const scope = fork()
    const App = () => {
      const [a, b, c] = useUnit([fx, inc, dec])
      const x = useUnit(count)
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
    const {container} = await render(() => (
      <Provider value={scope}>
        <App />
      </Provider>
    ))
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
    container.firstChild.querySelector('#fx').click()
    container.firstChild.querySelector('#inc').click()
    container.firstChild.querySelector('#inc').click()
    await Promise.resolve()
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
    container.firstChild.querySelector('#dec').click()
    await Promise.resolve()
    expect(count.getState()).toBe(0)
    expect(scope.getState(count)).toBe(101)
  })
})

describe('useStoreMap', () => {
  it('should render', async () => {
    const removeUser = createEvent<string>()
    const changeUserAge = createEvent<{nickname: string; age: number}>()
    const users = createStore<Record<string, {age: number; name: string}>>({
      alex: {age: 20, name: 'Alex'},
      john: {age: 30, name: 'John'},
    })
    const userNames = createStore(['alex', 'john']).on(
      removeUser,
      (list, username) => list.filter(item => item !== username),
    )
    users.on(removeUser, (users, nickname) => {
      const upd = {...users}
      delete upd[nickname]
      return upd
    })
    users.on(changeUserAge, (users, {nickname, age}) => ({
      ...users,
      [nickname]: {...users[nickname], age},
    }))

    const Card = ({nickname}: {nickname: string}) => {
      const user = useStoreMap({
        store: users,
        keys: [nickname],
        fn: (users, [nickname]) => users[nickname],
      })
      return (
        <li>
          {user().name}: {user().age}
        </li>
      )
    }

    const Cards = () => {
      const userList = useUnit(userNames)
      return (
        <ul>
          <For each={userList()}>{name => <Card nickname={name} />}</For>
        </ul>
      )
    }
    const scope = fork()
    const {container} = await render(() => (
      <Provider value={scope}>
        <Cards />
      </Provider>
    ))
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

    allSettled(changeUserAge, {
      scope,
      params: {nickname: 'alex', age: 21},
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
    allSettled(removeUser, {scope, params: 'alex'})
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
  test('updateFilter support', async () => {
    const update = createEvent<number>()
    const store = createStore(0).on(update, (_, x) => x)

    const View = () => {
      const x = useStoreMap({
        store,
        keys: [],
        fn: x => x,
        updateFilter: (x: number, y) => x % 2 === 0,
      })
      return <div>{x}</div>
    }
    const App = () => <View />
    const scope = fork()
    const {container} = await render(() => (
      <Provider value={scope}>
        <App />
      </Provider>
    ))
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          0
        </div>
      `)
    allSettled(update, {scope, params: 2})
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          2
        </div>
      `)
    allSettled(update, {scope, params: 3})
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          2
        </div>
      `)
  })
  test('issue #643: should return the same result as useStore, when used with the same mapper', async () => {
    const update = createEvent<number>()
    const store = createStore(0).on(update, (_, x) => x)
    const mapper = (x: number) => x + 1

    const View = () => {
      const baseX = createMemo(() => mapper(useUnit(store)()))
      const x = useStoreMap(store, mapper)
      return <div>{x() === baseX() ? 'equal' : 'not_equal'}</div>
    }
    const scope = fork()
    const App = () => <View />
    const {container} = await render(() => (
      <Provider value={scope}>
        <App />
      </Provider>
    ))
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          equal
        </div>
      `)
    allSettled(update, {scope, params: 2})
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          equal
        </div>
      `)
    allSettled(update, {scope, params: 3})
    expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          equal
        </div>
      `)
  })
})
