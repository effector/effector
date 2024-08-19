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
describe('unit source', () => {
  describe('unit -> unit same', () => {
    test('unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , target:ab   , filter:(val) => val.a > 0                })
        sample({source:ab        , target:anyt , filter:(val) => val.a > 0                })
        sample({source:ab        , target:voidt, filter:(val) => val.a > 0                })
        sample({source:ab        , target:ab   , filter:$filter                           })
        sample({source:ab        , target:anyt , filter:$filter                           })
        sample({source:ab        , target:voidt, filter:$filter                           })
        sample({source:ab        , target:ab   , filter:Boolean                           })
        sample({source:ab        , target:anyt , filter:Boolean                           })
        sample({source:ab        , target:voidt, filter:Boolean                           })
        sample({source:abNull    , target:ab   , filter:(val): val is AB => val.a !== null})
        sample({source:nullableAB, target:ab   , filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          //@ts-expect-error
          target: abn,
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          //@ts-expect-error
          target: abn,
          filter: $filter,
        })
        sample({
          source: ab,
          //@ts-expect-error
          target: abn,
          filter: Boolean,
        })
        sample({
          source: abNull,
          //@ts-expect-error
          target: abn,
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: nullableAB,
          //@ts-expect-error
          target: abn,
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 10 'source: ab,'
        lack of expected error at test line 6 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 16 'source: ab,'
        lack of expected error at test line 12 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 22 'source: abNull,'
        lack of expected error at test line 18 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 28 'source: nullableAB,'
        lack of expected error at test line 24 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        lack of expected error at test line 30 'target: abn,'
        "
      `)
    })
  })
  describe('unit -> unit wide', () => {
    test('unit -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , target:aNum, filter:(val) => val.a > 0})
        sample({source:ab        , target:aNum, filter:$filter           })
        sample({source:ab        , target:aNum, filter:Boolean           })
        sample({source:nullableAB, target:aNum, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
        sample({
          source: ab,
          //@ts-expect-error
          target: aStr,
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          //@ts-expect-error
          target: aStr,
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 10 'source: ab,'
        lack of expected error at test line 6 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 16 'source: ab,'
        lack of expected error at test line 12 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 22 'source: nullableAB,'
        lack of expected error at test line 18 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        lack of expected error at test line 24 'target: aStr,'
        "
      `)
    })
  })
  describe('unit + clock -> unit same', () => {
    test('unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:anyt, target:ab   , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:anyt, target:anyt , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:anyt, target:voidt, filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:numt, target:ab   , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:numt, target:anyt , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:numt, target:voidt, filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:anyt, target:ab   , filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:anyt , filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:voidt, filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:ab   , filter:Boolean                                      })
        sample({source:ab        , clock:anyt, target:anyt , filter:Boolean                                      })
        sample({source:ab        , clock:anyt, target:voidt, filter:Boolean                                      })
        sample({source:abNull    , clock:anyt, target:ab   , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:numt, target:ab   , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:nullableAB, clock:anyt, target:ab   , filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: Boolean,
        })
        sample({
          source: abNull,
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 11 'source: ab,'
        lack of expected error at test line 7 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 18 'source: ab,'
        lack of expected error at test line 14 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 25 'source: abNull,'
        lack of expected error at test line 21 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 32 'source: nullableAB,'
        lack of expected error at test line 28 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        lack of expected error at test line 35 'target: abn,'
        "
      `)
    })
  })
  describe('unit + clock -> unit wide', () => {
    test('unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:anyt, target:aNum, filter:(val) => val.a > 0  })
        sample({source:ab        , clock:numt, target:aNum, filter:(val,n) => val.a > n})
        sample({source:ab        , clock:anyt, target:aNum, filter:$filter             })
        sample({source:ab        , clock:anyt, target:aNum, filter:Boolean             })
        sample({source:nullableAB, clock:anyt, target:aNum, filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 11 'source: ab,'
        lack of expected error at test line 7 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 18 'source: ab,'
        lack of expected error at test line 14 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 25 'source: nullableAB,'
        lack of expected error at test line 21 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        lack of expected error at test line 28 'target: aStr,'
        "
      `)
    })
  })
  describe('unit + [clock] -> unit same', () => {
    test('unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:[anyt]     , target:ab   , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[anyt]     , target:anyt , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[anyt]     , target:voidt, filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[numt,$num], target:ab   , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[numt,$num], target:anyt , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[numt,$num], target:voidt, filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[anyt]     , target:ab   , filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:anyt , filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:voidt, filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:ab   , filter:Boolean                                      })
        sample({source:ab        , clock:[anyt]     , target:anyt , filter:Boolean                                      })
        sample({source:ab        , clock:[anyt]     , target:voidt, filter:Boolean                                      })
        sample({source:abNull    , clock:[anyt]     , target:ab   , filter:(val): val is AB => val.a !== null           })
        sample({source:abNull    , clock:[numt,$num], target:ab   , filter:(val,n): val is AB => n > 0 && val.a !== null})
        sample({source:nullableAB, clock:[anyt]     , target:ab   , filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: Boolean,
        })
        sample({
          source: abNull,
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 11 'source: ab,'
        lack of expected error at test line 7 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 18 'source: ab,'
        lack of expected error at test line 14 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 25 'source: abNull,'
        lack of expected error at test line 21 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Unmarked error at test line 32 'source: nullableAB,'
        lack of expected error at test line 28 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        lack of expected error at test line 35 'target: abn,'
        "
      `)
    })
  })
  describe('unit + [clock] -> unit wide', () => {
    test('unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:[anyt]     , target:aNum, filter:(val) => val.a > 0  })
        sample({source:ab        , clock:[numt,$num], target:aNum, filter:(val,n) => val.a > n})
        sample({source:ab        , clock:[anyt]     , target:aNum, filter:$filter             })
        sample({source:ab        , clock:[anyt]     , target:aNum, filter:Boolean             })
        sample({source:nullableAB, clock:[anyt]     , target:aNum, filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 11 'source: ab,'
        lack of expected error at test line 7 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 18 'source: ab,'
        lack of expected error at test line 14 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Unmarked error at test line 25 'source: nullableAB,'
        lack of expected error at test line 21 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        lack of expected error at test line 28 'target: aStr,'
        "
      `)
    })
  })
  describe('unit -> array same', () => {
    test('unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , target:[ab]           , filter:(val) => val.a > 0                })
        sample({source:ab        , target:[ab,anyt]      , filter:(val) => val.a > 0                })
        sample({source:ab        , target:[ab,voidt]     , filter:(val) => val.a > 0                })
        sample({source:ab        , target:[ab,anyt,voidt], filter:(val) => val.a > 0                })
        sample({source:ab        , target:[ab]           , filter:$filter                           })
        sample({source:ab        , target:[ab,anyt]      , filter:$filter                           })
        sample({source:ab        , target:[ab,voidt]     , filter:$filter                           })
        sample({source:ab        , target:[ab,anyt,voidt], filter:$filter                           })
        sample({source:ab        , target:[ab]           , filter:Boolean                           })
        sample({source:ab        , target:[ab,anyt]      , filter:Boolean                           })
        sample({source:ab        , target:[ab,voidt]     , filter:Boolean                           })
        sample({source:ab        , target:[ab,anyt,voidt], filter:Boolean                           })
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
        no errors
        "
      `)
    })
    test('unit -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: abNull,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 21 'source: ab,'
        lack of expected error at test line 7 'abn,'
        lack of expected error at test line 15 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 42 'source: ab,'
        lack of expected error at test line 24 'abn,'
        lack of expected error at test line 26 'voidt,'
        lack of expected error at test line 34 'abn,'
        lack of expected error at test line 37 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 59 'source: ab,'
        lack of expected error at test line 45 'abn,'
        lack of expected error at test line 53 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 80 'source: ab,'
        lack of expected error at test line 62 'abn,'
        lack of expected error at test line 64 'voidt,'
        lack of expected error at test line 72 'abn,'
        lack of expected error at test line 75 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 97 'source: ab,'
        lack of expected error at test line 83 'abn,'
        lack of expected error at test line 91 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 118 'source: abNull,'
        lack of expected error at test line 100 'abn,'
        lack of expected error at test line 102 'voidt,'
        lack of expected error at test line 110 'abn,'
        lack of expected error at test line 113 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 135 'source: abNull,'
        lack of expected error at test line 121 'abn,'
        lack of expected error at test line 129 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 156 'source: nullableAB,'
        lack of expected error at test line 138 'abn,'
        lack of expected error at test line 140 'voidt,'
        lack of expected error at test line 148 'abn,'
        lack of expected error at test line 151 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 173 'source: nullableAB,'
        lack of expected error at test line 159 'abn,'
        lack of expected error at test line 167 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        lack of expected error at test line 176 'abn,'
        lack of expected error at test line 178 'voidt,'
        lack of expected error at test line 186 'abn,'
        lack of expected error at test line 189 'voidt,'
        "
      `)
    })
  })
  describe('unit -> array wide', () => {
    test('unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , target:[aNum]           , filter:(val) => val.a > 0})
        sample({source:ab        , target:[aNum,anyt]      , filter:(val) => val.a > 0})
        sample({source:ab        , target:[aNum,voidt]     , filter:(val) => val.a > 0})
        sample({source:ab        , target:[aNum,anyt,voidt], filter:(val) => val.a > 0})
        sample({source:ab        , target:[aNum]           , filter:$filter           })
        sample({source:ab        , target:[aNum,anyt]      , filter:$filter           })
        sample({source:ab        , target:[aNum,voidt]     , filter:$filter           })
        sample({source:ab        , target:[aNum,anyt,voidt], filter:$filter           })
        sample({source:ab        , target:[aNum]           , filter:Boolean           })
        sample({source:ab        , target:[aNum,anyt]      , filter:Boolean           })
        sample({source:ab        , target:[aNum,voidt]     , filter:Boolean           })
        sample({source:ab        , target:[aNum,anyt,voidt], filter:Boolean           })
        sample({source:nullableAB, target:[aNum]           , filter:Boolean           })
        sample({source:nullableAB, target:[aNum,anyt]      , filter:Boolean           })
        sample({source:nullableAB, target:[aNum,voidt]     , filter:Boolean           })
        sample({source:nullableAB, target:[aNum,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit -> array wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 22 'source: ab,'
        lack of expected error at test line 7 'aStr,'
        lack of expected error at test line 16 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 61 'source: ab,'
        lack of expected error at test line 25 'aStr,'
        lack of expected error at test line 27 'voidt,'
        lack of expected error at test line 35 'aStr,'
        lack of expected error at test line 38 'voidt,'
        lack of expected error at test line 46 'aStr,'
        lack of expected error at test line 55 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 100 'source: ab,'
        lack of expected error at test line 64 'aStr,'
        lack of expected error at test line 66 'voidt,'
        lack of expected error at test line 74 'aStr,'
        lack of expected error at test line 77 'voidt,'
        lack of expected error at test line 85 'aStr,'
        lack of expected error at test line 94 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 139 'source: nullableAB,'
        lack of expected error at test line 103 'aStr,'
        lack of expected error at test line 105 'voidt,'
        lack of expected error at test line 113 'aStr,'
        lack of expected error at test line 116 'voidt,'
        lack of expected error at test line 124 'aStr,'
        lack of expected error at test line 133 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        lack of expected error at test line 142 'aStr,'
        lack of expected error at test line 144 'voidt,'
        lack of expected error at test line 152 'aStr,'
        lack of expected error at test line 155 'voidt,'
        "
      `)
    })
  })
  describe('unit + clock -> array same', () => {
    test('unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:anyt, target:[ab]           , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:anyt, target:[ab,anyt]      , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:anyt, target:[ab,voidt]     , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:anyt, target:[ab,anyt,voidt], filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:numt, target:[ab]           , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:numt, target:[ab,anyt]      , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:numt, target:[ab,voidt]     , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:numt, target:[ab,anyt,voidt], filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:anyt, target:[ab]           , filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:[ab,anyt]      , filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:[ab,voidt]     , filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:[ab,anyt,voidt], filter:$filter                                      })
        sample({source:ab        , clock:anyt, target:[ab]           , filter:Boolean                                      })
        sample({source:ab        , clock:anyt, target:[ab,anyt]      , filter:Boolean                                      })
        sample({source:ab        , clock:anyt, target:[ab,voidt]     , filter:Boolean                                      })
        sample({source:ab        , clock:anyt, target:[ab,anyt,voidt], filter:Boolean                                      })
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
        no errors
        "
      `)
    })
    test('unit + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: abNull,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 23 'source: ab,'
        lack of expected error at test line 8 'abn,'
        lack of expected error at test line 17 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 46 'source: ab,'
        lack of expected error at test line 27 'abn,'
        lack of expected error at test line 29 'voidt,'
        lack of expected error at test line 38 'abn,'
        lack of expected error at test line 41 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 65 'source: ab,'
        lack of expected error at test line 50 'abn,'
        lack of expected error at test line 59 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 88 'source: ab,'
        lack of expected error at test line 69 'abn,'
        lack of expected error at test line 71 'voidt,'
        lack of expected error at test line 80 'abn,'
        lack of expected error at test line 83 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 107 'source: ab,'
        lack of expected error at test line 92 'abn,'
        lack of expected error at test line 101 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 130 'source: abNull,'
        lack of expected error at test line 111 'abn,'
        lack of expected error at test line 113 'voidt,'
        lack of expected error at test line 122 'abn,'
        lack of expected error at test line 125 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 149 'source: abNull,'
        lack of expected error at test line 134 'abn,'
        lack of expected error at test line 143 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 172 'source: nullableAB,'
        lack of expected error at test line 153 'abn,'
        lack of expected error at test line 155 'voidt,'
        lack of expected error at test line 164 'abn,'
        lack of expected error at test line 167 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 191 'source: nullableAB,'
        lack of expected error at test line 176 'abn,'
        lack of expected error at test line 185 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        lack of expected error at test line 195 'abn,'
        lack of expected error at test line 197 'voidt,'
        lack of expected error at test line 206 'abn,'
        lack of expected error at test line 209 'voidt,'
        "
      `)
    })
  })
  describe('unit + clock -> array wide', () => {
    test('unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:anyt, target:[aNum]           , filter:(val) => val.a > 0  })
        sample({source:ab        , clock:anyt, target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        sample({source:ab        , clock:anyt, target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        sample({source:ab        , clock:anyt, target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:ab        , clock:numt, target:[aNum]           , filter:(val,n) => val.a > n})
        sample({source:ab        , clock:numt, target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        sample({source:ab        , clock:numt, target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        sample({source:ab        , clock:numt, target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:ab        , clock:anyt, target:[aNum]           , filter:$filter             })
        sample({source:ab        , clock:anyt, target:[aNum,anyt]      , filter:$filter             })
        sample({source:ab        , clock:anyt, target:[aNum,voidt]     , filter:$filter             })
        sample({source:ab        , clock:anyt, target:[aNum,anyt,voidt], filter:$filter             })
        sample({source:ab        , clock:anyt, target:[aNum]           , filter:Boolean             })
        sample({source:ab        , clock:anyt, target:[aNum,anyt]      , filter:Boolean             })
        sample({source:ab        , clock:anyt, target:[aNum,voidt]     , filter:Boolean             })
        sample({source:ab        , clock:anyt, target:[aNum,anyt,voidt], filter:Boolean             })
        sample({source:nullableAB, clock:anyt, target:[aNum]           , filter:Boolean             })
        sample({source:nullableAB, clock:anyt, target:[aNum,anyt]      , filter:Boolean             })
        sample({source:nullableAB, clock:anyt, target:[aNum,voidt]     , filter:Boolean             })
        sample({source:nullableAB, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 24 'source: ab,'
        lack of expected error at test line 8 'aStr,'
        lack of expected error at test line 18 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 67 'source: ab,'
        lack of expected error at test line 28 'aStr,'
        lack of expected error at test line 30 'voidt,'
        lack of expected error at test line 39 'aStr,'
        lack of expected error at test line 42 'voidt,'
        lack of expected error at test line 51 'aStr,'
        lack of expected error at test line 61 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 110 'source: ab,'
        lack of expected error at test line 71 'aStr,'
        lack of expected error at test line 73 'voidt,'
        lack of expected error at test line 82 'aStr,'
        lack of expected error at test line 85 'voidt,'
        lack of expected error at test line 94 'aStr,'
        lack of expected error at test line 104 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 153 'source: nullableAB,'
        lack of expected error at test line 114 'aStr,'
        lack of expected error at test line 116 'voidt,'
        lack of expected error at test line 125 'aStr,'
        lack of expected error at test line 128 'voidt,'
        lack of expected error at test line 137 'aStr,'
        lack of expected error at test line 147 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        lack of expected error at test line 157 'aStr,'
        lack of expected error at test line 159 'voidt,'
        lack of expected error at test line 168 'aStr,'
        lack of expected error at test line 171 'voidt,'
        "
      `)
    })
  })
  describe('unit + [clock] -> array same', () => {
    test('unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:[anyt]     , target:[ab]           , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[anyt]     , target:[ab,anyt]      , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[anyt]     , target:[ab,voidt]     , filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[anyt]     , target:[ab,anyt,voidt], filter:(val) => val.a > 0                           })
        sample({source:ab        , clock:[numt,$num], target:[ab]           , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[numt,$num], target:[ab,anyt]      , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[numt,$num], target:[ab,voidt]     , filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n) => val.a > n                         })
        sample({source:ab        , clock:[anyt]     , target:[ab]           , filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab,anyt]      , filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab,voidt]     , filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab,anyt,voidt], filter:$filter                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab]           , filter:Boolean                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab,anyt]      , filter:Boolean                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab,voidt]     , filter:Boolean                                      })
        sample({source:ab        , clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean                                      })
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
        no errors
        "
      `)
    })
    test('unit + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: abNull,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: abNull,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val): val is AB => val.a !== null,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: ab,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 23 'source: ab,'
        lack of expected error at test line 8 'abn,'
        lack of expected error at test line 17 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 46 'source: ab,'
        lack of expected error at test line 27 'abn,'
        lack of expected error at test line 29 'voidt,'
        lack of expected error at test line 38 'abn,'
        lack of expected error at test line 41 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 65 'source: ab,'
        lack of expected error at test line 50 'abn,'
        lack of expected error at test line 59 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 88 'source: ab,'
        lack of expected error at test line 69 'abn,'
        lack of expected error at test line 71 'voidt,'
        lack of expected error at test line 80 'abn,'
        lack of expected error at test line 83 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 107 'source: ab,'
        lack of expected error at test line 92 'abn,'
        lack of expected error at test line 101 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 130 'source: abNull,'
        lack of expected error at test line 111 'abn,'
        lack of expected error at test line 113 'voidt,'
        lack of expected error at test line 122 'abn,'
        lack of expected error at test line 125 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 149 'source: abNull,'
        lack of expected error at test line 134 'abn,'
        lack of expected error at test line 143 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 172 'source: nullableAB,'
        lack of expected error at test line 153 'abn,'
        lack of expected error at test line 155 'voidt,'
        lack of expected error at test line 164 'abn,'
        lack of expected error at test line 167 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Unmarked error at test line 191 'source: nullableAB,'
        lack of expected error at test line 176 'abn,'
        lack of expected error at test line 185 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        lack of expected error at test line 195 'abn,'
        lack of expected error at test line 197 'voidt,'
        lack of expected error at test line 206 'abn,'
        lack of expected error at test line 209 'voidt,'
        "
      `)
    })
  })
  describe('unit + [clock] -> array wide', () => {
    test('unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:ab        , clock:[anyt]     , target:[aNum]           , filter:(val) => val.a > 0  })
        sample({source:ab        , clock:[anyt]     , target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        sample({source:ab        , clock:[anyt]     , target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        sample({source:ab        , clock:[anyt]     , target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        sample({source:ab        , clock:[numt,$num], target:[aNum]           , filter:(val,n) => val.a > n})
        sample({source:ab        , clock:[numt,$num], target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        sample({source:ab        , clock:[numt,$num], target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        sample({source:ab        , clock:[numt,$num], target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        sample({source:ab        , clock:[anyt]     , target:[aNum]           , filter:$filter             })
        sample({source:ab        , clock:[anyt]     , target:[aNum,anyt]      , filter:$filter             })
        sample({source:ab        , clock:[anyt]     , target:[aNum,voidt]     , filter:$filter             })
        sample({source:ab        , clock:[anyt]     , target:[aNum,anyt,voidt], filter:$filter             })
        sample({source:ab        , clock:[anyt]     , target:[aNum]           , filter:Boolean             })
        sample({source:ab        , clock:[anyt]     , target:[aNum,anyt]      , filter:Boolean             })
        sample({source:ab        , clock:[anyt]     , target:[aNum,voidt]     , filter:Boolean             })
        sample({source:ab        , clock:[anyt]     , target:[aNum,anyt,voidt], filter:Boolean             })
        sample({source:nullableAB, clock:[anyt]     , target:[aNum]           , filter:Boolean             })
        sample({source:nullableAB, clock:[anyt]     , target:[aNum,anyt]      , filter:Boolean             })
        sample({source:nullableAB, clock:[anyt]     , target:[aNum,voidt]     , filter:Boolean             })
        sample({source:nullableAB, clock:[anyt]     , target:[aNum,anyt,voidt], filter:Boolean             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: ab,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
        sample({
          source: nullableAB,
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: Boolean,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 24 'source: ab,'
        lack of expected error at test line 8 'aStr,'
        lack of expected error at test line 18 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 67 'source: ab,'
        lack of expected error at test line 28 'aStr,'
        lack of expected error at test line 30 'voidt,'
        lack of expected error at test line 39 'aStr,'
        lack of expected error at test line 42 'voidt,'
        lack of expected error at test line 51 'aStr,'
        lack of expected error at test line 61 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 110 'source: ab,'
        lack of expected error at test line 71 'aStr,'
        lack of expected error at test line 73 'voidt,'
        lack of expected error at test line 82 'aStr,'
        lack of expected error at test line 85 'voidt,'
        lack of expected error at test line 94 'aStr,'
        lack of expected error at test line 104 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 153 'source: nullableAB,'
        lack of expected error at test line 114 'aStr,'
        lack of expected error at test line 116 'voidt,'
        lack of expected error at test line 125 'aStr,'
        lack of expected error at test line 128 'voidt,'
        lack of expected error at test line 137 'aStr,'
        lack of expected error at test line 147 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        lack of expected error at test line 157 'aStr,'
        lack of expected error at test line 159 'voidt,'
        lack of expected error at test line 168 'aStr,'
        lack of expected error at test line 171 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 21 'source: {a,b},'
        lack of expected error at test line 7 'abn,'
        lack of expected error at test line 15 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 42 'source: {a,b},'
        lack of expected error at test line 24 'abn,'
        lack of expected error at test line 26 'voidt,'
        lack of expected error at test line 34 'abn,'
        lack of expected error at test line 37 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 59 'source: {a,b},'
        lack of expected error at test line 45 'abn,'
        lack of expected error at test line 53 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        lack of expected error at test line 62 'abn,'
        lack of expected error at test line 64 'voidt,'
        lack of expected error at test line 72 'abn,'
        lack of expected error at test line 75 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object -> array wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 22 'source: {a,b},'
        lack of expected error at test line 7 'aStr,'
        lack of expected error at test line 16 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 61 'source: {a,b},'
        lack of expected error at test line 25 'aStr,'
        lack of expected error at test line 27 'voidt,'
        lack of expected error at test line 35 'aStr,'
        lack of expected error at test line 38 'voidt,'
        lack of expected error at test line 46 'aStr,'
        lack of expected error at test line 55 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        lack of expected error at test line 64 'aStr,'
        lack of expected error at test line 66 'voidt,'
        lack of expected error at test line 74 'aStr,'
        lack of expected error at test line 77 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 23 'source: {a,b},'
        lack of expected error at test line 8 'abn,'
        lack of expected error at test line 17 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 46 'source: {a,b},'
        lack of expected error at test line 27 'abn,'
        lack of expected error at test line 29 'voidt,'
        lack of expected error at test line 38 'abn,'
        lack of expected error at test line 41 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 65 'source: {a,b},'
        lack of expected error at test line 50 'abn,'
        lack of expected error at test line 59 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        lack of expected error at test line 69 'abn,'
        lack of expected error at test line 71 'voidt,'
        lack of expected error at test line 80 'abn,'
        lack of expected error at test line 83 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: anyt,
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 24 'source: {a,b},'
        lack of expected error at test line 8 'aStr,'
        lack of expected error at test line 18 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 67 'source: {a,b},'
        lack of expected error at test line 28 'aStr,'
        lack of expected error at test line 30 'voidt,'
        lack of expected error at test line 39 'aStr,'
        lack of expected error at test line 42 'voidt,'
        lack of expected error at test line 51 'aStr,'
        lack of expected error at test line 61 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        lack of expected error at test line 71 'aStr,'
        lack of expected error at test line 73 'voidt,'
        lack of expected error at test line 82 'aStr,'
        lack of expected error at test line 85 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            abn,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 23 'source: {a,b},'
        lack of expected error at test line 8 'abn,'
        lack of expected error at test line 17 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        Unmarked error at test line 46 'source: {a,b},'
        lack of expected error at test line 27 'abn,'
        lack of expected error at test line 29 'voidt,'
        lack of expected error at test line 38 'abn,'
        lack of expected error at test line 41 'voidt,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Unmarked error at test line 65 'source: {a,b},'
        lack of expected error at test line 50 'abn,'
        lack of expected error at test line 59 'abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        lack of expected error at test line 69 'abn,'
        lack of expected error at test line 71 'voidt,'
        lack of expected error at test line 80 'abn,'
        lack of expected error at test line 83 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            ab,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          target: [
            //@ts-expect-error
            aStr,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 24 'source: {a,b},'
        lack of expected error at test line 8 'aStr,'
        lack of expected error at test line 18 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        Unmarked error at test line 67 'source: {a,b},'
        lack of expected error at test line 28 'aStr,'
        lack of expected error at test line 30 'voidt,'
        lack of expected error at test line 39 'aStr,'
        lack of expected error at test line 42 'voidt,'
        lack of expected error at test line 51 'aStr,'
        lack of expected error at test line 61 'aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        lack of expected error at test line 71 'aStr,'
        lack of expected error at test line 73 'voidt,'
        lack of expected error at test line 82 'aStr,'
        lack of expected error at test line 85 'voidt,'
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
        sample({source:{a,b}, target:ab   , filter:$filter           })
        sample({source:{a,b}, target:anyt , filter:$filter           })
        sample({source:{a,b}, target:voidt, filter:$filter           })
        sample({source:{a}  , target:aNum , filter:(val) => val.a > 0})
        sample({source:{a}  , target:aNum , filter:$filter           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          //@ts-expect-error
          target: abn,
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          //@ts-expect-error
          target: abn,
          filter: $filter,
        })
        //@ts-expect-error
        sample({source:{a}  , target:ab, filter:(val) => val.a > 0})
        sample({
          source: {a},
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        //@ts-expect-error
        sample({source:{a}  , target:ab, filter:$filter           })
        sample({
          source: {a},
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Unmarked error at test line 10 'source: {a,b},'
        lack of expected error at test line 6 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        lack of expected error at test line 12 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Unmarked error at test line 18 'source: {a},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 20 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Unmarked error at test line 26 'source: {a},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 28 'target: aStr,'
        "
      `)
    })
  })
  describe('object -> unit wide', () => {
    test('object -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}     , target:aNum, filter:(val) => val.a > 0                                        })
        sample({source:{a,b}     , target:aNum, filter:$filter                                                   })
        sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Unmarked error at test line 10 'source: {a,b},'
        lack of expected error at test line 6 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 12 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
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
        sample({source:{a,b}, clock:anyt, target:ab   , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:anyt , filter:$filter             })
        sample({source:{a,b}, clock:anyt, target:voidt, filter:$filter             })
        sample({source:{a}  , clock:anyt, target:aNum , filter:(val) => val.a > 0  })
        sample({source:{a}  , clock:numt, target:aNum , filter:(val,n) => val.a > n})
        sample({source:{a}  , clock:anyt, target:aNum , filter:$filter             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          //@ts-expect-error
          target: abn,
          filter: $filter,
        })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab, filter:(val) => val.a > 0})
        sample({
          source: {a},
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab, filter:$filter           })
        sample({
          source: {a},
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Unmarked error at test line 11 'source: {a,b},'
        lack of expected error at test line 7 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        lack of expected error at test line 14 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Unmarked error at test line 20 'source: {a},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 23 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Unmarked error at test line 29 'source: {a},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 32 'target: aStr,'
        "
      `)
    })
  })
  describe('object + clock -> unit wide', () => {
    test('object + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}     , clock:anyt, target:aNum, filter:(val) => val.a > 0                                          })
        sample({source:{a,b}     , clock:numt, target:aNum, filter:(val,n) => val.a > n                                        })
        sample({source:{a,b}     , clock:anyt, target:aNum, filter:$filter                                                     })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  })
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: anyt,
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Unmarked error at test line 11 'source: {a,b},'
        lack of expected error at test line 7 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 14 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
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
        sample({source:{a,b}, clock:[anyt]     , target:ab   , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:anyt , filter:$filter             })
        sample({source:{a,b}, clock:[anyt]     , target:voidt, filter:$filter             })
        sample({source:{a}  , clock:[anyt]     , target:aNum , filter:(val) => val.a > 0  })
        sample({source:{a}  , clock:[numt,$num], target:aNum , filter:(val,n) => val.a > n})
        sample({source:{a}  , clock:[anyt]     , target:aNum , filter:$filter             })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          //@ts-expect-error
          target: abn,
          filter: $filter,
        })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab, filter:(val) => val.a > 0})
        sample({
          source: {a},
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab, filter:$filter           })
        sample({
          source: {a},
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Unmarked error at test line 11 'source: {a,b},'
        lack of expected error at test line 7 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        lack of expected error at test line 14 'target: abn,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Unmarked error at test line 20 'source: {a},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 23 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Unmarked error at test line 29 'source: {a},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 32 'target: aStr,'
        "
      `)
    })
  })
  describe('object + [clock] -> unit wide', () => {
    test('object + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a,b}     , clock:[anyt]     , target:aNum, filter:(val) => val.a > 0                                          })
        sample({source:{a,b}     , clock:[numt,$num], target:aNum, filter:(val,n) => val.a > n                                        })
        sample({source:{a,b}     , clock:[anyt]     , target:aNum, filter:$filter                                                     })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  })
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('object + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: {a,b},
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: (val) => val.a > 0,
        })
        sample({
          source: {a,b},
          clock: [anyt],
          //@ts-expect-error
          target: aStr,
          filter: $filter,
        })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: {a,b},'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Unmarked error at test line 11 'source: {a,b},'
        lack of expected error at test line 7 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        lack of expected error at test line 14 'target: aStr,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number | null; b: string; }; targetType: { a: number; }; }; }'.
        "
      `)
    })
  })
  describe('object, fn -> unit wide', () => {
    test('object, fn -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0           , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0           , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                                   , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                                   , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0, fn:(val) => ({a: val.a + 1, b: val.b})           })
        sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0, fn:(val: AB) => ({a: val.a + 1, b: val.b})       })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 7 'sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0, fn:(val) => ({a: val.a + 1, b: val.b})           })'
        'val.a' is possibly 'null'.
        "
      `)
    })
    test('object, fn -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0           , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0           , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0           , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                                   , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                                   , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                                   , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0, fn:(val) => ({a: 1 + val.c, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0, fn:(val: ABN) => ({a: val.a + 1, b: ''})  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0, fn:() => 'wrong'                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Parameter 'val' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Type 'string' is not assignable to type '{ a: number; }'.
        Property 'c' does not exist on type '{ a: number | null; b: string; }'.
        Argument of type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; target: EventCallable<{ a: number; }>; filter: (val: { a: number | null; b: string; }) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock?: undefined; filter?: (((src: { a: number | null; b: string; }) => src is { a: number | null; b: string; }) & ((src: { ...; }) => src is { ...; })) | undefined; fn?: (((src: { ...; }) => any) & ((src: { ...; }) => any)) | undefi...'.
          Type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; target: EventCallable<{ a: number; }>; filter: (val: { a: number | null; b: string; }) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock?: undefined; filter?: ((src: { a: number | null; b: string; }) => boolean) | undefined; fn?: ((src: { ...; }) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; target: EventCallable<{ a: number; }>; filter: (val: { a: number | null; b: string; }) => val is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock?: undefined; filter?: ((src: { a: number | null; b: string; }) => boolean) | undefined; fn?: ((src: { ...; }) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }) => any'.
                  Types of parameters 'val' and 'src' are incompatible.
                    Type '{ a: number | null; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'a' are incompatible.
                        Type 'number | null' is not assignable to type 'number'.
                          Type 'null' is not assignable to type 'number'.
        Parameter 'val' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        "
      `)
    })
  })
  describe('object + clock, fn -> unit wide', () => {
    test('object + clock, fn -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                                     , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                                     , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val) => ({a: val.a + 1, b: val.b})           })
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val) => ({a: val.a + 1, b: val.b})           })
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val: AB) => ({a: val.a + 1, b: val.b})       })
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val: AB) => ({a: val.a + 1, b: val.b})       })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 9 'sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val) => ({a: val.a + 1, b: val.b})           })'
        'val.a' is possibly 'null'.
        Unmarked error at test line 10 'sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val) => ({a: val.a + 1, b: val.b})           })'
        'val.a' is possibly 'null'.
        "
      `)
    })
    test('object + clock, fn -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                                     , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                                     , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                                     , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val) => ({a: 1 + val.c, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val) => ({a: 1 + val.c, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val: ABN) => ({a: val.a + 1, b: ''})  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val: ABN) => ({a: val.a + 1, b: ''})  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:() => 'wrong'                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'val.a' is possibly 'null'.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: any) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: number) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: number) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Parameter 'val' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: any) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Type 'string' is not assignable to type '{ a: number; }'.
        Property 'c' does not exist on type '{ a: number | null; b: string; }'.
        Property 'c' does not exist on type '{ a: number | null; b: string; }'.
        Argument of type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<any>; target: EventCallable<{ a: number; }>; filter: (val: { ...; }) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<any>; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: (((src: { a: number | null; b: string; }, clk: any) => src is { ...; }) & ((src: { ...; }, clk: any) => src is { ...; })) | undefined; fn?: (((src: { ...; }, clk: any) => any) & ((src: { ...; }, clk...'.
          Type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<any>; target: EventCallable<{ a: number; }>; filter: (val: { ...; }) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: EventCallable<any>; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: ((src: { a: number | null; b: string; }, clk: any) => boolean) | undefined; fn?: ((src: { ...; }, clk: any) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boo...'.
            Type '{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<any>; target: EventCallable<{ a: number; }>; filter: (val: { ...; }) => val is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: EventCallable<any>; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: ((src: { a: number | null; b: string; }, clk: any) => boolean) | undefined; fn?: ((src: { ...; }, clk: any) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | un...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
                  Types of parameters 'val' and 'src' are incompatible.
                    Type '{ a: number | null; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'a' are incompatible.
                        Type 'number | null' is not assignable to type 'number'.
                          Type 'null' is not assignable to type 'number'.
        Argument of type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<number>; target: EventCallable<{ a: number; }>; filter: (val: { ...; }, n: number) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<number>; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: (((src: { a: number | null; b: string; }, clk: number) => src is { ...; }) & ((src: { ...; }, clk: number) => src is { ...; })) | undefined; fn?: (((src: { ...; }, clk: number) => any) & ((src: {...'.
          Type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<number>; target: EventCallable<{ a: number; }>; filter: (val: { ...; }, n: number) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: EventCallable<number>; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: ((src: { a: number | null; b: string; }, clk: number) => boolean) | undefined; fn?: ((src: { ...; }, clk: number) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; ba...'.
            Type '{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<number>; target: EventCallable<{ a: number; }>; filter: (val: { ...; }, n: number) => val is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: EventCallable<number>; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: ((src: { a: number | null; b: string; }, clk: number) => boolean) | undefined; fn?: ((src: { ...; }, clk: number) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boo...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: number) => any'.
                  Types of parameters 'val' and 'src' are incompatible.
                    Type '{ a: number | null; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'a' are incompatible.
                        Type 'number | null' is not assignable to type 'number'.
                          Type 'null' is not assignable to type 'number'.
        Parameter 'val' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        "
      `)
    })
  })
  describe('object + [clock], fn -> unit wide', () => {
    test('object + [clock], fn -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                                     , fn:(val) => ({a: 0, b: `${val.b.length}`})       })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                                     , fn:(val: AoptB) => ({a: 0, b: `${val.b.length}`})})
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val) => ({a: val.a + 1, b: val.b})           })
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val) => ({a: val.a + 1, b: val.b})           })
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val: AB) => ({a: val.a + 1, b: val.b})       })
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val: AB) => ({a: val.a + 1, b: val.b})       })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 9 'sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val) => ({a: val.a + 1, b: val.b})           })'
        'val.a' is possibly 'null'.
        Unmarked error at test line 10 'sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val) => ({a: val.a + 1, b: val.b})           })'
        'val.a' is possibly 'null'.
        "
      `)
    })
    test('object + [clock], fn -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0             , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n           , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                                     , fn:(val) => ({a: val.a + 1, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                                     , fn:(val: AB) => ({a: val.a + 1, b: val.b})})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                                     , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val) => ({a: 1 + val.c, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val) => ({a: 1 + val.c, b: val.b})    })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:(val: ABN) => ({a: val.a + 1, b: ''})  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:(val: ABN) => ({a: val.a + 1, b: ''})  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  , fn:() => 'wrong'                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n, fn:() => 'wrong'                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'val.a' is possibly 'null'.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: any) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: number) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: number) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Parameter 'val' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: any) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Type 'string' is not assignable to type '{ a: number; }'.
        Property 'c' does not exist on type '{ a: number | null; b: string; }'.
        Property 'c' does not exist on type '{ a: number | null; b: string; }'.
        Argument of type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<any>[]; target: EventCallable<{ a: number; }>; filter: (val: { ...; }) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<any>[]; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: (((src: { a: number | null; b: string; }, clk: any) => src is { ...; }) & ((src: { ...; }, clk: any) => src is { ...; })) | undefined; fn?: (((src: { ...; }, clk: any) => any) & ((src: { ...; }, c...'.
          Type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<any>[]; target: EventCallable<{ a: number; }>; filter: (val: { ...; }) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: EventCallable<any>[]; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: ((src: { a: number | null; b: string; }, clk: any) => boolean) | undefined; fn?: ((src: { ...; }, clk: any) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: b...'.
            Type '{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: EventCallable<any>[]; target: EventCallable<{ a: number; }>; filter: (val: { ...; }) => val is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: EventCallable<any>[]; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; filter?: ((src: { a: number | null; b: string; }, clk: any) => boolean) | undefined; fn?: ((src: { ...; }, clk: any) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | ...'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
                  Types of parameters 'val' and 'src' are incompatible.
                    Type '{ a: number | null; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'a' are incompatible.
                        Type 'number | null' is not assignable to type 'number'.
                          Type 'null' is not assignable to type 'number'.
        Argument of type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: (StoreWritable<number> | EventCallable<number>)[]; target: EventCallable<...>; filter: (val: { ...; }, n: number) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (StoreWritable<number> | EventCallable<number>)[]; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; ... 4 more ...; batch?: boolean | undefined; }] | [config: ...]'.
          Type '[{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: (StoreWritable<number> | EventCallable<number>)[]; target: EventCallable<...>; filter: (val: { ...; }, n: number) => val is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (StoreWritable<number> | EventCallable<number>)[]; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; ... 4 more ...; batch?: boolean | undefined; }]'.
            Type '{ source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; clock: (StoreWritable<number> | EventCallable<number>)[]; target: EventCallable<...>; filter: (val: { ...; }, n: number) => val is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (StoreWritable<number> | EventCallable<number>)[]; source: { a: StoreWritable<number | null>; b: StoreWritable<string>; }; ... 4 more ...; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: number) => any'.
                  Types of parameters 'val' and 'src' are incompatible.
                    Type '{ a: number | null; b: string; }' is not assignable to type 'ABN'.
                      Types of property 'a' are incompatible.
                        Type 'number | null' is not assignable to type 'number'.
                          Type 'null' is not assignable to type 'number'.
        Parameter 'val' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        Type 'string' is not assignable to type '{ a: number; }'.
        "
      `)
    })
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({source:[a,b], target:[lNumStr]           , filter:(val) => val[0] > 0})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 3 'sample({source:[a,b], target:[lNumStr]           , filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 4 'sample({source:[a,b], target:[lNumStr,anyt]      , filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 5 'sample({source:[a,b], target:[lNumStr,voidt]     , filter:(val) => val[0] > 0})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Unmarked error at test line 5 'sample({source:[a,b], target:[lNumStr,voidt]     , filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 6 'sample({source:[a,b], target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 7 'sample({source:[a,b], target:[lNumStr]           , filter:$filter            })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 9 'sample({source:[a,b], target:[lNumStr,voidt]     , filter:$filter            })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        "
      `)
    })
    test('tuple -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 9 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 7 'lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 18 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 15 'lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 21 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        Unmarked error at test line 28 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 24 'lNumNum,'
        lack of expected error at test line 26 'voidt,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 39 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 34 'lNumNum,'
        lack of expected error at test line 37 'voidt,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 42 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 59 'source: [a,b],'
        lack of expected error at test line 45 'lNumNum,'
        lack of expected error at test line 53 'lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        lack of expected error at test line 62 'lNumNum,'
        lack of expected error at test line 64 'voidt,'
        lack of expected error at test line 72 'lNumNum,'
        lack of expected error at test line 75 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({source:[a,b], clock:anyt, target:[lNumStr]           , filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 3 'sample({source:[a,b], clock:anyt, target:[lNumStr]           , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 4 'sample({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 5 'sample({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Unmarked error at test line 5 'sample({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 6 'sample({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 7 'sample({source:[a,b], clock:numt, target:[lNumStr]           , filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 7 'sample({source:[a,b], clock:numt, target:[lNumStr]           , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 8 'sample({source:[a,b], clock:numt, target:[lNumStr,anyt]      , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 9 'sample({source:[a,b], clock:numt, target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Unmarked error at test line 9 'sample({source:[a,b], clock:numt, target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 10 'sample({source:[a,b], clock:numt, target:[lNumStr,anyt,voidt], filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 11 'sample({source:[a,b], clock:anyt, target:[lNumStr]           , filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 13 'sample({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        "
      `)
    })
    test('tuple + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          clock: anyt,
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 10 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 8 'lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 20 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 17 'lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 23 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        Unmarked error at test line 31 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 27 'lNumNum,'
        lack of expected error at test line 29 'voidt,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 43 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 38 'lNumNum,'
        lack of expected error at test line 41 'voidt,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 46 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 65 'source: [a,b],'
        lack of expected error at test line 50 'lNumNum,'
        lack of expected error at test line 59 'lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        lack of expected error at test line 69 'lNumNum,'
        lack of expected error at test line 71 'voidt,'
        lack of expected error at test line 80 'lNumNum,'
        lack of expected error at test line 83 'voidt,'
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 3 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 4 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 5 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Unmarked error at test line 5 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 6 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 7 'sample({source:[a,b], clock:[numt,$num], target:[lNumStr]           , filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 7 'sample({source:[a,b], clock:[numt,$num], target:[lNumStr]           , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 8 'sample({source:[a,b], clock:[numt,$num], target:[lNumStr,anyt]      , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 9 'sample({source:[a,b], clock:[numt,$num], target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Unmarked error at test line 9 'sample({source:[a,b], clock:[numt,$num], target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 10 'sample({source:[a,b], clock:[numt,$num], target:[lNumStr,anyt,voidt], filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 11 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Unmarked error at test line 13 'sample({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        "
      `)
    })
    test('tuple + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          target: [
            //@ts-expect-error
            lNumNum,
            anyt,
            //@ts-expect-error
            voidt,
          ],
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 10 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 8 'lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 20 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 17 'lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 23 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        Unmarked error at test line 31 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 27 'lNumNum,'
        lack of expected error at test line 29 'voidt,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 43 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 38 'lNumNum,'
        lack of expected error at test line 41 'voidt,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 46 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Unmarked error at test line 65 'source: [a,b],'
        lack of expected error at test line 50 'lNumNum,'
        lack of expected error at test line 59 'lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        lack of expected error at test line 69 'lNumNum,'
        lack of expected error at test line 71 'voidt,'
        lack of expected error at test line 80 'lNumNum,'
        lack of expected error at test line 83 'voidt,'
        "
      `)
    })
  })
  describe('tuple -> unit same', () => {
    test('tuple -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b]         , target:lNumStr, filter:(val) => val[0] > 0})
        sample({source:[a,b]         , target:anyt   , filter:(val) => val[0] > 0})
        sample({source:[a,b]         , target:voidt  , filter:(val) => val[0] > 0})
        sample({source:[a,b] as const, target:lNumStr, filter:(val) => val[0] > 0})
        sample({source:[a,b] as const, target:anyt   , filter:(val) => val[0] > 0})
        sample({source:[a,b] as const, target:voidt  , filter:(val) => val[0] > 0})
        sample({source:[a,b]         , target:lNumStr, filter:$filter            })
        sample({source:[a,b]         , target:anyt   , filter:$filter            })
        sample({source:[a,b]         , target:voidt  , filter:$filter            })
        sample({source:[a,b] as const, target:lNumStr, filter:$filter            })
        sample({source:[a,b] as const, target:anyt   , filter:$filter            })
        sample({source:[a,b] as const, target:voidt  , filter:$filter            })
        sample({source:[a]           , target:lNum   , filter:(val) => val[0] > 0})
        sample({source:[a] as const  , target:lNum   , filter:(val) => val[0] > 0})
        sample({source:[a]           , target:lNum   , filter:$filter            })
        sample({source:[a] as const  , target:lNum   , filter:$filter            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({source:[a,b]         , target:lNumStr, filter:(val) => val[0] > 0})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 3 'sample({source:[a,b]         , target:lNumStr, filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 4 'sample({source:[a,b]         , target:anyt   , filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 5 'sample({source:[a,b]         , target:voidt  , filter:(val) => val[0] > 0})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 9 'sample({source:[a,b]         , target:lNumStr, filter:$filter            })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 15 'sample({source:[a]           , target:lNum   , filter:(val) => val[0] > 0})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Unmarked error at test line 17 'sample({source:[a]           , target:lNum   , filter:$filter            })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: [a,b],
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b] as const,
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a,b] as const,
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a],
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a] as const,
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a],
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a] as const,
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 7 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 6 'target: lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 10 'source: [a,b] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Unmarked error at test line 16 'source: [a,b],'
        lack of expected error at test line 12 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 22 'source: [a,b] as const,'
        lack of expected error at test line 18 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Unmarked error at test line 28 'source: [a],'
        lack of expected error at test line 24 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 34 'source: [a] as const,'
        lack of expected error at test line 30 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        Unmarked error at test line 40 'source: [a],'
        lack of expected error at test line 36 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 46 'source: [a] as const,'
        lack of expected error at test line 42 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        lack of expected error at test line 48 'target: lNumNum,'
        "
      `)
    })
  })
  describe('tuple + clock -> unit same', () => {
    test('tuple + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b]         , clock:anyt, target:lNumStr, filter:(val) => val[0] > 0   })
        sample({source:[a,b]         , clock:anyt, target:anyt   , filter:(val) => val[0] > 0   })
        sample({source:[a,b]         , clock:anyt, target:voidt  , filter:(val) => val[0] > 0   })
        sample({source:[a,b]         , clock:numt, target:lNumStr, filter:(val, n) => val[0] > n})
        sample({source:[a,b]         , clock:numt, target:anyt   , filter:(val, n) => val[0] > n})
        sample({source:[a,b]         , clock:numt, target:voidt  , filter:(val, n) => val[0] > n})
        sample({source:[a,b] as const, clock:anyt, target:lNumStr, filter:(val) => val[0] > 0   })
        sample({source:[a,b] as const, clock:anyt, target:anyt   , filter:(val) => val[0] > 0   })
        sample({source:[a,b] as const, clock:anyt, target:voidt  , filter:(val) => val[0] > 0   })
        sample({source:[a,b] as const, clock:numt, target:lNumStr, filter:(val, n) => val[0] > n})
        sample({source:[a,b] as const, clock:numt, target:anyt   , filter:(val, n) => val[0] > n})
        sample({source:[a,b] as const, clock:numt, target:voidt  , filter:(val, n) => val[0] > n})
        sample({source:[a,b]         , clock:anyt, target:lNumStr, filter:$filter               })
        sample({source:[a,b]         , clock:anyt, target:anyt   , filter:$filter               })
        sample({source:[a,b]         , clock:anyt, target:voidt  , filter:$filter               })
        sample({source:[a,b] as const, clock:anyt, target:lNumStr, filter:$filter               })
        sample({source:[a,b] as const, clock:anyt, target:anyt   , filter:$filter               })
        sample({source:[a,b] as const, clock:anyt, target:voidt  , filter:$filter               })
        sample({source:[a]           , clock:anyt, target:lNum   , filter:(val) => val[0] > 0   })
        sample({source:[a]           , clock:numt, target:lNum   , filter:(val, n) => val[0] > n})
        sample({source:[a] as const  , clock:anyt, target:lNum   , filter:(val) => val[0] > 0   })
        sample({source:[a] as const  , clock:numt, target:lNum   , filter:(val, n) => val[0] > n})
        sample({source:[a]           , clock:anyt, target:lNum   , filter:$filter               })
        sample({source:[a] as const  , clock:anyt, target:lNum   , filter:$filter               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({source:[a,b]         , clock:anyt, target:lNumStr, filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 3 'sample({source:[a,b]         , clock:anyt, target:lNumStr, filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 4 'sample({source:[a,b]         , clock:anyt, target:anyt   , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 5 'sample({source:[a,b]         , clock:anyt, target:voidt  , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 6 'sample({source:[a,b]         , clock:numt, target:lNumStr, filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 6 'sample({source:[a,b]         , clock:numt, target:lNumStr, filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 7 'sample({source:[a,b]         , clock:numt, target:anyt   , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 8 'sample({source:[a,b]         , clock:numt, target:voidt  , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 15 'sample({source:[a,b]         , clock:anyt, target:lNumStr, filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 21 'sample({source:[a]           , clock:anyt, target:lNum   , filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Unmarked error at test line 22 'sample({source:[a]           , clock:numt, target:lNum   , filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Unmarked error at test line 25 'sample({source:[a]           , clock:anyt, target:lNum   , filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: [a,b],
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b] as const,
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a,b] as const,
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a],
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a] as const,
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a],
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a] as const,
          clock: anyt,
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 8 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 7 'target: lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 11 'source: [a,b] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Unmarked error at test line 18 'source: [a,b],'
        lack of expected error at test line 14 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 25 'source: [a,b] as const,'
        lack of expected error at test line 21 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Unmarked error at test line 32 'source: [a],'
        lack of expected error at test line 28 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 39 'source: [a] as const,'
        lack of expected error at test line 35 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        Unmarked error at test line 46 'source: [a],'
        lack of expected error at test line 42 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 53 'source: [a] as const,'
        lack of expected error at test line 49 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        lack of expected error at test line 56 'target: lNumNum,'
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit same', () => {
    test('tuple + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({source:[a,b]         , clock:[anyt]     , target:lNumStr, filter:(val) => val[0] > 0   })
        sample({source:[a,b]         , clock:[anyt]     , target:anyt   , filter:(val) => val[0] > 0   })
        sample({source:[a,b]         , clock:[anyt]     , target:voidt  , filter:(val) => val[0] > 0   })
        sample({source:[a,b]         , clock:[numt,$num], target:lNumStr, filter:(val, n) => val[0] > n})
        sample({source:[a,b]         , clock:[numt,$num], target:anyt   , filter:(val, n) => val[0] > n})
        sample({source:[a,b]         , clock:[numt,$num], target:voidt  , filter:(val, n) => val[0] > n})
        sample({source:[a,b] as const, clock:[anyt]     , target:lNumStr, filter:(val) => val[0] > 0   })
        sample({source:[a,b] as const, clock:[anyt]     , target:anyt   , filter:(val) => val[0] > 0   })
        sample({source:[a,b] as const, clock:[anyt]     , target:voidt  , filter:(val) => val[0] > 0   })
        sample({source:[a,b] as const, clock:[numt,$num], target:lNumStr, filter:(val, n) => val[0] > n})
        sample({source:[a,b] as const, clock:[numt,$num], target:anyt   , filter:(val, n) => val[0] > n})
        sample({source:[a,b] as const, clock:[numt,$num], target:voidt  , filter:(val, n) => val[0] > n})
        sample({source:[a,b]         , clock:[anyt]     , target:lNumStr, filter:$filter               })
        sample({source:[a,b]         , clock:[anyt]     , target:anyt   , filter:$filter               })
        sample({source:[a,b]         , clock:[anyt]     , target:voidt  , filter:$filter               })
        sample({source:[a,b] as const, clock:[anyt]     , target:lNumStr, filter:$filter               })
        sample({source:[a,b] as const, clock:[anyt]     , target:anyt   , filter:$filter               })
        sample({source:[a,b] as const, clock:[anyt]     , target:voidt  , filter:$filter               })
        sample({source:[a]           , clock:[anyt]     , target:lNum   , filter:(val) => val[0] > 0   })
        sample({source:[a]           , clock:[numt,$num], target:lNum   , filter:(val, n) => val[0] > n})
        sample({source:[a] as const  , clock:[anyt]     , target:lNum   , filter:(val) => val[0] > 0   })
        sample({source:[a] as const  , clock:[numt,$num], target:lNum   , filter:(val, n) => val[0] > n})
        sample({source:[a]           , clock:[anyt]     , target:lNum   , filter:$filter               })
        sample({source:[a] as const  , clock:[anyt]     , target:lNum   , filter:$filter               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 3 'sample({source:[a,b]         , clock:[anyt]     , target:lNumStr, filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 3 'sample({source:[a,b]         , clock:[anyt]     , target:lNumStr, filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 4 'sample({source:[a,b]         , clock:[anyt]     , target:anyt   , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 5 'sample({source:[a,b]         , clock:[anyt]     , target:voidt  , filter:(val) => val[0] > 0   })'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 6 'sample({source:[a,b]         , clock:[numt,$num], target:lNumStr, filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 6 'sample({source:[a,b]         , clock:[numt,$num], target:lNumStr, filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 7 'sample({source:[a,b]         , clock:[numt,$num], target:anyt   , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 8 'sample({source:[a,b]         , clock:[numt,$num], target:voidt  , filter:(val, n) => val[0] > n})'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 15 'sample({source:[a,b]         , clock:[anyt]     , target:lNumStr, filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Unmarked error at test line 21 'sample({source:[a]           , clock:[anyt]     , target:lNum   , filter:(val) => val[0] > 0   })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Unmarked error at test line 22 'sample({source:[a]           , clock:[numt,$num], target:lNum   , filter:(val, n) => val[0] > n})'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Unmarked error at test line 25 'sample({source:[a]           , clock:[anyt]     , target:lNum   , filter:$filter               })'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        sample({
          source: [a,b],
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b] as const,
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a,b],
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a,b] as const,
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a],
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a] as const,
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: (val) => val[0] > 0,
        })
        sample({
          source: [a],
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
        sample({
          source: [a] as const,
          clock: [anyt],
          //@ts-expect-error
          target: lNumNum,
          filter: $filter,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 4 'source: [a,b],'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 8 'filter: (val) => val[0] > 0,'
        lack of expected error at test line 7 'target: lNumNum,'
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Unmarked error at test line 11 'source: [a,b] as const,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Unmarked error at test line 18 'source: [a,b],'
        lack of expected error at test line 14 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 25 'source: [a,b] as const,'
        lack of expected error at test line 21 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Unmarked error at test line 32 'source: [a],'
        lack of expected error at test line 28 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 39 'source: [a] as const,'
        lack of expected error at test line 35 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        Unmarked error at test line 46 'source: [a],'
        lack of expected error at test line 42 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Unmarked error at test line 53 'source: [a] as const,'
        lack of expected error at test line 49 'target: lNumNum,'
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        lack of expected error at test line 56 'target: lNumNum,'
        "
      `)
    })
  })
})
describe('no source', () => {
  describe('clock -> unit same', () => {
    test('clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, target:$ab, filter:Boolean                         })
        sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:$filter                         })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 6 'clock: nullableAB,'
        lack of expected error at test line 4 'sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           })'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        Unmarked error at test line 12 'clock: nullableAB,'
        lack of expected error at test line 8 'target: strt,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        'clk' is possibly 'null'.
        Unmarked error at test line 18 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        lack of expected error at test line 20 'target: strt,'
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Unmarked error at test line 27 'clock: nullableAB,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Unmarked error at test line 33 'clock: nullableAB,'
        lack of expected error at test line 29 'target: strt,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        Unmarked error at test line 39 'clock: nullableAB,'
        lack of expected error at test line 35 'target: strt,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        lack of expected error at test line 41 'target: strt,'
        "
      `)
    })
  })
  describe('clock, fn -> unit same', () => {
    test('clock, fn -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})        })
        sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 6 'sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})        })'
        'val' is possibly 'null'.
        Unmarked error at test line 6 'sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})        })'
        'val' is possibly 'null'.
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
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: nullableAB,
          target: $ab,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:() => ({a:0, b:1})                   })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: () => ({a:0, b:1}),
        })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab, filter:Boolean                         , fn:() => ({a:0, b:1})                   })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: () => ({a:0, b:1}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'clk' is possibly 'null'.
        lack of expected error at test line 21 'target: strt,'
        'clk' is possibly 'null'.
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 37 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 53 'target: strt,'
        'clk' is possibly 'null'.
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 62 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 77 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 85 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 100 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 108 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 123 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Parameter 'clk' implicitly has an 'any' type.
        Type 'number' is not assignable to type 'string'.
        Unmarked error at test line 134 'filter: (clk): clk is AB => clk !== null,'
        lack of expected error at test line 133 'target: strt,'
        Parameter 'clk' implicitly has an 'any' type.
        Type '{ a: number; b: number; }' is not assignable to type 'number'.
        Type 'number' is not assignable to type 'string'.
        lack of expected error at test line 143 'target: strt,'
        Type '{ a: number; b: number; }' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('[clock] -> unit same', () => {
    test('[clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('[clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:$filter                         })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 6 'clock: [ab,nullableAB],'
        lack of expected error at test line 4 'sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           })'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        Unmarked error at test line 12 'clock: [ab,nullableAB],'
        lack of expected error at test line 8 'target: strt,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        'clk' is possibly 'null'.
        Unmarked error at test line 18 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        lack of expected error at test line 20 'target: strt,'
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Unmarked error at test line 27 'clock: [ab,nullableAB],'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Unmarked error at test line 33 'clock: [ab,nullableAB],'
        lack of expected error at test line 29 'target: strt,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        Unmarked error at test line 39 'clock: [ab,nullableAB],'
        lack of expected error at test line 35 'target: strt,'
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        lack of expected error at test line 41 'target: strt,'
        "
      `)
    })
  })
  describe('[clock], fn -> unit same', () => {
    test('[clock], fn -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})        })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 6 'sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})        })'
        'val' is possibly 'null'.
        Unmarked error at test line 6 'sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})        })'
        'val' is possibly 'null'.
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
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.a, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          target: $ab,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:() => ({a:0, b:1})                   })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: (clk): clk is AB => clk !== null,
          //@ts-expect-error
          fn: () => ({a:0, b:1}),
        })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         , fn:() => ({a:0, b:1})                   })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          target: strt,
          filter: Boolean,
          //@ts-expect-error
          fn: () => ({a:0, b:1}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        lack of expected error at test line 6 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'clk' is possibly 'null'.
        lack of expected error at test line 21 'target: strt,'
        'clk' is possibly 'null'.
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 37 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 53 'target: strt,'
        'clk' is possibly 'null'.
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 62 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 77 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 85 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 100 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        Property 'c' does not exist on type 'AB'.
        lack of expected error at test line 108 'target: strt,'
        Type '{ a: number; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        lack of expected error at test line 123 'target: strt,'
        Type '{ a: any; b: string; }' is not assignable to type 'number'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Parameter 'clk' implicitly has an 'any' type.
        Type 'number' is not assignable to type 'string'.
        Unmarked error at test line 134 'filter: (clk): clk is AB => clk !== null,'
        lack of expected error at test line 133 'target: strt,'
        Parameter 'clk' implicitly has an 'any' type.
        Type '{ a: number; b: number; }' is not assignable to type 'number'.
        Type 'number' is not assignable to type 'string'.
        lack of expected error at test line 143 'target: strt,'
        Type '{ a: number; b: number; }' is not assignable to type 'number'.
        "
      `)
    })
  })
  describe('clock -> new unit same', () => {
    test('clock -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, filter:(clk) => clk !== null           })
        sample({clock:nullableAB, filter:$filter                         })
        sample({clock:nullableAB, filter:Boolean                         })
        sample({clock:nullableAB, filter:(clk): clk is AB => clk !== null})
      }
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
        filter: (clk) => clk.a > 0,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        "
      `)
    })
  })
  describe('clock, fn -> new unit same', () => {
    test('clock, fn -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, filter:(clk) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:$filter              , fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:Boolean              , fn:(val) => ({a:val.a, b:val.b})        })
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
          filter: (clk) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: nullableAB,
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: nullableAB,
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        "
      `)
    })
  })
  describe('[clock] -> new unit same', () => {
    test('[clock] -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           })
        sample({clock:[ab,nullableAB], filter:$filter                         })
        sample({clock:[ab,nullableAB], filter:Boolean                         })
        sample({clock:[ab,nullableAB], filter:(clk): clk is AB => clk !== null})
      }
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
        filter: (clk) => clk.a > 0,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        "
      `)
    })
  })
  describe('[clock], fn -> new unit same', () => {
    test('[clock], fn -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:$filter              , fn:(val) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:Boolean              , fn:(val) => ({a:val.a, b:val.b})        })
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
          filter: (clk) => clk.a > 0,
          fn: (val) => ({a:1, b: val ? val.b : ''}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: (clk) => clk !== null,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          //@ts-expect-error
          filter: (clk) => clk.a > 0,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: $filter,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
        sample({
          clock: [ab,nullableAB],
          filter: Boolean,
          //@ts-expect-error
          fn: (val) => ({a:val.c, b:val.b}),
        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        "
      `)
    })
  })
})
