// @flow
/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  createApi,
  createStoreObject,
  restoreEffect,
  combine,
  Store,
  Event,
  /*::type*/ CompositeName,
  /*::type*/ kind,
} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

test('createStore', () => {
  const createStore_store1: Store<number> = createStore(0)
  const createStore_store2: Store<string> = createStore(0)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Type 'Store<number>' is not assignable to type 'Store<string>'.
      The types returned by 'getState()' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.

    --flow--
    Cannot assign 'createStore(...)' to 'createStore_store2'
      const createStore_store2: Store<string> = createStore(0)
                                                            ^
      number [1] is incompatible with string [2] in type argument 'State' [3]
          const createStore_store2: Store<string> = createStore(0)
                                                            [1] ^
          const createStore_store2: Store<string> = createStore(0)
                                      [2] ^^^^^^
          declare export class Store<State> implements Unit<State> {
                                 [3] ^^^^^
    "
  `)
})
test('createStoreObject', () => {
  const ev = createEvent()
  const a = createStore('')
  const b = createStore(0)
  const c = createStoreObject({a, b})
  c.on(ev, (state, payload) => state)
  c.reset(ev)
  c.off(ev)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
describe('createApi', () => {
  const store: Store<number> = createStore(0)
  test('check1', () => {
    const {event} = createApi(store, {
      event: (n, x: number) => x,
    })
    const createApi_check1: Event<number> = event
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('check2', () => {
    const {event} = createApi(store, {
      event: (n, x: number) => x,
    })
    const createApi_check2: Event<string> = event
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<number>' is not assignable to type 'Event<string>'.
        Types of property 'watch' are incompatible.
          Type '(watcher: (payload: number) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
            Types of parameters 'watcher' and 'watcher' are incompatible.
              Types of parameters 'payload' and 'payload' are incompatible.
                Type 'number' is not assignable to type 'string'.

      --flow--
      Cannot assign 'event' to 'createApi_check2'
        const createApi_check2: Event<string> = event
                                                ^^^^^
        string [1] is incompatible with number [2] in type argument 'Payload' [3]
            const createApi_check2: Event<string> = event
                                      [1] ^^^^^^
            event: (n, x: number) => x,
                      [2] ^^^^^^
            declare export class Event<Payload> implements Unit<Payload> {
                                   [3] ^^^^^^^
      "
    `)
  })
  test('check3', () => {
    const {event} = createApi(store, {
      event: (n, x) => x,
    })
    const createApi_check3: Event<string> = event
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<void>' is not assignable to type 'Event<string>'.
        Types of property 'watch' are incompatible.
          Type '(watcher: (payload: void) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
            Types of parameters 'watcher' and 'watcher' are incompatible.
              Types of parameters 'payload' and 'payload' are incompatible.
                Type 'void' is not assignable to type 'string'.

      --flow--
      Cannot call 'createApi' with object literal bound to 'api'
        event: (n, x) => x,
                         ^
        string [1] is incompatible with number [2] in the return value of property 'event'
            const createApi_check3: Event<string> = event
                                      [1] ^^^^^^
            const store: Store<number> = createStore(0)
                           [2] ^^^^^^
      "
    `)
  })
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
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
test('combine', () => {
  const ev = createEvent()
  const a = createStore('')
  const b = createStore(0)
  const c = combine(a, b, (a, b) => a + b)
  c.on(ev, (state, payload) => state)
  c.reset(ev)
  c.off(ev)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
test('restore', () => {
  const eff = createEffect<{foo: number}, {bar: string}, any>()
  const foo = restoreEffect(eff, {bar: ''})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#(properties)', () => {
  const store = createStore(0)
  const kind1: kind = store.kind
  const shortName: string = store.shortName
  const domainName: CompositeName | typeof undefined = store.domainName
  const compositeName: CompositeName = store.compositeName
  const defaultState: number = store.defaultState

  const computed = store.map(() => 'hello')
  const kind2: kind = computed.kind
  const shortName1: string = computed.shortName
  const domainName1: CompositeName | typeof undefined = computed.domainName
  const compositeName1: CompositeName = computed.compositeName
  const defaultState1: string = computed.defaultState
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#getState', () => {
  const store = createStore(0)
  const state: number = store.getState()

  const computed = store.map(() => 'hello')
  const state1: string = computed.getState()
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#map', () => {
  const store = createStore(0)
  const computed = store.map(() => 'hello')

  const map_check1: Store<string> = computed

  const map_check2: Store<number> = computed
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Type 'Store<string>' is not assignable to type 'Store<number>'.
      The types returned by 'getState()' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.


    --flow--
    Cannot assign 'computed' to 'map_check2'
      const map_check2: Store<number> = computed
                                        ^^^^^^^^
      string [1] is incompatible with number [2] in type argument 'State' [3]
          const map_check1: Store<string> = computed
                              [1] ^^^^^^
          const map_check2: Store<number> = computed
                              [2] ^^^^^^
          declare export class Store<State> implements Unit<State> {
                                 [3] ^^^^^
    "
  `)
})

test('#reset', () => {
  const event = createEvent()
  const store = createStore(0)
  store.reset(event)
  const computed = store.map(() => 'hello')

  computed.reset(event)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#on', () => {
  const event = createEvent()
  const store = createStore(0)
  store.on(event, (state, payload) => state)
  const computed = store.map(() => 'hello')

  computed.on(event, (state, payload) => state)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#off', () => {
  const event = createEvent()
  const store = createStore(0)
  store.off(event)
  const computed = store.map(() => 'hello')

  computed.off(event)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#subscribe', () => {
  const event = createEvent()
  const store = createStore(0)
  // @ts-ignore I don't know type
  store.subscribe(() => {})
  const computed = store.map(() => 'hello')
  // @ts-ignore I don't know type
  computed.subscribe(() => {})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
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
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
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
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
