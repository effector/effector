/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  createStoreObject,
  restore,
  combine,
  Store,
  Event,
  CompositeName,
  kind,
  sample,
} from 'effector'

const typecheck = '{global}'

test('createStore', () => {
  const createStore_store1: Store<number> = createStore(0)
  //@ts-expect-error
  const createStore_store2: Store<string> = createStore(0)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Store<number>' is not assignable to type 'Store<string>'.
      The types returned by 'getState()' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
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
    no errors
    "
  `)
})
test('restore', () => {
  const eff = createEffect<{foo: number}, {bar: string}, any>()
  const foo = restore(eff, {bar: ''})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('#(properties)', () => {
  const store = createStore(0)
  const kind1: kind = store.kind
  const shortName: string = store.shortName
  const compositeName: CompositeName = store.compositeName
  const defaultState: number = store.defaultState

  const computed = store.map(() => 'hello')
  const kind2: kind = computed.kind
  const shortName1: string = computed.shortName
  const compositeName1: CompositeName = computed.compositeName
  const defaultState1: string = computed.defaultState
  expect(typecheck).toMatchInlineSnapshot(`
    "
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
    no errors
    "
  `)
})

test('#map', () => {
  const store = createStore(0)
  const computed = store.map(() => 'hello')

  const map_check1: Store<string> = computed
  //@ts-expect-error
  const map_check2: Store<number> = computed
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Store<string>' is not assignable to type 'Store<number>'.
    "
  `)
})

describe('#reset', () => {
  test('simple case', () => {
    const event = createEvent()
    const store = createStore(0)
    store.reset(event)
    const computed = store.map(() => 'hello')

    computed.reset(event)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('.reset(a, b)', () => {
    const a = createEvent<string>()
    const b = createEvent<number>()
    const store = createStore(0)
    store.reset(a, b)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('.reset([a, b])', () => {
    const a = createEvent<string>()
    const b = createEvent<number>()
    const store = createStore(0)
    store.reset([a, b])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('#on', () => {
  const event = createEvent()
  const store = createStore(0)
  store.on(event, (state, payload) => state)
  const computed = store.map(() => 'hello')

  computed.on(event, (state, payload) => state)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('#on triggers[] (should pass)', () => {
  const event = createEvent<string>()
  const another = createStore('')
  const store = createStore(0)

  store.on([event, another], (state, payload) => state)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('#on triggers[] non-intersecting types (should pass)', () => {
  const event = createEvent<number>()
  const another = createStore('')
  const store = createStore(0)

  store.on([event, another], (state, payload) => state)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('.on(sample()) inline (should pass)', () => {
  const store = createStore('111')
  const event = createEvent<any>()
  const noInline = sample({source: store, clock: event})
  const anotherStore = createStore('123').on(
    sample({source: store, clock: event}),
    (_, str) => str,
  )
  expect(typecheck).toMatchInlineSnapshot(`
    "
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
    no errors
    "
  `)
})

test('unsafe widening (should fail)', () => {
  //@ts-expect-error
  const $values: Store<{
    page: number
    limit: number
    [key: string]: any
  }> = createStore({page: 0, limit: 0, id: 1})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Store<{ page: number; limit: number; id: number; }>' is not assignable to type 'Store<{ [key: string]: any; page: number; limit: number; }>'.
      Types of property 'updates' are incompatible.
        Type 'Event<{ page: number; limit: number; id: number; }>' is not assignable to type 'Event<{ [key: string]: any; page: number; limit: number; }>'.
          Types of parameters 'payload' and 'payload' are incompatible.
            Type '{ [key: string]: any; page: number; limit: number; }' is not assignable to type '{ page: number; limit: number; id: number; }'.
    "
  `)
})
