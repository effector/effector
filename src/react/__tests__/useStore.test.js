//@flow

import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'
import {createStore, createEvent, createEffect, createDomain} from 'effector'
import {useStore, useStoreMap} from '../useStore'
import {argumentHistory} from 'effector/fixtures'

describe('useStore', () => {
  it('should render', async () => {
    const store = createStore('foo')
    const changeText = createEvent('change text')
    store.on(changeText, (_, e) => e)

    const Display = props => {
      const state = useStore(store)
      return <span>Store text: {state}</span>
    }

    await render(<Display />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Store text: 
        foo
      </span>
    `)
    await act(async () => {
      changeText('bar')
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        Store text: 
        bar
      </span>
    `)
  })

  it('should throw', async () => {
    const fn = jest.fn()
    const ErrorDisplay = props => {
      try {
        //$off
        useStore(undefined)
      } catch (error) {
        fn(error.message)
      }
      return <span>Store text</span>
    }

    await render(<ErrorDisplay />)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "expect useStore argument to be a store",
      ]
    `)
  })

  it('should retrigger only once after store change', async () => {
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

    await render(<Display />)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "A",
      ]
    `)
    await act(async () => {
      changeCurrentStore(storeB)
    })
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "A",
        "B",
      ]
    `)
  })
  it('should subscribe before any react hook will change store', async () => {
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

    await act(async () => {
      await render(<App />)
      await new Promise(rs => setTimeout(rs, 500))
    })
    expect(argumentHistory(fn)).toEqual([false, true, false])
  })
  it('should support domains', async () => {
    const domain = createDomain()
    const toggle = domain.event()
    const inc = domain.event()
    const show = domain
      .store('A')
      .on(toggle, current => (current === 'A' ? 'B' : 'A'))
    const a = domain.store(10).on(inc, x => x + 1)
    const b = domain.store(20).on(inc, x => x + 1)
    const View = () => {
      const current = useStore(show)
      const selectedStore = current === 'A' ? a : b
      const value = useStore(selectedStore)
      return <div>{value}</div>
    }
    await render(<View />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        10
      </div>
    `)
    await act(async () => {
      inc()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        11
      </div>
    `)
    await act(async () => {
      toggle()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        21
      </div>
    `)
    await act(async () => {
      inc()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        22
      </div>
    `)
    await act(async () => {
      toggle()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        12
      </div>
    `)
  })
})

test('useStoreMap', async () => {
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
  await render(<Cards />)
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
  await act(async () => {
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
