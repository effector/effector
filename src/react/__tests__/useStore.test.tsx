import * as React from 'react'
import {render, container, act} from 'effector/fixtures/react'
import {createStore, createEvent, createEffect, createDomain} from 'effector'
import {useStore, useStoreMap} from 'effector-react'
import {argumentHistory} from 'effector/fixtures'

describe('useStore', () => {
  it('should render', async () => {
    const store = createStore('foo')
    const changeText = createEvent()
    store.on(changeText, (_, e) => e)

    const Display = () => {
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
    const ErrorDisplay = () => {
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
  it('should always retrigger, when store contains function', async () => {
    const fn = jest.fn()
    const changeStore = createEvent()
    const $store = createStore(() => 0).on(changeStore, (_, p) => p)

    const Display = () => {
      const store = useStore($store)
      fn()
      return null
    }

    await render(<Display />)

    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      changeStore(() => 0)
    })

    // should be 2 if function support is implemented
    expect(fn).toHaveBeenCalledTimes(1)
  })
  it('should subscribe before any react hook will change store', async () => {
    const fn = jest.fn()
    const fx = createEffect({
      handler: () => new Promise(rs => setTimeout(rs, 200)),
    })
    const count = createStore(0).on(fx, x => x + 1)
    const Inner = () => {
      React.useLayoutEffect(() => {
        fx()
      }, [])

      return null
    }
    const App = () => {
      const value = useStore(count)
      fn(value)
      return (
        <p>
          Final value: {value}
          <Inner />
        </p>
      )
    }

    await act(async () => {
      await render(<App />)
      await new Promise(rs => setTimeout(rs, 500))
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <p>
        Final value: 
        1
      </p>
    `)
    expect(argumentHistory(fn)).toEqual([0, 1])
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
  describe('strict mode support', () => {
    test('no strict mode', async () => {
      const fetchItem = createEffect({
        handler: () =>
          new Promise<string>(rs => {
            setTimeout(() => {
              rs('item')
            }, 100)
          }),
      })
      const item = createStore<string | null>(null).on(
        fetchItem.doneData,
        (_, value) => value,
      )
      const setActiveItem = createEvent<string | null>()
      const activeItem = createStore<string | null>(null).on(
        setActiveItem,
        (_, val) => val,
      )

      const App = () => {
        const val = useStore(item)
        React.useEffect(() => {
          setActiveItem(val)
        }, [val])
        React.useEffect(() => {
          fetchItem()
        }, [])
        return (
          <div>
            <p>{useStore(item)}</p>
            <p>{useStore(activeItem)}</p>
          </div>
        )
      }

      await render(<App />)
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          <p />
          <p />
        </div>
      `)
      await act(async () => {
        await new Promise(rs => setTimeout(rs, 100))
      })
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          <p>
            item
          </p>
          <p>
            item
          </p>
        </div>
      `)
    })
    test('strict mode', async () => {
      const fetchItem = createEffect({
        handler: () =>
          new Promise<string>(rs => {
            setTimeout(() => {
              rs('item')
            }, 100)
          }),
      })
      const item = createStore<string | null>(null).on(
        fetchItem.doneData,
        (_, value) => value,
      )
      const setActiveItem = createEvent<string | null>()
      const activeItem = createStore<string | null>(null).on(
        setActiveItem,
        (_, val) => val,
      )

      const App = () => {
        const val = useStore(item)
        React.useEffect(() => {
          setActiveItem(val)
        }, [val])
        React.useEffect(() => {
          fetchItem()
        }, [])
        return (
          <div>
            <p>{useStore(item)}</p>
            <p>{useStore(activeItem)}</p>
          </div>
        )
      }

      await render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          <p />
          <p />
        </div>
      `)
      await act(async () => {
        await new Promise(rs => setTimeout(rs, 100))
      })
      expect(container.firstChild).toMatchInlineSnapshot(`
        <div>
          <p>
            item
          </p>
          <p>
            item
          </p>
        </div>
      `)
    })
  })
})
describe('useStoreMap', () => {
  it('should render', async () => {
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
      const current = useStore(show)
      const selectedStore = current === 'A' ? a : b
      const value = useStoreMap({
        store: selectedStore,
        keys: [selectedStore],
        fn: x => x,
      })
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
