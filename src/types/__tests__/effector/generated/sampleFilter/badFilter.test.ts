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
  test('not a function (should fail)', () => {
    //prettier-ignore
    {
      sample({
        clock: nullableAB,
        target: $ab,
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: nullableAB,
        target: $ab,
        //@ts-expect-error
        filter: null,
        fn: (val) => ({a:1, b: val ? val.b : ''}),
      })
      sample({
        clock: nullableAB,
        //@ts-expect-error
        filter: null,
      })
      sample({
        clock: nullableAB,
        //@ts-expect-error
        filter: null,
        fn: (val) => ({a:1, b: val ? val.b : ''}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 3 'sample({'
      Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; }]' is not assignable to parameter of type '[Omit<never, \\"target\\" | \\"clock\\"> & { clock: EventCallable<AB | null>; target: StoreWritable<AB>; }] | [Omit<never, \\"target\\" | \\"clock\\"> & { ...; }]'.
        Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; }]' is not assignable to type '[Omit<never, \\"target\\" | \\"clock\\"> & { clock: EventCallable<AB | null>; target: StoreWritable<AB>; }]'.
          Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; }' is not assignable to type 'Omit<never, \\"target\\" | \\"clock\\"> & { clock: EventCallable<AB | null>; target: StoreWritable<AB>; }'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; }' is not assignable to type 'Omit<never, \\"target\\" | \\"clock\\">'.
              Property 'clock' is incompatible with index signature.
                Type 'EventCallable<AB | null>' is not assignable to type 'never'.
      Unmarked error at test line 9 'sample({'
      lack of expected error at test line 7 'filter: null,'
      Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
        Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
            Types of property 'filter' are incompatible.
              Type 'null' is not assignable to type '((clk: AB | null) => boolean) | undefined'.
      Unmarked error at test line 16 'sample({'
      lack of expected error at test line 13 'filter: null,'
      Argument of type '[{ clock: EventCallable<AB | null>; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ clock: EventCallable<AB | null>; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ clock: EventCallable<AB | null>; filter: null; }' is not assignable to type 'never'.
            The intersection '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Unmarked error at test line 21 'sample({'
      lack of expected error at test line 19 'filter: null,'
      Argument of type '[{ clock: EventCallable<AB | null>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
        Type '[{ clock: EventCallable<AB | null>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
            Types of property 'filter' are incompatible.
              Type 'null' is not assignable to type '((clk: AB | null) => boolean) | undefined'.
      lack of expected error at test line 24 'filter: null,'
      "
    `)
  })
  test('bad return (should fail)', () => {
    //prettier-ignore
    {
      sample({
        clock: nullableAB,
        target: $ab,
        //@ts-expect-error
        filter: () => 1,
      })
      sample({
        clock: nullableAB,
        target: $ab,
        //@ts-expect-error
        filter: () => 1,
        fn: (val) => ({a:1, b: val ? val.b : ''}),
      })
      sample({
        clock: nullableAB,
        //@ts-expect-error
        filter: () => 1,
      })
      sample({
        clock: nullableAB,
        //@ts-expect-error
        filter: () => 1,
        fn: (val) => ({a:1, b: val ? val.b : ''}),
      })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 4 'clock: nullableAB,'
      Type 'EventCallable<AB | null>' is not assignable to type 'Unit<AB>'.
        Types of property '__' are incompatible.
          Type 'AB | null' is not assignable to type 'AB'.
            Type 'null' is not assignable to type 'AB'.
      Unmarked error at test line 9 'sample({'
      lack of expected error at test line 7 'filter: () => 1,'
      Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
        Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
            The types returned by 'filter(...)' are incompatible between these types.
              Type 'number' is not assignable to type 'boolean'.
      Unmarked error at test line 16 'sample({'
      lack of expected error at test line 13 'filter: () => 1,'
      Argument of type '[{ clock: EventCallable<AB | null>; filter: () => number; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => clk is AB | null; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ clock: EventCallable<AB | null>; filter: () => number; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
          Type '{ clock: EventCallable<AB | null>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
            Type '{ clock: EventCallable<AB | null>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              The types returned by 'filter(...)' are incompatible between these types.
                Type 'number' is not assignable to type 'boolean'.
      Unmarked error at test line 21 'sample({'
      lack of expected error at test line 19 'filter: () => 1,'
      Argument of type '[{ clock: EventCallable<AB | null>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
        Type '[{ clock: EventCallable<AB | null>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
            The types returned by 'filter(...)' are incompatible between these types.
              Type 'number' is not assignable to type 'boolean'.
      lack of expected error at test line 24 'filter: () => 1,'
      "
    `)
  })
})
