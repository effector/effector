/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard} from 'effector'
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
        guard({source:ab, target:voidt, filter:(val) => val.a > 0})
        guard({source:ab, target:ab   , filter:(val) => val.a > 0})
        guard({source:ab, target:anyt , filter:(val) => val.a > 0})
        guard({source:ab, target:anyt , filter:$filter           })
        guard({source:ab, target:voidt, filter:$filter           })
        guard({source:ab, target:ab   , filter:$filter           })
        guard({source:ab, target:ab   , filter:Boolean           })
        guard({source:ab, target:voidt, filter:Boolean           })
        guard({source:ab, target:anyt , filter:Boolean           })
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
        guard({source:ab, target:abn, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:abn, filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:abn, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit -> unit wide', () => {
    test('unit -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, target:aNum, filter:(val) => val.a > 0})
        guard({source:ab, target:aNum, filter:$filter           })
        guard({source:ab, target:aNum, filter:Boolean           })
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
        guard({source:ab, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + clock -> unit same', () => {
    test('unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:anyt, target:ab   , filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:anyt , filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:voidt, filter:(val) => val.a > 0  })
        guard({source:ab, clock:numt, target:ab   , filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:voidt, filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:anyt , filter:(val,n) => val.a > n})
        guard({source:ab, clock:anyt, target:voidt, filter:$filter             })
        guard({source:ab, clock:anyt, target:anyt , filter:$filter             })
        guard({source:ab, clock:anyt, target:ab   , filter:$filter             })
        guard({source:ab, clock:anyt, target:anyt , filter:Boolean             })
        guard({source:ab, clock:anyt, target:ab   , filter:Boolean             })
        guard({source:ab, clock:anyt, target:voidt, filter:Boolean             })
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
        guard({source:ab, clock:anyt, target:abn, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:abn, filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:abn, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + clock -> unit wide', () => {
    test('unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:anyt, target:aNum, filter:(val) => val.a > 0  })
        guard({source:ab, clock:numt, target:aNum, filter:(val,n) => val.a > n})
        guard({source:ab, clock:anyt, target:aNum, filter:$filter             })
        guard({source:ab, clock:anyt, target:aNum, filter:Boolean             })
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
        guard({source:ab, clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit same', () => {
    test('unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:[anyt]     , target:voidt, filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:ab   , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:anyt , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[numt,$num], target:anyt , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:ab   , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:voidt, filter:(val,n) => val.a > n})
        guard({source:ab, clock:[anyt]     , target:ab   , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:voidt, filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:anyt , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:ab   , filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:anyt , filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:voidt, filter:Boolean             })
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
        guard({source:ab, clock:[anyt], target:abn, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:abn, filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:abn, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit wide', () => {
    test('unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:[anyt]     , target:aNum, filter:(val) => val.a > 0  })
        guard({source:ab, clock:[numt,$num], target:aNum, filter:(val,n) => val.a > n})
        guard({source:ab, clock:[anyt]     , target:aNum, filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:aNum, filter:Boolean             })
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
        guard({source:ab, clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit -> array same', () => {
    test('unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, target:[ab,voidt]     , filter:(val) => val.a > 0})
        guard({source:ab, target:[ab,anyt,voidt], filter:(val) => val.a > 0})
        guard({source:ab, target:[ab]           , filter:(val) => val.a > 0})
        guard({source:ab, target:[ab,anyt]      , filter:(val) => val.a > 0})
        guard({source:ab, target:[ab]           , filter:$filter           })
        guard({source:ab, target:[ab,anyt]      , filter:$filter           })
        guard({source:ab, target:[ab,anyt,voidt], filter:$filter           })
        guard({source:ab, target:[ab,voidt]     , filter:$filter           })
        guard({source:ab, target:[ab,voidt]     , filter:Boolean           })
        guard({source:ab, target:[ab,anyt]      , filter:Boolean           })
        guard({source:ab, target:[ab,anyt,voidt], filter:Boolean           })
        guard({source:ab, target:[ab]           , filter:Boolean           })
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
        guard({source:ab, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[abn,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, target:[abn,anyt]      , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit -> array wide', () => {
    test('unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, target:[aNum,anyt,voidt], filter:(val) => val.a > 0})
        guard({source:ab, target:[aNum]           , filter:(val) => val.a > 0})
        guard({source:ab, target:[aNum,voidt]     , filter:(val) => val.a > 0})
        guard({source:ab, target:[aNum,anyt]      , filter:(val) => val.a > 0})
        guard({source:ab, target:[aNum,voidt]     , filter:$filter           })
        guard({source:ab, target:[aNum]           , filter:$filter           })
        guard({source:ab, target:[aNum,anyt]      , filter:$filter           })
        guard({source:ab, target:[aNum,anyt,voidt], filter:$filter           })
        guard({source:ab, target:[aNum]           , filter:Boolean           })
        guard({source:ab, target:[aNum,voidt]     , filter:Boolean           })
        guard({source:ab, target:[aNum,anyt,voidt], filter:Boolean           })
        guard({source:ab, target:[aNum,anyt]      , filter:Boolean           })
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
        guard({source:ab, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, target:[aStr,ab]        , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + clock -> array same', () => {
    test('unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:anyt, target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:[ab,anyt]      , filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:[ab]           , filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:[ab,voidt]     , filter:(val) => val.a > 0  })
        guard({source:ab, clock:numt, target:[ab,voidt]     , filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:[ab]           , filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:[ab,anyt]      , filter:(val,n) => val.a > n})
        guard({source:ab, clock:anyt, target:[ab,anyt,voidt], filter:$filter             })
        guard({source:ab, clock:anyt, target:[ab,voidt]     , filter:$filter             })
        guard({source:ab, clock:anyt, target:[ab,anyt]      , filter:$filter             })
        guard({source:ab, clock:anyt, target:[ab]           , filter:$filter             })
        guard({source:ab, clock:anyt, target:[ab,anyt]      , filter:Boolean             })
        guard({source:ab, clock:anyt, target:[ab]           , filter:Boolean             })
        guard({source:ab, clock:anyt, target:[ab,anyt,voidt], filter:Boolean             })
        guard({source:ab, clock:anyt, target:[ab,voidt]     , filter:Boolean             })
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
        guard({source:ab, clock:anyt, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[abn,anyt]      , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + clock -> array wide', () => {
    test('unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:anyt, target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:ab, clock:anyt, target:[aNum]           , filter:(val) => val.a > 0  })
        guard({source:ab, clock:numt, target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:[aNum]           , filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:ab, clock:numt, target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        guard({source:ab, clock:anyt, target:[aNum,anyt]      , filter:$filter             })
        guard({source:ab, clock:anyt, target:[aNum]           , filter:$filter             })
        guard({source:ab, clock:anyt, target:[aNum,anyt,voidt], filter:$filter             })
        guard({source:ab, clock:anyt, target:[aNum,voidt]     , filter:$filter             })
        guard({source:ab, clock:anyt, target:[aNum,anyt]      , filter:Boolean             })
        guard({source:ab, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean             })
        guard({source:ab, clock:anyt, target:[aNum]           , filter:Boolean             })
        guard({source:ab, clock:anyt, target:[aNum,voidt]     , filter:Boolean             })
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
        guard({source:ab, clock:anyt, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:anyt, target:[aStr,anyt]      , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array same', () => {
    test('unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:[anyt]     , target:[ab,anyt]      , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:[ab,voidt]     , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:[ab]           , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[numt,$num], target:[ab,anyt]      , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:[ab]           , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:[ab,voidt]     , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[anyt]     , target:[ab,voidt]     , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[ab]           , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[ab,anyt,voidt], filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[ab,anyt]      , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:[ab,voidt]     , filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:[ab]           , filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:[ab,anyt]      , filter:Boolean             })
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
        guard({source:ab, clock:[anyt], target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn]           , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[abn,anyt]      , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array wide', () => {
    test('unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:ab, clock:[anyt]     , target:[aNum]           , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:ab, clock:[anyt]     , target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        guard({source:ab, clock:[numt,$num], target:[aNum]           , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:ab, clock:[numt,$num], target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        guard({source:ab, clock:[anyt]     , target:[aNum,voidt]     , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[aNum,anyt,voidt], filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[aNum,anyt]      , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[aNum]           , filter:$filter             })
        guard({source:ab, clock:[anyt]     , target:[aNum,voidt]     , filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:[aNum,anyt,voidt], filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:[aNum,anyt]      , filter:Boolean             })
        guard({source:ab, clock:[anyt]     , target:[aNum]           , filter:Boolean             })
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
        guard({source:ab, clock:[anyt], target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:ab, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit -> unit same', () => {
    test('nullable unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:abNull    , target:ab, filter:(val): val is AB => val.a !== null})
        guard({source:nullableAB, target:ab, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:abNull    , target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:nullableAB, target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> unit same', () => {
    test('nullable unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:abNull    , clock:anyt, target:ab, filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:numt, target:ab, filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:nullableAB, clock:anyt, target:ab, filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:abNull    , clock:anyt, target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> unit same', () => {
    test('nullable unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:abNull    , clock:[anyt]     , target:ab, filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:[numt,$num], target:ab, filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:nullableAB, clock:[anyt]     , target:ab, filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:abNull    , clock:[anyt], target:abn, filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:abn, filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit -> unit wide', () => {
    test('nullable unit -> unit wide (should pass)', () => {
      //prettier-ignore
      guard({source:nullableAB, target:aNum, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit -> unit wide (should fail)', () => {
      //prettier-ignore
      //@ts-expect-error
      guard({source:nullableAB, target:aStr, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> unit wide', () => {
    test('nullable unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      guard({source:nullableAB, clock:anyt, target:aNum, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      //@ts-expect-error
      guard({source:nullableAB, clock:anyt, target:aStr, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> unit wide', () => {
    test('nullable unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      guard({source:nullableAB, clock:[anyt], target:aNum, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      //@ts-expect-error
      guard({source:nullableAB, clock:[anyt], target:aStr, filter:Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit -> array same', () => {
    test('nullable unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:abNull    , target:[ab,anyt,voidt], filter:(val): val is AB => val.a !== null})
        guard({source:abNull    , target:[ab]           , filter:(val): val is AB => val.a !== null})
        guard({source:abNull    , target:[ab,anyt]      , filter:(val): val is AB => val.a !== null})
        guard({source:abNull    , target:[ab,voidt]     , filter:(val): val is AB => val.a !== null})
        guard({source:nullableAB, target:[ab,voidt]     , filter:Boolean                           })
        guard({source:nullableAB, target:[ab,anyt,voidt], filter:Boolean                           })
        guard({source:nullableAB, target:[ab,anyt]      , filter:Boolean                           })
        guard({source:nullableAB, target:[ab]           , filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:abNull    , target:[abn,anyt]      , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , target:[abn,anyt,voidt], filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , target:[abn,voidt]     , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , target:[abn]           , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:nullableAB, target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, target:[abn,anyt,voidt], filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, target:[abn,voidt]     , filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> array same', () => {
    test('nullable unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:abNull    , clock:anyt, target:[ab,voidt]     , filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:anyt, target:[ab,anyt]      , filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:anyt, target:[ab]           , filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:anyt, target:[ab,anyt,voidt], filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:numt, target:[ab]           , filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:abNull    , clock:numt, target:[ab,anyt]      , filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:abNull    , clock:numt, target:[ab,voidt]     , filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:abNull    , clock:numt, target:[ab,anyt,voidt], filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:nullableAB, clock:anyt, target:[ab,voidt]     , filter:Boolean                                      })
        guard({source:nullableAB, clock:anyt, target:[ab,anyt,voidt], filter:Boolean                                      })
        guard({source:nullableAB, clock:anyt, target:[ab]           , filter:Boolean                                      })
        guard({source:nullableAB, clock:anyt, target:[ab,anyt]      , filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:abNull    , clock:anyt, target:[abn,anyt,voidt], filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , clock:anyt, target:[abn]           , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , clock:anyt, target:[abn,voidt]     , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , clock:anyt, target:[abn,anyt]      , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[abn,anyt,voidt], filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> array same', () => {
    test('nullable unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:abNull    , clock:[anyt]     , target:[ab,anyt,voidt], filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:[anyt]     , target:[ab,anyt]      , filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:[anyt]     , target:[ab]           , filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:[anyt]     , target:[ab,voidt]     , filter:(val): val is AB => val.a !== null           })
        guard({source:abNull    , clock:[numt,$num], target:[ab,voidt]     , filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:abNull    , clock:[numt,$num], target:[ab]           , filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:abNull    , clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:abNull    , clock:[numt,$num], target:[ab,anyt]      , filter:(val,n): val is AB => n > 0 && val.a !== null})
        guard({source:nullableAB, clock:[anyt]     , target:[ab,voidt]     , filter:Boolean                                      })
        guard({source:nullableAB, clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean                                      })
        guard({source:nullableAB, clock:[anyt]     , target:[ab]           , filter:Boolean                                      })
        guard({source:nullableAB, clock:[anyt]     , target:[ab,anyt]      , filter:Boolean                                      })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:abNull    , clock:[anyt], target:[abn]           , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , clock:[anyt], target:[abn,anyt,voidt], filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , clock:[anyt], target:[abn,voidt]     , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:abNull    , clock:[anyt], target:[abn,anyt]      , filter:(val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[abn,voidt]     , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[abn,anyt]      , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[abn]           , filter:Boolean                           })
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[abn,anyt,voidt], filter:Boolean                           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit -> array wide', () => {
    test('nullable unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:nullableAB, target:[aNum,anyt]      , filter:Boolean})
        guard({source:nullableAB, target:[aNum]           , filter:Boolean})
        guard({source:nullableAB, target:[aNum,voidt]     , filter:Boolean})
        guard({source:nullableAB, target:[aNum,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:nullableAB, target:[aStr,anyt,voidt], filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, target:[aStr,ab]        , filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, target:[aStr,voidt]     , filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, target:[aStr,anyt]      , filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + clock -> array wide', () => {
    test('nullable unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:nullableAB, clock:anyt, target:[aNum,anyt]      , filter:Boolean})
        guard({source:nullableAB, clock:anyt, target:[aNum]           , filter:Boolean})
        guard({source:nullableAB, clock:anyt, target:[aNum,voidt]     , filter:Boolean})
        guard({source:nullableAB, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[aStr,ab]        , filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[aStr,voidt]     , filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, clock:anyt, target:[aStr,anyt]      , filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('nullable unit + [clock] -> array wide', () => {
    test('nullable unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:nullableAB, clock:[anyt], target:[aNum,anyt,voidt], filter:Boolean})
        guard({source:nullableAB, clock:[anyt], target:[aNum]           , filter:Boolean})
        guard({source:nullableAB, clock:[anyt], target:[aNum,voidt]     , filter:Boolean})
        guard({source:nullableAB, clock:[anyt], target:[aNum,anyt]      , filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('nullable unit + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[aStr,voidt]     , filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[aStr,anyt]      , filter:Boolean})
        //@ts-expect-error
        guard({source:nullableAB, clock:[anyt], target:[aStr,ab]        , filter:Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
})
describe('object source', () => {
  describe('object -> unit same', () => {
    test('object -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, target:ab   , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:voidt, filter:(val) => val.a > 0})
        guard({source:{a,b}, target:anyt , filter:(val) => val.a > 0})
        guard({source:{a}  , target:aNum , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:ab   , filter:$filter           })
        guard({source:{a,b}, target:anyt , filter:$filter           })
        guard({source:{a,b}, target:voidt, filter:$filter           })
        guard({source:{a}  , target:aNum , filter:$filter           })
        guard({source:{a,b}, target:anyt , filter:Boolean           })
        guard({source:{a,b}, target:ab   , filter:Boolean           })
        guard({source:{a,b}, target:voidt, filter:Boolean           })
        guard({source:{a}  , target:aNum , filter:Boolean           })
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
        guard({source:{a,b}, target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a}  , target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a}  , target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:abn , filter:$filter           })
        //@ts-expect-error
        guard({source:{a}  , target:ab  , filter:$filter           })
        //@ts-expect-error
        guard({source:{a}  , target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:abn , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a}  , target:ab  , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a}  , target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object -> unit wide', () => {
    test('object -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, target:aNum, filter:(val) => val.a > 0})
        guard({source:{a,b}, target:aNum, filter:$filter           })
        guard({source:{a,b}, target:aNum, filter:Boolean           })
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
        guard({source:{a,b}, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + clock -> unit same', () => {
    test('object + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:anyt, target:voidt, filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:anyt , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:ab   , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:numt, target:ab   , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:anyt , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:voidt, filter:(val,n) => val.a > n})
        guard({source:{a}  , clock:anyt, target:aNum , filter:(val) => val.a > 0  })
        guard({source:{a}  , clock:numt, target:aNum , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:anyt, target:anyt , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:ab   , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:voidt, filter:$filter             })
        guard({source:{a}  , clock:anyt, target:aNum , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:ab   , filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:anyt , filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:voidt, filter:Boolean             })
        guard({source:{a}  , clock:anyt, target:aNum , filter:Boolean             })
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
        guard({source:{a,b}, clock:anyt, target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a}  , clock:anyt, target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a}  , clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:abn , filter:$filter           })
        //@ts-expect-error
        guard({source:{a}  , clock:anyt, target:ab  , filter:$filter           })
        //@ts-expect-error
        guard({source:{a}  , clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:abn , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a}  , clock:anyt, target:ab  , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a}  , clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + clock -> unit wide', () => {
    test('object + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:anyt, target:aNum, filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:numt, target:aNum, filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:anyt, target:aNum, filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:aNum, filter:Boolean             })
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
        guard({source:{a,b}, clock:anyt, target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit same', () => {
    test('object + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:[anyt]     , target:voidt, filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:anyt , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:ab   , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[numt,$num], target:voidt, filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:ab   , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:anyt , filter:(val,n) => val.a > n})
        guard({source:{a}  , clock:[anyt]     , target:aNum , filter:(val) => val.a > 0  })
        guard({source:{a}  , clock:[numt,$num], target:aNum , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[anyt]     , target:ab   , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:voidt, filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:anyt , filter:$filter             })
        guard({source:{a}  , clock:[anyt]     , target:aNum , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:anyt , filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:voidt, filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:ab   , filter:Boolean             })
        guard({source:{a}  , clock:[anyt]     , target:aNum , filter:Boolean             })
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
        guard({source:{a,b}, clock:[anyt], target:abn , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a}  , clock:[anyt], target:ab  , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a}  , clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:abn , filter:$filter           })
        //@ts-expect-error
        guard({source:{a}  , clock:[anyt], target:ab  , filter:$filter           })
        //@ts-expect-error
        guard({source:{a}  , clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:abn , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a}  , clock:[anyt], target:ab  , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a}  , clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<AB>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit wide', () => {
    test('object + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:[anyt]     , target:aNum, filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[numt,$num], target:aNum, filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[anyt]     , target:aNum, filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:aNum, filter:Boolean             })
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
        guard({source:{a,b}, clock:[anyt], target:aStr, filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:aStr, filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:aStr, filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object -> array same', () => {
    test('object -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, target:[ab,anyt]      , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[ab]           , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[ab,anyt,voidt], filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[ab,voidt]     , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[ab,anyt,voidt], filter:$filter           })
        guard({source:{a,b}, target:[ab,anyt]      , filter:$filter           })
        guard({source:{a,b}, target:[ab]           , filter:$filter           })
        guard({source:{a,b}, target:[ab,voidt]     , filter:$filter           })
        guard({source:{a,b}, target:[ab]           , filter:Boolean           })
        guard({source:{a,b}, target:[ab,anyt,voidt], filter:Boolean           })
        guard({source:{a,b}, target:[ab,voidt]     , filter:Boolean           })
        guard({source:{a,b}, target:[ab,anyt]      , filter:Boolean           })
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
        guard({source:{a,b}, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, target:[abn]           , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object -> array wide', () => {
    test('object -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, target:[aNum,voidt]     , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[aNum]           , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[aNum,anyt]      , filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[aNum,anyt,voidt], filter:(val) => val.a > 0})
        guard({source:{a,b}, target:[aNum,anyt]      , filter:$filter           })
        guard({source:{a,b}, target:[aNum,anyt,voidt], filter:$filter           })
        guard({source:{a,b}, target:[aNum]           , filter:$filter           })
        guard({source:{a,b}, target:[aNum,voidt]     , filter:$filter           })
        guard({source:{a,b}, target:[aNum,anyt,voidt], filter:Boolean           })
        guard({source:{a,b}, target:[aNum,voidt]     , filter:Boolean           })
        guard({source:{a,b}, target:[aNum,anyt]      , filter:Boolean           })
        guard({source:{a,b}, target:[aNum]           , filter:Boolean           })
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
        guard({source:{a,b}, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, target:[aStr,voidt]     , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + clock -> array same', () => {
    test('object + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:anyt, target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:[ab,voidt]     , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:[ab]           , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:[ab,anyt]      , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:numt, target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:[ab]           , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:[ab,anyt]      , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:[ab,voidt]     , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:anyt, target:[ab,voidt]     , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[ab,anyt,voidt], filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[ab,anyt]      , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[ab]           , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[ab,voidt]     , filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:[ab,anyt]      , filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:[ab,anyt,voidt], filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:[ab]           , filter:Boolean             })
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
        guard({source:{a,b}, clock:anyt, target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn]           , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,anyt,voidt], filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[abn]           , filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + clock -> array wide', () => {
    test('object + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:anyt, target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:[aNum]           , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:anyt, target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:numt, target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:[aNum]           , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:numt, target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:anyt, target:[aNum,anyt]      , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[aNum]           , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[aNum,voidt]     , filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[aNum,anyt,voidt], filter:$filter             })
        guard({source:{a,b}, clock:anyt, target:[aNum,voidt]     , filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:[aNum,anyt,voidt], filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:[aNum]           , filter:Boolean             })
        guard({source:{a,b}, clock:anyt, target:[aNum,anyt]      , filter:Boolean             })
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
        guard({source:{a,b}, clock:anyt, target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:anyt, target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + [clock] -> array same', () => {
    test('object + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:[anyt]     , target:[ab,anyt]      , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,voidt]     , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:[ab]           , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[numt,$num], target:[ab,anyt]      , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:[ab,voidt]     , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:[ab,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:[ab]           , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[anyt]     , target:[ab]           , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,anyt,voidt], filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,anyt]      , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,voidt]     , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,anyt,voidt], filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,voidt]     , filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab]           , filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:[ab,anyt]      , filter:Boolean             })
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
        guard({source:{a,b}, clock:[anyt], target:[abn,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn]           , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn]           , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn]           , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[abn,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('object + [clock] -> array wide', () => {
    test('object + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,anyt,voidt], filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum]           , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,voidt]     , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,anyt]      , filter:(val) => val.a > 0  })
        guard({source:{a,b}, clock:[numt,$num], target:[aNum,voidt]     , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:[aNum]           , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:[aNum,anyt]      , filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[numt,$num], target:[aNum,anyt,voidt], filter:(val,n) => val.a > n})
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,anyt,voidt], filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,anyt]      , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum]           , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,voidt]     , filter:$filter             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum]           , filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,voidt]     , filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,anyt]      , filter:Boolean             })
        guard({source:{a,b}, clock:[anyt]     , target:[aNum,anyt,voidt], filter:Boolean             })
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
        guard({source:{a,b}, clock:[anyt], target:[aStr,ab]        , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,anyt]      , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,anyt,voidt], filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,voidt]     , filter:(val) => val.a > 0})
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,voidt]     , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,ab]        , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,anyt,voidt], filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,anyt]      , filter:$filter           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,voidt]     , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,ab]        , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,anyt]      , filter:Boolean           })
        //@ts-expect-error
        guard({source:{a,b}, clock:[anyt], target:[aStr,anyt,voidt], filter:Boolean           })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  test('nullable object -> unit wide (should pass)', () => {
    //prettier-ignore
    guard({source:{a:aOpt,b}, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('nullable object + clock -> unit wide (should pass)', () => {
    //prettier-ignore
    {
      guard({source:{a:aOpt,b}, clock:anyt, target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  })
      guard({source:{a:aOpt,b}, clock:numt, target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('nullable object + [clock] -> unit wide (should pass)', () => {
    //prettier-ignore
    {
      guard({source:{a:aOpt,b}, clock:[anyt]     , target:aNum, filter:(val): val is AB => typeof val.a === 'number' && val.a > 0  })
      guard({source:{a:aOpt,b}, clock:[numt,$num], target:aNum, filter:(val,n): val is AB => typeof val.a === 'number' && val.a > n})
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('tuple source', () => {
  describe('tuple -> unit same', () => {
    test('tuple -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:[a,b], target:anyt   , filter:(val) => val[0] > 0})
        guard({source:[a,b], target:lNumStr, filter:(val) => val[0] > 0})
        guard({source:[a,b], target:voidt  , filter:(val) => val[0] > 0})
        guard({source:[a]  , target:lNum   , filter:(val) => val[0] > 0})
        guard({source:[a,b], target:anyt   , filter:$filter            })
        guard({source:[a,b], target:voidt  , filter:$filter            })
        guard({source:[a,b], target:lNumStr, filter:$filter            })
        guard({source:[a]  , target:lNum   , filter:$filter            })
        guard({source:[a,b], target:lNumStr, filter:Boolean            })
        guard({source:[a,b], target:anyt   , filter:Boolean            })
        guard({source:[a,b], target:voidt  , filter:Boolean            })
        guard({source:[a]  , target:lNum   , filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:[a,b], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a]  , target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        guard({source:[a]  , target:lNumNum, filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], target:lNumNum, filter:Boolean            })
        //@ts-expect-error
        guard({source:[a]  , target:lNumNum, filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit same', () => {
    test('tuple + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:[a,b], clock:anyt, target:lNumStr, filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:anyt, target:anyt   , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:anyt, target:voidt  , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:numt, target:voidt  , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:numt, target:lNumStr, filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:numt, target:anyt   , filter:(val, n) => val[0] > n})
        guard({source:[a]  , clock:anyt, target:lNum   , filter:(val) => val[0] > 0   })
        guard({source:[a]  , clock:numt, target:lNum   , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:anyt, target:anyt   , filter:$filter               })
        guard({source:[a,b], clock:anyt, target:lNumStr, filter:$filter               })
        guard({source:[a,b], clock:anyt, target:voidt  , filter:$filter               })
        guard({source:[a]  , clock:anyt, target:lNum   , filter:$filter               })
        guard({source:[a,b], clock:anyt, target:voidt  , filter:Boolean               })
        guard({source:[a,b], clock:anyt, target:lNumStr, filter:Boolean               })
        guard({source:[a,b], clock:anyt, target:anyt   , filter:Boolean               })
        guard({source:[a]  , clock:anyt, target:lNum   , filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a]  , clock:anyt, target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        guard({source:[a]  , clock:anyt, target:lNumNum, filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:lNumNum, filter:Boolean            })
        //@ts-expect-error
        guard({source:[a]  , clock:anyt, target:lNumNum, filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit same', () => {
    test('tuple + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:[a,b], clock:[anyt]     , target:anyt   , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[anyt]     , target:lNumStr, filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[anyt]     , target:voidt  , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[numt,$num], target:lNumStr, filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[numt,$num], target:voidt  , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[numt,$num], target:anyt   , filter:(val, n) => val[0] > n})
        guard({source:[a]  , clock:[anyt]     , target:lNum   , filter:(val) => val[0] > 0   })
        guard({source:[a]  , clock:[numt,$num], target:lNum   , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[anyt]     , target:anyt   , filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:voidt  , filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:lNumStr, filter:$filter               })
        guard({source:[a]  , clock:[anyt]     , target:lNum   , filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:lNumStr, filter:Boolean               })
        guard({source:[a,b], clock:[anyt]     , target:anyt   , filter:Boolean               })
        guard({source:[a,b], clock:[anyt]     , target:voidt  , filter:Boolean               })
        guard({source:[a]  , clock:[anyt]     , target:lNum   , filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a]  , clock:[anyt], target:lNumNum, filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        guard({source:[a]  , clock:[anyt], target:lNumNum, filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:lNumNum, filter:Boolean            })
        //@ts-expect-error
        guard({source:[a]  , clock:[anyt], target:lNumNum, filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('tuple -> array same', () => {
    test('tuple -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:[a,b], target:[lNumStr,voidt]     , filter:(val) => val[0] > 0})
        guard({source:[a,b], target:[lNumStr,anyt]      , filter:(val) => val[0] > 0})
        guard({source:[a,b], target:[lNumStr]           , filter:(val) => val[0] > 0})
        guard({source:[a,b], target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0})
        guard({source:[a,b], target:[lNumStr,anyt]      , filter:$filter            })
        guard({source:[a,b], target:[lNumStr,anyt,voidt], filter:$filter            })
        guard({source:[a,b], target:[lNumStr]           , filter:$filter            })
        guard({source:[a,b], target:[lNumStr,voidt]     , filter:$filter            })
        guard({source:[a,b], target:[lNumStr,anyt,voidt], filter:Boolean            })
        guard({source:[a,b], target:[lNumStr]           , filter:Boolean            })
        guard({source:[a,b], target:[lNumStr,anyt]      , filter:Boolean            })
        guard({source:[a,b], target:[lNumStr,voidt]     , filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('tuple -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,anyt,voidt], filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,voidt]     , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,anyt]      , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum]           , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,anyt,voidt], filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,anyt]      , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,voidt]     , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum]           , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,voidt]     , filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,anyt,voidt], filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum,anyt]      , filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], target:[lNumNum]           , filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('tuple + clock -> array same', () => {
    test('tuple + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:anyt, target:[lNumStr]           , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:numt, target:[lNumStr,anyt]      , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:numt, target:[lNumStr]           , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:numt, target:[lNumStr,anyt,voidt], filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:numt, target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:anyt, target:[lNumStr]           , filter:$filter               })
        guard({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:$filter               })
        guard({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:$filter               })
        guard({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:$filter               })
        guard({source:[a,b], clock:anyt, target:[lNumStr,anyt]      , filter:Boolean               })
        guard({source:[a,b], clock:anyt, target:[lNumStr,anyt,voidt], filter:Boolean               })
        guard({source:[a,b], clock:anyt, target:[lNumStr,voidt]     , filter:Boolean               })
        guard({source:[a,b], clock:anyt, target:[lNumStr]           , filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('tuple + clock -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,voidt]     , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,anyt]      , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum]           , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,anyt,voidt], filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,voidt]     , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,anyt]      , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum]           , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,anyt,voidt], filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,voidt]     , filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,anyt,voidt], filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum,anyt]      , filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], clock:anyt, target:[lNumNum]           , filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array same', () => {
    test('tuple + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:(val) => val[0] > 0   })
        guard({source:[a,b], clock:[numt,$num], target:[lNumStr,anyt,voidt], filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[numt,$num], target:[lNumStr]           , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[numt,$num], target:[lNumStr,voidt]     , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[numt,$num], target:[lNumStr,anyt]      , filter:(val, n) => val[0] > n})
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:$filter               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,voidt]     , filter:Boolean               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt]      , filter:Boolean               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr]           , filter:Boolean               })
        guard({source:[a,b], clock:[anyt]     , target:[lNumStr,anyt,voidt], filter:Boolean               })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('tuple + [clock] -> array same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,voidt]     , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,anyt]      , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum]           , filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,anyt,voidt], filter:(val) => val[0] > 0})
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum]           , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,anyt,voidt], filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,voidt]     , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,anyt]      , filter:$filter            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,voidt]     , filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,anyt,voidt], filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum,anyt]      , filter:Boolean            })
        //@ts-expect-error
        guard({source:[a,b], clock:[anyt], target:[lNumNum]           , filter:Boolean            })
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<[number, number]>' is not assignable to type '\\"incompatible unit in target\\"'.
        "
      `)
    })
  })
})
describe('no source', () => {
  test('no + clock -> unit same (should pass)', () => {
    //prettier-ignore
    {
      guard({clock:anyt, target:numt, filter:(n) => n > 0})
      guard({clock:anyt, target:numt, filter:$filter     })
      guard({clock:anyt, target:numt, filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no + [clock] -> unit same (should pass)', () => {
    //prettier-ignore
    {
      guard({clock:[anyt], target:numt, filter:(n) => n > 0})
      guard({clock:[anyt], target:numt, filter:$filter     })
      guard({clock:[anyt], target:numt, filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no + clock -> array same (should pass)', () => {
    //prettier-ignore
    {
      guard({clock:anyt, filter:(n) => n > 0})
      guard({clock:anyt, filter:$filter     })
      guard({clock:anyt, filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('no + [clock] -> array same (should pass)', () => {
    //prettier-ignore
    {
      guard({clock:[anyt], filter:(n) => n > 0})
      guard({clock:[anyt], filter:$filter     })
      guard({clock:[anyt], filter:Boolean     })
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('nullable no + clock -> unit same (should pass)', () => {
    //prettier-ignore
    guard({clock:anyt, target:numt, filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('nullable no + [clock] -> unit same (should pass)', () => {
    //prettier-ignore
    guard({clock:[anyt], target:numt, filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('nullable no + clock -> array same (should pass)', () => {
    //prettier-ignore
    guard({clock:anyt, filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('nullable no + [clock] -> array same (should pass)', () => {
    //prettier-ignore
    guard({clock:[anyt], filter:(n): n is number => typeof n === 'number' && n > 0})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
