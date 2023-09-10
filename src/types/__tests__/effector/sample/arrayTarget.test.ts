/* eslint-disable no-unused-vars */

import {
  createStore,
  createEvent,
  createEffect,
  sample,
  Store,
  Event,
  guard,
} from 'effector'

const typecheck = '{global}'

/**
 * Please note, that some tests may seem duplicating, having the same target sets but
 * in different order. This is crucial for testing the correctness of conditional tuple
 * iteration algorithms as they rely on order in some situations.
 */
describe('basic cases (should pass)', () => {
  test('{ source: number, clock: any, target: [number] } (should pass)', () => {
    const num = createEvent<number>()
    const anyt = createEvent<any>()

    sample({source: num, clock: anyt, target: [num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [numberString, number] } (should pass)', () => {
    const numberString = createEvent<number | string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()

    sample({source: num, clock: anyt, target: [numberString, num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [void] } (should pass)', () => {
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    const voidt = createEvent<void>()

    sample({source: num, clock: anyt, target: [voidt]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [number, void] } (should pass)', () => {
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    const voidt = createEvent<void>()

    sample({source: num, clock: anyt, target: [num, voidt]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [void, number] } (should pass)', () => {
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    const voidt = createEvent<void>()

    sample({source: num, clock: anyt, target: [voidt, num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('basic cases', () => {
  test('{ source: number, clock: any, target: [] } (?)', () => {
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    sample({source: num, clock: anyt, target: []})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [string] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: EventCallable<number>; clock: EventCallable<any>; target: EventCallable<string>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string; }[]; }'.
      "
    `)
  })

  test('{ source: number, clock: any, target: [number, string] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [num, str]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [string, number] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [str, num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [numberString, string] } (should fail)', () => {
    const numberString = createEvent<number | string>()
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [numberString, str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [string, numberString] } (should fail)', () => {
    const numberString = createEvent<number | string>()
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [str, numberString]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [number, stringBoolean] } (should fail)', () => {
    const stringBoolean = createEvent<string | boolean>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [num, stringBoolean]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [stringBoolean, number] } (should fail)', () => {
    const stringBoolean = createEvent<string | boolean>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [stringBoolean, num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [void, string] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    const voidt = createEvent<void>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [voidt, str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: EventCallable<number>; clock: EventCallable<any>; target: (EventCallable<void> | EventCallable<string>)[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
      "
    `)
  })

  test('{ source: number, clock: any, target: [string, void] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    const voidt = createEvent<void>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [str, voidt]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: EventCallable<number>; clock: EventCallable<any>; target: (EventCallable<void> | EventCallable<string>)[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number; targetType: string | void; }[]; }'.
      "
    `)
  })

  test('{ source: number, clock: any, target: [any, string] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [anyt, str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: any, target: [string, any] } (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: num, clock: anyt, target: [str, anyt]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('source & clock mapping (should pass)', () => {
  test('{ source: number, clock: number, fn: (s, c) => s + c, target: [number] } (should pass)', () => {
    const num = createEvent<number>()

    sample({
      source: num,
      clock: num,
      fn: (s, c) => s + c,
      target: [num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: number, clock: number, fn: (s, c) => s + c, target: [numberString, number] } (should pass)', () => {
    const numberString = createEvent<number | string>()
    const num = createEvent<number>()

    sample({
      source: num,
      clock: num,
      fn: (s, c) => s + c,
      target: [numberString, num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('combinable source object (should pass)', () => {
  test('{ source: { a: $num }, clock: any, target: [a_num] } (should pass)', () => {
    const $num = createStore<number>(0)
    const a_num = createEvent<{a: number}>()
    const anyt = createEvent<any>()

    sample({source: {a: $num}, clock: anyt, target: [a_num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: { a: $num, b: $num }, clock: any, target: [a_num] } (should pass)', () => {
    const $num = createStore<number>(0)
    const a_num = createEvent<{a: number}>()
    const anyt = createEvent<any>()

    sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: { a: $num, b: $num }, clock: any, target: [a_num_b_num] } (should pass)', () => {
    const $num = createStore<number>(0)
    const a_num_b_num = createEvent<{a: number; b: number}>()
    const anyt = createEvent<any>()

    sample({
      source: {a: $num, b: $num},
      clock: anyt,
      target: [a_num_b_num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('combinable source object (should fail)', () => {
  test('{ source: { a: $num }, clock: any, target: [a_str] } (should fail)', () => {
    const $num = createStore<number>(0)
    const a_str = createEvent<{a: string}>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: {a: $num}, clock: anyt, target: [a_str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: { a: StoreWritable<number>; }; clock: EventCallable<any>; target: EventCallable<{ a: string; }>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }[]; }'.
      "
    `)
  })

  test('{ source: { a: $num }, clock: any, target: [a_num, a_str] } (should fail)', () => {
    const $num = createStore<number>(0)
    const a_str = createEvent<{a: string}>()
    const a_num = createEvent<{a: number}>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: {a: $num}, clock: anyt, target: [a_num, a_str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: { a: $num }, clock: any, target: [a_num_b_str] } (should fail)', () => {
    const $num = createStore<number>(0)
    const a_num_b_str = createEvent<{a: number; b: string}>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: {a: $num}, clock: anyt, target: [a_num_b_str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: { a: StoreWritable<number>; }; clock: EventCallable<any>; target: EventCallable<{ a: number; b: string; }>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: number; b: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: number; b: string; }; }[]; }'.
      "
    `)
  })

  test('{ source: { a: $num }, clock: any, target: [a_num_b_num, a_num] } (should fail)', () => {
    const $num = createStore<number>(0)
    const a_num_b_num = createEvent<{a: number; b: number}>()
    const a_num = createEvent<{a: number}>()
    const anyt = createEvent<any>()

    //@ts-expect-error
    sample({source: {a: $num}, clock: anyt, target: [a_num_b_num, a_num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('combinable source object & clock mapping (should pass)', () => {
  test('{ source: { a: $num, b: $num }, clock: number, fn: (s, c) => s.a + s.b + c, target: [number] } (should pass)', () => {
    const $num = createStore<number>(0)
    const num = createEvent<number>()

    sample({
      source: {a: $num, b: $num},
      clock: num,
      fn: (s, c) => s.a + s.b + c,
      target: [num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: { a: $num, b: $num }, clock: number, fn: (s, c) => s.a + s.b + c, target: [numberString, number] } (should pass)', () => {
    const $num = createStore<number>(0)
    const numberString = createEvent<number | string>()
    const num = createEvent<number>()

    sample({
      source: {a: $num, b: $num},
      clock: num,
      fn: (s, c) => s.a + s.b + c,
      target: [numberString, num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('combinable source list (should pass)', () => {
  test('{ source: [$num], clock: any, target: [l_num] } (should pass)', () => {
    const $num = createStore<number>(0)
    const l_num = createEvent<[number]>()
    const anyt = createEvent<any>()

    sample({source: [$num], clock: anyt, target: [l_num]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: StoreWritable<number>[]; clock: EventCallable<any>; target: EventCallable<[number]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }[]; }'.
      "
    `)
  })

  test('{ source: [$num, $num], clock: any, target: [l_num_num] } (should pass)', () => {
    const $num = createStore<number>(0)
    const l_num_num = createEvent<[number, number]>()
    const anyt = createEvent<any>()

    sample({
      source: [$num, $num],
      clock: anyt,
      target: [l_num_num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: StoreWritable<number>[]; clock: EventCallable<any>; target: EventCallable<[number, number]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }[]; }'.
      "
    `)
  })
})

describe('combinable source list (should fail)', () => {
  test('{ source: [$num], clock: any, target: [l_str] } (should fail)', () => {
    const $num = createStore<number>(0)
    const l_str = createEvent<[string]>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: [$num], clock: anyt, target: [l_str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: StoreWritable<number>[]; clock: EventCallable<any>; target: EventCallable<[string]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string]; }[]; }'.
      "
    `)
  })

  test('{ source: [$num], clock: any, target: [l_num, l_str] } (should fail)', () => {
    const $num = createStore<number>(0)
    const l_str = createEvent<[string]>()
    const l_num = createEvent<[number]>()
    const anyt = createEvent<any>()
    //@ts-expect-error
    sample({source: [$num], clock: anyt, target: [l_num, l_str]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: StoreWritable<number>[]; clock: EventCallable<any>; target: (EventCallable<[number]> | EventCallable<[string]>)[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [string] | [number]; }[]; }'.
      "
    `)
  })
})

describe('combinable source list & clock mapping (should pass)', () => {
  test('{ source: [$num, $num], clock: number, fn: ([a, b], c) => a + b + c, target: [number] } (should pass)', () => {
    const $num = createStore<number>(0)
    const num = createEvent<number>()

    sample({
      source: [$num, $num],
      clock: num,
      fn: ([a, b], c) => a + b + c,
      target: [num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('{ source: [$num, $num], clock: number, fn: ([a, b], c) => a + b + c, target: [numberString, number] } (should pass)', () => {
    const $num = createStore<number>(0)
    const numberString = createEvent<number | string>()
    const num = createEvent<number>()

    sample({
      source: [$num, $num],
      clock: num,
      fn: ([a, b], c) => a + b + c,
      target: [numberString, num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
