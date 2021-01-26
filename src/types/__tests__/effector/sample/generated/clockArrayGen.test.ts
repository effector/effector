/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'

type AB = {a: string; b: number}
const voidt = createEvent()
const anyt = createEvent<any>()
const str = createEvent<string>()
const strClk = createEvent<string>()
const num = createEvent<number>()
const a = createStore('')
const b = createStore(0)
const aTarget = createEvent<{a: string}>()
const abTarget = createEvent<AB>()
const aclock = createEvent<{a: string; clock: any}>()
const abclock = createEvent<{a: string; b: number; clock: any}>()
const fnAbClockString = ({a, b}: AB, clock: string) => ({a, b, clock})
const fnAbClockAny = ({a, b}: AB, clock: any) => ({a, b, clock})
const fnAString = (a: string) => ({a})
const fnAStringClockString = (a: string, clock: string) => ({a, clock})
const fnAStringClockAny = (a: string, clock: any) => ({a, clock})
const fnAb = ({a, b}: AB) => ({a, b})

describe('no clock', () => {
  test('noClock, noTarget, plain (should pass)', () => {
    //prettier-ignore
    sample({source: a})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, plain (should pass)', () => {
    //prettier-ignore
    sample({source: a, target: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, noTarget, plain, fn, typedFn (should pass)', () => {
    //prettier-ignore
    sample({source: a, fn: fnAString})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, noTarget, plain, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: a, fn: ()=>({a:''})})
      sample({source: a, fn: (a) => ({a})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, plain, fn, typedFn (should pass)', () => {
    //prettier-ignore
    sample({source: a, target: aTarget, fn: fnAString})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, plain, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: a, target: aTarget, fn: ()=>({a:''})})
      sample({source: a, target: aTarget, fn: (a) => ({a})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, noTarget, combinable (should pass)', () => {
    //prettier-ignore
    sample({source: {a,b}})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, combinable (should pass)', () => {
    //prettier-ignore
    sample({source: {a,b}, target: abTarget})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, noTarget, combinable, fn, typedFn (should pass)', () => {
    //prettier-ignore
    sample({source: {a,b}, fn: fnAb})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, noTarget, combinable, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a,b}, fn: ()=>({a:'',b:2})})
      sample({source: {a,b}, fn: ({a,b}) => ({a,b})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, combinable, fn, typedFn (should pass)', () => {
    //prettier-ignore
    sample({source: {a,b}, target: abTarget, fn: fnAb})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noClock, combinable, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({source: {a,b}, target: abTarget, fn: ()=>({a:'',b:2})})
      sample({source: {a,b}, target: abTarget, fn: ({a,b}) => ({a,b})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('no source', () => {
  test('noSource, noTarget, plain (should pass)', () => {
    //prettier-ignore
    {
      sample({clock: [strClk,anyt]})
      sample({clock: [anyt]})
      sample({clock: [strClk]})
      sample({clock: anyt})
      sample({clock: strClk})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<any> | Event<string>)[]; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<any> | Event<string>)[]; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, fn, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<any>[]; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<any>[]; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, fn, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<string>[]; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<string>[]; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, fn, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<any>; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: AnyClock; fn: (source: unknown, clock: any) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<any>; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: AnyClock; fn: (source: unknown, clock: any) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, fn, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<string>; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<string>; fn: (source: unknown, clock: string) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<string>; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<string>; fn: (source: unknown, clock: string) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, fn, target
      "
    `)
  })
  test('noSource, plain (should pass)', () => {
    //prettier-ignore
    {
      sample({clock: [strClk,anyt], target: str})
      sample({clock: [anyt], target: str})
      sample({clock: [strClk], target: str})
      sample({clock: anyt, target: str})
      sample({clock: strClk, target: str})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<string>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<string>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<string>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<string>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<string>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      "
    `)
  })
  test('noSource, noTarget, plain, fn, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock: [strClk,anyt], fn: fnAString})
      sample({clock: [anyt], fn: fnAString})
      sample({clock: [strClk], fn: fnAString})
      sample({clock: anyt, fn: fnAString})
      sample({clock: strClk, fn: fnAString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
            Types of parameters 'a' and 'source' are incompatible.
              Type 'unknown' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: any) => { a: string; }'.
            Types of parameters 'a' and 'source' are incompatible.
              Type 'unknown' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: string) => { a: string; }'.
            Types of parameters 'a' and 'source' are incompatible.
              Type 'unknown' is not assignable to type 'string'.
      "
    `)
  })
  test('noSource, noTarget, plain, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock: [anyt,num], fn: ()=>({a:'',b:2})})
      sample({clock: [strClk,anyt], fn: ()=>({a:'',b:2})})
      sample({clock: [strClk,num], fn: ()=>({a:'',b:2})})
      sample({clock: [num,anyt], fn: ()=>({a:'',b:2})})
      sample({clock: [voidt,anyt], fn: ()=>({a:'',b:2})})
      sample({clock: [voidt,strClk], fn: ()=>({a:'',b:2})})
      sample({clock: [voidt,num], fn: ()=>({a:'',b:2})})
      sample({clock: [anyt], fn: ()=>({a:'',b:2})})
      sample({clock: [strClk], fn: ()=>({a:'',b:2})})
      sample({clock: [num], fn: ()=>({a:'',b:2})})
      sample({clock: [voidt], fn: ()=>({a:'',b:2})})
      sample({clock: anyt, fn: ()=>({a:'',b:2})})
      sample({clock: strClk, fn: ()=>({a:'',b:2})})
      sample({clock: num, fn: ()=>({a:'',b:2})})
      sample({clock: voidt, fn: ()=>({a:'',b:2})})
      sample({clock: [strClk,anyt], fn: (a) => ({a})})
      sample({clock: [anyt], fn: (a) => ({a})})
      sample({clock: [strClk], fn: (a) => ({a})})
      sample({clock: anyt, fn: (a) => ({a})})
      sample({clock: strClk, fn: (a) => ({a})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<any> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<any> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<any> | Event<string>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<any> | Event<string>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<string> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<string> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<any> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<any> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<any> | Event<void>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<any> | Event<void>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<void> | Event<string>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<void> | Event<string>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<void> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<void> | Event<number>)[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<any>[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<any>[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<string>[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<string>[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<number>[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<number>[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<void>[]; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<void>[]; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<any>; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: AnyClock; fn: (source: unknown, clock: any) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<any>; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: AnyClock; fn: (source: unknown, clock: any) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<string>; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<string>; fn: (source: unknown, clock: string) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<string>; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<string>; fn: (source: unknown, clock: string) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<number>; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<number>; fn: (source: unknown, clock: number) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<number>; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<number>; fn: (source: unknown, clock: number) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<void>; fn: () => { a: string; b: number; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<void>; fn: (source: unknown, clock: void) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<void>; fn: () => { a: string; b: number; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<void>; fn: (source: unknown, clock: void) => { a: string; b: number; }; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: (Event<any> | Event<string>)[]; fn: (a: unknown) => { a: unknown; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: (Event<any> | Event<string>)[]; fn: (a: unknown) => { a: unknown; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<any>[]; fn: (a: unknown) => { a: unknown; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<any>[]; fn: (a: unknown) => { a: unknown; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<string>[]; fn: (a: unknown) => { a: unknown; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<string>[]; fn: (a: unknown) => { a: unknown; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<unknown>; fn: (source: unknown, clock: unknown) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<any>; fn: (a: unknown) => { a: unknown; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: AnyClock; fn: (source: unknown, clock: any) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<any>; fn: (a: unknown) => { a: unknown; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: AnyClock; fn: (source: unknown, clock: any) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ clock: Event<string>; fn: (a: unknown) => { a: unknown; }; }' is not assignable to parameter of type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<string>; fn: (source: unknown, clock: string) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }'.
            Type '{ clock: Event<string>; fn: (a: unknown) => { a: unknown; }; }' is missing the following properties from type '{ source: { [key: string]: Store<any>; } | [Store<any>] | Store<any>[] | Unit<unknown>; clock: Clock<string>; fn: (source: unknown, clock: string) => unknown; target: \\"non-unit item in target array\\"[] | [...]; greedy?: boolean | undefined; }': source, target
      "
    `)
  })
  test('noSource, plain, fn, typedFn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock: [strClk,anyt], target: aTarget, fn: fnAString})
      sample({clock: [anyt], target: aTarget, fn: fnAString})
      sample({clock: [strClk], target: aTarget, fn: fnAString})
      sample({clock: anyt, target: aTarget, fn: fnAString})
      sample({clock: strClk, target: aTarget, fn: fnAString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: unknown) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: any) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: any) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: string) => { a: string; }'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
              Type '(a: string) => { a: string; }' is not assignable to type '(source: unknown, clock: string) => { a: string; }'.
      "
    `)
  })
  test('noSource, plain, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock: [anyt,num], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [strClk,anyt], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [strClk,num], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [num,anyt], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [voidt,anyt], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [voidt,strClk], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [voidt,num], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [anyt], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [strClk], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [num], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [voidt], target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: anyt, target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: strClk, target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: num, target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: voidt, target: aTarget, fn: ()=>({a:'',b:2})})
      sample({clock: [strClk,anyt], target: aTarget, fn: (a) => ({a})})
      sample({clock: [anyt], target: aTarget, fn: (a) => ({a})})
      sample({clock: [strClk], target: aTarget, fn: (a) => ({a})})
      sample({clock: anyt, target: aTarget, fn: (a) => ({a})})
      sample({clock: strClk, target: aTarget, fn: (a) => ({a})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<{ a: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
            Type 'Event<{ a: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      "
    `)
  })
})
test('noTarget, plain (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt]})
    sample({source: a, clock: [str,anyt,voidt]})
    sample({source: a, clock: [voidt,str,anyt]})
    sample({source: a, clock: [voidt,anyt,str]})
    sample({source: a, clock: [anyt,str,voidt]})
    sample({source: a, clock: [anyt,voidt,str]})
    sample({source: a, clock: [voidt,str]})
    sample({source: a, clock: [str]})
    sample({source: a, clock: [voidt]})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: str})
    sample({source: a, clock: [str,anyt,voidt], target: str})
    sample({source: a, clock: [voidt,str,anyt], target: str})
    sample({source: a, clock: [voidt,anyt,str], target: str})
    sample({source: a, clock: [anyt,str,voidt], target: str})
    sample({source: a, clock: [anyt,voidt,str], target: str})
    sample({source: a, clock: [voidt,str], target: str})
    sample({source: a, clock: [str], target: str})
    sample({source: a, clock: [voidt], target: str})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, plain, fn, fnClock, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], fn: fnAStringClockAny})
    sample({source: a, clock: [str,anyt,voidt], fn: fnAStringClockAny})
    sample({source: a, clock: [voidt,str,anyt], fn: fnAStringClockAny})
    sample({source: a, clock: [voidt,anyt,str], fn: fnAStringClockAny})
    sample({source: a, clock: [anyt,str,voidt], fn: fnAStringClockAny})
    sample({source: a, clock: [anyt,voidt,str], fn: fnAStringClockAny})
    sample({source: a, clock: [voidt,str], fn: fnAStringClockAny})
    sample({source: a, clock: [str], fn: fnAStringClockAny})
    sample({source: a, clock: [voidt], fn: fnAStringClockAny})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, plain, fn, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], fn: fnAString})
    sample({source: a, clock: [str,anyt,voidt], fn: fnAString})
    sample({source: a, clock: [voidt,str,anyt], fn: fnAString})
    sample({source: a, clock: [voidt,anyt,str], fn: fnAString})
    sample({source: a, clock: [anyt,str,voidt], fn: fnAString})
    sample({source: a, clock: [anyt,voidt,str], fn: fnAString})
    sample({source: a, clock: [voidt,str], fn: fnAString})
    sample({source: a, clock: [str], fn: fnAString})
    sample({source: a, clock: [voidt], fn: fnAString})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, plain, fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [str,anyt,voidt], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,str,anyt], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,anyt,str], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [anyt,str,voidt], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [anyt,voidt,str], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,str], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [str], fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt], fn: (a,clock) => ({a,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, plain, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], fn: ()=>({a:''})})
    sample({source: a, clock: [str,anyt,voidt], fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,str,anyt], fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,anyt,str], fn: ()=>({a:''})})
    sample({source: a, clock: [anyt,str,voidt], fn: ()=>({a:''})})
    sample({source: a, clock: [anyt,voidt,str], fn: ()=>({a:''})})
    sample({source: a, clock: [str,voidt,anyt], fn: (a) => ({a})})
    sample({source: a, clock: [str,anyt,voidt], fn: (a) => ({a})})
    sample({source: a, clock: [voidt,str,anyt], fn: (a) => ({a})})
    sample({source: a, clock: [voidt,anyt,str], fn: (a) => ({a})})
    sample({source: a, clock: [anyt,str,voidt], fn: (a) => ({a})})
    sample({source: a, clock: [anyt,voidt,str], fn: (a) => ({a})})
    sample({source: a, clock: [voidt,str], fn: ()=>({a:''})})
    sample({source: a, clock: [str], fn: ()=>({a:''})})
    sample({source: a, clock: [voidt], fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,str], fn: (a) => ({a})})
    sample({source: a, clock: [str], fn: (a) => ({a})})
    sample({source: a, clock: [voidt], fn: (a) => ({a})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, fnClock, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [str,anyt,voidt], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [voidt,str,anyt], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [voidt,anyt,str], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [anyt,str,voidt], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [anyt,voidt,str], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [voidt,str], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [str], target: aclock, fn: fnAStringClockAny})
    sample({source: a, clock: [voidt], target: aclock, fn: fnAStringClockAny})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: aTarget, fn: fnAString})
    sample({source: a, clock: [str,anyt,voidt], target: aTarget, fn: fnAString})
    sample({source: a, clock: [voidt,str,anyt], target: aTarget, fn: fnAString})
    sample({source: a, clock: [voidt,anyt,str], target: aTarget, fn: fnAString})
    sample({source: a, clock: [anyt,str,voidt], target: aTarget, fn: fnAString})
    sample({source: a, clock: [anyt,voidt,str], target: aTarget, fn: fnAString})
    sample({source: a, clock: [voidt,str], target: aTarget, fn: fnAString})
    sample({source: a, clock: [str], target: aTarget, fn: fnAString})
    sample({source: a, clock: [voidt], target: aTarget, fn: fnAString})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [str,anyt,voidt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,str,anyt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,anyt,str], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [anyt,str,voidt], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [anyt,voidt,str], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt,str], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [str], target: aclock, fn: (a,clock) => ({a,clock})})
    sample({source: a, clock: [voidt], target: aclock, fn: (a,clock) => ({a,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('plain, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: a, clock: [str,voidt,anyt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [str,anyt,voidt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,str,anyt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,anyt,str], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [anyt,str,voidt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [anyt,voidt,str], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [str,voidt,anyt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [str,anyt,voidt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [voidt,str,anyt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [voidt,anyt,str], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [anyt,str,voidt], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [anyt,voidt,str], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [voidt,str], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [str], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [voidt], target: aTarget, fn: ()=>({a:''})})
    sample({source: a, clock: [voidt,str], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [str], target: aTarget, fn: (a) => ({a})})
    sample({source: a, clock: [voidt], target: aTarget, fn: (a) => ({a})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, plain, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: a, clock: [num,voidt,anyt], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [num,anyt,voidt], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num,anyt], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt,anyt,num], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [anyt,num,voidt], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [anyt,voidt,num], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [num], fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt], fn: fnAStringClockString})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'void' is not assignable to type 'string'.
    "
  `)
})
test('plain, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: a, clock: [num,voidt,anyt], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [num,anyt,voidt], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num,anyt], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt,anyt,num], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [anyt,num,voidt], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [anyt,voidt,num], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt,num], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [num], target: aclock, fn: fnAStringClockString})
    //@ts-expect-error
    sample({source: a, clock: [voidt], target: aclock, fn: fnAStringClockString})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number | void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: number) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: void) => unknown'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: string, clock: void) => unknown'.
    "
  `)
})
test('noTarget, combinable (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt]})
    sample({source: {a,b}, clock: [str,anyt,voidt]})
    sample({source: {a,b}, clock: [voidt,str,anyt]})
    sample({source: {a,b}, clock: [voidt,anyt,str]})
    sample({source: {a,b}, clock: [anyt,str,voidt]})
    sample({source: {a,b}, clock: [anyt,voidt,str]})
    sample({source: {a,b}, clock: [voidt,str]})
    sample({source: {a,b}, clock: [str]})
    sample({source: {a,b}, clock: [voidt]})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], target: abTarget})
    sample({source: {a,b}, clock: [str,anyt,voidt], target: abTarget})
    sample({source: {a,b}, clock: [voidt,str,anyt], target: abTarget})
    sample({source: {a,b}, clock: [voidt,anyt,str], target: abTarget})
    sample({source: {a,b}, clock: [anyt,str,voidt], target: abTarget})
    sample({source: {a,b}, clock: [anyt,voidt,str], target: abTarget})
    sample({source: {a,b}, clock: [voidt,str], target: abTarget})
    sample({source: {a,b}, clock: [str], target: abTarget})
    sample({source: {a,b}, clock: [voidt], target: abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, combinable, fn, fnClock, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [str,anyt,voidt], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt,str,anyt], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt,anyt,str], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [anyt,str,voidt], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [anyt,voidt,str], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt,str], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [str], fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt], fn: fnAbClockAny})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, combinable, fn, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], fn: fnAb})
    sample({source: {a,b}, clock: [str,anyt,voidt], fn: fnAb})
    sample({source: {a,b}, clock: [voidt,str,anyt], fn: fnAb})
    sample({source: {a,b}, clock: [voidt,anyt,str], fn: fnAb})
    sample({source: {a,b}, clock: [anyt,str,voidt], fn: fnAb})
    sample({source: {a,b}, clock: [anyt,voidt,str], fn: fnAb})
    sample({source: {a,b}, clock: [voidt,str], fn: fnAb})
    sample({source: {a,b}, clock: [str], fn: fnAb})
    sample({source: {a,b}, clock: [voidt], fn: fnAb})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, combinable, fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [str,anyt,voidt], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt,str,anyt], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt,anyt,str], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [anyt,str,voidt], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [anyt,voidt,str], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt,str], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [str], fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt], fn: ({a,b}, clock) => ({a,b,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, combinable, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [str,anyt,voidt], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt,str,anyt], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt,anyt,str], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [anyt,str,voidt], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [anyt,voidt,str], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [str,voidt,anyt], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [str,anyt,voidt], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt,str,anyt], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt,anyt,str], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [anyt,str,voidt], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [anyt,voidt,str], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt,str], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [str], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt], fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt,str], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [str], fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt], fn: ({a,b}) => ({a,b})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, fnClock, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [str,anyt,voidt], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt,str,anyt], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt,anyt,str], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [anyt,str,voidt], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [anyt,voidt,str], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt,str], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [str], target: abclock, fn: fnAbClockAny})
    sample({source: {a,b}, clock: [voidt], target: abclock, fn: fnAbClockAny})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, typedFn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [str,anyt,voidt], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [voidt,str,anyt], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [voidt,anyt,str], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [anyt,str,voidt], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [anyt,voidt,str], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [voidt,str], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [str], target: abTarget, fn: fnAb})
    sample({source: {a,b}, clock: [voidt], target: abTarget, fn: fnAb})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [str,anyt,voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt,str,anyt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt,anyt,str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [anyt,str,voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [anyt,voidt,str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt,str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [str], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
    sample({source: {a,b}, clock: [voidt], target: abclock, fn: ({a,b}, clock) => ({a,b,clock})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('combinable, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source: {a,b}, clock: [str,voidt,anyt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [str,anyt,voidt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt,str,anyt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt,anyt,str], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [anyt,str,voidt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [anyt,voidt,str], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [str,voidt,anyt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [str,anyt,voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt,str,anyt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt,anyt,str], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [anyt,str,voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [anyt,voidt,str], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt,str], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [str], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt], target: abTarget, fn: ()=>({a:'',b:2})})
    sample({source: {a,b}, clock: [voidt,str], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [str], target: abTarget, fn: ({a,b}) => ({a,b})})
    sample({source: {a,b}, clock: [voidt], target: abTarget, fn: ({a,b}) => ({a,b})})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noTarget, combinable, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: {a,b}, clock: [num,voidt,anyt], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [num,anyt,voidt], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt,num,anyt], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt,anyt,num], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [anyt,num,voidt], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [anyt,voidt,num], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt,num], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [num], fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt], fn: fnAbClockString})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: void) => unknown'.
          Types of parameters 'clock' and 'clock' are incompatible.
            Type 'void' is not assignable to type 'string'.
    "
  `)
})
test('combinable, fn, fnClock, typedFn, assertFnType (should fail)', () => {
  //prettier-ignore
  {
    //@ts-expect-error
    sample({source: {a,b}, clock: [num,voidt,anyt], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [num,anyt,voidt], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt,num,anyt], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt,anyt,num], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [anyt,num,voidt], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [anyt,voidt,num], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt,num], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [num], target: abclock, fn: fnAbClockString})
    //@ts-expect-error
    sample({source: {a,b}, clock: [voidt], target: abclock, fn: fnAbClockString})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number | void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number | void' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: number) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'number' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'void' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(source: { a: string; b: number; }, clock: void) => unknown'.
            Types of parameters 'clock' and 'clock' are incompatible.
              Type 'void' is not assignable to type 'string'.
    "
  `)
})
