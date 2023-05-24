import {render} from 'solid-testing-library'
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
  useUnit,
  useGate,
  useStoreMap,
  createGate,
} from 'effector-solid/scope'
import {createSignal} from "solid-js";

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

  const Total = () => <small>Total:{useUnit(friendsTotal)()}</small>
  const User = () => <b>User:{useUnit(name)()}</b>
  const App = (props: {root: Scope}) => (
    <Provider value={props.root}>
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

  const { container } = await render(() => <App root={clientScope} />)

  expect(container.firstChild).toMatchInlineSnapshot(`
    <section>
      <b>
        User:
        guest
      </b>
      <small>
        Total:
        0
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

  const [scope, setScope] = createSignal(fork(), { equals: false })
  const { container } = await render(() => <App root={scope()} />)

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

  setScope(() => fork({
    values: serialize(scope()),
  }))

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
    const { container } = await render(() =>
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
  test('useEvent function return value', async () => {
    const fn = jest.fn()
    const fx = createEffect(() => 'ok')
    const scope = fork()
    const App = () => {
      const fxe = useUnit(fx)
      return (
        <div>
          <button id="btn" onClick={() => fxe().then(fn)}>
            click
          </button>
        </div>
      )
    }
    const { container } = await render(() =>
      <Provider value={scope}>
        <App />
      </Provider>,
    )
    container.firstChild.querySelector('#btn').click()
    await Promise.resolve()
    expect(argumentHistory(fn)).toEqual(['ok'])
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
    const { container } = await render(() =>
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
    const { container } = await render(() =>
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
