/* eslint-disable no-unused-vars */
import {createStore, createApi, Store, Event} from 'effector'

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
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: number) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type 'number' is not assignable to type 'string'.
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

  api.double()
  api.multiply()
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

test('createApi void calls edge case (should pass)', () => {
  const $isLoading = createStore(false)
  const {start, end} = createApi($isLoading, {
    start: () => true,
    end: () => false,
  })

  start()

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('createApi returns nothing from reducer (should pass)', () => {
  const $isLoading = createStore(false)
  const {start} = createApi($isLoading, {
    start: (_, p) => p === 1 ? true : undefined,
  })

  start()

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('type validation', () => {
  test('correct call (should pass)', () => {
    const x = createStore(0)
    const {inc} = createApi(x, {
      inc: (x, y: number) => x + y,
    })
    inc(1)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('void instead of value (should fail)', () => {
    const x = createStore(0)
    const {inc} = createApi(x, {
      inc: (x, y: number) => x + y,
    })
    //@ts-expect-error
    inc()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      The 'this' context of type 'void' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
      "
    `)
  })
  test('incorrect value (should fail)', () => {
    const x = createStore(0)
    const {inc} = createApi(x, {
      inc: (x, y: number) => x + y,
    })
    //@ts-expect-error
    inc('no')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        Overload 1 of 2, '(payload: number): number', gave the following error.
          Argument of type 'string' is not assignable to parameter of type 'number'.
        Overload 2 of 2, '(this: \\"Error: Expected 1 argument, but got 0\\", payload?: number | undefined): void', gave the following error.
          The 'this' context of type 'void' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
      "
    `)
  })
})

test('optional return (should pass)', () => {
  const playerPosition = createStore(0)

  const api = createApi(playerPosition, {
    moveLeft: (pos, n: number) => pos - n,
    moveRight(pos, n: number) {
      if (pos + n !== 7) return pos + n
    },
    jump: pos => (pos === 7 ? undefined : 0),
  })

  api.moveRight(10)
  api.moveLeft(5)
  api.moveRight(2)
  api.jump()

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '(pos: number, n: number) => number | undefined' is not assignable to type '(store: number, e: any) => number'.
      Type 'number | undefined' is not assignable to type 'number'.
        Type 'undefined' is not assignable to type 'number'.
    Type 'number | undefined' is not assignable to type 'number'.
      Type 'undefined' is not assignable to type 'number'.
    No overload matches this call.
      Overload 1 of 2, '(payload: void): void', gave the following error.
        Argument of type 'number' is not assignable to parameter of type 'void'.
      Overload 2 of 2, '(this: void, payload?: void | undefined): void', gave the following error.
        Argument of type '10' is not assignable to parameter of type 'void | undefined'.
    No overload matches this call.
      Overload 1 of 2, '(payload: void): void', gave the following error.
        Argument of type 'number' is not assignable to parameter of type 'void'.
      Overload 2 of 2, '(this: void, payload?: void | undefined): void', gave the following error.
        Argument of type '5' is not assignable to parameter of type 'void | undefined'.
    No overload matches this call.
      Overload 1 of 2, '(payload: void): void', gave the following error.
        Argument of type 'number' is not assignable to parameter of type 'void'.
      Overload 2 of 2, '(this: void, payload?: void | undefined): void', gave the following error.
        Argument of type '2' is not assignable to parameter of type 'void | undefined'.
    "
  `)
})
