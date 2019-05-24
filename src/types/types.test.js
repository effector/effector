// @flow

import * as React from 'react'
import {
  invariant,
  warning,
  step,
  createStore,
  createNode,
  createEvent,
  createEffect,
  createApi,
  createStoreObject,
  createDomain,
  clearNode,
  restoreEffect,
  combine,
  sample,
  Effect,
  Store,
  Event,
  //ComputedStore,
  //ComputedEvent,
  /*::type*/ kind,
  forward,
  launch
} from 'effector'
import {createComponent} from 'effector-react'
import {createFormApi} from '@effector/forms'

describe('Unit', () => {
  describe('sample', () => {
    test('event by event', () => {
      const a = createEvent<number>()
      const b = createEvent<boolean>()
      const c = sample(a, b)

      const check1: Event<number> = c
      const check2: Event<string> = c
    })
    test('event by event with handler', () => {
      const a = createEvent<string>()
      const b = createEvent<boolean>()
      const c = sample(a, b, (a, b) => ({a, b}))

      const check1: Event<{a: string, b: boolean}> = c
      const check2: Event<string> = c
    })

    test('store by event', () => {
      const d = createStore(0)
      const b = createEvent<boolean>()
      const e = sample(d, b)

      const check3: Event<number> = e
      const check4: Event<string> = e
    })
    test('store by event with handler', () => {
      const d = createStore('')
      const b = createEvent<boolean>()
      const e = sample(d, b, (a, b) => ({a, b}))

      const check3: Event<{a: string, b: boolean}> = e
      const check4: Event<string> = e
    })

    test('effect by event', () => {
      const f = createEffect<string, any, any>()
      const b = createEvent<boolean>()
      const g = sample(f, b)

      const check5: Event<string> = g
      const check6: Event<number> = g
    })
    test('effect by event with handler', () => {
      const f = createEffect<string, any, any>()
      const b = createEvent<boolean>()
      const g = sample(f, b, (a, b) => ({a, b}))

      const check5: Event<{a: string, b: boolean}> = g
      const check6: Event<number> = g
    })

    test('store by store', () => {
      const a = createStore(false)
      const b = createStore(0)
      const c = sample(a, b)

      const check1: Store<boolean> = c
      const check2: Store<string> = c
    })
    test('store by store with handler', () => {
      const a = createStore('')
      const b = createStore(true)
      const c = sample(a, b, (a, b) => ({a, b}))

      const check1: Store<{a: string, b: boolean}> = c
      const check2: Store<string> = c
    })
  })
})

describe('Event', () => {
  test('createEvent', () => {
    const event1: Event<number> = createEvent()
  })
  test('#map', () => {
    const event: Event<number> = createEvent()
    const computed = event.map(() => 'foo')

    //const check1: Event<string> = computed
    const check2: Event<number> = computed
    event(2)
    computed('')
  })
  test('#watch', () => {
    const event: Event<number> = createEvent()
    event.watch(state => {
      const check1: number = state
      return state
    })
    event.watch(state => {
      return 'foo'
    })
    event.watch(state => {
      return
    })
    event.watch(state => {
    })
  })
})

describe('Effect', () => {
  test('createEffect', () => {
    const effect1: Effect<number, string> = createEffect()
  })
})

