//@noflow

import {createReduxStore} from '../createReduxStore'
import {createStoreObject, createStore} from '..'
import {createEvent} from 'effector/event'
import {
  addTodo,
  dispatchInMiddle,
  getStateInMiddle,
  subscribeInMiddle,
  unsubscribeInMiddle,
  throwError,
  unknownAction,
} from './fixtures/actionCreators'
import * as reducers from './fixtures/reducers'
import {from} from 'most'
import $$observable from 'symbol-observable'

describe.skip('createReduxStore', () => {
  it('exposes the public API', () => {
    const store = createReduxStore(reducers.todos)
    const methods = Object.keys(store)

    // effector has 14 properties
    //expect(methods.length).toBe(4)
    expect(methods).toContain('subscribe')
    expect(methods).toContain('dispatch')
    expect(methods).toContain('getState')
    expect(methods).toContain('replaceReducer')
  })

  it('throws if reducer is not a function', () => {
    //$off
    expect(() => createReduxStore()).toThrow()

    //$off
    expect(() => createReduxStore('test')).toThrow()

    //$off
    expect(() => createReduxStore({})).toThrow()

    expect(() => createReduxStore(() => {})).not.toThrow()
  })

  it('passes the initial state', () => {
    const store = createReduxStore(reducers.todos, [
      {
        id: 1,
        text: 'Hello',
      },
    ])
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ])
  })

  it('applies the reducer to the previous state', () => {
    const store = createReduxStore(reducers.todos, []).on(
      addTodo,
      (state, text) => [...state, {id: state.length + 1, text}],
    )
    expect(store.getState()).toEqual([])

    store.dispatch(unknownAction())
    expect(store.getState()).toEqual([])

    addTodo('Hello')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ])

    addTodo('World')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
    ])
  })

  it('applies the reducer to the initial state', () => {
    const store = createReduxStore(reducers.todos, [
      {
        id: 1,
        text: 'Hello',
      },
    ]).on(addTodo, (state, text) => [...state, {id: state.length + 1, text}])
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ])

    store.dispatch(unknownAction())
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ])

    addTodo('World')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
    ])
  })

  it('preserves the state when replacing a reducer', () => {
    const store = createReduxStore(reducers.todos, []).on(
      addTodo,
      (state, text) => [...state, {id: state.length + 1, text}],
    )
    addTodo('Hello')
    addTodo('World')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
    ])

    store.replaceReducer(reducers.todosReverse)
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
    ])

    addTodo('Perhaps')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
      {
        id: 3,
        text: 'Perhaps',
      },
    ])

    store.replaceReducer(reducers.todos)
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
      {
        id: 3,
        text: 'Perhaps',
      },
    ])

    addTodo('Surely')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
      {
        id: 2,
        text: 'World',
      },
      {
        id: 3,
        text: 'Perhaps',
      },
      {
        id: 4,
        text: 'Surely',
      },
    ])
  })

  it('supports multiple subscriptions', () => {
    const store = createReduxStore(reducers.todos)
    const listenerA = jest.fn()
    const listenerB = jest.fn()

    let unsubscribeA = store.subscribe(listenerA)
    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    const unsubscribeB = store.subscribe(listenerB)
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    unsubscribeA()
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    unsubscribeB()
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    unsubscribeA = store.subscribe(listenerA)
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()

    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()
  })

  it('only removes listener once when unsubscribe is called', () => {
    const store = createReduxStore(reducers.todos)
    const listenerA = jest.fn()
    const listenerB = jest.fn()

    const unsubscribeA = store.subscribe(listenerA)
    store.subscribe(listenerB)

    unsubscribeA()
    unsubscribeA()

    store.dispatch(unknownAction())
    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
    }).toMatchSnapshot()
  })

  it('only removes relevant listener when unsubscribe is called', () => {
    const store = createReduxStore(reducers.todos)
    const listener = jest.fn()

    store.subscribe(listener)
    const unsubscribeSecond = store.subscribe(listener)

    unsubscribeSecond()
    unsubscribeSecond()

    store.dispatch(unknownAction())
    expect(listener.mock.calls.length).toBe(1)
  })

  it('supports removing a subscription within a subscription', () => {
    const store = createReduxStore(reducers.todos, [])
    const listenerA = jest.fn()
    const listenerB = jest.fn()
    const listenerC = jest.fn()

    store.subscribe(listenerA)
    const unSubB = store.subscribe(
      (e: any): void => {
        listenerB()
        if (typeof unSubB === 'function') unSubB()
      },
    )
    store.subscribe(listenerC)

    store.dispatch(unknownAction())
    store.dispatch(unknownAction())

    expect({
      listenerA: listenerA.mock.calls,
      listenerB: listenerB.mock.calls,
      listenerC: listenerC.mock.calls,
    }).toMatchSnapshot()
  })

  it(
    'notifies all subscribers about current dispatch regardless if ' +
      'any of them gets unsubscribed in the process',
    () => {
      const store = createReduxStore(reducers.todos)

      const unsubscribeHandles = []
      const doUnsubscribeAll = () =>
        unsubscribeHandles.forEach(unsubscribe => unsubscribe())

      const listener1 = jest.fn()
      const listener2 = jest.fn()
      const listener3 = jest.fn()

      unsubscribeHandles.push(store.subscribe(() => listener1()))
      unsubscribeHandles.push(
        store.subscribe(() => {
          listener2()
          doUnsubscribeAll()
        }),
      )
      unsubscribeHandles.push(store.subscribe(() => listener3()))

      store.dispatch(unknownAction())
      expect(listener1.mock.calls.length).toBe(1)
      expect(listener2.mock.calls.length).toBe(1)
      expect(listener3.mock.calls.length).toBe(1)

      store.dispatch(unknownAction())
      expect(listener1.mock.calls.length).toBe(1)
      expect(listener2.mock.calls.length).toBe(1)
      expect(listener3.mock.calls.length).toBe(1)
    },
  )

  it('notifies only subscribers active at the moment of current dispatch', () => {
    const store = createReduxStore(reducers.todos)

    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const listener3 = jest.fn()

    let listener3Added = false
    const maybeAddThirdListener = () => {
      if (!listener3Added) {
        listener3Added = true
        store.subscribe(() => listener3())
      }
    }

    store.subscribe(() => listener1())
    store.subscribe(() => {
      listener2()
      maybeAddThirdListener()
    })

    store.dispatch(unknownAction())
    expect(listener1.mock.calls.length).toBe(1)
    expect(listener2.mock.calls.length).toBe(1)
    expect(listener3.mock.calls.length).toBe(0)

    store.dispatch(unknownAction())
    expect(listener1.mock.calls.length).toBe(2)
    expect(listener2.mock.calls.length).toBe(2)
    expect(listener3.mock.calls.length).toBe(1)
  })

  it('uses the last snapshot of subscribers during nested dispatch', () => {
    const store = createReduxStore(reducers.todos)

    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const listener3 = jest.fn()
    const listener4 = jest.fn()

    let unsubscribe4
    const unsubscribe1 = store.subscribe(() => {
      listener1()
      expect(listener1.mock.calls.length).toBe(1)
      expect(listener2.mock.calls.length).toBe(0)
      expect(listener3.mock.calls.length).toBe(0)
      expect(listener4.mock.calls.length).toBe(0)

      // unsubscribe1()
      unsubscribe4 = store.subscribe(listener4)
      store.dispatch(unknownAction())

      // expect(listener1.mock.calls.length).toBe(1)
      // expect(listener2.mock.calls.length).toBe(1)
      // expect(listener3.mock.calls.length).toBe(1)
      // expect(listener4.mock.calls.length).toBe(1)
    })

    store.subscribe(listener2)
    store.subscribe(listener3)
    store.dispatch(unknownAction())
    expect(listener1.mock.calls.length).toBe(1)
    expect(listener2.mock.calls.length).toBe(1)
    expect(listener3.mock.calls.length).toBe(1)
    expect(listener4.mock.calls.length).toBe(1)
    unsubscribe1()
    expect(listener1.mock.calls.length).toBe(1)
    expect(listener2.mock.calls.length).toBe(2)
    expect(listener3.mock.calls.length).toBe(2)
    expect(listener4.mock.calls.length).toBe(1)

    unsubscribe4()
    store.dispatch(unknownAction())
    expect(listener1.mock.calls.length).toBe(1)
    expect(listener2.mock.calls.length).toBe(3)
    expect(listener3.mock.calls.length).toBe(3)
    expect(listener4.mock.calls.length).toBe(1)
  })

  it.skip('skip already dispatched actions', done => {
    const store = createReduxStore(reducers.todos, []).on(
      addTodo,
      (state, text) => [...state, {id: state.length + 1, text}],
    )
    store.subscribe(() => {
      expect(store.getState()).toEqual([
        {
          id: 1,
          text: 'Hello',
        },
      ])
      done()
    })
    store.dispatch(addTodo('Hello'))
  })

  it('provides an up-to-date state when a subscriber is notified', done => {
    const addTodo = createEvent('addTodo')
    const store = createReduxStore(reducers.noReducer, []).on(
      addTodo,
      (state, text) => [...state, {id: state.length + 1, text}],
    )
    store.subscribe(() => {
      expect(store.getState()).toEqual([
        {
          id: 1,
          text: 'Hello',
        },
      ])
      done()
    })
    addTodo('Hello')
  })

  it('does not leak private listeners array', done => {
    const store = createReduxStore(reducers.todos).on(addTodo, _ => _)
    store.subscribe(function() {
      expect(this).toBe(undefined)
      done()
    })
    addTodo('Hello')
  })

  it('only accepts plain object actions', () => {
    const store = createReduxStore(reducers.todos)
    expect(() => store.dispatch(unknownAction())).not.toThrow()

    function AwesomeMap() {}
    ;[null, undefined, 42, 'hey', new AwesomeMap()].forEach(nonObject =>
      expect(() => store.dispatch(nonObject)).not.toThrow(),
    )
  })

  it('handles nested dispatches gracefully', () => {
    const fooEvent = createEvent('foo')
    const barEvent = createEvent('bar')
    const foo = createStore(0).on(fooEvent, function foo(state, action) {
      return 1
    })

    const bar = createStore(0).on(barEvent, function bar(state, action) {
      return 2
    })

    const store = createStoreObject({foo, bar})

    store.subscribe(function kindaComponentDidUpdate(state) {
      if (state.bar === 0) {
        barEvent()
      }
    })

    fooEvent()
    barEvent()
    expect(foo.getState()).toBe(1)
    expect(store.getState()).toEqual({
      foo: 1,
      bar: 2,
    })
  })

  it('does not allow dispatch() from within a reducer', () => {
    const store = createReduxStore(reducers.dispatchInTheMiddleOfReducer)

    expect(() =>
      store.dispatch(
        dispatchInMiddle(store.dispatch.bind(store, unknownAction())),
      ),
    ).toThrow(/may not dispatch/)
  })

  it('does not allow getState() from within a reducer', () => {
    const store = createReduxStore(reducers.getStateInTheMiddleOfReducer)

    expect(() =>
      store.dispatch(getStateInMiddle(store.getState.bind(store))),
    ).not.toThrow()
  })

  it('does not allow subscribe() from within a reducer', () => {
    const store = createReduxStore(reducers.subscribeInTheMiddleOfReducer)

    expect(() =>
      store.dispatch(
        subscribeInMiddle({
          boundSubscribeFn: store.subscribe,
        }),
      ),
    ).toThrow(/You may not call store.subscribe()/)
  })

  it('does not allow unsubscribe from subscribe() from within a reducer', () => {
    const store = createReduxStore(reducers.unsubscribeInTheMiddleOfReducer)
    const unsubscribe = store.subscribe(() => {})

    expect(() =>
      store.dispatch(unsubscribeInMiddle({boundUnsubscribeFn: unsubscribe})),
    ).toThrow(/You may not unsubscribe from a store/)
  })

  it('recovers from an error within a reducer', () => {
    const store = createReduxStore(reducers.errorThrowingReducer)
    expect(() => store.dispatch(throwError())).toThrow()

    expect(() => store.dispatch(unknownAction())).not.toThrow()
  })

  it('not throws if action type is missing', () => {
    const store = createReduxStore(reducers.todos)
    expect(() => store.dispatch({})).not.toThrow()
  })

  it('throws if action type is undefined', () => {
    const store = createReduxStore(reducers.todos)
    //$off expect error
    expect(() => store.dispatch({type: undefined})).not.toThrow()
  })

  it('does not throw if action type is falsy', () => {
    const store = createReduxStore(reducers.todos)
    //$off expect error
    expect(() => store.dispatch({type: false})).not.toThrow()
    //$off expect error
    expect(() => store.dispatch({type: 0})).not.toThrow()
    //$off expect error
    expect(() => store.dispatch({type: null})).not.toThrow()

    expect(() => store.dispatch({type: ''})).not.toThrow()
  })

  it('accepts enhancer as the third argument', () => {
    const emptyArray = []
    const spyEnhancer = vanillaCreateStore => (...args) => {
      //effector wraps reducer functions
      //expect(args[0]).toBe(reducers.todos)
      expect(args[1]).toBe(emptyArray)
      expect(args.length).toBe(2)
      const vanillaStore = vanillaCreateStore(...args)
      return {
        ...vanillaStore,
        dispatch: jest.fn(vanillaStore.dispatch),
      }
    }

    const store = createReduxStore(reducers.todos, emptyArray, spyEnhancer).on(
      addTodo,
      (state, text) => [...state, {id: state.length + 1, text}],
    )
    const action = addTodo('Hello')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ])
  })

  it('accepts enhancer as the second argument if initial state is missing', () => {
    const spyEnhancer = vanillaCreateStore => (...args) => {
      //expect(args[0]).toBe(reducers.todos)
      expect(args[1]).toBe(undefined)
      expect(args.length).toBe(2)
      const vanillaStore = vanillaCreateStore(...args)
      return {
        ...vanillaStore,
        dispatch: jest.fn(vanillaStore.dispatch),
      }
    }

    const store = createReduxStore(reducers.noReducer, spyEnhancer).on(
      addTodo,
      (state = [], text) => [...state, {id: state.length + 1, text}],
    )
    addTodo('Hello')
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ])
  })

  it('throws if enhancer is neither undefined nor a function', () => {
    expect(() => createReduxStore(reducers.todos, undefined, {})).toThrow()

    // Effector accepts arrays as enhancers
    // it's like a shorthand for applyMiddleware(...enhancerArray)
    expect(() => createReduxStore(reducers.todos, undefined, [])).not.toThrow()

    expect(() => createReduxStore(reducers.todos, undefined, null)).toThrow()

    expect(() => createReduxStore(reducers.todos, undefined, false)).toThrow()

    expect(() =>
      createReduxStore(reducers.noReducer, undefined, undefined),
    ).not.toThrow()

    expect(() =>
      createReduxStore(reducers.noReducer, undefined, x => (console.log(x), x)),
    ).not.toThrow()

    expect(() => createReduxStore(reducers.todos, x => x)).not.toThrow()

    expect(() => createReduxStore(reducers.todos, [])).not.toThrow()

    expect(() => createReduxStore(reducers.todos, {})).not.toThrow()
  })

  it('throws if nextReducer is not a function', () => {
    const store = createReduxStore(reducers.todos)

    expect(() => store.replaceReducer()).toThrow(
      'Expected the nextReducer to be a function.',
    )

    expect(() => store.replaceReducer(() => {})).not.toThrow()
  })

  it('throws if listener is not a function', () => {
    const store = createReduxStore(reducers.todos)

    expect(() => store.subscribe()).toThrow()

    expect(() => store.subscribe('')).toThrow()

    expect(() => store.subscribe(null)).toThrow()

    expect(() => store.subscribe(undefined)).toThrow()
  })

  describe('Symbol.observable interop point', () => {
    it('should exist', () => {
      const store = createReduxStore(() => {})
      expect(typeof store[$$observable]).toBe('function')
    })

    describe('returned value', () => {
      it('should be subscribable', () => {
        const store = createReduxStore(() => {})
        const obs = store[$$observable]()
        expect(typeof obs.subscribe).toBe('function')
      })

      it('should throw a TypeError if an observer object is not supplied to subscribe', () => {
        const store = createReduxStore(() => {})
        const obs = store[$$observable]()

        expect(() => {
          obs.subscribe()
        }).toThrowError(new TypeError('Expected the observer to be an object.'))

        expect(() => {
          obs.subscribe(null)
        }).toThrowError(new TypeError('Expected the observer to be an object.'))

        expect(() => {
          obs.subscribe(() => {})
        }).toThrowError(new TypeError('Expected the observer to be an object.'))

        expect(() => {
          obs.subscribe({})
        }).not.toThrow()
      })

      it('should return a subscription object when subscribed', () => {
        const store = createReduxStore(() => {})
        const obs = store[$$observable]()
        const sub = obs.subscribe({})
        expect(typeof sub.unsubscribe).toBe('function')
      })
    })

    it('should pass an integration test with no unsubscribe', () => {
      const fooEvent = createEvent('foo')
      const barEvent = createEvent('bar')
      const foo = createStore(0).on(fooEvent, function foo(state, ...action) {
        console.log(action)
        return 1
      })

      const bar = createStore(0).on(barEvent, function bar(state, action) {
        return 2
      })

      const store = createStoreObject({foo, bar})
      //$off
      const observable = store[$$observable]()
      const results = []

      observable.subscribe({
        next(state) {
          results.push(state)
        },
      })

      fooEvent()
      barEvent()

      expect(results).toEqual([
        {foo: 0, bar: 0},
        {foo: 1, bar: 0},
        {foo: 1, bar: 2},
      ])
    })

    it('should pass an integration test with an unsubscribe', () => {
      const fooEvent = createEvent('foo')
      const barEvent = createEvent('bar')
      const foo = createStore(0).on(fooEvent, function foo(state, action) {
        return 1
      })

      const bar = createStore(0).on(barEvent, function bar(state, action) {
        return 2
      })

      const store = createStoreObject({foo, bar})
      //$off
      const observable = store[$$observable]()
      const results = []

      const sub = observable.subscribe({
        next(state) {
          results.push(state)
        },
      })

      fooEvent()
      sub.unsubscribe()
      barEvent()

      expect(results).toEqual([{foo: 0, bar: 0}, {foo: 1, bar: 0}])
    })

    it('should pass an integration test with a common library (RxJS)', () => {
      const fooEvent = createEvent('foo')
      const barEvent = createEvent('bar')
      const foo = createStore(0).on(fooEvent, function foo(state, action) {
        return 1
      })

      const bar = createStore(0).on(barEvent, function bar(state, action) {
        return 2
      })

      const store = createStoreObject({foo, bar})
      const observable = from(store)
      const results = []

      const sub = observable
        .map(state => ({fromRx: true, ...state}))
        .subscribe({
          next(state) {
            results.push(state)
          },
          error() {},
          complete() {},
        })

      fooEvent()
      sub.unsubscribe()
      barEvent()

      expect(results).toEqual([
        {foo: 0, bar: 0, fromRx: true},
        {foo: 1, bar: 0, fromRx: true},
      ])
    })
  })
})
