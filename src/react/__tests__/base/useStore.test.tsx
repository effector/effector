import * as React from 'react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'
import {
  createStore,
  createEvent,
  createEffect,
  createDomain,
  Store,
  Event,
  restore,
} from 'effector'
import {useStore, useStoreMap} from 'effector-react'
import {argumentHistory} from 'effector/fixtures'

describe('useStore', () => {
  it('should render', async () => {
    const store = createStore('foo')
    const changeText = createEvent<string>()
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
        //@ts-expect-error
        useStore(undefined)
      } catch (error) {
        fn((error as any).message)
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
    const changeCurrentStore = createEvent<Store<string>>()
    const currentStore = createStore(storeA).on(
      changeCurrentStore,
      (_, store) => store,
    )

    const Target = ({store}: {store: Store<string>}) => {
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
  it('should correct work, when store contains function', async () => {
    const fn = jest.fn()
    const changeStore = createEvent<Record<string, string>>()
    const $store = createStore<(e: string) => string>(() => 'initial').on(
      changeStore,
      (_, data) => p => data[p] || 'initial',
    )

    const Display = () => {
      const store = useStore($store)
      fn(store('key'))
      return <>{store('key')}</>
    }

    await render(<Display />)

    expect(container.firstChild).toMatchInlineSnapshot(`initial`)
    await act(async () => {
      changeStore({key: 'value'})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`value`)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "initial",
        "value",
      ]
    `)
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
  it('should be in sync in case of store change', async () => {
    const toggleS0 = createEvent<unknown>()
    const toggleS1 = createEvent<unknown>()
    const s0 = createStore(false).on(toggleS0, v => !v)
    const s1 = createStore(false).on(toggleS1, v => !v)

    const stores = [s0, s1]
    const events = [toggleS0, toggleS1]
    const toggleMetaStore = createEvent<unknown>()
    const metaStore = createStore([s0, toggleS0, 0 as 0 | 1] as const).on(
      toggleMetaStore,
      v => {
        const nv = v[2] === 0 ? 1 : 0
        return [stores[nv], events[nv], nv] as const
      },
    )

    const Meta = (props: {
      store: Store<boolean>
      toggle: Event<unknown>
      v: 0 | 1
    }) => {
      const v = useStore(props.store)
      return (
        <>
          <span>
            store {props.v} = {JSON.stringify(v)}
          </span>
          <button type="button" onClick={props.toggle} id="toggle">
            toggle value
          </button>
        </>
      )
    }

    const App = () => {
      const [meta, toggle, v] = useStore(metaStore)
      return (
        <>
          <Meta store={meta} toggle={toggle} v={v} />
          <button type="button" onClick={toggleMetaStore} id="meta">
            toggle store
          </button>
        </>
      )
    }
    await render(<App />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        store 
        0
         = 
        false
      </span>
    `)
    await act(async () => {
      container.querySelector('#toggle').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        store 
        0
         = 
        true
      </span>
    `)
    await act(async () => {
      container.querySelector('#meta').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        store 
        1
         = 
        false
      </span>
    `)
    await act(async () => {
      container.querySelector('#toggle').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <span>
        store 
        1
         = 
        true
      </span>
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
    await render(<App />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        0
      </div>
    `)
    await act(async () => {
      update(2)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)
    await act(async () => {
      update(3)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        2
      </div>
    `)
  })
  it('should not hold obsolete fn', async () => {
    const update = createEvent<number>()
    const store = createStore(0).on(update, (_, x) => x)
    let count = 0
    const View = () => {
      const storeValue = useStore(store)
      const n = count
      const x = useStoreMap({
        store,
        keys: [count],
        fn: x => x + n,
      })
      return (
        <div>
          {storeValue}/{x}/{count}
        </div>
      )
    }
    const App = () => <View />
    await render(<App />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        0
        /
        0
        /
        0
      </div>
    `)
    await act(async () => {
      count += 1
      update(2)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        2
        /
        3
        /
        1
      </div>
    `)
    await act(async () => {
      count += 1
      update(3)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        3
        /
        5
        /
        2
      </div>
    `)
  })
  test('issue #643: should return the same result as useStore, when used with the same mapper', async () => {
    const update = createEvent<number>()
    const store = createStore(0).on(update, (_, x) => x)
    const mapper = (x: number) => x + 1

    const View = () => {
      const baseX = mapper(useStore(store))
      const x = useStoreMap(store, mapper)
      return <div>{x === baseX ? 'equal' : 'not_equal'}</div>
    }
    const App = () => <View />
    await render(<App />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        equal
      </div>
    `)
    await act(async () => {
      update(2)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        equal
      </div>
    `)
    await act(async () => {
      update(3)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        equal
      </div>
    `)
  })
  test('change in one of the keys should trigger `fn` computation', async () => {
    const trigger = createEvent<any>()
    const $trigger = restore(trigger, null)

    const store = createStore(0)

    const fn = jest.fn()

    const View = () => {
      const someChangingKey = useStore($trigger)
      const value = useStoreMap({
        store,
        keys: [someChangingKey],
        fn: () => {
          fn()
          return 42
        },
      })

      return <div>{value}</div>
    }
    const App = () => <View />

    await render(<App />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(1)

    await act(async () => {
      trigger(1)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(2)

    // change in the key should not trigger computation
    await act(async () => {
      trigger(1)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(2)

    await act(async () => {
      trigger(2)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(3)
  })
  test('re-render by external reason shoud not trigger `fn` computation if it is unaffected', async () => {
    const trigger = createEvent<any>()
    const $trigger = restore(trigger, null)

    const store = createStore(0)

    const fn = jest.fn()
    const rendered = jest.fn()

    const View = () => {
      useStore($trigger)
      const value = useStoreMap({
        store,
        keys: [],
        fn: () => {
          fn()
          return 42
        },
      })

      rendered()

      return <div>{value}</div>
    }
    const App = () => <View />

    await render(<App />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(1)

    await act(async () => {
      trigger(1)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(2)

    await act(async () => {
      trigger(2)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        42
      </div>
    `)
    expect(fn).toBeCalledTimes(1)
    expect(rendered).toBeCalledTimes(3)
  })
  test('defaultValue support', async () => {
    const addItem = createEvent<{id: string; value: string}>()
    const $items = createStore([{id: 'user1', value: 'Alice'}])
    $items.on(addItem, (items, item) => [...items, item])

    const App = ({id}: {id: string}) => {
      const {value} = useStoreMap({
        store: $items,
        keys: [id],
        fn: items => items.find(e => e.id === id),
        defaultValue: {id: 'guest', value: 'Guest'},
      })
      return <div>Hello {value}</div>
    }
    await render(<App id="user2" />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello 
        Guest
      </div>
    `)
    await act(() => {
      addItem({id: 'user2', value: 'Bob'})
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Hello 
        Bob
      </div>
    `)
  })
})
