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
  StoreWritable,
} from 'effector'

const typecheck = '{global}'

test('createStore', () => {
  const createStore_store1: StoreWritable<number> = createStore(0)
  //@ts-expect-error
  const createStore_store2: StoreWritable<string> = createStore(0)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'StoreWritable<number>' is not assignable to type 'StoreWritable<string>'.
      Type 'number' is not assignable to type 'string'.
    "
  `)
})
test('combine', () => {
  const ev = createEvent()
  const a = createStore('')
  const b = createStore(0)
  const c = combine(a, b, (a, b) => a + b)
  const check: Store<string> = c
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

describe('#reinit', () => {
  test('simple case', () => {
    const $store = createStore<Array<number>>([])
    const eventPush = createEvent<number>()
    $store.on(eventPush, (store, item) => [...store, item])
    eventPush(1)
    eventPush(2)
    eventPush(3)
    const before = $store.getState().length
    expect(before).toBe(3)
    $store.reinit()

    const after = $store.getState().length
    expect(after).toBe(0)

    $store.off(eventPush)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('StoreWritable#on (should pass)', () => {
  const event = createEvent()
  const store = createStore(0)
  store.on(event, (state, payload) => state)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('Store#on (should fail)', () => {
  const event = createEvent()
  const store = createStore(0)
  store.on(event, (state, payload) => state)
  const computed = store.map(() => 'hello')

  //@ts-expect-error
  computed.on(event, (state, payload) => state)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Property 'on' does not exist on type 'Store<string>'.
    Parameter 'state' implicitly has an 'any' type.
    Parameter 'payload' implicitly has an 'any' type.
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
    No overload matches this call.
      Overload 1 of 3, '(trigger: UnitTarget<string>, reducer: (state: string, payload: string) => string | void): StoreWritable<string>', gave the following error.
        Argument of type 'Event<string>' is not assignable to parameter of type 'UnitTarget<string>'.
          Property 'prepend' is missing in type 'Event<string>' but required in type 'EventCallable<string>'.
      Overload 2 of 3, '(triggers: UnitTarget<unknown>[], reducer: (state: string, payload: unknown) => string | void): StoreWritable<string>', gave the following error.
        Argument of type 'Event<string>' is not assignable to parameter of type 'UnitTarget<unknown>[]'.
          Type 'Event<string>' is missing the following properties from type 'UnitTarget<unknown>[]': length, pop, push, concat, and 27 more.
      Overload 3 of 3, '(triggers: Tuple<UnitTarget<any>>, reducer: (state: string, payload: never) => string | void): StoreWritable<string>', gave the following error.
        Argument of type 'Event<string>' is not assignable to parameter of type 'Tuple<UnitTarget<any>>'.
    "
  `)
})

test('StoreWritable#off (should pass)', () => {
  const event = createEvent()
  const store = createStore(0)
  store.off(event)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('Store#off (should fail)', () => {
  const event = createEvent()
  const store = createStore(0)
  const computed = store.map(() => 'hello')
  // @ts-expect-error
  computed.off(event)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Property 'off' does not exist on type 'Store<string>'.
    "
  `)
})

test('#subscribe', () => {
  const event = createEvent()
  const store = createStore(0)

  store.subscribe(() => {})
  const computed = store.map(() => 'hello')

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
  const $values: StoreWritable<{
    page: number
    limit: number
    [key: string]: any
  }> = createStore({page: 0, limit: 0, id: 1})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
