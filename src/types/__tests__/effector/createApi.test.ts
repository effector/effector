/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  createApi,
  createStoreObject,
  restore,
  combine,
  Store,
  Event,
  /*::type*/ CompositeName,
  /*::type*/ kind,
  sample,
} from 'effector'

const typecheck = '{global}'

test('check1', () => {
  const store: Store<number> = createStore(0)
  const {event} = createApi(store, {
    event: (n, x: number) => x,
  })
  const createApi_check1: Event<number> = event
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('check2', () => {
  const store: Store<number> = createStore(0)
  const {event} = createApi(store, {
    event: (n, x: number) => x,
  })
  //@ts-expect-error
  const createApi_check2: Event<string> = event
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<number>' is not assignable to type 'Event<string>'.
    "
  `)
})
test('check3', () => {
  const store: Store<number> = createStore(0)
  const {event} = createApi(store, {
    event: (n, x) => x,
  })
  //@ts-expect-error
  const createApi_check3: Event<string> = event
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<void>' is not assignable to type 'Event<string>'.
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: void) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type 'void' is not assignable to type 'string'.
    "
  `)
})
test('createApi void calls', () => {
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
    no errors
    "
  `)
})
test('createApi unknown/void support', () => {
  const store = createStore(0)
  const {foo, bar, baz} = createApi(store, {
    foo: (_, __: void) => 0,
    bar: (_, __: unknown) => 0,
    baz: (_, __) => 0,
  })
  const unknownEvent: Event<unknown> = bar
  const explicitVoid: Event<void> = foo
  const implicitVoid: Event<void> = baz
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
