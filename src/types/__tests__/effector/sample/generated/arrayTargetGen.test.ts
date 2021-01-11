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
const a_num = createEvent<{a: number}>()
const a_str = createEvent<{a: string}>()
const a_num_b_num = createEvent<{a: number; b: number}>()
const a_num_b_str = createEvent<{a: number; b: string}>()

describe('plain source', () => {
  describe('basic cases', () => {
    test('sample({source:number,clock:any,target:[number]}) (should pass)', () => {
      sample({source: numt, clock: anyt, target: [numt]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type 'Event<number>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:number,clock:any,target:[void]}) (should pass)', () => {
      sample({source: numt, clock: anyt, target: [voidt]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type 'Event<void>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type 'Event<void>[]' is not assignable to type 'Unit<unknown>'.
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
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type 'Event<string>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type 'Event<string>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:number,clock:any,target:[number,numberString]}) (should pass)', () => {
      sample({source: numt, clock: anyt, target: [numt, numberString]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:number,clock:any,target:[numberString,number]}) (should pass)', () => {
      sample({source: numt, clock: anyt, target: [numberString, numt]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<number>' is not assignable to type 'Combinable'.
              Type 'Event<number>' is not assignable to type '{ [key: string]: Store<any>; }'.
                Type '(Event<number> | Event<string | number>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:number,clock:any,target:[number,void]}) (should pass)', () => {
      sample({source: numt, clock: anyt, target: [numt, voidt]})
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
    test('sample({source:number,clock:any,target:[void,number]}) (should pass)', () => {
      sample({source: numt, clock: anyt, target: [voidt, numt]})
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
    test('sample({source:number,clock:any,target:[string,number]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [stringt, numt]})
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
    test('sample({source:number,clock:any,target:[number,string]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [numt, stringt]})
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
    test('sample({source:number,clock:any,target:[string,numberString]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [stringt, numberString]})
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
    test('sample({source:number,clock:any,target:[numberString,string]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [numberString, stringt]})
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
    test('sample({source:number,clock:any,target:[number,stringBoolean]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [numt, stringBoolean]})
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
    test('sample({source:number,clock:any,target:[stringBoolean,number]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [stringBoolean, numt]})
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
    test('sample({source:number,clock:any,target:[string,void]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [stringt, voidt]})
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
    test('sample({source:number,clock:any,target:[void,string]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [voidt, stringt]})
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
    test('sample({source:number,clock:any,target:[string,any]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [stringt, anyt]})
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
    test('sample({source:number,clock:any,target:[any,string]}) (should fail)', () => {
      //@ts-expect-error
      sample({source: numt, clock: anyt, target: [anyt, stringt]})
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
})
describe('combinable source', () => {
  describe('combinable', () => {
    test('sample({source:{a:num, b:num},clock:any,target:[a_num]}) (should pass)', () => {
      //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num]}) (should pass)', () => {
      //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num]}) (should pass)', () => {
      //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num,a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num, a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num,a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num, a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num,a_num_b_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num, a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num,a_num_b_num]}) (should pass)', () => {
      //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num, a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num,a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num, a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num,a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num, a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str,a_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str, a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str,a_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str, a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str,a_num_b_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str, a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str,a_num_b_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str, a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str,a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str, a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_str,a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_str, a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num,a_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num, a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num,a_num]}) (should pass)', () => {
      //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num, a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num,a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num, a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num,a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num, a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num,a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num, a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; b: number; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_num,a_num_b_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_num, a_num_b_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; b: number; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str,a_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str, a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str,a_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str, a_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str,a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str, a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str,a_str]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str, a_str]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str,a_num_b_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str, a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; b: number; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('sample({source:{a:num, b:num},clock:any,target:[a_num_b_str,a_num_b_num]}) (should fail)', () => {
      /*@ts-expect-error*/ //prettier-ignore
      sample({source: {a: $num, b: $num}, clock: anyt, target: [a_num_b_str, a_num_b_num]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: number; b: number; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
})
