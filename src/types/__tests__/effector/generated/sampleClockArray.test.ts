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
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: unknown) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: unknown) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
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
      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '((src: string, clk: unknown) => any) & ((a: string, clock: string) => { a: string; clock: string; })'.
        Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(src: string, clk: unknown) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
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
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: number) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: number) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: unknown) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: unknown) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: number | void) => any'.
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
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'void' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: number) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: number) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: unknown) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: unknown) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'unknown' is not assignable to type 'string'.
      Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '((src: { a: string; b: number; }, clk: number | void) => any) & (({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; })'.
        Type '({ a, b }: AB, clock: string) => { a: string; b: number; clock: string; }' is not assignable to type '(src: { a: string; b: number; }, clk: number | void) => any'.
          Types of parameters 'clock' and 'clk' are incompatible.
            Type 'number | void' is not assignable to type 'string'.
              Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})
describe('clock only', () => {
  test('noSource (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:strClk       })
      sample({clock:anyt         })
      sample({clock:[strClk]     })
      sample({clock:[anyt]       })
      sample({clock:[strClk,anyt]})
      sample({clock:strClk       , target:str})
      sample({clock:anyt         , target:str})
      sample({clock:[strClk]     , target:str})
      sample({clock:[anyt]       , target:str})
      sample({clock:[strClk,anyt], target:str})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('noSource, fn (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:voidt         , fn:()=>({a:'',b:2})})
      sample({clock:num           , fn:()=>({a:'',b:2})})
      sample({clock:strClk        , fn:()=>({a:'',b:2})})
      sample({clock:anyt          , fn:()=>({a:'',b:2})})
      sample({clock:strClk        , fn:(a) => ({a})    })
      sample({clock:anyt          , fn:(a) => ({a})    })
      sample({clock:strClk        , fn:fnAString       })
      sample({clock:anyt          , fn:fnAString       })
      sample({clock:[voidt]       , fn:()=>({a:'',b:2})})
      sample({clock:[num]         , fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , fn:()=>({a:'',b:2})})
      sample({clock:[anyt]        , fn:()=>({a:'',b:2})})
      sample({clock:[voidt,num]   , fn:()=>({a:'',b:2})})
      sample({clock:[voidt,strClk], fn:()=>({a:'',b:2})})
      sample({clock:[voidt,anyt]  , fn:()=>({a:'',b:2})})
      sample({clock:[num,anyt]    , fn:()=>({a:'',b:2})})
      sample({clock:[strClk,num]  , fn:()=>({a:'',b:2})})
      sample({clock:[strClk,anyt] , fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , fn:(a) => ({a})    })
      sample({clock:[anyt]        , fn:(a) => ({a})    })
      sample({clock:[strClk,anyt] , fn:(a) => ({a})    })
      sample({clock:[strClk]      , fn:fnAString       })
      sample({clock:[anyt]        , fn:fnAString       })
      sample({clock:[strClk,anyt] , fn:fnAString       })
      sample({clock:voidt         , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:num           , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:strClk        , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:anyt          , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:strClk        , target:aTarget, fn:(a) => ({a})    })
      sample({clock:anyt          , target:aTarget, fn:(a) => ({a})    })
      sample({clock:strClk        , target:aTarget, fn:fnAString       })
      sample({clock:anyt          , target:aTarget, fn:fnAString       })
      sample({clock:[voidt]       , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[num]         , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[anyt]        , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[voidt,num]   , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[voidt,strClk], target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[voidt,anyt]  , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[num,anyt]    , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk,num]  , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk,anyt] , target:aTarget, fn:()=>({a:'',b:2})})
      sample({clock:[strClk]      , target:aTarget, fn:(a) => ({a})    })
      sample({clock:[anyt]        , target:aTarget, fn:(a) => ({a})    })
      sample({clock:[strClk,anyt] , target:aTarget, fn:(a) => ({a})    })
      sample({clock:[strClk]      , target:aTarget, fn:fnAString       })
      sample({clock:[anyt]        , target:aTarget, fn:fnAString       })
      sample({clock:[strClk,anyt] , target:aTarget, fn:fnAString       })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
test('noClock (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    })
    sample({source:{a,b}})
    sample({source:a    , target:str     })
    sample({source:{a,b}, target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test(' (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , clock:[voidt]     })
    sample({source:a    , clock:[str]       })
    sample({source:a    , clock:[voidt,str] })
    sample({source:a    , clock:[]          })
    sample({source:a    , clock:[anyt]      })
    sample({source:a    , clock:[anyt,voidt]})
    sample({source:a    , clock:[anyt,str]  })
    sample({source:a    , clock:[voidt,anyt]})
    sample({source:a    , clock:[str,anyt]  })
    sample({source:a    , clock:[str,voidt] })
    sample({source:{a,b}, clock:[voidt]     })
    sample({source:{a,b}, clock:[str]       })
    sample({source:{a,b}, clock:[voidt,str] })
    sample({source:{a,b}, clock:[]          })
    sample({source:{a,b}, clock:[anyt]      })
    sample({source:{a,b}, clock:[anyt,voidt]})
    sample({source:{a,b}, clock:[anyt,str]  })
    sample({source:{a,b}, clock:[voidt,anyt]})
    sample({source:{a,b}, clock:[str,anyt]  })
    sample({source:{a,b}, clock:[str,voidt] })
    sample({source:a    , clock:[voidt]     , target:str     })
    sample({source:a    , clock:[str]       , target:str     })
    sample({source:a    , clock:[voidt,str] , target:str     })
    sample({source:a    , clock:[]          , target:str     })
    sample({source:a    , clock:[anyt]      , target:str     })
    sample({source:a    , clock:[anyt,voidt], target:str     })
    sample({source:a    , clock:[anyt,str]  , target:str     })
    sample({source:a    , clock:[voidt,anyt], target:str     })
    sample({source:a    , clock:[str,anyt]  , target:str     })
    sample({source:a    , clock:[str,voidt] , target:str     })
    sample({source:{a,b}, clock:[voidt]     , target:abTarget})
    sample({source:{a,b}, clock:[str]       , target:abTarget})
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget})
    sample({source:{a,b}, clock:[]          , target:abTarget})
    sample({source:{a,b}, clock:[anyt]      , target:abTarget})
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget})
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget})
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget})
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget})
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('noClock, fn (should pass)', () => {
  //prettier-ignore
  {
    sample({source:a    , fn:()=>({a:''})      })
    sample({source:a    , fn:(a) => ({a})      })
    sample({source:a    , fn:fnAString         })
    sample({source:{a,b}, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, fn:fnAb              })
    sample({source:a    , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , target:aTarget , fn:fnAString         })
    sample({source:{a,b}, target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, target:abTarget, fn:fnAb              })
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
    sample({source:a    , clock:[voidt]     , fn:()=>({a:''})      })
    sample({source:a    , clock:[str]       , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,str] , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt]     , fn:(a) => ({a})      })
    sample({source:a    , clock:[str]       , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,str] , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt]     , fn:fnAString         })
    sample({source:a    , clock:[str]       , fn:fnAString         })
    sample({source:a    , clock:[voidt,str] , fn:fnAString         })
    sample({source:a    , clock:[]          , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt]      , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,voidt], fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,str]  , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,anyt], fn:()=>({a:''})      })
    sample({source:a    , clock:[str,anyt]  , fn:()=>({a:''})      })
    sample({source:a    , clock:[str,voidt] , fn:()=>({a:''})      })
    sample({source:a    , clock:[]          , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt]      , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,voidt], fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,str]  , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,anyt], fn:(a) => ({a})      })
    sample({source:a    , clock:[str,anyt]  , fn:(a) => ({a})      })
    sample({source:a    , clock:[str,voidt] , fn:(a) => ({a})      })
    sample({source:a    , clock:[]          , fn:fnAString         })
    sample({source:a    , clock:[anyt]      , fn:fnAString         })
    sample({source:a    , clock:[anyt,voidt], fn:fnAString         })
    sample({source:a    , clock:[anyt,str]  , fn:fnAString         })
    sample({source:a    , clock:[voidt,anyt], fn:fnAString         })
    sample({source:a    , clock:[str,anyt]  , fn:fnAString         })
    sample({source:a    , clock:[str,voidt] , fn:fnAString         })
    sample({source:{a,b}, clock:[voidt]     , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str]       , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,str] , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt]     , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str]       , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,str] , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt]     , fn:fnAb              })
    sample({source:{a,b}, clock:[str]       , fn:fnAb              })
    sample({source:{a,b}, clock:[voidt,str] , fn:fnAb              })
    sample({source:{a,b}, clock:[]          , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt]      , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,voidt], fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,str]  , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,anyt], fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,anyt]  , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,voidt] , fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[]          , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt]      , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,voidt], fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,str]  , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,anyt], fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,anyt]  , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,voidt] , fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[]          , fn:fnAb              })
    sample({source:{a,b}, clock:[anyt]      , fn:fnAb              })
    sample({source:{a,b}, clock:[anyt,voidt], fn:fnAb              })
    sample({source:{a,b}, clock:[anyt,str]  , fn:fnAb              })
    sample({source:{a,b}, clock:[voidt,anyt], fn:fnAb              })
    sample({source:{a,b}, clock:[str,anyt]  , fn:fnAb              })
    sample({source:{a,b}, clock:[str,voidt] , fn:fnAb              })
    sample({source:a    , clock:[voidt]     , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[str]       , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,str] , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt]     , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[str]       , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,str] , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt]     , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[str]       , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[voidt,str] , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[]          , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt]      , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,voidt], target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[anyt,str]  , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[voidt,anyt], target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[str,anyt]  , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[str,voidt] , target:aTarget , fn:()=>({a:''})      })
    sample({source:a    , clock:[]          , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt]      , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,voidt], target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[anyt,str]  , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[voidt,anyt], target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[str,anyt]  , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[str,voidt] , target:aTarget , fn:(a) => ({a})      })
    sample({source:a    , clock:[]          , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[anyt]      , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[anyt,voidt], target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[anyt,str]  , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[voidt,anyt], target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[str,anyt]  , target:aTarget , fn:fnAString         })
    sample({source:a    , clock:[str,voidt] , target:aTarget , fn:fnAString         })
    sample({source:{a,b}, clock:[voidt]     , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str]       , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt]     , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str]       , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt]     , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[str]       , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[voidt,str] , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[]          , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt]      , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget, fn:()=>({a:'',b:2})  })
    sample({source:{a,b}, clock:[]          , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt]      , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget, fn:({a,b}) => ({a,b})})
    sample({source:{a,b}, clock:[]          , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[anyt]      , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[anyt,voidt], target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[anyt,str]  , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[voidt,anyt], target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[str,anyt]  , target:abTarget, fn:fnAb              })
    sample({source:{a,b}, clock:[str,voidt] , target:abTarget, fn:fnAb              })
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
    sample({source:a    , clock:[voidt]     , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str]       , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,str] , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt]     , fn:fnAStringClockAny              })
    sample({source:a    , clock:[str]       , fn:fnAStringClockAny              })
    sample({source:a    , clock:[voidt,str] , fn:fnAStringClockAny              })
    sample({source:a    , clock:[]          , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt]      , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,voidt], fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,str]  , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,anyt], fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,anyt]  , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,voidt] , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[]          , fn:fnAStringClockAny              })
    sample({source:a    , clock:[anyt]      , fn:fnAStringClockAny              })
    sample({source:a    , clock:[anyt,voidt], fn:fnAStringClockAny              })
    sample({source:a    , clock:[anyt,str]  , fn:fnAStringClockAny              })
    sample({source:a    , clock:[voidt,anyt], fn:fnAStringClockAny              })
    sample({source:a    , clock:[str,anyt]  , fn:fnAStringClockAny              })
    sample({source:a    , clock:[str,voidt] , fn:fnAStringClockAny              })
    sample({source:{a,b}, clock:[voidt]     , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str]       , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,str] , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt]     , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[str]       , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[voidt,str] , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[]          , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt]      , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,voidt], fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,str]  , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,anyt], fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,anyt]  , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,voidt] , fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[]          , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[anyt]      , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[anyt,voidt], fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[anyt,str]  , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[voidt,anyt], fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[str,anyt]  , fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[str,voidt] , fn:fnAbClockAny                   })
    sample({source:a    , clock:[voidt]     , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str]       , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,str] , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt]     , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[str]       , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[voidt,str] , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[]          , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt]      , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,voidt], target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[anyt,str]  , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[voidt,anyt], target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,anyt]  , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[str,voidt] , target:aclock , fn:(a,clock) => ({a,clock})       })
    sample({source:a    , clock:[]          , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[anyt]      , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[anyt,voidt], target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[anyt,str]  , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[voidt,anyt], target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[str,anyt]  , target:aclock , fn:fnAStringClockAny              })
    sample({source:a    , clock:[str,voidt] , target:aclock , fn:fnAStringClockAny              })
    sample({source:{a,b}, clock:[voidt]     , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str]       , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,str] , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt]     , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[str]       , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[voidt,str] , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[]          , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt]      , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,voidt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[anyt,str]  , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[voidt,anyt], target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,anyt]  , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[str,voidt] , target:abclock, fn:({a,b}, clock) => ({a,b,clock})})
    sample({source:{a,b}, clock:[]          , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[anyt]      , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[anyt,voidt], target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[anyt,str]  , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[voidt,anyt], target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[str,anyt]  , target:abclock, fn:fnAbClockAny                   })
    sample({source:{a,b}, clock:[str,voidt] , target:abclock, fn:fnAbClockAny                   })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
