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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Event<number>'.
                Type 'Event<number>[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Event<number>'.
                Type 'Event<number>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<number> | Event<string | number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<number> | Event<string | number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type 'Event<void>[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type 'Event<void>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type 'never[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type 'never[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type 'Event<string>[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type 'Event<string>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<number>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<number>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<string | number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<string | number>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<string> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<number> | Event<string | boolean>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<number> | Event<string | boolean>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<number> | Event<string | boolean>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<number> | Event<string | boolean>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<string>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<void> | Event<string>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<any> | Event<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<any> | Event<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<any> | Event<string>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(Event<any> | Event<string>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(s: number, c: number) => number' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: number) => unknown'.
                Types of parameters 's' and 'source' are incompatible.
                  Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'number'.
                    Type 'any[]' is not assignable to type 'number'.
                      Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(s: number, c: number) => number' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: number) => unknown'.
                Types of parameters 's' and 'source' are incompatible.
                  Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'number'.
                    Type 'any[]' is not assignable to type 'number'.
                      Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(s: number, c: number) => number' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: number) => unknown'.
                Types of parameters 's' and 'source' are incompatible.
                  Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'number'.
                    Type 'any[]' is not assignable to type 'number'.
                      Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(s: number, c: number) => number' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: number) => unknown'.
                Types of parameters 's' and 'source' are incompatible.
                  Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'number'.
                    Type 'any[]' is not assignable to type 'number'.
                      Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(s: number, c: number) => number' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: number) => unknown'.
                Types of parameters 's' and 'source' are incompatible.
                  Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'number'.
                    Type 'any[]' is not assignable to type 'number'.
                      Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'Combinable'.
            Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '(s: number, c: number) => number' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: number) => unknown'.
                Types of parameters 's' and 'source' are incompatible.
                  Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'number'.
                    Type 'any[]' is not assignable to type 'number'.
                      Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type '(Event<{ a: string; }> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
      "
    `)
  })

  test('{ source: { a: $num }, clock: any, target: [a_num_b_num, a_num] } (should fail)', () => {
    const $num = createStore<number>(0)
    const a_num_b_num = createEvent<{a: number; b: number}>()
    const a_num = createEvent<{a: number}>()
    const anyt = createEvent<any>()
    sample({
      //@ts-expect-error
      source: {a: $num},
      clock: anyt,
      target: [a_num_b_num, a_num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '(Event<{ a: number; b: number; }> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<[number]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<[number, number]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<[string]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type '(Event<[number]> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
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
      No overload matches this call.
        The last overload gave the following error.
          Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
      "
    `)
  })
})
