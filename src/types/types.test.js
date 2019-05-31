// @flow
/* eslint-disable no-unused-vars */
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

      const sample_ee_check1: Event<number> = c
      const sample_ee_check2: Event<string> = c
    })
    test('event by event with handler', () => {
      const a = createEvent<string>()
      const b = createEvent<boolean>()
      const c = sample(a, b, (a, b) => ({a, b}))

      const sample_eeh_check1: Event<{a: string, b: boolean}> = c
      const sample_eeh_check2: Event<string> = c
    })

    test('store by event', () => {
      const d = createStore(0)
      const b = createEvent<boolean>()
      const e = sample(d, b)

      const sample_se_check1: Event<number> = e
      const sample_se_check2: Event<string> = e
    })
    test('store by event with handler', () => {
      const d = createStore('')
      const b = createEvent<boolean>()
      const e = sample(d, b, (a, b) => ({a, b}))

      const sample_seh_check1: Event<{a: string, b: boolean}> = e
      const sample_seh_check2: Event<string> = e
    })

    test('effect by event', () => {
      const f = createEffect<string, any, any>()
      const b = createEvent<boolean>()
      const g = sample(f, b)

      const sample_efe_check1: Event<string> = g
      const sample_efe_check2: Event<number> = g
    })
    test('effect by event with handler', () => {
      const f = createEffect<string, any, any>()
      const b = createEvent<boolean>()
      const g = sample(f, b, (a, b) => ({a, b}))

      const sample_efeh_check1: Event<{a: string, b: boolean}> = g
      const sample_efeh_check2: Event<number> = g
    })

    test('store by store', () => {
      const a = createStore(false)
      const b = createStore(0)
      const c = sample(a, b)

      const sample_ss_check1: Store<boolean> = c
      const sample_ss_check2: Store<string> = c
    })
    test('store by store with handler', () => {
      const a = createStore('')
      const b = createStore(true)
      const c = sample(a, b, (a, b) => ({a, b}))

      const sample_ssh_check1: Store<{a: string, b: boolean}> = c
      const sample_ssh_check2: Store<string> = c
    })
    describe('sample(Store<T>):Store<T>', () => {
      test('correct case', () => {
        const a = createStore('')
        const sample_s_correct: Store<string> = sample(a)
      })
      test('incorrect case', () => {
        const a = createStore('')
        const sample_s_incorrect: Store<number> = sample(a)
      })
      describe('edge case', () => {
        test('correct case', () => {
          const a = createStore('')
          const clock = createEvent()
          const sample_s_edge_correct: Event<string> = sample(a, clock)
        })
        test('incorrect case', () => {
          const a = createStore('')
          const clock = createEvent()
          const sample_s_edge_incorrect: Event<number> = sample(a, clock)
        })
      })
    })
  })
})

