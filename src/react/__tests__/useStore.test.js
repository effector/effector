//@flow

import * as React from 'react'
//$todo
import {render, cleanup, act} from 'react-testing-library'
import {createStore, createEvent, createEffect} from 'effector'
import {useStore, useStoreMap} from '../useStore'
import {argumentHistory} from 'effector/fixtures'

afterEach(cleanup)

describe('useStore', () => {
  it('should render', () => {
    const store = createStore('foo')
    const changeText = createEvent('change text')
    store.on(changeText, (_, e) => e)

    const Display = props => {
      const state = useStore(store)
      return <span>Store text: {state}</span>
    }

    const {container} = render(<Display />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Store text: 
        foo
      </span>
    `)
    act(() => {
      changeText('bar')
    })
    // flushEffects()
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Store text: 
        bar
      </span>
    `)
  })

  it('should throw', () => {
    const ErrorDisplay = props => {
      //$off
      const state = useStore(undefined)
      return <span>Store text: {state}</span>
    }

    expect(() => {
      render(<ErrorDisplay />)
    }).toThrowErrorMatchingInlineSnapshot(
      `"expect useStore argument to be a store"`,
    )
  })

  it('should retrigger only once after store change', () => {
    const fn = jest.fn()
    const storeA = createStore('A')
    const storeB = createStore('B')
    const changeCurrentStore = createEvent()
    const currentStore = createStore(storeA).on(
      changeCurrentStore,
      (_, store) => store,
    )

    const Target = ({store}) => {
      const state = useStore(store)
      fn(state)
      return <span>Store text: {state}</span>
    }

    const Display = () => {
      const store = useStore(currentStore)
      return <Target store={store} />
    }

    render(<Display />)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "A",
      ]
    `)
    act(() => {
      changeCurrentStore(storeB)
    })
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "A",
        "B",
      ]
    `)
  })
  it('should subscribe before any react hook will change store', async() => {
    const fn = jest.fn()
    const fx = createEffect({
      handler: () => new Promise(rs => setTimeout(rs, 200)),
    })
    const Inner = () => {
      React.useLayoutEffect(() => {
        fx()
      }, [])

      return null
    }
    const App = () => {
      const pending = useStore(fx.pending)
      fn(pending)
      return (
        <>
          {String(pending).toUpperCase()}
          <Inner />
        </>
      )
    }
    render(<App />)
    await new Promise(rs => setTimeout(rs, 500))
    expect(argumentHistory(fn)).toEqual([false, true, false])
  })
})

test('useStoreMap', () => {
  const removeUser = createEvent()
  const changeUserAge = createEvent()
  const users = createStore({
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

  const Card = ({nickname}) => {
    const {name, age} = useStoreMap({
      store: users,
      keys: [nickname],
      fn: (users, [nickname]) => users[nickname],
    })
    return (
      <li>
        {name}: {age}
      </li>
    )
  }

  const Cards = () => {
    const userList = useStore(userNames)
    return (
      <ul>
        {userList.map(name => (
          <Card nickname={name} key={name} />
        ))}
      </ul>
    )
  }
  const {container} = render(<Cards />)
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
  act(() => {
    changeUserAge({nickname: 'alex', age: 21})
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
  act(() => {
    removeUser('alex')
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
