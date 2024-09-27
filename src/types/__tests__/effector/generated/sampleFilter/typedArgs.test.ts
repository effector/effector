/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'
type Astr = {a: string}
type AB = {a: number; b: string}
type AoptB = {a: number | null; b: string}
type ABN = {a: number; b: number}
const $filter = createStore(true)
const a = createStore(0)
const aOpt = createStore<number | null>(0)
const b = createStore('')
const voidt = createEvent()
const anyt = createEvent<any>()
const numt = createEvent<number>()
const strt = createEvent<number>()
const $num = createStore(0)
const ab = createEvent<AB>()
const $ab = createStore<AB>({a: 0, b: ''})
const nullableAB = createEvent<AB | null>()
const abNull = createEvent<{a: number | null; b: string}>()
const aNum = createEvent<{a: number}>()
const aStr = createEvent<{a: string}>()
const lNum = createEvent<[number]>()
const lStr = createEvent<[string]>()
const lNumStr = createEvent<[number, string]>()
const lNumNum = createEvent<[number, number]>()
const abn = createEvent<ABN>()
describe('no source', () => {
  test('clock -> unit same (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null})
      sample({
        clock: nullableAB,
        //@ts-expect-error
        target: strt,
        filter: (clk: AB | null) => clk !== null,
      })
      sample({
        clock: nullableAB,
        target: $ab,
        //@ts-expect-error
        filter: (clk: AB) => clk.a > 0,
      })
      sample({
        clock: nullableAB,
        //@ts-expect-error
        target: strt,
        //@ts-expect-error
        filter: (clk: AB) => clk.a > 0,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 4 'sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null})'
      Type 'EventCallable<number>' is not assignable to type 'Unit<AB>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'AB'.
      Unmarked error at test line 12 'clock: nullableAB,'
      Type 'EventCallable<AB | null>' is not assignable to type 'Unit<AB>'.
        Types of property '__' are incompatible.
          Type 'AB | null' is not assignable to type 'AB'.
            Type 'null' is not assignable to type 'AB'.
      lack of expected error at test line 15 'filter: (clk: AB) => clk.a > 0,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<AB | null>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'AB'.
      lack of expected error at test line 22 'filter: (clk: AB) => clk.a > 0,'
      "
    `)
  })
  describe('clock, fn -> unit same', () => {
    test('clock, fn -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 8 'sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })'
        'fn' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        "
      `)
    })
    test('clock, fn -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: $filter,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: AB) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val: AB) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'target: strt,'
        lack of expected error at test line 9 'fn: (val) => ({a:1, b: val ? val.b : ''}),'
        lack of expected error at test line 15 'filter: (clk: AB) => clk.a > 0,'
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        lack of expected error at test line 23 'filter: (clk: AB) => clk.a > 0,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        lack of expected error at test line 30 'target: strt,'
        lack of expected error at test line 33 'fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),'
        lack of expected error at test line 38 'target: strt,'
        lack of expected error at test line 41 'fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),'
        'clk' is possibly 'null'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        'clk' is possibly 'null'.
        Type '(val: AB | null) => { a: number; b: string; }' is not assignable to type '(val: AB | null) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        lack of expected error at test line 63 'filter: (clk: AB) => clk.a > 0,'
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        lack of expected error at test line 71 'filter: (clk: AB) => clk.a > 0,'
        Type '(val: AB | null) => { a: number; b: string; }' is not assignable to type '(val: AB | null) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 85 'target: strt,'
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 94 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: any; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: any; b: string; }'.
        lack of expected error at test line 103 'filter: (clk: AB) => clk.a > 0,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 108 'clock: nullableAB,'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }]'.
            Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 114 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((val: ABN) => { a: any; b: string; }) & ((clk: AB | null) => any)'.
                  Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                    Types of parameters 'val' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'ABN'.
                        Type 'null' is not assignable to type 'ABN'.
        lack of expected error at test line 117 'target: strt,'
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((val: ABN) => { a: any; b: string; }) & ((clk: AB) => any)'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 132 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((val: ABN) => { a: any; b: string; }) & ((clk: AB) => any)'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 137 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined...'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB | null) => boolean' is not assignable to type '((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)'.
                  Type '(clk: AB | null) => boolean' is not assignable to type '(clk: AB | null) => clk is AB | null'.
                    Signature '(clk: AB | null): boolean' must be a type predicate.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 145 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined...'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB | null) => boolean' is not assignable to type '((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)'.
                  Type '(clk: AB | null) => boolean' is not assignable to type '(clk: AB | null) => clk is AB | null'.
                    Signature '(clk: AB | null): boolean' must be a type predicate.
        lack of expected error at test line 148 'target: strt,'
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 158 'filter: (clk: AB) => clk.a > 0,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 165 'target: strt,'
        lack of expected error at test line 167 'filter: (clk: AB) => clk.a > 0,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        Type '(val: AB | null) => { a: number; b: string; }' is not assignable to type '(val: AB | null) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 189 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(val: AB) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: any; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: any; b: string; }'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(val: ABN) => number'.
          Type '{ a: any; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 220 'target: strt,'
        'fn' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        Unmarked error at test line 225 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((val: ABN) => { a: number; b: number; }) & ((clk: AB | null) => any)'.
                  Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                    Types of parameters 'val' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'ABN'.
                        Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 232 'sample({'
        lack of expected error at test line 230 'fn: (val: ABN) => ({a:val.a, b:val.b}),'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((val: ABN) => { a: number; b: number; }) & ((clk: AB | null) => any)'.
                  Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                    Types of parameters 'val' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'ABN'.
                        Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 242 'target: $ab,'
        lack of expected error at test line 235 'target: strt,'
        lack of expected error at test line 238 'fn: (val: ABN) => ({a:val.a, b:val.b}),'
        Type 'StoreWritable<AB>' is not assignable to type 'Unit<{ a: number; b: number; }>'.
          The types of '__.b' are incompatible between these types.
            Type 'string' is not assignable to type 'number'.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(val: ABN) => AB'.
          Call signature return types '{ a: number; b: number; }' and 'AB' are incompatible.
            The types of 'b' are incompatible between these types.
              Type 'number' is not assignable to type 'string'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: number; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: number; }'.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(val: ABN) => number'.
          Type '{ a: number; b: number; }' is not assignable to type 'number'.
        "
      `)
    })
  })
  test('[clock] -> unit same (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null})
      sample({
        clock: [ab,nullableAB],
        //@ts-expect-error
        target: strt,
        filter: (clk: AB | null) => clk !== null,
      })
      sample({
        clock: [ab,nullableAB],
        target: $ab,
        //@ts-expect-error
        filter: (clk: AB) => clk.a > 0,
      })
      sample({
        clock: [ab,nullableAB],
        //@ts-expect-error
        target: strt,
        //@ts-expect-error
        filter: (clk: AB) => clk.a > 0,
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      lack of expected error at test line 4 'sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null})'
      Type 'EventCallable<number>' is not assignable to type 'Unit<AB>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'AB'.
      Unmarked error at test line 12 'clock: [ab,nullableAB],'
      Type 'EventCallable<AB | null>' is not assignable to type 'Unit<AB>'.
        Types of property '__' are incompatible.
          Type 'AB | null' is not assignable to type 'AB'.
            Type 'null' is not assignable to type 'AB'.
      lack of expected error at test line 15 'filter: (clk: AB) => clk.a > 0,'
      Type 'EventCallable<number>' is not assignable to type 'Unit<AB | null>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'AB'.
      lack of expected error at test line 22 'filter: (clk: AB) => clk.a > 0,'
      "
    `)
  })
  describe('[clock], fn -> unit same', () => {
    test('[clock], fn -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 8 'sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })'
        'fn' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        "
      `)
    })
    test('[clock], fn -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: $filter,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: AB) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val: AB) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.a, b:val.b}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'target: strt,'
        lack of expected error at test line 9 'fn: (val) => ({a:1, b: val ? val.b : ''}),'
        lack of expected error at test line 15 'filter: (clk: AB) => clk.a > 0,'
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        lack of expected error at test line 23 'filter: (clk: AB) => clk.a > 0,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        lack of expected error at test line 30 'target: strt,'
        lack of expected error at test line 33 'fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),'
        lack of expected error at test line 38 'target: strt,'
        lack of expected error at test line 41 'fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),'
        'clk' is possibly 'null'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        'clk' is possibly 'null'.
        Type '(val: AB | null) => { a: number; b: string; }' is not assignable to type '(val: AB | null) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        lack of expected error at test line 63 'filter: (clk: AB) => clk.a > 0,'
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        lack of expected error at test line 71 'filter: (clk: AB) => clk.a > 0,'
        Type '(val: AB | null) => { a: number; b: string; }' is not assignable to type '(val: AB | null) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 85 'target: strt,'
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 94 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: any; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: any; b: string; }'.
        lack of expected error at test line 103 'filter: (clk: AB) => clk.a > 0,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 108 'clock: [ab,nullableAB],'
        Argument of type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean |...'.
          Type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }]'.
            Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 114 'sample({'
        Argument of type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; ... 5 more ...; batch?: boolean | undefined; }]'.
          Type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean |...'.
            Type '{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefine...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((val: ABN) => { a: any; b: string; }) & ((clk: AB | null) => any)'.
                  Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                    Types of parameters 'val' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'ABN'.
                        Type 'null' is not assignable to type 'ABN'.
        lack of expected error at test line 117 'target: strt,'
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((val: ABN) => { a: any; b: string; }) & ((clk: AB) => any)'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 132 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((val: ABN) => { a: any; b: string; }) & ((clk: AB) => any)'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 137 'sample({'
        Argument of type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; ... 5 more ...; batch?: boolean | undefined; }]'.
          Type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean |...'.
            Type '{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefine...'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB | null) => boolean' is not assignable to type '((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)'.
                  Type '(clk: AB | null) => boolean' is not assignable to type '(clk: AB | null) => clk is AB | null'.
                    Signature '(clk: AB | null): boolean' must be a type predicate.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 145 'sample({'
        Argument of type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; ... 5 more ...; batch?: boolean | undefined; }]'.
          Type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean |...'.
            Type '{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefine...'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB | null) => boolean' is not assignable to type '((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)'.
                  Type '(clk: AB | null) => boolean' is not assignable to type '(clk: AB | null) => clk is AB | null'.
                    Signature '(clk: AB | null): boolean' must be a type predicate.
        lack of expected error at test line 148 'target: strt,'
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 158 'filter: (clk: AB) => clk.a > 0,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 165 'target: strt,'
        lack of expected error at test line 167 'filter: (clk: AB) => clk.a > 0,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        Type '(val: AB | null) => { a: number; b: string; }' is not assignable to type '(val: AB | null) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 189 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
          Types of parameters 'val' and 'clk' are incompatible.
            Type 'AB | null' is not assignable to type 'ABN'.
              Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: string; }'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(val: AB) => number'.
          Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: any; b: string; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: any; b: string; }'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(val: ABN) => number'.
          Type '{ a: any; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 220 'target: strt,'
        'fn' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        Unmarked error at test line 225 'sample({'
        Argument of type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; ... 5 more ...; batch?: boolean | undefined; }]'.
          Type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean |...'.
            Type '{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefine...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((val: ABN) => { a: number; b: number; }) & ((clk: AB | null) => any)'.
                  Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                    Types of parameters 'val' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'ABN'.
                        Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 232 'sample({'
        lack of expected error at test line 230 'fn: (val: ABN) => ({a:val.a, b:val.b}),'
        Argument of type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[error: { fn: (clk: AB | null) => any; error: \\"fn parameters should match clock/source types\\"; }] | [config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; ... 5 more ...; batch?: boolean | undefined; }]'.
          Type '[{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean |...'.
            Type '{ clock: [EventCallable<AB>, EventCallable<AB | null>]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: readonly [EventCallable<AB>, EventCallable<AB | null>]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: ABN) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefine...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((val: ABN) => { a: number; b: number; }) & ((clk: AB | null) => any)'.
                  Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                    Types of parameters 'val' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'ABN'.
                        Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 242 'target: $ab,'
        lack of expected error at test line 235 'target: strt,'
        lack of expected error at test line 238 'fn: (val: ABN) => ({a:val.a, b:val.b}),'
        Type 'StoreWritable<AB>' is not assignable to type 'Unit<{ a: number; b: number; }>'.
          The types of '__.b' are incompatible between these types.
            Type 'string' is not assignable to type 'number'.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(val: ABN) => AB'.
          Call signature return types '{ a: number; b: number; }' and 'AB' are incompatible.
            The types of 'b' are incompatible between these types.
              Type 'number' is not assignable to type 'string'.
        Type 'EventCallable<number>' is not assignable to type 'Unit<{ a: number; b: number; }>'.
          Types of property '__' are incompatible.
            Type 'number' is not assignable to type '{ a: number; b: number; }'.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(val: ABN) => number'.
          Type '{ a: number; b: number; }' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('clock -> new unit same', () => {
    test('clock -> new unit same (should pass)', () => {
      //prettier-ignore
      sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('clock -> new unit same (should fail)', () => {
      //prettier-ignore
      sample({
        clock: nullableAB,
        //@ts-expect-error
        filter: (clk: AB) => clk.a > 0,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 5 'filter: (clk: AB) => clk.a > 0,'
        "
      `)
    })
  })
  describe('clock, fn -> new unit same', () => {
    test('clock, fn -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        sample({clock:nullableAB, filter:(clk): clk is AB => clk !== null})
        sample({clock:nullableAB, filter:Boolean                         })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('clock, fn -> new unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          filter: $filter,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'filter: (clk: AB) => clk.a > 0,'
        'clk' is possibly 'null'.
        lack of expected error at test line 18 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 30 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 35 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn should match inferred type\\"; inferred: AB; fnArg: ABN; }'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 41 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn should match inferred type\\"; inferred: AB; fnArg: ABN; }'.
        Property 'c' does not exist on type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 56 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        "
      `)
    })
  })
  describe('[clock] -> new unit same', () => {
    test('[clock] -> new unit same (should pass)', () => {
      //prettier-ignore
      sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('[clock] -> new unit same (should fail)', () => {
      //prettier-ignore
      sample({
        clock: [ab,nullableAB],
        //@ts-expect-error
        filter: (clk: AB) => clk.a > 0,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 5 'filter: (clk: AB) => clk.a > 0,'
        "
      `)
    })
  })
  describe('[clock], fn -> new unit same', () => {
    test('[clock], fn -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        sample({clock:[ab,nullableAB], filter:(clk): clk is AB => clk !== null})
        sample({clock:[ab,nullableAB], filter:Boolean                         })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('[clock], fn -> new unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: (clk: AB | null) => clk !== null,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: $filter,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: Boolean,
          //@ts-expect-error
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'filter: (clk: AB) => clk.a > 0,'
        'clk' is possibly 'null'.
        lack of expected error at test line 18 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 30 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 35 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn should match inferred type\\"; inferred: AB; fnArg: ABN; }'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 41 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn should match inferred type\\"; inferred: AB; fnArg: ABN; }'.
        Property 'c' does not exist on type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        lack of expected error at test line 56 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        "
      `)
    })
  })
})
