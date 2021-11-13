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
const nullableAB = createEvent<AB | null>()
const abNull = createEvent<{a: number | null; b: string}>()
const aNum = createEvent<{a: number}>()
const aStr = createEvent<{a: string}>()
const lNum = createEvent<[number]>()
const lStr = createEvent<[string]>()
const lNumStr = createEvent<[number, string]>()
const lNumNum = createEvent<[number, number]>()
const abn = createEvent<ABN>()
describe('unit source', () => {
  describe('unit -> unit same', () => {
    test('unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, target:ab   , filter:(val) => val.a > 0})
        sample({source:ab, target:anyt , filter:(val) => val.a > 0})
        sample({source:ab, target:voidt, filter:(val) => val.a > 0})
        sample({source:ab, target:ab   , filter:$filter           })
        sample({source:ab, target:anyt , filter:$filter           })
        sample({source:ab, target:voidt, filter:$filter           })
        sample({source:ab, target:ab   , filter:Boolean           })
        sample({source:ab, target:anyt , filter:Boolean           })
        sample({source:ab, target:voidt, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('unit -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, target:abn, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:abn, filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:abn, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: Event<ABN>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: Event<ABN>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Argument of type '{ source: Event<AB>; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        "
      `)
    })
  })
  describe('unit -> unit wide', () => {
    test('unit -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, target:aNum, filter:(val) => val.a > 0})
        sample({source:ab, target:aNum, filter:$filter           })
        sample({source:ab, target:aNum, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('unit -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Argument of type '{ source: Event<AB>; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('unit + clock -> unit same', () => {
    test('unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:anyt, target:ab   , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:anyt , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:voidt, filter:(val) => val.a > 0  })
        sample({source:ab, clock:numt, target:ab   , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:anyt , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:voidt, filter:(val,n) => val.a > n})
        sample({source:ab, clock:anyt, target:ab   , filter:$filter             })
        sample({source:ab, clock:anyt, target:anyt , filter:$filter             })
        sample({source:ab, clock:anyt, target:voidt, filter:$filter             })
        sample({source:ab, clock:anyt, target:ab   , filter:Boolean             })
        sample({source:ab, clock:anyt, target:anyt , filter:Boolean             })
        sample({source:ab, clock:anyt, target:voidt, filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: Event<AB>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: Event<any>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: Event<void>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:abn, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:abn, filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:abn, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<ABN>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<ABN>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        "
      `)
    })
  })
  describe('unit + clock -> unit wide', () => {
    test('unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:anyt, target:aNum, filter:(val) => val.a > 0  })
        sample({source:ab, clock:numt, target:aNum, filter:(val,n) => val.a > n})
        sample({source:ab, clock:anyt, target:aNum, filter:$filter             })
        sample({source:ab, clock:anyt, target:aNum, filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit same', () => {
    test('unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:[anyt]     , target:ab   , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:anyt , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:voidt, filter:(val) => val.a > 0  })
        sample({source:ab, clock:[numt,$num], target:ab   , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:anyt , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:voidt, filter:(val,n) => val.a > n})
        sample({source:ab, clock:[anyt]     , target:ab   , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:anyt , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:voidt, filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:ab   , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:anyt , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:voidt, filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: Event<AB>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: Event<any>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: Event<void>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:abn, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:abn, filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:abn, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: Event<ABN>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: Event<ABN>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit wide', () => {
    test('unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:[anyt]     , target:aNum, filter:(val) => val.a > 0  })
        sample({source:ab, clock:[numt,$num], target:aNum, filter:(val,n) => val.a > n})
        sample({source:ab, clock:[anyt]     , target:aNum, filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:aNum, filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('unit -> array same', () => {
    test('unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, target:[ab]           , filter:(val) => val.a > 0})
        sample({source:ab, target:[ab,anyt]      , filter:(val) => val.a > 0})
        sample({source:ab, target:[ab,voidt]     , filter:(val) => val.a > 0})
        sample({source:ab, target:[ab,anyt,voidt], filter:(val) => val.a > 0})
        sample({source:ab, target:[ab]           , filter:$filter           })
        sample({source:ab, target:[ab,anyt]      , filter:$filter           })
        sample({source:ab, target:[ab,voidt]     , filter:$filter           })
        sample({source:ab, target:[ab,anyt,voidt], filter:$filter           })
        sample({source:ab, target:[ab]           , filter:Boolean           })
        sample({source:ab, target:[ab,anyt]      , filter:Boolean           })
        sample({source:ab, target:[ab,voidt]     , filter:Boolean           })
        sample({source:ab, target:[ab,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: [Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<AB>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<AB>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('unit -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: [Event<ABN>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<ABN>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<ABN>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: Event<ABN>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('unit -> array wide', () => {
    test('unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, target:[aNum]           , filter:(val) => val.a > 0})
        sample({source:ab, target:[aNum,anyt]      , filter:(val) => val.a > 0})
        sample({source:ab, target:[aNum,voidt]     , filter:(val) => val.a > 0})
        sample({source:ab, target:[aNum,anyt,voidt], filter:(val) => val.a > 0})
        sample({source:ab, target:[aNum]           , filter:$filter           })
        sample({source:ab, target:[aNum,anyt]      , filter:$filter           })
        sample({source:ab, target:[aNum,voidt]     , filter:$filter           })
        sample({source:ab, target:[aNum,anyt,voidt], filter:$filter           })
        sample({source:ab, target:[aNum]           , filter:Boolean           })
        sample({source:ab, target:[aNum,anyt]      , filter:Boolean           })
        sample({source:ab, target:[aNum,voidt]     , filter:Boolean           })
        sample({source:ab, target:[aNum,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: [Event<{ a: number; }>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('unit -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; target: [Event<{ a: string; }>, Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<{ a: string; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<{ a: string; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: [Event<{ a: string; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock?: undefined; fn: (src: AB) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('unit + clock -> array same', () => {
    test('unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:anyt, target:[ab]           , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:[ab,anyt]      , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:[ab,voidt]     , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:ab, clock:numt, target:[ab]           , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:[ab,anyt]      , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:[ab,voidt]     , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:ab, clock:anyt, target:[ab]           , filter:$filter             })
        sample({source:ab, clock:anyt, target:[ab,anyt]      , filter:$filter             })
        sample({source:ab, clock:anyt, target:[ab,voidt]     , filter:$filter             })
        sample({source:ab, clock:anyt, target:[ab,anyt,voidt], filter:$filter             })
        sample({source:ab, clock:anyt, target:[ab]           , filter:Boolean             })
        sample({source:ab, clock:anyt, target:[ab,anyt]      , filter:Boolean             })
        sample({source:ab, clock:anyt, target:[ab,voidt]     , filter:Boolean             })
        sample({source:ab, clock:anyt, target:[ab,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<AB>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<AB>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<AB>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<AB>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<AB>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<ABN>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<ABN>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<ABN>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<ABN>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('unit + clock -> array wide', () => {
    test('unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:anyt, target:[aNum]           , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        sample({source:ab, clock:anyt, target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:ab, clock:numt, target:[aNum]           , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        sample({source:ab, clock:numt, target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:ab, clock:anyt, target:[aNum]           , filter:$filter             })
        sample({source:ab, clock:anyt, target:[aNum,anyt]      , filter:$filter             })
        sample({source:ab, clock:anyt, target:[aNum,voidt]     , filter:$filter             })
        sample({source:ab, clock:anyt, target:[aNum,anyt,voidt], filter:$filter             })
        sample({source:ab, clock:anyt, target:[aNum]           , filter:Boolean             })
        sample({source:ab, clock:anyt, target:[aNum,anyt]      , filter:Boolean             })
        sample({source:ab, clock:anyt, target:[aNum,voidt]     , filter:Boolean             })
        sample({source:ab, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: number; }>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<{ a: number; }>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<number>; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<number>; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: string; }>, Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: string; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: string; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: [Event<{ a: string; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: Event<any>; fn: (src: AB, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array same', () => {
    test('unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:[anyt]     , target:[ab]           , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:[ab,anyt]      , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:[ab,voidt]     , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:ab, clock:[numt,$num], target:[ab]           , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:[ab,anyt]      , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:[ab,voidt]     , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:ab, clock:[anyt]     , target:[ab]           , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[ab,anyt]      , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[ab,voidt]     , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[ab,anyt,voidt], filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[ab]           , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:[ab,anyt]      , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:[ab,voidt]     , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<AB>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<AB>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<AB>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn]           , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<ABN>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<ABN>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<ABN>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: Event<ABN>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array wide', () => {
    test('unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab, clock:[anyt]     , target:[aNum]           , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        sample({source:ab, clock:[anyt]     , target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:ab, clock:[numt,$num], target:[aNum]           , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        sample({source:ab, clock:[numt,$num], target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:ab, clock:[anyt]     , target:[aNum]           , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[aNum,anyt]      , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[aNum,voidt]     , filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[aNum,anyt,voidt], filter:$filter             })
        sample({source:ab, clock:[anyt]     , target:[aNum]           , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:[aNum,anyt]      , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:[aNum,voidt]     , filter:Boolean             })
        sample({source:ab, clock:[anyt]     , target:[aNum,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: number; }>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<number>, Store<number>]; fn: (src: AB, clk: number) => any; target?: [Event<{ a: number; }>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('unit + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<AB>; clock: [Event<any>]; fn: (src: AB, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<AB> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('nullable unit -> unit same', () => {
    test('nullable unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:abNull    , target:ab, filter:(val): val is AB => val.a !== null})
        sample({source:nullableAB, target:ab, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: Event<AB>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; target: Event<AB>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: AB; }; }'.
        "
      `)
    })
    test('nullable unit -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:abNull    , target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: Event<ABN>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: ABN; }; }'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> unit same', () => {
    test('nullable unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:abNull    , clock:anyt, target:ab, filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:numt, target:ab, filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:nullableAB, clock:anyt, target:ab, filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: Event<AB>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; target: Event<AB>; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<AB>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: AB; }; }'.
        "
      `)
    })
    test('nullable unit + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:abNull    , clock:anyt, target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: Event<ABN>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: ABN; }; }'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> unit same', () => {
    test('nullable unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:abNull    , clock:[anyt]     , target:ab, filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:[numt,$num], target:ab, filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:nullableAB, clock:[anyt]     , target:ab, filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: Event<AB>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; target: Event<AB>; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<AB>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: AB; }; }'.
        "
      `)
    })
    test('nullable unit + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:abNull    , clock:[anyt], target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: Event<ABN>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: ABN; }; }'.
        "
      `)
    })
  })
  describe('nullable unit -> unit wide', () => {
    test('nullable unit -> unit wide (should pass)', () => {
      //prettier-ignore
      sample({source:nullableAB, target:aNum, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; target: Event<{ a: number; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: number; }; }; }'.
        "
      `)
    })
    test('nullable unit -> unit wide (should fail)', () => {
      //prettier-ignore
      //@ts-expect-error
      sample({source:nullableAB, target:aStr, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> unit wide', () => {
    test('nullable unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      sample({source:nullableAB, clock:anyt, target:aNum, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<{ a: number; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: number; }; }; }'.
        "
      `)
    })
    test('nullable unit + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      //@ts-expect-error
      sample({source:nullableAB, clock:anyt, target:aStr, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> unit wide', () => {
    test('nullable unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      sample({source:nullableAB, clock:[anyt], target:aNum, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<{ a: number; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: number; }; }; }'.
        "
      `)
    })
    test('nullable unit + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      //@ts-expect-error
      sample({source:nullableAB, clock:[anyt], target:aStr, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB | null; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('nullable unit -> array same', () => {
    test('nullable unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:abNull    , target:[ab]           , filter:(val): val is AB => val.a !== null})
        sample({source:abNull    , target:[ab,anyt]      , filter:(val): val is AB => val.a !== null})
        sample({source:abNull    , target:[ab,voidt]     , filter:(val): val is AB => val.a !== null})
        sample({source:abNull    , target:[ab,anyt,voidt], filter:(val): val is AB => val.a !== null})
        sample({source:nullableAB, target:[ab]           , filter:Boolean                           })
        sample({source:nullableAB, target:[ab,anyt]      , filter:Boolean                           })
        sample({source:nullableAB, target:[ab,voidt]     , filter:Boolean                           })
        sample({source:nullableAB, target:[ab,anyt,voidt], filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<AB>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<AB>, Event<any>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<AB>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; target: Event<AB>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<void> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<void> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
    test('nullable unit -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:abNull    , target:[abn]           , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , target:[abn,anyt]      , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , target:[abn,voidt]     , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , target:[abn,anyt,voidt], filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, target:[abn,anyt,voidt], filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<ABN>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<ABN>, Event<any>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<ABN>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> array same', () => {
    test('nullable unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:abNull    , clock:anyt, target:[ab]           , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:anyt, target:[ab,anyt]      , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:anyt, target:[ab,voidt]     , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:anyt, target:[ab,anyt,voidt], filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:numt, target:[ab]           , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:abNull    , clock:numt, target:[ab,anyt]      , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:abNull    , clock:numt, target:[ab,voidt]     , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:abNull    , clock:numt, target:[ab,anyt,voidt], filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:nullableAB, clock:anyt, target:[ab]           , filter:Boolean                                      })
        sample({source:nullableAB, clock:anyt, target:[ab,anyt]      , filter:Boolean                                      })
        sample({source:nullableAB, clock:anyt, target:[ab,voidt]     , filter:Boolean                                      })
        sample({source:nullableAB, clock:anyt, target:[ab,anyt,voidt], filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<AB>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<AB>, Event<any>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<AB>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; target: [Event<AB>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; target: [Event<AB>, Event<any>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; target: [Event<AB>, Event<void>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<AB>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<void> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<void> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
    test('nullable unit + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:abNull    , clock:anyt, target:[abn]           , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , clock:anyt, target:[abn,anyt]      , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , clock:anyt, target:[abn,voidt]     , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , clock:anyt, target:[abn,anyt,voidt], filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[abn,anyt,voidt], filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<ABN>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<ABN>, Event<any>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<ABN>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> array same', () => {
    test('nullable unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:abNull    , clock:[anyt]     , target:[ab]           , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:[anyt]     , target:[ab,anyt]      , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:[anyt]     , target:[ab,voidt]     , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:[anyt]     , target:[ab,anyt,voidt], filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:[numt,$num], target:[ab]           , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:abNull    , clock:[numt,$num], target:[ab,anyt]      , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:abNull    , clock:[numt,$num], target:[ab,voidt]     , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:abNull    , clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:nullableAB, clock:[anyt]     , target:[ab]           , filter:Boolean                                      })
        sample({source:nullableAB, clock:[anyt]     , target:[ab,anyt]      , filter:Boolean                                      })
        sample({source:nullableAB, clock:[anyt]     , target:[ab,voidt]     , filter:Boolean                                      })
        sample({source:nullableAB, clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<AB>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<AB>, Event<any>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<AB>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; target: [Event<AB>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<any>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<void>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: [Event<...>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<AB>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<void> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<AB>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: AB; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
    test('nullable unit + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:abNull    , clock:[anyt], target:[abn]           , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , clock:[anyt], target:[abn,anyt]      , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , clock:[anyt], target:[abn,voidt]     , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:abNull    , clock:[anyt], target:[abn,anyt,voidt], filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[abn,anyt,voidt], filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<ABN>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<ABN>, Event<any>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<ABN>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: Event<{ a: number | null; b: string; }>; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('nullable unit -> array wide', () => {
    test('nullable unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:nullableAB, target:[aNum]           , filter:Boolean})
        sample({source:nullableAB, target:[aNum,anyt]      , filter:Boolean})
        sample({source:nullableAB, target:[aNum,voidt]     , filter:Boolean})
        sample({source:nullableAB, target:[aNum,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; target: Event<{ a: number; }>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<void> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<void> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
    test('nullable unit -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,ab]        , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,anyt]      , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,voidt]     , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, { sourceType: AB | null; targetType: AB; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, { sourceType: AB | null; targetType: AB; }]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> array wide', () => {
    test('nullable unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:nullableAB, clock:anyt, target:[aNum]           , filter:Boolean})
        sample({source:nullableAB, clock:anyt, target:[aNum,anyt]      , filter:Boolean})
        sample({source:nullableAB, clock:anyt, target:[aNum,voidt]     , filter:Boolean})
        sample({source:nullableAB, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: Event<{ a: number; }>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<void> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<void> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
    test('nullable unit + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,ab]        , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,anyt]      , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,voidt]     , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, { sourceType: AB | null; targetType: AB; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, { sourceType: AB | null; targetType: AB; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> array wide', () => {
    test('nullable unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:nullableAB, clock:[anyt], target:[aNum]           , filter:Boolean})
        sample({source:nullableAB, clock:[anyt], target:[aNum,anyt]      , filter:Boolean})
        sample({source:nullableAB, clock:[anyt], target:[aNum,voidt]     , filter:Boolean})
        sample({source:nullableAB, clock:[anyt], target:[aNum,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: Event<{ a: number; }>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<void> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<{ a: number; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: number; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
    test('nullable unit + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,ab]        , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,anyt]      , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,voidt]     , filter:Boolean})
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, { sourceType: AB | null; targetType: AB; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, { sourceType: AB | null; targetType: AB; }]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: Event<AB | null>; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: AB | null; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
})
describe('object source', () => {
  describe('object -> array same', () => {
    test('object -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, target:[ab]           , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[ab,anyt]      , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[ab,voidt]     , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[ab,anyt,voidt], filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[ab]           , filter:$filter           })
        sample({source:{a,b}, target:[ab,anyt]      , filter:$filter           })
        sample({source:{a,b}, target:[ab,voidt]     , filter:$filter           })
        sample({source:{a,b}, target:[ab,anyt,voidt], filter:$filter           })
        sample({source:{a,b}, target:[ab]           , filter:Boolean           })
        sample({source:{a,b}, target:[ab,anyt]      , filter:Boolean           })
        sample({source:{a,b}, target:[ab,voidt]     , filter:Boolean           })
        sample({source:{a,b}, target:[ab,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<AB>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<AB>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<AB>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('object -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<ABN>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<ABN>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<ABN>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<ABN>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('object -> array wide', () => {
    test('object -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, target:[aNum]           , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[aNum,anyt]      , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[aNum,voidt]     , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[aNum,anyt,voidt], filter:(val) => val.a > 0})
        sample({source:{a,b}, target:[aNum]           , filter:$filter           })
        sample({source:{a,b}, target:[aNum,anyt]      , filter:$filter           })
        sample({source:{a,b}, target:[aNum,voidt]     , filter:$filter           })
        sample({source:{a,b}, target:[aNum,anyt,voidt], filter:$filter           })
        sample({source:{a,b}, target:[aNum]           , filter:Boolean           })
        sample({source:{a,b}, target:[aNum,anyt]      , filter:Boolean           })
        sample({source:{a,b}, target:[aNum,voidt]     , filter:Boolean           })
        sample({source:{a,b}, target:[aNum,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: number; }>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: number; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('object -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: string; }>, Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: string; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: string; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: [Event<{ a: string; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: [Event<{ a: string; }>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AB> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('object + clock -> array same', () => {
    test('object + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, clock:anyt, target:[ab]           , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:[ab,anyt]      , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:[ab,voidt]     , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:numt, target:[ab]           , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:[ab,anyt]      , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:[ab,voidt]     , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:anyt, target:[ab]           , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[ab,anyt]      , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[ab,voidt]     , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[ab,anyt,voidt], filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[ab]           , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:[ab,anyt]      , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:[ab,voidt]     , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:[ab,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<AB>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<AB>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<AB>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<AB>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<AB>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('object + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<ABN>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<ABN>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<ABN>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<ABN>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('object + clock -> array wide', () => {
    test('object + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, clock:anyt, target:[aNum]           , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:numt, target:[aNum]           , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:anyt, target:[aNum]           , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[aNum,anyt]      , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[aNum,voidt]     , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[aNum,anyt,voidt], filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:[aNum]           , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:[aNum,anyt]      , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:[aNum,voidt]     , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: number; }>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: number; }>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<{ a: number; }>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ a: number; }>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('object + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: string; }>, Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: string; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: string; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: [Event<{ a: string; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: [Event<{ a: string; }>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('object + [clock] -> array same', () => {
    test('object + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, clock:[anyt]     , target:[ab]           , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,anyt]      , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,voidt]     , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[numt,$num], target:[ab]           , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:[ab,anyt]      , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:[ab,voidt]     , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[anyt]     , target:[ab]           , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,anyt]      , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,voidt]     , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,anyt,voidt], filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab]           , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,anyt]      , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,voidt]     , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<AB>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<AB>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<AB>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<AB>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<AB>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<AB>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('object + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn]           , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<ABN>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<ABN>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<ABN>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<ABN>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<ABN>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: Event<ABN>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: Event<ABN>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<ABN>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: ABN; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('object + [clock] -> array wide', () => {
    test('object + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, clock:[anyt]     , target:[aNum]           , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[numt,$num], target:[aNum]           , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[anyt]     , target:[aNum]           , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,anyt]      , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,voidt]     , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,anyt,voidt], filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum]           , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,anyt]      , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,voidt]     , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:[aNum,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: number; }>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: number; }>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: [Event<{ a: number; }>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: [Event<{ ...; }>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('object + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<AB>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<AB>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: [Event<{ a: string; }>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: [Event<{ a: string; }>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<AB> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<AB> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<AB>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<void>]; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<{ a: string; }>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: { a: number; b: string; }; targetType: { a: string; }; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('object -> unit same', () => {
    test('object -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, target:ab   , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:anyt , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:voidt, filter:(val) => val.a > 0})
        sample({source:{a}  , target:aNum , filter:(val) => val.a > 0})
        sample({source:{a,b}, target:ab   , filter:$filter           })
        sample({source:{a,b}, target:anyt , filter:$filter           })
        sample({source:{a,b}, target:voidt, filter:$filter           })
        sample({source:{a}  , target:aNum , filter:$filter           })
        sample({source:{a,b}, target:ab   , filter:Boolean           })
        sample({source:{a,b}, target:anyt , filter:Boolean           })
        sample({source:{a,b}, target:voidt, filter:Boolean           })
        sample({source:{a}  , target:aNum , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock?: undefined; fn: (src: { a: number; }) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock?: undefined; fn: (src: { a: number; }) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('object -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:abn , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , target:ab  , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:abn , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a}  , target:ab  , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a}  , target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock?: undefined; fn: (src: { a: number; }) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock?: undefined; fn: (src: { a: number; }) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock?: undefined; fn: (src: { a: number; }) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock?: undefined; fn: (src: { a: number; }) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Argument of type '{ source: { a: Store<number>; }; target: Event<AB>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Argument of type '{ source: { a: Store<number>; }; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Argument of type '{ source: { a: Store<number>; }; target: Event<AB>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Argument of type '{ source: { a: Store<number>; }; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('object -> unit wide', () => {
    test('object -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}     , target:aNum, filter:(val) => val.a > 0                             })
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0})
        sample({source:{a,b}     , target:aNum, filter:$filter                                        })
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                        })
        sample({source:{a,b}     , target:aNum, filter:Boolean                                        })
        sample({source:{a:aOpt,b}, target:aNum, filter:Boolean                                        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; target: Event<{ a: number; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; target: Event<{ a: number; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        "
      `)
    })
    test('object -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number; b: string; }) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('object + clock -> unit same', () => {
    test('object + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, clock:anyt, target:ab   , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:anyt , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:anyt, target:voidt, filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:numt, target:ab   , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:anyt , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:numt, target:voidt, filter:(val,n) => val.a > n})
        sample({source:{a}  , clock:anyt, target:aNum , filter:(val) => val.a > 0  })
        sample({source:{a}  , clock:numt, target:aNum , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:anyt, target:ab   , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:anyt , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:voidt, filter:$filter             })
        sample({source:{a}  , clock:anyt, target:aNum , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:ab   , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:anyt , filter:Boolean             })
        sample({source:{a,b}, clock:anyt, target:voidt, filter:Boolean             })
        sample({source:{a}  , clock:anyt, target:aNum , filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<AB>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<any>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<void>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<any>; fn: (src: { a: number; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: Event<any>; fn: (src: { a: number; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<number>; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<number>; fn: (src: { a: number; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: Event<number>; fn: (src: { a: number; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('object + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:abn , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab  , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:abn , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab  , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<ABN>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<any>; fn: (src: { a: number; }, clk: any) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: Event<any>; fn: (src: { a: number; }, clk: any) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: Event<any>; fn: (src: { a: number; }, clk: any) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: Event<any>; fn: (src: { a: number; }, clk: any) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<ABN>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<AB>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<AB>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('object + clock -> unit wide', () => {
    test('object + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}     , clock:anyt, target:aNum, filter:(val) => val.a > 0                               })
        sample({source:{a,b}     , clock:numt, target:aNum, filter:(val,n) => val.a > n                             })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0  })
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n})
        sample({source:{a,b}     , clock:anyt, target:aNum, filter:$filter                                          })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                          })
        sample({source:{a,b}     , clock:anyt, target:aNum, filter:Boolean                                          })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:Boolean                                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<number>; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: number; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: number; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        "
      `)
    })
    test('object + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number; b: string; }, clk: any) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit same', () => {
    test('object + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}, clock:[anyt]     , target:ab   , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:anyt , filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[anyt]     , target:voidt, filter:(val) => val.a > 0  })
        sample({source:{a,b}, clock:[numt,$num], target:ab   , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:anyt , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[numt,$num], target:voidt, filter:(val,n) => val.a > n})
        sample({source:{a}  , clock:[anyt]     , target:aNum , filter:(val) => val.a > 0  })
        sample({source:{a}  , clock:[numt,$num], target:aNum , filter:(val,n) => val.a > n})
        sample({source:{a,b}, clock:[anyt]     , target:ab   , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:anyt , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:voidt, filter:$filter             })
        sample({source:{a}  , clock:[anyt]     , target:aNum , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:ab   , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:anyt , filter:Boolean             })
        sample({source:{a,b}, clock:[anyt]     , target:voidt, filter:Boolean             })
        sample({source:{a}  , clock:[anyt]     , target:aNum , filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: Event<AB>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: Event<any>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: Event<void>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: [Event<any>]; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: [Event<any>]; fn: (src: { a: number; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: [Event<any>]; fn: (src: { a: number; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: [Event<number>, Store<number>]; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('object + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:abn , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab  , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:abn , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab  , filter:Boolean           })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: Event<ABN>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<ABN> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<ABN> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: [Event<any>]; target: Event<AB>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: [Event<any>]; fn: (src: { a: number; }, clk: never) => any; target?: Event<AB> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: [Event<any>]; fn: (src: { a: number; }, clk: never) => any; target?: Event<AB> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; }; clock: [Event<any>]; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; }; clock: [Event<any>]; fn: (src: { a: number; }, clk: never) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; }; clock: [Event<any>]; fn: (src: { a: number; }, clk: never) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: Event<ABN>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>[]; target: Event<AB>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>[]; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: Event<ABN>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>[]; target: Event<AB>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Argument of type '{ source: { a: Store<number>; }; clock: Event<any>[]; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit wide', () => {
    test('object + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}     , clock:[anyt]     , target:aNum, filter:(val) => val.a > 0                               })
        sample({source:{a,b}     , clock:[numt,$num], target:aNum, filter:(val,n) => val.a > n                             })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0  })
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n})
        sample({source:{a,b}     , clock:[anyt]     , target:aNum, filter:$filter                                          })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                          })
        sample({source:{a,b}     , clock:[anyt]     , target:aNum, filter:Boolean                                          })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:Boolean                                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<any>]; target: Event<{ a: number; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: Event<{ a: number; }>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<...> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<...> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>[]; target: Event<{ a: number; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>[]; target: Event<{ a: number; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        "
      `)
    })
    test('object + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; target: Event<{ a: string; }>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<{ a: string; }> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number; b: string; }, clk: never) => any; target?: Event<{ a: string; }> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: Event<{ a: string; }>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Argument of type '{ source: { a: Store<number>; b: Store<string>; }; clock: Event<any>[]; target: Event<{ a: string; }>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        "
      `)
    })
  })
  test('nullable object -> unit wide (should pass)', () => {
    //prettier-ignore
    sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; target: Event<{ a: number; }>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<{ a: number; }> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock?: undefined; fn: (src: { a: number | null; b: string; }) => any; target?: Event<{ a: number; }> | undefined; }'.
      Parameter 'val' implicitly has an 'any' type.
      "
    `)
  })
  test('nullable object + clock -> unit wide (should pass)', () => {
    //prettier-ignore
    {
      sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  })
      sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; target: Event<{ a: number; }>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<any>; fn: (src: { a: number | null; b: string; }, clk: any) => any; target?: Event<{ a: number; }> | undefined; }'.
      Parameter 'val' implicitly has an 'any' type.
      Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<number>; target: Event<{ a: number; }>; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: Event<number>; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<{ a: number; }> | undefined; }'.
      Parameter 'val' implicitly has an 'any' type.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('nullable object + [clock] -> unit wide (should pass)', () => {
    //prettier-ignore
    {
      sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  })
      sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<any>]; target: Event<{ a: number; }>; filter: (val: any) => val is AB; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<any>]; fn: (src: { a: number | null; b: string; }, clk: never) => any; target?: Event<{ a: number; }> | undefined; }'.
      Parameter 'val' implicitly has an 'any' type.
      Argument of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<number>, Store<number>]; target: Event<{ a: number; }>; filter: (val: any, n: any) => val is AB; }' is not assignable to parameter of type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<...> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ source: { a: Store<number | null>; b: Store<string>; }; clock: [Event<number>, Store<number>]; fn: (src: { a: number | null; b: string; }, clk: number) => any; target?: Event<...> | undefined; }'.
      Parameter 'val' implicitly has an 'any' type.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
})
describe('tuple source', () => {
  describe('tuple -> array same', () => {
    test('tuple -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b], target:[lNumStr]           , filter:(val) => val[0] > 0})
        sample({source:[a,b], target:[lNumStr,anyt]      , filter:(val) => val[0] > 0})
        sample({source:[a,b], target:[lNumStr,voidt]     , filter:(val) => val[0] > 0})
        sample({source:[a,b], target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0})
        sample({source:[a,b], target:[lNumStr]           , filter:$filter            })
        sample({source:[a,b], target:[lNumStr,anyt]      , filter:$filter            })
        sample({source:[a,b], target:[lNumStr,voidt]     , filter:$filter            })
        sample({source:[a,b], target:[lNumStr,anyt,voidt], filter:$filter            })
        sample({source:[a,b], target:[lNumStr]           , filter:Boolean            })
        sample({source:[a,b], target:[lNumStr,anyt]      , filter:Boolean            })
        sample({source:[a,b], target:[lNumStr,voidt]     , filter:Boolean            })
        sample({source:[a,b], target:[lNumStr,anyt,voidt], filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, string]>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, string]>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, string]>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, string]>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, string]>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('tuple -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum]           , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,anyt]      , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,voidt]     , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,anyt,voidt], filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum]           , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,anyt]      , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,voidt]     , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,anyt,voidt], filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum]           , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,anyt]      , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,voidt]     , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], target:[lNumNum,anyt,voidt], filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, number]>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, number]>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, number]>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: [Event<[number, number]>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>, Event<any>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: [Event<[number, number]>, Event<any>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<any> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<void> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<any> | Event<void> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<any> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<void> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: (Event<any> | Event<void> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('tuple + clock -> array same', () => {
    test('tuple + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b], clock:anyt, target:[lNumStr]           , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:numt, target:[lNumStr]           , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:numt, target:[lNumStr,anyt]      , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:numt, target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:numt, target:[lNumStr,anyt,voidt], filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:anyt, target:[lNumStr]           , filter:$filter               })
        sample({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:$filter               })
        sample({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:$filter               })
        sample({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:$filter               })
        sample({source:[a,b], clock:anyt, target:[lNumStr]           , filter:Boolean               })
        sample({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:Boolean               })
        sample({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:Boolean               })
        sample({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, string]>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, string]>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, string]>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, string]>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, string]>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: [Event<[number, string]>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: [Event<[number, string]>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: [Event<[number, string]>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: [Event<[number, string]>, Event<any>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('tuple + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum]           , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,anyt]      , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,voidt]     , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,anyt,voidt], filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum]           , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,anyt]      , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,voidt]     , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,anyt,voidt], filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum]           , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,anyt]      , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,voidt]     , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:[lNumNum,anyt,voidt], filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, number]>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, number]>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>, Event<any>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>, Event<any>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, number]>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>, Event<void>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>, Event<void>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: [Event<[number, number]>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>, Event<any>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: [Event<[number, number]>, Event<any>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: Event<[number, number]>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: (Event<any> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: (Event<void> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: (Event<any> | Event<void> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: Event<[number, number]>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: (Event<any> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: (Event<void> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: (Event<any> | Event<void> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array same', () => {
    test('tuple + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[numt,$num], target:[lNumStr]           , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[numt,$num], target:[lNumStr,anyt]      , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[numt,$num], target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[numt,$num], target:[lNumStr,anyt,voidt], filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:Boolean               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:Boolean               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:Boolean               })
        sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, string]>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, string]>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, string]>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, string]>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, string]>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: [Event<[number, string]>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: [Event<[number, string]>, Event<any>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: [Event<[number, string]>, Event<void>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: [Event<[number, string]>, Event<any>, Event<...>]; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: [Event<[number, string]>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('tuple + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum]           , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,anyt]      , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,voidt]     , filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,anyt,voidt], filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum]           , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,anyt]      , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,voidt]     , filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,anyt,voidt], filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum]           , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,anyt]      , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,voidt]     , filter:Boolean            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:[lNumNum,anyt,voidt], filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, number]>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, number]>, Event<any>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, number]>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: [Event<[number, number]>, Event<any>, Event<void>]; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>, Event<...>, Event<...>] | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: [Event<[number, number]>, Event<...>, Event<...>] | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: Event<[number, number]>[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: (Event<any> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: (Event<void> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<[number, number]>)[]; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: Event<[number, number]>[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: (Event<any> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: (Event<void> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<void>]; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: (Event<any> | Event<void> | Event<[number, number]>)[]; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [number, string]; targetType: [number, number]; }, Event<any>, Event<void>]; }'.
        "
      `)
    })
  })
  describe('tuple -> unit same', () => {
    test('tuple -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b], target:lNumStr, filter:(val) => val[0] > 0})
        sample({source:[a,b], target:anyt   , filter:(val) => val[0] > 0})
        sample({source:[a,b], target:voidt  , filter:(val) => val[0] > 0})
        sample({source:[a]  , target:lNum   , filter:(val) => val[0] > 0})
        sample({source:[a,b], target:lNumStr, filter:$filter            })
        sample({source:[a,b], target:anyt   , filter:$filter            })
        sample({source:[a,b], target:voidt  , filter:$filter            })
        sample({source:[a]  , target:lNum   , filter:$filter            })
        sample({source:[a,b], target:lNumStr, filter:Boolean            })
        sample({source:[a,b], target:anyt   , filter:Boolean            })
        sample({source:[a,b], target:voidt  , filter:Boolean            })
        sample({source:[a]  , target:lNum   , filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; target: Event<[number, string]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<[number, string]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<[number, string]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; target: Event<[number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock?: undefined; fn: (src: [number]) => any; target?: Event<[number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock?: undefined; fn: (src: [number]) => any; target?: Event<[number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a]  , target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a]  , target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], target:lNumNum, filter:Boolean            })
        //@ts-expect-error
        sample({source:[a]  , target:lNumNum, filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; target: Event<[number, number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<[number, number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock?: undefined; fn: (src: [number, string]) => any; target?: Event<[number, number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; target: Event<[number, number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock?: undefined; fn: (src: [number]) => any; target?: Event<[number, number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock?: undefined; fn: (src: [number]) => any; target?: Event<[number, number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
        Argument of type '{ source: Store<number>[]; target: Event<[number, number]>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; target: Event<[number, number]>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
        Argument of type '{ source: Store<number>[]; target: Event<[number, number]>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit same', () => {
    test('tuple + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b], clock:anyt, target:lNumStr, filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:anyt, target:anyt   , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:anyt, target:voidt  , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:numt, target:lNumStr, filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:numt, target:anyt   , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:numt, target:voidt  , filter:(val, n) => val[0] > n})
        sample({source:[a]  , clock:anyt, target:lNum   , filter:(val) => val[0] > 0   })
        sample({source:[a]  , clock:numt, target:lNum   , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:anyt, target:lNumStr, filter:$filter               })
        sample({source:[a,b], clock:anyt, target:anyt   , filter:$filter               })
        sample({source:[a,b], clock:anyt, target:voidt  , filter:$filter               })
        sample({source:[a]  , clock:anyt, target:lNum   , filter:$filter               })
        sample({source:[a,b], clock:anyt, target:lNumStr, filter:Boolean               })
        sample({source:[a,b], clock:anyt, target:anyt   , filter:Boolean               })
        sample({source:[a,b], clock:anyt, target:voidt  , filter:Boolean               })
        sample({source:[a]  , clock:anyt, target:lNum   , filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: Event<[number, string]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<[number, string]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<[number, string]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: Event<[number, string]>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: Event<[number, string]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: Event<[number, string]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: Event<any>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; target: Event<void>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<number>; fn: (src: [number, string], clk: number) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; clock: Event<any>; target: Event<[number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock: Event<any>; fn: (src: [number], clk: any) => any; target?: Event<[number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock: Event<any>; fn: (src: [number], clk: any) => any; target?: Event<[number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; clock: Event<number>; target: Event<[number]>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock: Event<number>; fn: (src: [number], clk: number) => any; target?: Event<[number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock: Event<number>; fn: (src: [number], clk: number) => any; target?: Event<[number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a]  , clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a]  , clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:anyt, target:lNumNum, filter:Boolean            })
        //@ts-expect-error
        sample({source:[a]  , clock:anyt, target:lNumNum, filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; target: Event<[number, number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<[number, number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: Event<any>; fn: (src: [number, string], clk: any) => any; target?: Event<[number, number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; clock: Event<any>; target: Event<[number, number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock: Event<any>; fn: (src: [number], clk: any) => any; target?: Event<[number, number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock: Event<any>; fn: (src: [number], clk: any) => any; target?: Event<[number, number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: Event<[number, number]>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
        Argument of type '{ source: Store<number>[]; clock: Event<any>; target: Event<[number, number]>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>; target: Event<[number, number]>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
        Argument of type '{ source: Store<number>[]; clock: Event<any>; target: Event<[number, number]>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit same', () => {
    test('tuple + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b], clock:[anyt]     , target:lNumStr, filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[anyt]     , target:anyt   , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[anyt]     , target:voidt  , filter:(val) => val[0] > 0   })
        sample({source:[a,b], clock:[numt,$num], target:lNumStr, filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[numt,$num], target:anyt   , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[numt,$num], target:voidt  , filter:(val, n) => val[0] > n})
        sample({source:[a]  , clock:[anyt]     , target:lNum   , filter:(val) => val[0] > 0   })
        sample({source:[a]  , clock:[numt,$num], target:lNum   , filter:(val, n) => val[0] > n})
        sample({source:[a,b], clock:[anyt]     , target:lNumStr, filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:anyt   , filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:voidt  , filter:$filter               })
        sample({source:[a]  , clock:[anyt]     , target:lNum   , filter:$filter               })
        sample({source:[a,b], clock:[anyt]     , target:lNumStr, filter:Boolean               })
        sample({source:[a,b], clock:[anyt]     , target:anyt   , filter:Boolean               })
        sample({source:[a,b], clock:[anyt]     , target:voidt  , filter:Boolean               })
        sample({source:[a]  , clock:[anyt]     , target:lNum   , filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: Event<[number, string]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<[number, string]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<[number, string]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: Event<any>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: Event<void>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: Event<[number, string]>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: Event<[number, string]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: Event<[number, string]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: Event<any>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: Event<any> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: Event<any> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; target: Event<void>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: Event<void> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<number>, Store<number>]; fn: (src: [number, string], clk: number) => any; target?: Event<void> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; clock: [Event<any>]; target: Event<[number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock: [Event<any>]; fn: (src: [number], clk: never) => any; target?: Event<[number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock: [Event<any>]; fn: (src: [number], clk: never) => any; target?: Event<[number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; clock: [Event<number>, Store<number>]; target: Event<[number]>; filter: (val: any, n: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock: [Event<number>, Store<number>]; fn: (src: [number], clk: number) => any; target?: Event<[number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock: [Event<number>, Store<number>]; fn: (src: [number], clk: number) => any; target?: Event<[number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a]  , clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a]  , clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b], clock:[anyt], target:lNumNum, filter:Boolean            })
        //@ts-expect-error
        sample({source:[a]  , clock:[anyt], target:lNumNum, filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; target: Event<[number, number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<[number, number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>, Store<string>]; clock: [Event<any>]; fn: (src: [number, string], clk: never) => any; target?: Event<[number, number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: [Store<number>]; clock: [Event<any>]; target: Event<[number, number]>; filter: (val: any) => boolean; }' is not assignable to parameter of type '{ source: [Store<number>]; clock: [Event<any>]; fn: (src: [number], clk: never) => any; target?: Event<[number, number]> | undefined; }'.
          Object literal may only specify known properties, and 'filter' does not exist in type '{ source: [Store<number>]; clock: [Event<any>]; fn: (src: [number], clk: never) => any; target?: Event<[number, number]> | undefined; }'.
        Parameter 'val' implicitly has an 'any' type.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: Event<[number, number]>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
        Argument of type '{ source: Store<number>[]; clock: Event<any>[]; target: Event<[number, number]>; filter: Store<boolean>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
        Argument of type '{ source: (Store<number> | Store<string>)[]; clock: Event<any>[]; target: Event<[number, number]>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number, string]; targetType: [number, number]; }; }'.
        Argument of type '{ source: Store<number>[]; clock: Event<any>[]; target: Event<[number, number]>; filter: BooleanConstructor; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
          Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [number]; targetType: [number, number]; }; }'.
        "
      `)
    })
  })
})
describe('no source', () => {
  test('no + clock -> unit same (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:anyt, target:numt, filter:(n) => n > 0})
      sample({clock:anyt, target:numt, filter:$filter     })
      sample({clock:anyt, target:numt, filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Event<any>; target: Event<number>; filter: (n: any) => boolean; }' is not assignable to parameter of type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: Event<number> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: Event<number> | undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('no + [clock] -> unit same (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:[anyt], target:numt, filter:(n) => n > 0})
      sample({clock:[anyt], target:numt, filter:$filter     })
      sample({clock:[anyt], target:numt, filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: [Event<any>]; target: Event<number>; filter: (n: any) => boolean; }' is not assignable to parameter of type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: Event<number> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: Event<number> | undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('no + clock -> array same (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:anyt, filter:(n) => n > 0})
      sample({clock:anyt, filter:$filter     })
      sample({clock:anyt, filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Event<any>; filter: (n: any) => boolean; }' is not assignable to parameter of type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('no + [clock] -> array same (should pass)', () => {
    //prettier-ignore
    {
      sample({clock:[anyt], filter:(n) => n > 0})
      sample({clock:[anyt], filter:$filter     })
      sample({clock:[anyt], filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: [Event<any>]; filter: (n: any) => boolean; }' is not assignable to parameter of type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('nullable no + clock -> unit same (should pass)', () => {
    //prettier-ignore
    sample({clock:anyt, target:numt, filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Event<any>; target: Event<number>; filter: (n: any) => n is number; }' is not assignable to parameter of type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: Event<number> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: Event<number> | undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('nullable no + [clock] -> unit same (should pass)', () => {
    //prettier-ignore
    sample({clock:[anyt], target:numt, filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: [Event<any>]; target: Event<number>; filter: (n: any) => n is number; }' is not assignable to parameter of type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: Event<number> | undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: Event<number> | undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('nullable no + clock -> array same (should pass)', () => {
    //prettier-ignore
    sample({clock:anyt, filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Event<any>; filter: (n: any) => n is number; }' is not assignable to parameter of type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: Event<any>; source?: undefined; fn: (clk: any) => any; target?: undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
  test('nullable no + [clock] -> array same (should pass)', () => {
    //prettier-ignore
    sample({clock:[anyt], filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: [Event<any>]; filter: (n: any) => n is number; }' is not assignable to parameter of type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: undefined; }'.
        Object literal may only specify known properties, and 'filter' does not exist in type '{ clock: [Event<any>]; source?: undefined; fn: (clk: never) => any; target?: undefined; }'.
      Parameter 'n' implicitly has an 'any' type.
      "
    `)
  })
})
