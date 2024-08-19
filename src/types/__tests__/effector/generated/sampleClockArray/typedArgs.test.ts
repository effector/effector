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
const fnAbClockAny = ({a, b}: AB, clock: any) => ({a, b, clock})
const fnAString = (a: string) => ({a})
const fnAStringClockAny = (a: string, clock: any) => ({a, clock})
const fnAb = ({a, b}: AB) => ({a, b})
describe('fn clock assertion', () => {
  test('plain, noTarget (should pass)', () => {
    //prettier-ignore
    sample({source:a, clock:[anyt], fn:(a:string, clock:string) => ({a,clock})})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('plain, noTarget (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [voidt],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [num],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [voidt,num],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [anyt,voidt],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [anyt,num],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [voidt,anyt],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [num,anyt],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [num,voidt],
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: void) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: number) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: number) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: number | void) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 25 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 31 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 37 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 43 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 49 'fn: (a:string, clock:string) => ({a,clock}),'
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: number | void) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('plain (should pass)', () => {
    //prettier-ignore
    sample({source:a, clock:[anyt], target:aclock, fn:(a:string, clock:string) => ({a,clock})})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('plain (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: a,
        clock: [voidt],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [num],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [voidt,num],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [anyt,voidt],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [anyt,num],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [voidt,anyt],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [num,anyt],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
      sample({
        source: a,
        clock: [num,voidt],
        target: aclock,
        //@ts-expect-error
        fn: (a:string, clock:string) => ({a,clock}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: void) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: number) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: number) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: number | void) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 29 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 36 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 43 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 50 'fn: (a:string, clock:string) => ({a,clock}),'
      lack of expected error at test line 57 'fn: (a:string, clock:string) => ({a,clock}),'
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: number | void) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('combinable, noTarget (should pass)', () => {
    //prettier-ignore
    sample({source:{a,b}, clock:[anyt], fn:({a,b}:AB, clock:string) => ({a,b,clock})})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combinable, noTarget (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: {a,b},
        clock: [voidt],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [num],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [voidt,num],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [anyt,voidt],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [anyt,num],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [voidt,anyt],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [num,anyt],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [num,voidt],
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: number) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: number) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 25 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 31 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 37 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 43 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 49 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('combinable (should pass)', () => {
    //prettier-ignore
    sample({source:{a,b}, clock:[anyt], target:abclock, fn:({a,b}:AB, clock:string) => ({a,b,clock})})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('combinable (should fail)', () => {
    //prettier-ignore
    {
      sample({
        source: {a,b},
        clock: [voidt],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [num],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [voidt,num],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [anyt,voidt],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [anyt,num],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [voidt,anyt],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [num,anyt],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
      sample({
        source: {a,b},
        clock: [num,voidt],
        target: abclock,
        //@ts-expect-error
        fn: ({a,b}:AB, clock:string) => ({a,b,clock}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: number) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: number) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      lack of expected error at test line 29 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 36 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 43 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 50 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      lack of expected error at test line 57 'fn: ({a,b}:AB, clock:string) => ({a,b,clock}),'
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { readonly a: string; readonly b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { readonly a: string; readonly b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('clock only', () => {
  test('noSource, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:strClk       , fn:fnAString})
      sample({clock:anyt         , fn:fnAString})
      sample({clock:[strClk]     , fn:fnAString})
      sample({clock:[anyt]       , fn:fnAString})
      sample({clock:[strClk,anyt], fn:fnAString})
      sample({clock:strClk       , target:aTarget, fn:fnAString})
      sample({clock:anyt         , target:aTarget, fn:fnAString})
      sample({clock:[strClk]     , target:aTarget, fn:fnAString})
      sample({clock:[anyt]       , target:aTarget, fn:fnAString})
      sample({clock:[strClk,anyt], target:aTarget, fn:fnAString})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('noClock, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , fn:fnAString})
    sample({source:{a,b}, fn:fnAb     })
    sample({source:a    , target:aTarget , fn:fnAString})
    sample({source:{a,b}, target:abTarget, fn:fnAb     })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , clock:[voidt]     , fn:fnAString})
    sample({source:a    , clock:[str]       , fn:fnAString})
    sample({source:a    , clock:[voidt,str] , fn:fnAString})
    sample({source:a    , clock:[]          , fn:fnAString})
    sample({source:a    , clock:[anyt]      , fn:fnAString})
    sample({source:a    , clock:[anyt,voidt], fn:fnAString})
    sample({source:a    , clock:[anyt,str]  , fn:fnAString})
    sample({source:a    , clock:[voidt,anyt], fn:fnAString})
    sample({source:a    , clock:[str,anyt]  , fn:fnAString})
    sample({source:a    , clock:[str,voidt] , fn:fnAString})
    sample({source:{a,b}, clock:[voidt]     , fn:fnAb     })
    sample({source:{a,b}, clock:[str]       , fn:fnAb     })
    sample({source:{a,b}, clock:[voidt,str] , fn:fnAb     })
    sample({source:{a,b}, clock:[]          , fn:fnAb     })
    sample({source:{a,b}, clock:[anyt]      , fn:fnAb     })
    sample({source:{a,b}, clock:[anyt,voidt], fn:fnAb     })
    sample({source:{a,b}, clock:[anyt,str]  , fn:fnAb     })
    sample({source:{a,b}, clock:[voidt,anyt], fn:fnAb     })
    sample({source:{a,b}, clock:[str,anyt]  , fn:fnAb     })
    sample({source:{a,b}, clock:[str,voidt] , fn:fnAb     })
    sample({source:a    , clock:[voidt]     , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[str]       , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[voidt,str] , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[]          , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[anyt]      , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[anyt,voidt], target:aTarget , fn:fnAString})
    sample({source:a    , clock:[anyt,str]  , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[voidt,anyt], target:aTarget , fn:fnAString})
    sample({source:a    , clock:[str,anyt]  , target:aTarget , fn:fnAString})
    sample({source:a    , clock:[str,voidt] , target:aTarget , fn:fnAString})
    sample({source:{a,b}, clock:[voidt]     , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[str]       , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[]          , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[anyt]      , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget, fn:fnAb     })
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget, fn:fnAb     })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('fn, fnClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , clock:[voidt]     , fn:fnAStringClockAny})
    sample({source:a    , clock:[str]       , fn:fnAStringClockAny})
    sample({source:a    , clock:[voidt,str] , fn:fnAStringClockAny})
    sample({source:a    , clock:[]          , fn:fnAStringClockAny})
    sample({source:a    , clock:[anyt]      , fn:fnAStringClockAny})
    sample({source:a    , clock:[anyt,voidt], fn:fnAStringClockAny})
    sample({source:a    , clock:[anyt,str]  , fn:fnAStringClockAny})
    sample({source:a    , clock:[voidt,anyt], fn:fnAStringClockAny})
    sample({source:a    , clock:[str,anyt]  , fn:fnAStringClockAny})
    sample({source:a    , clock:[str,voidt] , fn:fnAStringClockAny})
    sample({source:{a,b}, clock:[voidt]     , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[str]       , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[voidt,str] , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[]          , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[anyt]      , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[anyt,voidt], fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[anyt,str]  , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[voidt,anyt], fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[str,anyt]  , fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[str,voidt] , fn:fnAbClockAny     })
    sample({source:a    , clock:[voidt]     , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[str]       , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[voidt,str] , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[]          , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[anyt]      , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[anyt,voidt], target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[anyt,str]  , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[voidt,anyt], target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[str,anyt]  , target:aclock , fn:fnAStringClockAny})
    sample({source:a    , clock:[str,voidt] , target:aclock , fn:fnAStringClockAny})
    sample({source:{a,b}, clock:[voidt]     , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[str]       , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[voidt,str] , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[]          , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[anyt]      , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[anyt,voidt], target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[anyt,str]  , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[voidt,anyt], target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[str,anyt]  , target:abclock, fn:fnAbClockAny     })
    sample({source:{a,b}, clock:[str,voidt] , target:abclock, fn:fnAbClockAny     })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
