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
        //@ts-expect-error
        sample({source:ab        , target:abn, filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , target:abn, filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , target:abn, filter:Boolean                           })
        //@ts-expect-error
        sample({source:abNull    , target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
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
        //@ts-expect-error
        sample({source:ab        , target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , target:aStr, filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:abn, filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:abn, filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:abn, filter:Boolean                           })
        //@ts-expect-error
        sample({source:abNull    , clock:anyt, target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:aStr, filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:abn, filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:abn, filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:abn, filter:Boolean                           })
        //@ts-expect-error
        sample({source:abNull    , clock:[anyt], target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:aStr, filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:ab        , target:[abn]           , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , target:[abn,anyt]      , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , target:[abn,voidt]     , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , target:[abn,anyt,voidt], filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , target:[abn]           , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn,anyt]      , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn,voidt]     , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn,anyt,voidt], filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , target:[abn,anyt,voidt], filter:Boolean                           })
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
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
        //@ts-expect-error
        sample({source:ab        , target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , target:[aStr,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn]           , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,anyt]      , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,voidt]     , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,anyt,voidt], filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn]           , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,anyt]      , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,voidt]     , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,anyt,voidt], filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[abn,anyt,voidt], filter:Boolean                           })
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , clock:anyt, target:[aStr,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn]           , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,anyt]      , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,voidt]     , filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,anyt,voidt], filter:(val) => val.a > 0                })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn]           , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,anyt]      , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,voidt]     , filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,anyt,voidt], filter:$filter                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[abn,anyt,voidt], filter:Boolean                           })
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | ABN; }[]; }'.
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
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:ab        , clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        sample({source:nullableAB, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: AB; targetType: void | { a: string; }; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | ABN; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: void | { a: string; }; }[]; }'.
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
        //@ts-expect-error
        sample({source:{a,b}, target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, target:abn , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , target:ab  , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , target:aStr, filter:$filter           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:{a,b}     , target:aStr, filter:(val) => val.a > 0                             })
        //@ts-expect-error
        sample({source:{a,b}     , target:aStr, filter:$filter                                        })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, target:aNum, filter:$filter                                        })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:anyt, target:abn , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:ab  , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:anyt, target:aStr, filter:$filter           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:{a,b}     , clock:anyt, target:aStr, filter:(val) => val.a > 0                               })
        //@ts-expect-error
        sample({source:{a,b}     , clock:anyt, target:aStr, filter:$filter                                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:$filter                                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a,b}, clock:[anyt], target:abn , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:ab  , filter:$filter           })
        //@ts-expect-error
        sample({source:{a}  , clock:[anyt], target:aStr, filter:$filter           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: ABN; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; }; targetType: { a: string; }; }; }'.
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
        //@ts-expect-error
        sample({source:{a,b}     , clock:[anyt]     , target:aStr, filter:(val) => val.a > 0                               })
        //@ts-expect-error
        sample({source:{a,b}     , clock:[anyt]     , target:aStr, filter:$filter                                          })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val) => typeof val.a === 'number' && val.a > 0  })
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n) => typeof val.a === 'number' && val.a > n})
        //@ts-expect-error
        sample({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:$filter                                          })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: number; b: string; }; targetType: { a: string; }; }; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
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
        'val.a' is possibly 'null'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: any) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
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
        'val.a' is possibly 'null'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
        'val.a' is possibly 'null'.
        Type '(val: AB) => { a: number; b: string; }' is not assignable to type '((src: { a: number | null; b: string; }, clk: any) => any) & ((val: AB) => { a: number; b: string; })'.
          Type '(val: AB) => { a: number; b: string; }' is not assignable to type '(src: { a: number | null; b: string; }, clk: any) => any'.
            Types of parameters 'val' and 'src' are incompatible.
              Type '{ a: number | null; b: string; }' is not assignable to type 'AB'.
                Types of property 'a' are incompatible.
                  Type 'number | null' is not assignable to type 'number'.
                    Type 'null' is not assignable to type 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: { a: number; }; }; }'.
        Parameter 'val' implicitly has an 'any' type.
        Parameter 'n' implicitly has an 'any' type.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, string]; }[]; }'.
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
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: void | [number, number]; }[]; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b]         , target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b] as const, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b]         , target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b] as const, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a]           , target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a] as const  , target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a]           , target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a] as const  , target:lNumNum, filter:$filter            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b]         , clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b] as const, clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b]         , clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b] as const, clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a]           , clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a] as const  , clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a]           , clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a] as const  , clock:anyt, target:lNumNum, filter:$filter            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
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
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number]; }; }'.
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({source:[a,b]         , clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b] as const, clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a,b]         , clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a,b] as const, clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a]           , clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a] as const  , clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        sample({source:[a]           , clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        sample({source:[a] as const  , clock:[anyt], target:lNumNum, filter:$filter            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Operator '>' cannot be applied to types 'string | number' and 'number'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number, string]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: number[]; targetType: [number, number]; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: readonly [number]; targetType: [number, number]; }; }'.
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
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk !== null           })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk !== null           })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB | null) => clk !== null})
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB | null) => clk !== null})
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk.a > 0              })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk.a > 0              })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB) => clk.a > 0          })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB) => clk.a > 0          })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:$filter                         })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:$filter                         })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk): clk is AB => clk !== null})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        "
      `)
    })
  })
  describe('clock, fn -> unit same', () => {
    test('clock, fn -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, target:$ab, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, target:$ab, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, target:$ab, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})                   })
        sample({clock:nullableAB, target:$ab, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})                   })
        sample({clock:nullableAB, target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        "
      `)
    })
    test('clock, fn -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk.a > 0              , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk.a > 0              , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk.a > 0              , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk.a > 0              , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk !== null           , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk !== null           , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk.a > 0              , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk.a > 0              , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk) => clk.a > 0              , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk) => clk.a > 0              , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:$filter                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:$filter                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:Boolean                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk): clk is AB => clk !== null, fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk): clk is AB => clk !== null, fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:(clk): clk is AB => clk !== null, fn:() => ({a:0, b:1})                              })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:(clk): clk is AB => clk !== null, fn:() => ({a:0, b:1})                              })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:Boolean                         , fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         , fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:nullableAB, target:$ab , filter:Boolean                         , fn:() => ({a:0, b:1})                              })
        //@ts-expect-error
        sample({clock:nullableAB, target:strt, filter:Boolean                         , fn:() => ({a:0, b:1})                              })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: AB | null) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: bool...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
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
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
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
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Property 'c' does not exist on type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
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
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Property 'c' does not exist on type 'AB'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        Property 'c' does not exist on type 'AB'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
                Types of property 'b' are incompatible.
                  Type 'string' is not assignable to type 'number'.
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: AB) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }] | [message: ...]'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: AB) => { a: number; b: string; }; }]' is not assignable to type '[message: { error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }]'.
            Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Argument of type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
          Type '[{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { a: number; b: number; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: AB; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: number; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: number; b: number; })'.
          Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: number; b: number; })'.
          Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: number; }; }'.
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
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk !== null           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk !== null           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB | null) => clk !== null})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB | null) => clk !== null})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk.a > 0              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk.a > 0              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB) => clk.a > 0          })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB) => clk.a > 0          })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:$filter                         })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:$filter                         })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk): clk is AB => clk !== null})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB; targetType: number; }; }'.
        "
      `)
    })
  })
  describe('[clock], fn -> unit same', () => {
    test('[clock], fn -> unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], target:$ab, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})                   })
        sample({clock:[ab,nullableAB], target:$ab, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})                   })
        sample({clock:[ab,nullableAB], target:$ab, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        "
      `)
    })
    test('[clock], fn -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk.a > 0              , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk.a > 0              , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk.a > 0              , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk.a > 0              , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk !== null           , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk !== null           , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk.a > 0              , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk.a > 0              , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk) => clk.a > 0              , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk) => clk.a > 0              , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk: AB) => clk.a > 0          , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk: AB) => clk.a > 0          , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:$filter                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:$filter                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         , fn:(val: AB) => ({a:val.a, b:val.b})               })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:Boolean                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.a, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk): clk is AB => clk !== null, fn:(val: AB) => ({a:val.a, b:val.b})               })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk): clk is AB => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk): clk is AB => clk !== null, fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk): clk is AB => clk !== null, fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:(clk): clk is AB => clk !== null, fn:() => ({a:0, b:1})                              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:(clk): clk is AB => clk !== null, fn:() => ({a:0, b:1})                              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:Boolean                         , fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         , fn:(val: ABN) => ({a:val.a, b:val.b})              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:$ab , filter:Boolean                         , fn:() => ({a:0, b:1})                              })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], target:strt, filter:Boolean                         , fn:() => ({a:0, b:1})                              })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((val: AB | null) => { ...; }) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean |...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
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
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
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
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB) => boolean; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Property 'c' does not exist on type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
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
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        Property 'c' does not exist on type 'AB'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        Property 'c' does not exist on type 'AB'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: AB) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }] | [message: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: AB) => { ...; }; }]' is not assignable to type '[message: { error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }]'.
            Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: any; b: string; }; targetType: number; }; }'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: StoreWritable<AB>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: EventCallable<...>; greedy?: boolean | unde...'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; target: EventCallable<number>; filter: (clk: AB | null) => clk is AB; fn: (val: ABN) => { ...; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: AB; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: number; }; }'.
        Parameter 'clk' implicitly has an 'any' type.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: number; b: number; })'.
          Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '((clk: AB) => any) & ((val: ABN) => { a: number; b: number; })'.
          Type '(val: ABN) => { a: number; b: number; }' is not assignable to type '(clk: AB) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB' is not assignable to type 'ABN'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: AB; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: number; b: number; }; targetType: number; }; }'.
        "
      `)
    })
  })
  describe('clock -> new unit same', () => {
    test('clock -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, filter:(clk) => clk !== null           })
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null})
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
      {
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk.a > 0    })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB) => clk.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => clk is AB | null; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        "
      `)
    })
  })
  describe('clock, fn -> new unit same', () => {
    test('clock, fn -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:nullableAB, filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:nullableAB, filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:nullableAB, filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})                   })
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
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk.a > 0              , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk.a > 0              , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB) => clk.a > 0          , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk !== null           , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk.a > 0              , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk) => clk.a > 0              , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:(clk: AB) => clk.a > 0          , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:$filter                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:nullableAB, filter:Boolean                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:nullableAB, filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'clk' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [con...'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { a: number; b: string; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
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
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: EventCallable<AB | null>; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Property 'c' does not exist on type 'ABN'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Property 'c' does not exist on type 'AB'.
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
      {
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           })
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null})
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
      {
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk.a > 0    })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB) => clk.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => clk is AB | null; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        "
      `)
    })
  })
  describe('[clock], fn -> new unit same', () => {
    test('[clock], fn -> new unit same (should pass)', () => {
      //prettier-ignore
      {
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:$filter                         , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        sample({clock:[ab,nullableAB], filter:$filter                         , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        sample({clock:[ab,nullableAB], filter:Boolean                         , fn:(val) => ({a:val.a, b:val.b})                   })
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
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk.a > 0              , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:1, b: val ? val.b : ''})           })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk.a > 0              , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB) => clk.a > 0          , fn:(val: AB | null) => ({a:1, b: val ? val.b : ''})})
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk.a > 0              , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB) => clk.a > 0          , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk !== null           , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB | null) => clk !== null, fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk) => clk.a > 0              , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:(clk: AB) => clk.a > 0          , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:$filter                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:$filter                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:Boolean                         , fn:(val) => ({a:val.c, b:val.b})                   })
        //@ts-expect-error
        sample({clock:[ab,nullableAB], filter:Boolean                         , fn:(val: ABN) => ({a:val.c, b:''})                 })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        'clk' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'clk' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((val: AB | null) => { ...; }) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        'clk' is possibly 'null'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: AB | null) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'filter' are incompatible.
                Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                  Types of parameters 'clk' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'AB'.
                      Type 'null' is not assignable to type 'AB'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
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
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB | null) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              Types of property 'fn' are incompatible.
                Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
                  Types of parameters 'val' and 'clk' are incompatible.
                    Type 'AB | null' is not assignable to type 'ABN'.
                      Type 'null' is not assignable to type 'ABN'.
        'clk' is possibly 'null'.
        Property 'c' does not exist on type 'ABN'.
        Argument of type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to parameter of type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; ... 4 more ...; name?: string | undefined; } & { ...; }] | [config: ...]'.
          Type '[{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }]' is not assignable to type '[config: { clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
            Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
              Type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; filter: (clk: AB) => boolean; fn: (val: ABN) => { a: any; b: string; }; }' is not assignable to type '{ clock: (EventCallable<AB> | EventCallable<AB | null>)[]; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                Types of property 'filter' are incompatible.
                  Type '(clk: AB) => boolean' is not assignable to type '(clk: AB | null) => boolean'.
                    Types of parameters 'clk' and 'clk' are incompatible.
                      Type 'AB | null' is not assignable to type 'AB'.
                        Type 'null' is not assignable to type 'AB'.
        Property 'c' does not exist on type 'ABN'.
        'val' is possibly 'null'.
        Property 'c' does not exist on type 'AB'.
        'val' is possibly 'null'.
        Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '((clk: AB | null) => any) & ((val: ABN) => { a: any; b: string; })'.
          Type '(val: ABN) => { a: any; b: string; }' is not assignable to type '(clk: AB | null) => any'.
            Types of parameters 'val' and 'clk' are incompatible.
              Type 'AB | null' is not assignable to type 'ABN'.
                Type 'null' is not assignable to type 'ABN'.
        Property 'c' does not exist on type 'ABN'.
        Property 'c' does not exist on type 'AB'.
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
describe('bad filter', () => {
  test('not a function (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      sample({clock:nullableAB, target:$ab, filter:null})
      //@ts-expect-error
      sample({clock:nullableAB, target:$ab, filter:null, fn:(val) => ({a:1, b: val ? val.b : ''})})
      //@ts-expect-error
      sample({clock:nullableAB, filter:null})
      //@ts-expect-error
      sample({clock:nullableAB, filter:null, fn:(val) => ({a:1, b: val ? val.b : ''})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
      Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
        Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
            Types of property 'filter' are incompatible.
              Type 'null' is not assignable to type '((clk: AB | null) => boolean) | undefined'.
      Argument of type '[{ clock: EventCallable<AB | null>; filter: null; }]' is not assignable to parameter of type '[config: never] | [config: never]'.
        Type '[{ clock: EventCallable<AB | null>; filter: null; }]' is not assignable to type '[config: never]'.
          Type '{ clock: EventCallable<AB | null>; filter: null; }' is not assignable to type 'never'.
            The intersection '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }' was reduced to 'never' because property 'filter' has conflicting types in some constituents.
      Argument of type '[{ clock: EventCallable<AB | null>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
        Type '[{ clock: EventCallable<AB | null>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; filter: null; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
            Types of property 'filter' are incompatible.
              Type 'null' is not assignable to type '((clk: AB | null) => boolean) | undefined'.
      "
    `)
  })
  test('bad return (should fail)', () => {
    //prettier-ignore
    {
      //@ts-expect-error
      sample({clock:nullableAB, target:$ab, filter:() => 1})
      //@ts-expect-error
      sample({clock:nullableAB, target:$ab, filter:() => 1, fn:(val) => ({a:1, b: val ? val.b : ''})})
      //@ts-expect-error
      sample({clock:nullableAB, filter:() => 1})
      //@ts-expect-error
      sample({clock:nullableAB, filter:() => 1, fn:(val) => ({a:1, b: val ? val.b : ''})})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: AB | null; targetType: AB; }; }'.
      Argument of type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: (((clk: AB | null) => clk is AB | null) & ((clk: AB | null) => clk is AB | null)) | undefined; fn?: (((clk: AB | null) => any) & ((clk: AB | null) => any)) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean |...'.
        Type '[{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; target: StoreWritable<AB>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; }'.
            The types returned by 'filter(...)' are incompatible between these types.
              Type 'number' is not assignable to type 'boolean'.
      Argument of type '[{ clock: EventCallable<AB | null>; filter: () => number; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => clk is AB | null; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }] | [config: ...]'.
        Type '[{ clock: EventCallable<AB | null>; filter: () => number; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }]'.
          Type '{ clock: EventCallable<AB | null>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; } & { ...; }'.
            Type '{ clock: EventCallable<AB | null>; filter: () => number; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter: (clk: AB | null) => boolean; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
              The types returned by 'filter(...)' are incompatible between these types.
                Type 'number' is not assignable to type 'boolean'.
      Argument of type '[{ clock: EventCallable<AB | null>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to parameter of type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => clk is AB | null) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
        Type '[{ clock: EventCallable<AB | null>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }]' is not assignable to type '[config: { clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
          Type '{ clock: EventCallable<AB | null>; filter: () => number; fn: (val: AB | null) => { a: number; b: string; }; }' is not assignable to type '{ clock: EventCallable<AB | null>; source?: undefined; filter?: ((clk: AB | null) => boolean) | undefined; fn?: ((clk: AB | null) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
            The types returned by 'filter(...)' are incompatible between these types.
              Type 'number' is not assignable to type 'boolean'.
      "
    `)
  })
})