describe('Event', () => {
  test('createEvent', () => {
    const createEvent_event1: Event<number> = createEvent()
  })
  test('#map', () => {
    const event: Event<number> = createEvent()
    const computed = event.map(() => 'foo')

    //const check1: Event<string> = computed
    const event_map_check2: Event<number> = computed
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
  describe('#filter', () => {
    test('#filter ok', () => {
      const event: Event<number> = createEvent()
      const filteredEvent_ok: Event<string> = event.filter(n => {
        if (n % 2) return n.toString()
      })
    })
    test('#filter incorrect', () => {
      const event: Event<number> = createEvent()
      const filteredEvent_error: Event<number> = event.filter(n => {
        if (n % 2) return n.toString()
      })
    })
  })
})

describe('Effect', () => {
  test('createEffect', () => {
    const createEffect_effect1: Effect<number, string> = createEffect()
    const createEffect_effect2 = createEffect('', {handler: createEffect_effect1})

    const createEffect_effect3 = createEffect('', {
      handler() {
        return 'foo'
      }
    })
  })

  test('#use', () => {
    const effect1 = createEffect()
    const foo = createEffect<number, string, any>()

    effect1.use((params) => Promise.resolve('foo'))
    effect1.use(foo)
  })
})

describe('Store', () => {
  test('createStore', () => {
    const createStore_store1: Store<number> = createStore(0)
    const createStore_store2: Store<string> = createStore(0)
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
      const createApi_check1: Event<number> = event
    }
    {
      const {event} = createApi(store, {
        event: (n, x: number) => x,
      })
      const createApi_check2: Event<string> = event
    }
    {
      const {event} = createApi(store, {
        event: (n, x) => x,
      })
      const createApi_check3: Event<string> = event
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

    const map_check1: Store<string> = computed

    const map_check2: Store<number> = computed
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
      const store_watch_check1: number = state
      const store_watch_check2: typeof undefined = payload
    })
    store.watch(event, (state, payload) => {
      const store_watchBy_check1: number = state
      const store_watchBy_check2: number = payload
    })
    const computed = store.map(() => 'hello')
    computed.watch((state, payload) => {
      const store_watchComputed_check1: string = state
      const store_watchComputed_check2: typeof undefined = payload
    })
    computed.watch(event, (state, payload) => {
      const store_watchByComputed_check1: string = state
      const store_watchByComputed_check2: number = payload
    })
  })

  test('#thru', () => {
    const event = createEvent()
    const store = createStore(0)
    const result = store.thru(store => {
      const thru_check1: Store<number> = store
      return thru_check1
    })

    const computed = store.map(() => 'hello')
    const result1 = computed.thru(store => {
      const thru_computed_check1: Store<string> = store
      return thru_computed_check1
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

  test('#event', () => {
    const domain = createDomain()
    const event = domain.event<string>()
  })

  test('#effect', () => {
    const domain = createDomain()
    const effect1: Effect<string, number, Error> = domain.effect()
    const effect2 = domain.effect('', {
      handler(params: string) {
        return 256
      }
    })
    effect2(20)
    const effect3 = domain.effect('', {
      handler: effect1
    })
    effect3(20)
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
  describe('forward', () => {
    test('forward between events', () => {
      const forward_event1 = createEvent<number>()
      const forward_event2 = createEvent<number>()
      forward({
        from: forward_event1,
        to: forward_event2,
      })
    })
    describe('forward between effects', () => {
      test('start in parallel with the same payload', () => {
        const forward_effect_par1 = createEffect<number, string, string>()
        const forward_effect_par2 = createEffect<number, string, string>()
        forward({
          from: forward_effect_par1,
          to: forward_effect_par2,
        })
      })
      test('start sequentially', () => {
        const forward_effect_seq1 = createEffect<number, string, string>()
        const forward_effect_seq2 = createEffect<string, boolean, boolean>()
        forward({
          from: forward_effect_seq1.done.map(({result}) => result),
          to: forward_effect_seq2,
        })
      })
    })

    test('forward between stores', () => {
      const e = createStore(0)
      const f = createStore(0)
      forward({from: e, to: f})
    })
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
    launch(foo, 0)
    launch(customNode, 100)
  })
})

describe('invariant', () => {
  const foo: boolean = true
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
        const createComponent_implicitObject_check1: number = state.a
        const createComponent_implicitObject_check2: number = state.b
        return null
      },
    )
    const Store = createComponent(createStore(0), (props, state) => {
      const createComponent_createStore_check1: number = state
      return null
    })

    const list = createStore<{
      [key: number]: {
        text: string,
      },
    }>({})
    const InitialProps = createComponent(
      (initialProps: {id: number}) => {
        const createComponent_initialProps_check1: number = initialProps.id
        const createComponent_initialProps_check2: string = initialProps.id
        const createComponent_initialProps_check3: string = initialProps.unknownProp
        return list.map(list => list[initialProps.id] || {text: 'Loading...'})
      },
      (_, state) => {
        const createComponent_initialProps_check4: string = state.text
        const createComponent_initialProps_check5: number = state.text
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
