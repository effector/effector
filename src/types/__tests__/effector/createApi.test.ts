/* eslint-disable no-unused-vars */
import {
  createStore,
  createApi,
  Store,
  Event,
  StoreWritable,
  EventCallable,
} from 'effector'

const typecheck = '{global}'

test('check1', () => {
  const store: StoreWritable<number> = createStore(0)
  const {event} = createApi(store, {
    event: (n, x: number) => x,
  })
  const createApi_check1: EventCallable<number> = event
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('check2', () => {
  const store: StoreWritable<number> = createStore(0)
  const {event} = createApi(store, {
    event: (n, x: number) => x,
  })
  //@ts-expect-error
  const createApi_check2: EventCallable<string> = event
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<number>' is not assignable to type 'EventCallable<string>'.
      Types of property 'prepend' are incompatible.
        Types of parameters 'fn' and 'fn' are incompatible.
          Type 'string' is not assignable to type 'number'.
    "
  `)
})
test('check3', () => {
  const store: StoreWritable<number> = createStore(0)
  const {event} = createApi(store, {
    event: (n, x) => x,
  })
  //@ts-expect-error
  const createApi_check3: EventCallable<string> = event
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<void>' is not assignable to type 'EventCallable<string>'.
      Types of property 'map' are incompatible.
        Type '<T>(fn: (payload: void) => T) => EventAsReturnType<T>' is not assignable to type '<T>(fn: (payload: string) => T) => EventAsReturnType<T>'.
          Types of parameters 'fn' and 'fn' are incompatible.
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
  const unknownEvent: EventCallable<unknown> = bar
  const explicitVoid: EventCallable<void> = foo
  const implicitVoid: EventCallable<void> = baz
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
  const $isLoading = createStore(false, {skipVoid: false})
  const {start} = createApi($isLoading, {
    start: (_, p) => (p === 1 ? true : undefined),
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
  const playerPosition = createStore(0, {skipVoid: false})

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
    no errors
    "
  `)
})

test('optional return false-positive check (should fail)', () => {
  const playerPosition = createStore(0)
  const api = createApi(playerPosition, {
    moveRight(pos, n: number) {
      if (pos + n !== 7) return pos + n
    },
  })

  //@ts-expect-error
  api.moveRight()
  //@ts-expect-error
  api.moveRight('no')

  expect(typecheck).toMatchInlineSnapshot(`
    "
    The 'this' context of type '{ moveRight: EventCallable<number>; }' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
    No overload matches this call.
      Overload 1 of 2, '(payload: number): number', gave the following error.
        Argument of type 'string' is not assignable to parameter of type 'number'.
      Overload 2 of 2, '(this: \\"Error: Expected 1 argument, but got 0\\", payload?: number | undefined): void', gave the following error.
        The 'this' context of type '{ moveRight: EventCallable<number>; }' is not assignable to method's 'this' of type '\\"Error: Expected 1 argument, but got 0\\"'.
    "
  `)
})