describe('Store', () => {
  test('createStore', () => {
    const store1: Store<number> = createStore(0)
    const store2: Store<string> = createStore(0)
  })
  test('createStoreObject', () => {
    const ev = createEvent()
    const a = createStore('')
    const b = createStore(0)
    const c = createStoreObject({a, b})
    c.on(ev, (state, payload) => state)
    c.reset(ev)
    c.off(ev)
  })
  test('createApi', () => {
    const store: Store<number> = createStore(0)
    {
      const {event} = createApi(store, {
        event: (n, x: number) => x,
      })
      const check: Event<number> = event
    }
    {
      const {event} = createApi(store, {
        event: (n, x: number) => x,
      })
      const check: Event<string> = event
    }
    {
      const {event} = createApi(store, {
        event: (n, x) => x,
      })
      const check: Event<string> = event
    }
  })
  test('createApi voids', () => {
    const store = createStore(0)
    const api = createApi(store, {
      increment: count => count + 1,
      decrement: count => count - 1,
      double: count => count * 2,
      multiply: (count, mp = 2) => count * mp,
    })

    api.double() // Expected 1 arguments, but got 0.
    api.multiply() // Expected 1 arguments, but got 0.
  })
  test('setStoreName', () => {})
  test('extract', () => {})
  test('combine', () => {
    const ev = createEvent()
    const a = createStore('')
    const b = createStore(0)
    const c = combine(a, b, (a, b) => a + b)
    c.on(ev, (state, payload) => state)
    c.reset(ev)
    c.off(ev)
  })
  test('restore', () => {
    const eff = createEffect<{foo: number}, {bar: string}, any>()
    const foo = restoreEffect(eff, {bar: ''})
  })

  test('#(properties)', () => {
    const store = createStore(0)
    const kind: kind = store.kind
    const shortName: string = store.shortName
    const defaultState: number = store.defaultState

    const computed = store.map(() => 'hello')
    const kind1: kind = computed.kind
    const shortName1: string = computed.shortName
    const defaultState1: string = computed.defaultState
  })

  test('#getState', () => {
    const store = createStore(0)
    const state: number = store.getState()

    const computed = store.map(() => 'hello')
    const state1: string = computed.getState()
  })

  test('#map', () => {
    const store = createStore(0)
    const computed = store.map(() => 'hello')

    const check1: Store<string> = computed

    const check2: Store<number> = computed
  })

  test('#reset', () => {
    const event = createEvent()
    const store = createStore(0)
    store.reset(event)
    const computed = store.map(() => 'hello')

    computed.reset(event)
  })

  test('#on', () => {
    const event = createEvent()
    const store = createStore(0)
    store.on(event, (state, payload) => state)
    const computed = store.map(() => 'hello')

    computed.on(event, (state, payload) => state)
  })

  test('#off', () => {
    const event = createEvent()
    const store = createStore(0)
    store.off(event)
    const computed = store.map(() => 'hello')

    computed.off(event)
  })

  test('#subscribe', () => {
    const event = createEvent()
    const store = createStore(0)
    // @ts-ignore I don't know type
    store.subscribe(() => {})
    const computed = store.map(() => 'hello')
    // @ts-ignore I don't know type
    computed.subscribe(() => {})
  })

  test('#watch', () => {
    const event: Event<number> = createEvent()
    const store = createStore(0)
    store.watch((state, payload) => {
      const check1: number = state
      const check2: typeof undefined = payload
    })
    store.watch(event, (state, payload) => {
      const check1: number = state
      const check2: number = payload
    })
    const computed = store.map(() => 'hello')
    computed.watch((state, payload) => {
      const check1: string = state
      const check2: typeof undefined = payload
    })
    computed.watch(event, (state, payload) => {
      const check1: string = state
      const check2: number = payload
    })
  })

  test('#thru', () => {
    const event = createEvent()
    const store = createStore(0)
    const result = store.thru(store => {
      const check: Store<number> = store
      return check
    })

    const computed = store.map(() => 'hello')
    const result1 = computed.thru(store => {
      const check: Store<string> = store
      return check
    })
  })
})

describe('Domain', () => {
  test('createDomain', () => {
    const domain = createDomain()
    const domain2 = createDomain('hello')
    const domain3 = createDomain(234)
    const domain4 = createDomain({foo: true})
  })

  test('#onCreateStore', () => {
    const root = createDomain('root')
    root.onCreateStore(store => {
      const snapshot = localStorage.getItem(store.shortName)
      if (typeof snapshot === 'string') store.setState(JSON.parse(snapshot))

      let isFirstSkiped = false
      store.watch(newState => {
        if (isFirstSkiped) {
          localStorage.setItem(store.shortName, JSON.stringify(newState))
        }
        isFirstSkiped = true
      })
      return store
    })

    root.onCreateStore(foo => {
      const object = createStoreObject({foo})
      object.watch(data => {


        data.foo
      })

      clearNode(foo)
    })
  })
})

describe('Graph', () => {
  test('forward', () => {
    const a = createEvent<number>()
    const b = createEvent<number>()
    forward({from: a, to: b})
    const c = createEffect<number, string, string>()
    const d = createEffect<number, string, string>()
    forward({from: c, to: d})
    const e = createStore(0)
    const f = createStore(0)
    forward({from: e, to: f})
  })

  test('launch', () => {
    const foo = createEvent<number>()
    const customNode = createNode({
      scope: {max: 100, lastValue: -1, add: 10},
      child: [foo],
      node: [
        step.compute({
          fn: (arg, {add}) => arg + add,
        }),
        step.filter({
          fn: (arg, {max, lastValue}) => arg < max && arg !== lastValue,
        }),
        step.compute({
          fn(arg, scope) {
            scope.lastValue = arg
            return arg
          },
        }),
      ],
    })
    launch(foo, '')
    launch(customNode, 100)
  })
})

describe('invariant', () => {
  const foo: boolean = false
  invariant(foo, 'test', 1, 2)
})

describe('warning', () => {
  warning(true, 'foo bar', 'test', 3)
})

describe('effector-react', () => {
  test('createComponent', () => {
    const ImplicitObject = createComponent(
      {
        a: createStore<number>(0),
        b: createStore<number>(1),
      },
      (props, state) => {
        const check1: number = state.a
        const check2: number = state.b
        return null
      },
    )
    const Store = createComponent(createStore(0), (props, state) => {
      const check1: number = state
      return null
    })

    const list = createStore<{
      [key: number]: {
        text: string,
      },
    }>({})
    const InitialProps = createComponent(
      (initialProps: {id: number}) => {
        const check1: number = initialProps.id
        const check2: string = initialProps.id
        const check3: string = initialProps.unknownProp
        return list.map(list => list[initialProps.id] || {text: 'Loading...'})
      },
      (_, state) => {
        const check1: string = state.text
        const check2: number = state.text
        return null
      },
    )
  })
})

describe('effector-vue', () => {})

describe('@effector/forms', () => {
  describe('createFormApi', () => {
    const form = createFormApi({
      fields: {
        firstName: '',
        lastName: '',
      },
    })
  })
})
