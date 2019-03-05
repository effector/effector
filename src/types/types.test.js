// @flow

import {
  createStore,
  createEvent,
  createEffect,
  createStoreObject,
  createDomain,
  combine,
  Effect,
  Store,
  Event,
  //ComputedStore,
  //ComputedEvent,
  /*::type*/ kind,
  forward,
  relay,
  relayShape,
} from 'effector'

describe('Event', () => {
  test('createEvent', () => {
    const event1: Event<number> = createEvent()
  })
  test('#map', () => {
    const event: Event<number> = createEvent()
    const computed = event.map(() => 'foo')

    const check1: Event<string> = computed
    const check2: Event<number> = computed
    event(2)
    computed('')
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
  test('createApi', () => {})
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
  test('restore', () => {})

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
    store.watch((state, payload, type) => {
      const check1: number = state
      const check2: typeof undefined = payload
    })
    store.watch(event, (state, payload, type) => {
      const check1: number = state
      const check2: number = payload
    })
    const computed = store.map(() => 'hello')
    computed.watch((state, payload, type) => {
      const check1: string = state
      const check2: typeof undefined = payload
    })
    computed.watch(event, (state, payload, type) => {
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
})

describe('Graph', () => {
  test('forward', () => {

  })
  test('relay', () => {

  })
  test('relayShape', () => {

  })
})
