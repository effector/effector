/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, combine} from 'effector'
const typecheck = '{global}'

/** used as valid source type */
type AN = {a: number}
/** used as invalid source type */
type AS = {a: string}
/** used as valid source type */
type AB = {a: number; b: string}
/** used as invalid source type */
type ABN = {a: number; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const numberString = createEvent<number | string>()
const stringBoolean = createEvent<string | boolean>()
const $num = createStore<number>(0)
const $str = createStore<string>('')
const a_num = createEvent<AN>()
const a_str = createEvent<AS>()
const a_num_b_num = createEvent<ABN>()
const a_num_b_str = createEvent<AB>()
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string | number>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string | number>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string | number>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string | number>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string | boolean>' is not assignable to type '\\"incompatible unit in target array\\"'.
            Type 'Event<number>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
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
          Type 'Event<string>' is not assignable to type '\\"incompatible unit in target array\\"'.
      "
    `)
  })
})
describe('combinable', () => {
  describe('source:[a,b], fn:() => ...', () => {
    test('source:[a,b], fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:() => ...', () => {
    test('source:[a], fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str]})
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:() => ...', () => {
    test('source:{a,b}, fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:() => ...', () => {
    test('source:{a}, fn:() => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:() => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: () => ({a: 2, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: wrong, clk) => ...', () => {
    test('source:[a,b], fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, number], cl: number) => ({a: b + cl, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'string' is not assignable to type 'number'.
                    Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                      The types of '__.b' are incompatible between these types.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'string' is not assignable to type 'number'.
                    Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                      The types of '__.b' are incompatible between these types.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a, b]: [number, number], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: wrong, clk) => ...', () => {
    test('source:[a], fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string], cl: number) => ({a: cl, b: a}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'number' is not assignable to type 'string'.
                    Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                      The types of '__.b' are incompatible between these types.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'number' is not assignable to type 'string'.
                    Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                      The types of '__.b' are incompatible between these types.
                        Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string], cl: number) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: wrong, clk) => ...', () => {
    test('source:{a,b}, fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: ABN, cl: number) => ({a: b + cl, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a, b }: ABN, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: wrong, clk) => ...', () => {
    test('source:{a}, fn:(src: wrong, clk) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS, cl: number) => ({a: cl, b: a}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS, cl: number) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: wrong) => ...', () => {
    test('source:[a,b], fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([,b]: [number, number]) => ({a: b, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([, b]: [number, number]) => { a: number; b: string; }' is not assignable to type '(source: [number, string], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number, string]' is not assignable to type '[number, number]'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: wrong) => ...', () => {
    test('source:[a], fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [string]) => ({a: 2, b: a}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
                        Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          Types of property '__' are incompatible.
                            Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                        Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                          The types of '__.b' are incompatible between these types.
                            Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '([a]: [string]) => { a: number; b: string; }' is not assignable to type '(source: [number], clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '[number]' is not assignable to type '[string]'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: wrong) => ...', () => {
    test('source:{a,b}, fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({b}: ABN) => ({a: b, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ b }: ABN) => { a: number; b: string; }' is not assignable to type '(source: { a: number; b: string; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; b: string; }' is not assignable to type 'ABN'.
                  Types of property 'b' are incompatible.
                    Type 'string' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: wrong) => ...', () => {
    test('source:{a}, fn:(src: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AS) => ({a: 0, b: a}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
                            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              Types of property '__' are incompatible.
                                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                              The types of '__.b' are incompatible between these types.
                                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type '({ a }: AS) => { a: number; b: string; }' is not assignable to type '(source: { a: number; }, clock: number) => { a: number; b: string; }'.
              Types of parameters '__0' and 'source' are incompatible.
                Type '{ a: number; }' is not assignable to type 'AS'.
                  Types of property 'a' are incompatible.
                    Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src, clk: wrong) => ...', () => {
    test('source:[a,b], fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a]: [number, string], cl: string) => ({a, b: cl}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is missing the following properties from type 'readonly Unit<string>[]': concat, join, slice, indexOf, and 15 more.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is missing the following properties from type 'readonly Unit<string>[]': concat, join, slice, indexOf, and 15 more.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src, clk: wrong) => ...', () => {
    test('source:[a], fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: string) => ({a, b: cl}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src, clk: wrong) => ...', () => {
    test('source:{a,b}, fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a}: AB, cl: string) => ({a, b: cl}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src, clk: wrong) => ...', () => {
    test('source:{a}, fn:(src, clk: wrong) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: string) => ({a, b: cl}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
                      Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        Types of property '__' are incompatible.
                          Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                      Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                        The types of '__.b' are incompatible between these types.
                          Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  The types of '__.b' are incompatible between these types.
                    Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
                Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                  Types of property '__' are incompatible.
                    Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Clock<string>'.
              Type 'Event<number>' is not assignable to type 'UnitList<string>'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: t, clk: t) => ...', () => {
    test('source:[a,b], fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_str, a_num]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num, a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string], cl: number) => ({a: a + cl, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: t, clk: t) => ...', () => {
    test('source:[a], fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number], cl: number) => ({a: a + cl, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: t, clk: t) => ...', () => {
    test('source:{a,b}, fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB, cl: number) => ({a: a + cl, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: t, clk: t) => ...', () => {
    test('source:{a}, fn:(src: t, clk: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src: t, clk: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN, cl: number) => ({a: a + cl, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src: t) => ...', () => {
    test('source:[a,b], fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_str, a_num]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num, a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]: [number, string]) => ({a, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src: t) => ...', () => {
    test('source:[a], fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]: [number]) => ({a, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src: t) => ...', () => {
    test('source:{a,b}, fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}: AB) => ({a, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src: t) => ...', () => {
    test('source:{a}, fn:(src: t) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src: t) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}: AN) => ({a, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src, cl) => ...', () => {
    test('source:[a,b], fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_str, a_num]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num, a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b], cl) => ({a: a + cl, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src, cl) => ...', () => {
    test('source:[a], fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a], cl) => ({a: a + cl, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src, cl) => ...', () => {
    test('source:{a,b}, fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}, cl) => ({a: a + cl, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src, cl) => ...', () => {
    test('source:{a}, fn:(src, cl) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src, cl) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}, cl) => ({a: a + cl, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a,b], fn:(src) => ...', () => {
    test('source:[a,b], fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_str, a_num]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num, a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_str]})
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b], fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, fn: ([a, b]) => ({a, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a], fn:(src) => ...', () => {
    test('source:[a], fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_str]})
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a], fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: [$num], clock: numt, fn: ([a]) => ({a, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a,b}, fn:(src) => ...', () => {
    test('source:{a,b}, fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b}, fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, fn: ({a, b}) => ({a, b}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:{a}, fn:(src) => ...', () => {
    test('source:{a}, fn:(src) => ... (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_str, a_num]})
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num, a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_str]})
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a}, fn:(src) => ... (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, fn: ({a}) => ({a, b: ''}), target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
                  Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    Types of property '__' are incompatible.
                      Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
                  Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
                    The types of '__.b' are incompatible between these types.
                      Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type 'AS' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('source:[a,b]', () => {
    test('source:[a,b] (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num, $str], clock: numt, target: [l_num_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:[a,b] (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, target: [l_num_num, l_num_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, target: [l_num_num, l_str]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, target: [l_num_num, l_num]})
        /*@ts-expect-error*/
        sample({source: [$num, $str], clock: numt, target: [l_num_str, l_num_num]})
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        "
      `)
    })
  })
  describe('source:[a]', () => {
    test('source:[a] (should pass)', () => {
      //prettier-ignore
      {
        sample({source: [$num], clock: numt, target: [l_num_num, l_num_str]})
        sample({source: [$num], clock: numt, target: [l_num_num, l_num]})
        sample({source: [$num], clock: numt, target: [l_num_str, l_num_num]})
        sample({source: [$num], clock: numt, target: [l_num_str, l_num]})
        sample({source: [$num], clock: numt, target: [l_num, l_num_num]})
        sample({source: [$num], clock: numt, target: [l_num, l_num_str]})
        sample({source: [$num], clock: numt, target: [l_num_num]})
        sample({source: [$num], clock: numt, target: [l_num_str]})
        sample({source: [$num], clock: numt, target: [l_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        "
      `)
    })
    test('source:[a] (should fail)', () => {
      //prettier-ignore
      {
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number, string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number]>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[string]>' is not assignable to type '\\"incompatible unit in target array\\"'.
        "
      `)
    })
  })
  describe('source:{a,b}', () => {
    test('source:{a,b} (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_str, a_num]})
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num, a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_str]})
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a,b} (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_num, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_num, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_str, a_num_b_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num, b: $str}, clock: numt, target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        "
      `)
    })
  })
  describe('source:{a}', () => {
    test('source:{a} (should pass)', () => {
      //prettier-ignore
      {
        sample({source: {a: $num}, clock: numt, target: [a_num]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('source:{a} (should fail)', () => {
      //prettier-ignore
      {
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, target: [a_num_b_str, a_num_b_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, target: [a_num_b_str, a_str]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, target: [a_num_b_str, a_num]})
        /*@ts-expect-error*/
        sample({source: {a: $num}, clock: numt, target: [a_num_b_num, a_num_b_str]})
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
        sample({source: {a: $num}, clock: numt, target: [a_str]})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AN>' is not assignable to type '\\"incompatible unit in target array\\"'.
              Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target array\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AS>' is not assignable to type '\\"incompatible unit in target array\\"'.
        "
      `)
    })
  })
})
