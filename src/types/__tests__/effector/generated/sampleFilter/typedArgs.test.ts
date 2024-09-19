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
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
      Unmarked error at test line 6 'clock: nullableAB,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
      Unmarked error at test line 12 'clock: nullableAB,'
      lack of expected error at test line 8 'target: strt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
      Unmarked error at test line 18 'clock: nullableAB,'
      lack of expected error at test line 15 'filter: (clk: AB) => clk.a > 0,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
      lack of expected error at test line 20 'target: strt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
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
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
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
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          fn: (val: AB) => ({a:val.a, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Unmarked error at test line 10 'sample({'
        lack of expected error at test line 6 'target: strt,'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 17 'sample({'
        lack of expected error at test line 14 'filter: (clk: AB) => clk.a > 0,'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 26 'clock: nullableAB,'
        lack of expected error at test line 20 'target: strt,'
        lack of expected error at test line 22 'filter: (clk: AB) => clk.a > 0,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Unmarked error at test line 29 'filter: (clk) => clk !== null,'
        lack of expected error at test line 28 'target: strt,'
        Parameter 'clk' implicitly has an 'any' type.
        Unmarked error at test line 33 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 35 'target: strt,'
        'clk' is possibly 'null'.
        Unmarked error at test line 47 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 49 'target: strt,'
        Parameter 'clk' implicitly has an 'any' type.
        Unmarked error at test line 54 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: AB | null) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: bool...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 62 'clock: nullableAB,'
        lack of expected error at test line 58 'filter: (clk: AB) => clk.a > 0,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 64 'target: strt,'
        lack of expected error at test line 66 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 72 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        Unmarked error at test line 76 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 74 'target: strt,'
        'val' is possibly 'null'.
        Unmarked error at test line 76 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 76 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Unmarked error at test line 78 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 83 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 82 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Unmarked error at test line 83 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 83 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Unmarked error at test line 85 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 91 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 88 'target: strt,'
        lack of expected error at test line 90 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Unmarked error at test line 91 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 91 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 95 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 100 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 98 'target: strt,'
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 109 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 107 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 109 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 111 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Unmarked error at test line 116 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 118 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        lack of expected error at test line 121 'target: strt,'
        'clk' is possibly 'null'.
        Unmarked error at test line 124 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 126 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 131 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 130 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 133 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 139 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 136 'target: strt,'
        lack of expected error at test line 138 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 142 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 144 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 155 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 153 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 155 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 158 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 160 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 171 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 169 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Unmarked error at test line 171 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
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
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
      Unmarked error at test line 6 'clock: [ab,nullableAB],'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
      Unmarked error at test line 12 'clock: [ab,nullableAB],'
      lack of expected error at test line 8 'target: strt,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
      Unmarked error at test line 18 'clock: [ab,nullableAB],'
      lack of expected error at test line 15 'filter: (clk: AB) => clk.a > 0,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
      lack of expected error at test line 20 'target: strt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
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
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
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
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk: AB | null) => clk !== null,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
          fn: (val: AB | null) => ({a:1, b: val ? val.b : ''}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          fn: (val: AB) => ({a:val.a, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Unmarked error at test line 10 'sample({'
        lack of expected error at test line 6 'target: strt,'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 17 'sample({'
        lack of expected error at test line 14 'filter: (clk: AB) => clk.a > 0,'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 26 'clock: [ab,nullableAB],'
        lack of expected error at test line 20 'target: strt,'
        lack of expected error at test line 22 'filter: (clk: AB) => clk.a > 0,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Unmarked error at test line 29 'filter: (clk) => clk !== null,'
        lack of expected error at test line 28 'target: strt,'
        Parameter 'clk' implicitly has an 'any' type.
        Unmarked error at test line 33 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 35 'target: strt,'
        'clk' is possibly 'null'.
        Unmarked error at test line 47 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 49 'target: strt,'
        Parameter 'clk' implicitly has an 'any' type.
        Unmarked error at test line 54 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: AB | null) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean |...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 62 'clock: [ab,nullableAB],'
        lack of expected error at test line 58 'filter: (clk: AB) => clk.a > 0,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 64 'target: strt,'
        lack of expected error at test line 66 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 72 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        Unmarked error at test line 76 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 74 'target: strt,'
        'val' is possibly 'null'.
        Unmarked error at test line 76 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 76 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Unmarked error at test line 78 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 83 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 82 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Unmarked error at test line 83 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 83 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Unmarked error at test line 85 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 91 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 88 'target: strt,'
        lack of expected error at test line 90 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Unmarked error at test line 91 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 91 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 95 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 100 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 98 'target: strt,'
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 109 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 107 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 109 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 111 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Unmarked error at test line 116 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 118 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        lack of expected error at test line 121 'target: strt,'
        'clk' is possibly 'null'.
        Unmarked error at test line 124 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 126 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 131 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 130 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 133 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 139 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 136 'target: strt,'
        lack of expected error at test line 138 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 142 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 144 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 155 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 153 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Unmarked error at test line 155 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 158 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        lack of expected error at test line 160 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 171 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 169 'target: strt,'
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Unmarked error at test line 171 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
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
        Unmarked error at test line 2 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => clk is AB | null; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
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
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        lack of expected error at test line 6 'filter: (clk: AB) => clk.a > 0,'
        'clk' is possibly 'null'.
        Unmarked error at test line 15 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [con...'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        lack of expected error at test line 18 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 23 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 27 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 26 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Unmarked error at test line 27 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 27 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 33 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Unmarked error at test line 37 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 39 'sample({'
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 43 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 42 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
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
        Unmarked error at test line 2 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => clk is AB | null; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
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
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val) => ({a:val.c, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk: AB) => clk.a > 0,
          fn: (val: ABN) => ({a:val.c, b:''}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        lack of expected error at test line 6 'filter: (clk: AB) => clk.a > 0,'
        'clk' is possibly 'null'.
        Unmarked error at test line 15 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        lack of expected error at test line 18 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Unmarked error at test line 23 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 27 'fn: (val) => ({a:val.c, b:val.b}),'
        lack of expected error at test line 26 'filter: (clk: AB) => clk.a > 0,'
        'val' is possibly 'null'.
        Unmarked error at test line 27 'fn: (val) => ({a:val.c, b:val.b}),'
        Property 'c' does not exist on type 'AB'.
        Unmarked error at test line 27 'fn: (val) => ({a:val.c, b:val.b}),'
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 33 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Unmarked error at test line 37 'fn: (val: ABN) => ({a:val.c, b:''}),'
        Property 'c' does not exist on type 'ABN'.
        Unmarked error at test line 39 'sample({'
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Unmarked error at test line 43 'fn: (val: ABN) => ({a:val.c, b:''}),'
        lack of expected error at test line 42 'filter: (clk: AB) => clk.a > 0,'
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        "
      `)
    })
  })
})
