/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, combine} from 'effector'
const typecheck = '{global}'

const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const numberString = createEvent<number | string>()
const stringBoolean = createEvent<string | boolean>()
const $num = createStore<number>(0)
const $str = createStore<string>('')
const a_num = createEvent<{a: number}>()
const a_str = createEvent<{a: string}>()
const a_num_b_num = createEvent<{a: number; b: number}>()
const a_num_b_str = createEvent<{a: number; b: string}>()
const l_num = createEvent<[number]>()
const l_str = createEvent<[string]>()
const l_num_str = createEvent<[number, string]>()
const l_num_num = createEvent<[number, number]>()

describe('basic cases', () => {
  test('sample({source:number,clock:any,target:[number]}) (should pass)', () => {
    sample({source: numt, clock: anyt, target: [numt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source:number,clock:any,target:[void]}) (should pass)', () => {
    sample({source: numt, clock: anyt, target: [voidt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source:number,clock:any,target:[string]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [stringt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
            Type 'Event<number>' is not assignable to type 'string'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[number,numberString]}) (should pass)', () => {
    sample({source: numt, clock: anyt, target: [numt, numberString]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source:number,clock:any,target:[numberString,number]}) (should pass)', () => {
    sample({source: numt, clock: anyt, target: [numberString, numt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source:number,clock:any,target:[number,void]}) (should pass)', () => {
    sample({source: numt, clock: anyt, target: [numt, voidt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source:number,clock:any,target:[void,number]}) (should pass)', () => {
    sample({source: numt, clock: anyt, target: [voidt, numt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('sample({source:number,clock:any,target:[string,number]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [stringt, numt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'never'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[number,string]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [numt, stringt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'never'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[string,numberString]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [stringt, numberString]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
            Type 'Event<number>' is not assignable to type 'string'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[numberString,string]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [numberString, stringt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
            Type 'Event<number>' is not assignable to type 'string'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[number,stringBoolean]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [numt, stringBoolean]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'never'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[stringBoolean,number]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [stringBoolean, numt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'never'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[string,void]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [stringt, voidt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
            Type 'Event<number>' is not assignable to type 'string'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[void,string]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [voidt, stringt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
            Type 'Event<number>' is not assignable to type 'string'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[string,any]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [stringt, anyt]})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type 'CombineSource<string>'.
            Type 'Event<number>' is not assignable to type 'string'.
      "
    `)
  })
  test('sample({source:number,clock:any,target:[any,string]}) (should fail)', () => {
    //@ts-expect-error
    sample({source: numt, clock: anyt, target: [anyt, stringt]})
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
describe('combinable', () => {
  describe('source:[a,b], fn:() => ...', () => {
    test('source:[a,b], fn:() => ... (should pass)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:() => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is missing the following properties from type '{ a: Store<number>; b: Store<number>; }': a, b
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Property 'a' is missing in type '(Store<number> | Store<string>)[]' but required in type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:() => ...', () => {
    test('source:[a], fn:() => ... (should pass)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:() => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is missing the following properties from type '{ a: Store<number>; b: Store<number>; }': a, b
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Property 'a' is missing in type 'Store<number>[]' but required in type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:() => ...', () => {
    test('source:{a,b}, fn:() => ... (should pass)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:() => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a}, fn:() => ...', () => {
    test('source:{a}, fn:() => ... (should pass)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:() => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: () => ({a: 2, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: wrong, clk) => ...', () => {
    test('source:[a,b], fn:(src: wrong, clk) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is missing the following properties from type '{ a: Store<number>; b: Store<string>; }': a, b
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; }>'.
              Property 'a' is missing in type '(Store<number> | Store<string>)[]' but required in type '{ a: Store<number>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: wrong, clk) => ...', () => {
    test('source:[a], fn:(src: wrong, clk) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string], cl: number) => ({a: cl, b: a}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is missing the following properties from type '{ a: Store<number>; b: Store<string>; }': a, b
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; }>'.
              Property 'a' is missing in type 'Store<number>[]' but required in type '{ a: Store<number>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: wrong, clk) => ...', () => {
    test('source:{a,b}, fn:(src: wrong, clk) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a, b }: { a: number; b: number; }, cl: number) => { a: number; b: string; }; target: [Event<{ a: number; b: string; }>, Event<...>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a, b }: { a: number; b: number; }, cl: number) => { a: number; b: string; }; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a, b }: { a: number; b: number; }, cl: number) => { a: number; b: string; }; target: [Event<{ a: number; b: string; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a, b }: { a: number; b: number; }, cl: number) => { a: number; b: string; }; target: [Event<{ a: number; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: wrong, clk) => ...', () => {
    test('source:{a}, fn:(src: wrong, clk) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: number}, cl: number) => ({
          a: b + cl,
          b: '',
        }),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: wrong) => ...', () => {
    test('source:[a,b], fn:(src: wrong) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([, b]: [number, number]) => ({a: b, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: wrong) => ...', () => {
    test('source:[a], fn:(src: wrong) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [string]) => ({a: 2, b: a}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: wrong) => ...', () => {
    test('source:{a,b}, fn:(src: wrong) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ b }: { a: number; b: number; }) => { a: number; b: string; }; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ b }: { a: number; b: number; }) => { a: number; b: string; }; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ b }: { a: number; b: number; }) => { a: number; b: string; }; target: [Event<{ a: number; b: string; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ b }: { a: number; b: number; }) => { a: number; b: string; }; target: [Event<{ a: number; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: wrong) => ...', () => {
    test('source:{a}, fn:(src: wrong) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({b}: {a: number; b: number}) => ({a: b, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src, clk: wrong) => ...', () => {
    test('source:[a,b], fn:(src, clk: wrong) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a]: [number, string], cl: string) => ({a, b: cl}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src, clk: wrong) => ...', () => {
    test('source:[a], fn:(src, clk: wrong) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: string) => ({a, b: cl}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src, clk: wrong) => ...', () => {
    test('source:{a,b}, fn:(src, clk: wrong) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a }: { a: number; b: string; }, cl: string) => { a: number; b: string; }; target: [Event<{ a: number; b: string; }>, Event<...>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>, Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a }: { a: number; b: string; }, cl: string) => { a: number; b: string; }; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; }>, Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a }: { a: number; b: string; }, cl: string) => { a: number; b: string; }; target: [Event<{ a: number; b: string; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; b: string; }>; clock: Unit<any>; target: [Event<{ a: number; b: string; }>]; greedy?: boolean | undefined; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: ({ a }: { a: number; b: string; }, cl: string) => { a: number; b: string; }; target: [Event<{ a: number; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src, clk: wrong) => ...', () => {
    test('source:{a}, fn:(src, clk: wrong) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a}: {a: number; b: string}, cl: string) => ({a, b: cl}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; fn: ({ a }: { a: number; b: string; }, cl: string) => { a: number; b: string; }; target: [Event<{ a: number; }>]; }' is not assignable to parameter of type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
              Object literal may only specify known properties, and 'fn' does not exist in type '{ source: CombineSource<{ a: number; }>; clock: Unit<any>; target: [Event<{ a: number; }>]; greedy?: boolean | undefined; }'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: t, clk: t) => ...', () => {
    test('source:[a,b], fn:(src: t, clk: t) => ... (should pass)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src: t, clk: t) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: t, clk: t) => ...', () => {
    test('source:[a], fn:(src: t, clk: t) => ... (should pass)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src: t, clk: t) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: t, clk: t) => ...', () => {
    test('source:{a,b}, fn:(src: t, clk: t) => ... (should pass)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src: t, clk: t) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: t, clk: t) => ...', () => {
    test('source:{a}, fn:(src: t, clk: t) => ... (should pass)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src: t, clk: t) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}, cl: number) => ({a: a + cl, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: t) => ...', () => {
    test('source:[a,b], fn:(src: t) => ... (should pass)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src: t) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]: [number, string]) => ({a, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: t) => ...', () => {
    test('source:[a], fn:(src: t) => ... (should pass)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src: t) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]: [number]) => ({a, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: t) => ...', () => {
    test('source:{a,b}, fn:(src: t) => ... (should pass)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src: t) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: t) => ...', () => {
    test('source:{a}, fn:(src: t) => ... (should pass)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src: t) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}: {a: number; b: string}) => ({a, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src, cl) => ...', () => {
    test('source:[a,b], fn:(src, cl) => ... (should pass)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src, cl) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b], cl) => ({a: a + cl, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src, cl) => ...', () => {
    test('source:[a], fn:(src, cl) => ... (should pass)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src, cl) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a], cl) => ({a: a + cl, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src, cl) => ...', () => {
    test('source:{a,b}, fn:(src, cl) => ... (should pass)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src, cl) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src, cl) => ...', () => {
    test('source:{a}, fn:(src, cl) => ... (should pass)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        "
      `)
    })
    test('source:{a}, fn:(src, cl) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}, cl) => ({a: a + cl, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src) => ...', () => {
    test('source:[a,b], fn:(src) => ... (should pass)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src) => ... (should fail)', () => {
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num, $str],
        clock: numt,
        fn: ([a, b]) => ({a, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type '(Store<number> | Store<string>)[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src) => ...', () => {
    test('source:[a], fn:(src) => ... (should pass)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src) => ... (should fail)', () => {
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_str, a_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num, a_str],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_num_b_num],
      })
      sample({
        source: [$num],
        clock: numt,
        fn: ([a]) => ({a, b: ''}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>[]' is not assignable to type 'CombineSource<{ a: string; }>'.
              Type 'Store<number>[]' is not assignable to type '{ a: Store<string>; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src) => ...', () => {
    test('source:{a,b}, fn:(src) => ... (should pass)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src) => ... (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src) => ...', () => {
    test('source:{a}, fn:(src) => ... (should pass)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        "
      `)
    })
    test('source:{a}, fn:(src) => ... (should fail)', () => {
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str, a_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num, a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num, a_str],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_num_b_num],
      })
      sample({
        source: {a: $num},
        clock: numt,
        fn: ({a, b}) => ({a, b}),
        target: [a_str],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        Property 'b' does not exist on type 'GetCombinedValue<{ a: Store<number>; }>'.
        "
      `)
    })
  })
  describe('source:[a,b]', () => {
    test('source:[a,b] (should pass)', () => {
      sample({source: [$num, $str], clock: numt, target: [l_num_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b] (should fail)', () => {
      /*@ts-expect-error*/
      sample({
        source: [$num, $str],
        clock: numt,
        target: [l_num_num, l_num_str],
      })
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num_num, l_str]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num_num, l_num]})
      /*@ts-expect-error*/
      sample({
        source: [$num, $str],
        clock: numt,
        target: [l_num_str, l_num_num],
      })
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num_str, l_str]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num_str, l_num]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_str, l_num_num]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_str, l_num_str]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_str, l_num]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num, l_num_num]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num, l_num_str]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num, l_str]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num_num]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_str]})
      /*@ts-expect-error*/
      sample({source: [$num, $str], clock: numt, target: [l_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '[Store<number>, Store<string>]' is not assignable to type 'CombineSource<[number]>'.
              Type '[Store<number>, Store<string>]' is not assignable to type '[Store<number>]'.
                Source has 2 element(s) but target allows only 1.
        "
      `)
    })
  })
  describe('source:[a]', () => {
    test('source:[a] (should pass)', () => {
      sample({source: [$num], clock: numt, target: [l_num_num, l_num_str]})
      sample({source: [$num], clock: numt, target: [l_num_num, l_num]})
      sample({source: [$num], clock: numt, target: [l_num_str, l_num_num]})
      sample({source: [$num], clock: numt, target: [l_num_str, l_num]})
      sample({source: [$num], clock: numt, target: [l_num, l_num_num]})
      sample({source: [$num], clock: numt, target: [l_num, l_num_str]})
      sample({source: [$num], clock: numt, target: [l_num_num]})
      sample({source: [$num], clock: numt, target: [l_num_str]})
      sample({source: [$num], clock: numt, target: [l_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '[Store<number>]' is not assignable to type 'CombineSource<[number, number]>'.
              Type '[Store<number>]' is not assignable to type '[Store<number>, Store<number>]'.
                Source has 1 element(s) but target requires 2.
        No overload matches this call.
          The last overload gave the following error.
            Type '[Store<number>]' is not assignable to type 'CombineSource<[number, string]>'.
              Type '[Store<number>]' is not assignable to type '[Store<number>, Store<string>]'.
                Source has 1 element(s) but target requires 2.
        "
      `)
    })
    test('source:[a] (should fail)', () => {
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_num_num, l_str]})
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_num_str, l_str]})
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_str, l_num_num]})
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_str, l_num_str]})
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_str, l_num]})
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_num, l_str]})
      /*@ts-expect-error*/
      sample({source: [$num], clock: numt, target: [l_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a,b}', () => {
    test('source:{a,b} (should pass)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num_b_str, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num, a_num_b_str],
      })
      sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_str]})
      sample({source: {a: $num, b: $str}, clock: numt, target: [a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b} (should fail)', () => {
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num_b_str, a_num_b_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num_b_str, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num_b_num, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num_b_num, a_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num_b_num, a_num],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_str, a_num_b_str],
      })
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_str, a_num_b_num],
      })
      /*@ts-expect-error*/
      sample({source: {a: $num, b: $str}, clock: numt, target: [a_str, a_num]})
      sample({
        source: {a: $num, b: $str},
        clock: numt,
        target: [a_num, a_num_b_num],
      })
      /*@ts-expect-error*/
      sample({source: {a: $num, b: $str}, clock: numt, target: [a_num, a_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_num]})
      /*@ts-expect-error*/
      sample({source: {a: $num, b: $str}, clock: numt, target: [a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
              Type 'Store<string>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<string>' is not assignable to type 'Store<number>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
  })
  describe('source:{a}', () => {
    test('source:{a} (should pass)', () => {
      sample({source: {a: $num}, clock: numt, target: [a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'Store<string>'.
        "
      `)
    })
    test('source:{a} (should fail)', () => {
      /*@ts-expect-error*/
      sample({
        source: {a: $num},
        clock: numt,
        target: [a_num_b_str, a_num_b_num],
      })
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num_b_str, a_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num_b_str, a_num]})
      /*@ts-expect-error*/
      sample({
        source: {a: $num},
        clock: numt,
        target: [a_num_b_num, a_num_b_str],
      })
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num_b_num, a_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num_b_num, a_num]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_str, a_num_b_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_str, a_num_b_num]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_str, a_num]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num, a_num_b_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num, a_num_b_num]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num, a_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num_b_str]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num_b_num]})
      /*@ts-expect-error*/
      sample({source: {a: $num}, clock: numt, target: [a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Store<number>' is not assignable to type 'never'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: string; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<string>; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; }' is not assignable to type 'CombineSource<{ a: number; b: number; }>'.
              Property 'b' is missing in type '{ a: Store<number>; }' but required in type '{ a: Store<number>; b: Store<number>; }'.
        "
      `)
    })
  })
})
