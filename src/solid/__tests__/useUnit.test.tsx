import {render} from 'solid-testing-library'
import {
  createStore,
  createEvent,
  createDomain,
  Store,
  restore,
} from 'effector'
import {useUnit, useStoreMap} from 'effector-solid'
import {createEffect as createSolidEffect, createMemo, createSignal, For} from 'solid-js'
import {argumentHistory} from 'effector/fixtures'

describe('useUnit', () => {
  it('should render', async () => {
    const store = createStore('foo')
    const changeText = createEvent<string>()
    store.on(changeText, (_, e) => e)

    const Display = () => {
      const state = useUnit(store)
      return <span>Store text: {state}</span>
    }

    const { container } = await render(Display)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Store text: 
        foo
      </span>
    `)
    changeText('bar')
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Store text: 
        bar
      </span>
    `)
  })
  it('should throw', async () => {
    const fn = jest.fn()
    const ErrorDisplay = () => {
      try {
        //@ts-expect-error
        useUnit(undefined)
      } catch (error) {
        fn(error.message)
      }
      return <span>Store text</span>
    }

    await render(ErrorDisplay)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "expected useUnit argument to be a unit",
      ]
    `)
  })
  it('should work as intended when store contains function', async () => {
    const fn = jest.fn()
    const changeStore = createEvent<Record<string, string>>()
    const $store = createStore<(e: string) => string>(() => 'initial').on(
      changeStore,
      (_, data) => p => data[p] || 'initial',
    )

    const Display = () => {
      const store = useUnit($store)
      createSolidEffect(() => fn(store()('key')))
      return <>{store()('key')}</>
    }

    const { container } = await render(Display)

    expect(container.firstChild).toMatchInlineSnapshot(`initial`)
    changeStore({key: 'value'})
    expect(container.firstChild).toMatchInlineSnapshot(`value`)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "initial",
        "value",
      ]
    `)
  })
  it('should support domains', async () => {
    const domain = createDomain()
    const toggle = domain.createEvent()
    const inc = domain.createEvent()
    const show = domain
      .createStore('A')
      .on(toggle, current => (current === 'A' ? 'B' : 'A'))
    const a = domain.createStore(10).on(inc, x => x + 1)
    const b = domain.createStore(20).on(inc, x => x + 1)
    const View = () => {
      const current = useUnit(show)
      const selectedStore = createMemo(() => current() === 'A' ? a : b)
      const value = createMemo(() => useUnit(selectedStore()))
      return <div>{value}</div>
    }
    const { container } = await render(View)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        10
      </div>
    `)
    inc()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        11
      </div>
    `)
    toggle()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        21
      </div>
    `)
    inc()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        22
      </div>
    `)
    toggle()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        12
      </div>
    `)
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
          <For each={userList()}>
            {(name) => (
              <Card nickname={name} />
            )}
          </For>
        </ul>
      )
    }
    const { container } = await render(Cards)
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

    changeUserAge({nickname: 'alex', age: 21})

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
    removeUser('alex')
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
    const { container } = await render(App)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        0
      </div>
    `)
    update(2)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)
    update(3)
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
    const App = () => <View />
    const { container } = await render(App)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        equal
      </div>
    `)
    update(2)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        equal
      </div>
    `)
    update(3)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        equal
      </div>
    `)
  })
})
