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
describe('sample multitarget support', () => {
  const voidt = createEvent<void>()
  const anyt = createEvent<any>()
  const unknwn = createEvent<unknown>()

  const num = createEvent<number>()
  const str = createEvent<string>()

  const numberString = createEvent<number | string>()
  const stringBoolean = createEvent<string | boolean>()

  const a_num = createEvent<{a: number}>()
  const a_str = createEvent<{a: string}>()
  const a_num_b_num = createEvent<{a: number; b: number}>()
  const a_num_b_str = createEvent<{a: number; b: string}>()

  const l_num = createEvent<[number]>()
  const l_str = createEvent<[string]>()
  const l_num_num = createEvent<[number, number]>()

  const $num = createStore<number>(0)

  describe('basic cases (should pass)', () => {
    test('{ source: number, clock: any, target: [number] }', () => {
      sample({source: num, clock: anyt, target: [num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: number, clock: any, target: [numberString, number] }', () => {
      sample({source: num, clock: anyt, target: [numberString, num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: number, clock: any, target: [void] }', () => {
      sample({source: num, clock: anyt, target: [voidt]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: number, clock: any, target: [number, void] }', () => {
      sample({source: num, clock: anyt, target: [num, voidt]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: number, clock: any, target: [void, number] }', () => {
      sample({source: num, clock: anyt, target: [voidt, num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })

  describe('basic cases (should fail)', () => {
    test('{ source: number, clock: any, target: [] }', () => {
      sample({source: num, clock: anyt, target: []})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'never'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [string] }', () => {
      sample({source: num, clock: anyt, target: [str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [number, string] }', () => {
      sample({source: num, clock: anyt, target: [num, str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'never'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [string, number] }', () => {
      sample({source: num, clock: anyt, target: [str, num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'never'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [numberString, string] }', () => {
      sample({source: num, clock: anyt, target: [numberString, str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [string, numberString] }', () => {
      sample({source: num, clock: anyt, target: [str, numberString]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [number, stringBoolean] }', () => {
      sample({source: num, clock: anyt, target: [num, stringBoolean]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'never'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [stringBoolean, number] }', () => {
      sample({source: num, clock: anyt, target: [stringBoolean, num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'never'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [void, string] }', () => {
      sample({source: num, clock: anyt, target: [voidt, str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [string, void] }', () => {
      sample({source: num, clock: anyt, target: [str, voidt]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [any, string] }', () => {
      sample({source: num, clock: anyt, target: [anyt, str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })

    test('{ source: number, clock: any, target: [string, any] }', () => {
      sample({source: num, clock: anyt, target: [str, anyt]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
              Type 'Event<number>' is not assignable to type 'string'.
        "
      `)
    })
  })

  describe('source & clock mapping (should pass)', () => {
    test('{ source: number, clock: number, fn: (s, c) => s + c, target: [number] }', () => {
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

    test('{ source: number, clock: number, fn: (s, c) => s + c, target: [numberString, number] }', () => {
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
    test('{ source: { a: $num }, clock: any, target: [a_num] }', () => {
      sample({source: {a: $num}, clock: anyt, target: [a_num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: { a: $num, b: $num }, clock: any, target: [a_num] }', () => {
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: { a: $num, b: $num }, clock: any, target: [a_num_b_num] }', () => {
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
    test('{ source: { a: $num }, clock: any, target: [a_str] }', () => {
      sample({source: {a: $num}, clock: anyt, target: [a_str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })

    test('{ source: { a: $num }, clock: any, target: [a_num, a_str] }', () => {
      sample({source: {a: $num}, clock: anyt, target: [a_num, a_str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        "
      `)
    })

    test('{ source: { a: $num }, clock: any, target: [a_num_b_str] }', () => {
      sample({source: {a: $num}, clock: anyt, target: [a_num_b_str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        "
      `)
    })

    test('{ source: { a: $num }, clock: any, target: [a_num_b_num, a_num] }', () => {
      sample({
        source: {a: $num},
        clock: anyt,
        target: [a_num_b_num, a_num],
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        "
      `)
    })
  })

  describe('combinable source object & clock mapping (should pass)', () => {
    test('{ source: { a: $num, b: $num }, clock: number, fn: (s, c) => s.a + s.b + c, target: [number] }', () => {
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

    test('{ source: { a: $num, b: $num }, clock: number, fn: (s, c) => s.a + s.b + c, target: [numberString, number] }', () => {
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
    test('{ source: [$num], clock: any, target: [l_num] }', () => {
      sample({source: [$num], clock: anyt, target: [l_num]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })

    test('{ source: [$num, $num], clock: any, target: [l_num_num] }', () => {
      sample({
        source: [$num, $num],
        clock: anyt,
        target: [l_num_num],
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })

  describe('combinable source list (should fail)', () => {
    test('{ source: [$num], clock: any, target: [l_str] }', () => {
      sample({source: [$num], clock: anyt, target: [l_str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })

    test('{ source: [$num], clock: any, target: [l_num, l_str] }', () => {
      sample({source: [$num], clock: anyt, target: [l_num, l_str]})

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        "
      `)
    })
  })

  describe('combinable source list & clock mapping (should pass)', () => {
    test('{ source: [$num, $num], clock: number, fn: ([a, b], c) => a + b + c, target: [number] }', () => {
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

    test('{ source: [$num, $num], clock: number, fn: ([a, b], c) => a + b + c, target: [numberString, number] }', () => {
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
})
