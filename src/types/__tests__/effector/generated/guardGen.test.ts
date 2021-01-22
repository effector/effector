/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard} from 'effector'
const typecheck = '{global}'

type AB = {a: number; b: string}
type ABN = {a: number; b: number}
const $filter = createStore(true)
const a = createStore(0)
const b = createStore('')
const voidt = createEvent()
const anyt = createEvent<any>()
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

describe('bool filter, array clock', () => {
  describe('unit + [clock] -> array wide', () => {
    test('unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: [anyt], target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: nullableAB, clock: [anyt], target: [aNum,voidt], filter: Boolean})
        guard({source: nullableAB, clock: [anyt], target: [aNum,anyt], filter: Boolean})
        guard({source: nullableAB, clock: [anyt], target: [aNum], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [aNum,voidt], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [aNum,anyt], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [aNum], filter: Boolean})
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
        guard({source: nullableAB, clock: [anyt], target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: [aStr,ab], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,ab], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        "
      `)
    })
  })
  describe('unit + [clock] -> unit wide', () => {
    test('unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: [anyt], target: aNum, filter: Boolean})
        guard({source: ab, clock: [anyt], target: aNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<AB | null>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: number; }' but required in type 'AB'.
        "
      `)
    })
    test('unit + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: aStr, filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: aStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB | null>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: string; }' but required in type 'AB'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
              Types of property '__' are incompatible.
                Type '{ a: string; }' is not assignable to type 'AB'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array same', () => {
    test('unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: [anyt], target: [ab,anyt,voidt], filter: Boolean})
        guard({source: nullableAB, clock: [anyt], target: [ab,voidt], filter: Boolean})
        guard({source: nullableAB, clock: [anyt], target: [ab,anyt], filter: Boolean})
        guard({source: nullableAB, clock: [anyt], target: [ab], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [ab,anyt,voidt], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [ab,voidt], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [ab,anyt], filter: Boolean})
        guard({source: ab, clock: [anyt], target: [ab], filter: Boolean})
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
        guard({source: nullableAB, clock: [anyt], target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: [anyt], target: [abn], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is missing the following properties from type 'Unit<AB | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is missing the following properties from type 'Unit<AB>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is missing the following properties from type 'Unit<AB>': kind, __
        "
      `)
    })
  })
  describe('unit + [clock] -> unit same', () => {
    test('unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: [anyt], target: ab, filter: Boolean})
        guard({source: ab, clock: [anyt], target: voidt, filter: Boolean})
        guard({source: ab, clock: [anyt], target: anyt, filter: Boolean})
        guard({source: ab, clock: [anyt], target: ab, filter: Boolean})
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
        guard({source: nullableAB, clock: [anyt], target: abn, filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: abn, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB | null>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
              Types of property '__' are incompatible.
                Type 'ABN' is not assignable to type 'AB'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array wide', () => {
    test('tuple + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: [lNum,anyt,voidt], filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: [lNum,voidt], filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: [lNum,anyt], filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: [lNum,lNumStr], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('tuple + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,lNumStr], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
  })
  describe('object + [clock] -> array wide', () => {
    test('object + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: [aNum,voidt], filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: [aNum,anyt], filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: [aNum], filter: Boolean})
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
        guard({source: {a, b}, clock: [anyt], target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,ab], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit wide', () => {
    test('tuple + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: lNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[number]>': kind, __
        "
      `)
    })
    test('tuple + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: lStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[string]>': kind, __
        "
      `)
    })
  })
  describe('object + [clock] -> unit wide', () => {
    test('object + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: aNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: aStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array same', () => {
    test('tuple + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: [lNumStr,anyt,voidt], filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: [lNumStr,voidt], filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: [lNumStr,anyt], filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: [lNumStr], filter: Boolean})
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
        guard({source: [a, b], clock: [anyt], target: [lNumNum,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
  })
  describe('object + [clock] -> array same', () => {
    test('object + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: [ab,anyt,voidt], filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: [ab,voidt], filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: [ab,anyt], filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: [ab], filter: Boolean})
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
        guard({source: {a, b}, clock: [anyt], target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit same', () => {
    test('tuple + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: voidt, filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: anyt, filter: Boolean})
        guard({source: [a, b], clock: [anyt], target: lNumStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<void>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<any>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[number, string]>': kind, __
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: lNumNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[number, number]>': kind, __
        "
      `)
    })
  })
  describe('object + [clock] -> unit same', () => {
    test('object + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: voidt, filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: anyt, filter: Boolean})
        guard({source: {a, b}, clock: [anyt], target: ab, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: abn, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
})
describe('bool filter, unit clock', () => {
  describe('unit + clock -> array wide', () => {
    test('unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: anyt, target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: nullableAB, clock: anyt, target: [aNum,voidt], filter: Boolean})
        guard({source: nullableAB, clock: anyt, target: [aNum,anyt], filter: Boolean})
        guard({source: nullableAB, clock: anyt, target: [aNum], filter: Boolean})
        guard({source: ab, clock: anyt, target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: ab, clock: anyt, target: [aNum,voidt], filter: Boolean})
        guard({source: ab, clock: anyt, target: [aNum,anyt], filter: Boolean})
        guard({source: ab, clock: anyt, target: [aNum], filter: Boolean})
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
        guard({source: nullableAB, clock: anyt, target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: [aStr,ab], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,ab], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + clock -> unit wide', () => {
    test('unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: anyt, target: aNum, filter: Boolean})
        guard({source: ab, clock: anyt, target: aNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<AB | null>'.
        "
      `)
    })
    test('unit + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: aStr, filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: aStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + clock -> array same', () => {
    test('unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: anyt, target: [ab,anyt,voidt], filter: Boolean})
        guard({source: nullableAB, clock: anyt, target: [ab,voidt], filter: Boolean})
        guard({source: nullableAB, clock: anyt, target: [ab,anyt], filter: Boolean})
        guard({source: nullableAB, clock: anyt, target: [ab], filter: Boolean})
        guard({source: ab, clock: anyt, target: [ab,anyt,voidt], filter: Boolean})
        guard({source: ab, clock: anyt, target: [ab,voidt], filter: Boolean})
        guard({source: ab, clock: anyt, target: [ab,anyt], filter: Boolean})
        guard({source: ab, clock: anyt, target: [ab], filter: Boolean})
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
        guard({source: nullableAB, clock: anyt, target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, clock: anyt, target: [abn], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + clock -> unit same', () => {
    test('unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, clock: anyt, target: ab, filter: Boolean})
        guard({source: ab, clock: anyt, target: voidt, filter: Boolean})
        guard({source: ab, clock: anyt, target: anyt, filter: Boolean})
        guard({source: ab, clock: anyt, target: ab, filter: Boolean})
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
        guard({source: nullableAB, clock: anyt, target: abn, filter: Boolean})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: abn, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + clock -> array wide', () => {
    test('tuple + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: [lNum,anyt,voidt], filter: Boolean})
        guard({source: [a, b], clock: anyt, target: [lNum,voidt], filter: Boolean})
        guard({source: [a, b], clock: anyt, target: [lNum,anyt], filter: Boolean})
        guard({source: [a, b], clock: anyt, target: [lNum,lNumStr], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('tuple + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,lNumStr], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object + clock -> array wide', () => {
    test('object + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: [aNum,voidt], filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: [aNum,anyt], filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: [aNum], filter: Boolean})
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
        guard({source: {a, b}, clock: anyt, target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,ab], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit wide', () => {
    test('tuple + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: lNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: lStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        "
      `)
    })
  })
  describe('object + clock -> unit wide', () => {
    test('object + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: aNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: aStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        "
      `)
    })
  })
  describe('tuple + clock -> array same', () => {
    test('tuple + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: [lNumStr,anyt,voidt], filter: Boolean})
        guard({source: [a, b], clock: anyt, target: [lNumStr,voidt], filter: Boolean})
        guard({source: [a, b], clock: anyt, target: [lNumStr,anyt], filter: Boolean})
        guard({source: [a, b], clock: anyt, target: [lNumStr], filter: Boolean})
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
        guard({source: [a, b], clock: anyt, target: [lNumNum,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object + clock -> array same', () => {
    test('object + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: [ab,anyt,voidt], filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: [ab,voidt], filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: [ab,anyt], filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: [ab], filter: Boolean})
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
        guard({source: {a, b}, clock: anyt, target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit same', () => {
    test('tuple + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: voidt, filter: Boolean})
        guard({source: [a, b], clock: anyt, target: anyt, filter: Boolean})
        guard({source: [a, b], clock: anyt, target: lNumStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: lNumNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object + clock -> unit same', () => {
    test('object + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: voidt, filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: anyt, filter: Boolean})
        guard({source: {a, b}, clock: anyt, target: ab, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: abn, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
})
describe('bool filter, no clock', () => {
  describe('unit -> array wide', () => {
    test('unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: nullableAB, target: [aNum,voidt], filter: Boolean})
        guard({source: nullableAB, target: [aNum,anyt], filter: Boolean})
        guard({source: nullableAB, target: [aNum], filter: Boolean})
        guard({source: ab, target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: ab, target: [aNum,voidt], filter: Boolean})
        guard({source: ab, target: [aNum,anyt], filter: Boolean})
        guard({source: ab, target: [aNum], filter: Boolean})
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
        guard({source: nullableAB, target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, target: [aStr,ab], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [aStr,ab], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit -> unit wide', () => {
    test('unit -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, target: aNum, filter: Boolean})
        guard({source: ab, target: aNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<AB | null>'.
        "
      `)
    })
    test('unit -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: nullableAB, target: aStr, filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: aStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit -> array same', () => {
    test('unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, target: [ab,anyt,voidt], filter: Boolean})
        guard({source: nullableAB, target: [ab,voidt], filter: Boolean})
        guard({source: nullableAB, target: [ab,anyt], filter: Boolean})
        guard({source: nullableAB, target: [ab], filter: Boolean})
        guard({source: ab, target: [ab,anyt,voidt], filter: Boolean})
        guard({source: ab, target: [ab,voidt], filter: Boolean})
        guard({source: ab, target: [ab,anyt], filter: Boolean})
        guard({source: ab, target: [ab], filter: Boolean})
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
        guard({source: nullableAB, target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: nullableAB, target: [abn], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: [abn], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit -> unit same', () => {
    test('unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: nullableAB, target: ab, filter: Boolean})
        guard({source: ab, target: voidt, filter: Boolean})
        guard({source: ab, target: anyt, filter: Boolean})
        guard({source: ab, target: ab, filter: Boolean})
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
        guard({source: nullableAB, target: abn, filter: Boolean})
        //@ts-expect-error
        guard({source: ab, target: abn, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple -> array wide', () => {
    test('tuple -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: [lNum,anyt,voidt], filter: Boolean})
        guard({source: [a, b], target: [lNum,voidt], filter: Boolean})
        guard({source: [a, b], target: [lNum,anyt], filter: Boolean})
        guard({source: [a, b], target: [lNum,lNumStr], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('tuple -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,lNumStr], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object -> array wide', () => {
    test('object -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: [aNum,anyt,voidt], filter: Boolean})
        guard({source: {a, b}, target: [aNum,voidt], filter: Boolean})
        guard({source: {a, b}, target: [aNum,anyt], filter: Boolean})
        guard({source: {a, b}, target: [aNum], filter: Boolean})
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
        guard({source: {a, b}, target: [aStr,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,ab], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('tuple -> unit wide', () => {
    test('tuple -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: lNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: lStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        "
      `)
    })
  })
  describe('object -> unit wide', () => {
    test('object -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: aNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, target: aStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        "
      `)
    })
  })
  describe('tuple -> array same', () => {
    test('tuple -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: [lNumStr,anyt,voidt], filter: Boolean})
        guard({source: [a, b], target: [lNumStr,voidt], filter: Boolean})
        guard({source: [a, b], target: [lNumStr,anyt], filter: Boolean})
        guard({source: [a, b], target: [lNumStr], filter: Boolean})
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
        guard({source: [a, b], target: [lNumNum,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object -> array same', () => {
    test('object -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: [ab,anyt,voidt], filter: Boolean})
        guard({source: {a, b}, target: [ab,voidt], filter: Boolean})
        guard({source: {a, b}, target: [ab,anyt], filter: Boolean})
        guard({source: {a, b}, target: [ab], filter: Boolean})
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
        guard({source: {a, b}, target: [abn,anyt,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn,voidt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn,anyt], filter: Boolean})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn], filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('tuple -> unit same', () => {
    test('tuple -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: voidt, filter: Boolean})
        guard({source: [a, b], target: anyt, filter: Boolean})
        guard({source: [a, b], target: lNumStr, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: lNumNum, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object -> unit same', () => {
    test('object -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: voidt, filter: Boolean})
        guard({source: {a, b}, target: anyt, filter: Boolean})
        guard({source: {a, b}, target: ab, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, target: abn, filter: Boolean})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
})
describe('fn filter, array clock', () => {
  describe('unit + [clock] -> array wide', () => {
    test('unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: [anyt], target: [aNum,anyt,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: [anyt], target: [aNum,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: [anyt], target: [aNum,anyt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: [anyt], target: [aNum], filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: [anyt], target: [aNum,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: [aNum,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: [aNum,anyt], filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: [aNum], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        "
      `)
    })
    test('unit + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [aStr,anyt,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [aStr,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [aStr,anyt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [aStr,ab], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,ab], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit wide', () => {
    test('unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: [anyt], target: aNum, filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: [anyt], target: aNum, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number | null; b: string; }'.
        "
      `)
    })
    test('unit + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: aStr, filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: aStr, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: number | null; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array same', () => {
    test('unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: [anyt], target: [ab,anyt,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: [anyt], target: [ab,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: [anyt], target: [ab,anyt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: [anyt], target: [ab], filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: [anyt], target: [ab,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: [ab,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: [ab,anyt], filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: [ab], filter: (val) => val.a > 0})
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
        guard({source: abNull, clock: [anyt], target: [abn,anyt,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [abn,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [abn,anyt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: [anyt], target: [abn], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit same', () => {
    test('unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: [anyt], target: ab, filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: [anyt], target: voidt, filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: anyt, filter: (val) => val.a > 0})
        guard({source: ab, clock: [anyt], target: ab, filter: (val) => val.a > 0})
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
        guard({source: abNull, clock: [anyt], target: abn, filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: abn, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array wide', () => {
    test('tuple + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: [lNum,anyt,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: [lNum,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: [lNum,anyt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: [lNum,lNumStr], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
    test('tuple + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,anyt,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,anyt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,lNumStr], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('object + [clock] -> array wide', () => {
    test('object + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: [aNum,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: [aNum,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: [aNum,anyt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: [aNum], filter: (val) => val.a > 0})
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
        guard({source: {a, b}, clock: [anyt], target: [aStr,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,ab], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit wide', () => {
    test('tuple + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: lNum, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: lStr, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        Operator '>' cannot be applied to types 'string' and 'number'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit wide', () => {
    test('object + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: aNum, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: aStr, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        Operator '>' cannot be applied to types 'string' and 'number'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array same', () => {
    test('tuple + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: [lNumStr,anyt,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: [lNumStr,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: [lNumStr,anyt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: [lNumStr], filter: (val) => val[0] > 0})
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
        guard({source: [a, b], clock: [anyt], target: [lNumNum,anyt,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum,anyt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('object + [clock] -> array same', () => {
    test('object + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: [ab,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: [ab,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: [ab,anyt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: [ab], filter: (val) => val.a > 0})
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
        guard({source: {a, b}, clock: [anyt], target: [abn,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit same', () => {
    test('tuple + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: voidt, filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: anyt, filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: [anyt], target: lNumStr, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'void'.
          Property '0' does not exist on type 'void'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: lNumNum, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit same', () => {
    test('object + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: voidt, filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: anyt, filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: [anyt], target: ab, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        Property 'a' does not exist on type 'void'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: abn, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
})
describe('fn filter, unit clock', () => {
  describe('unit + clock -> array wide', () => {
    test('unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: anyt, target: [aNum,anyt,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: anyt, target: [aNum,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: anyt, target: [aNum,anyt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: anyt, target: [aNum], filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: anyt, target: [aNum,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: [aNum,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: [aNum,anyt], filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: [aNum], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        "
      `)
    })
    test('unit + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [aStr,anyt,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [aStr,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [aStr,anyt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [aStr,ab], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,ab], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + clock -> unit wide', () => {
    test('unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: anyt, target: aNum, filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: anyt, target: aNum, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        "
      `)
    })
    test('unit + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: aStr, filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: aStr, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + clock -> array same', () => {
    test('unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: anyt, target: [ab,anyt,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: anyt, target: [ab,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: anyt, target: [ab,anyt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, clock: anyt, target: [ab], filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: anyt, target: [ab,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: [ab,voidt], filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: [ab,anyt], filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: [ab], filter: (val) => val.a > 0})
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
        guard({source: abNull, clock: anyt, target: [abn,anyt,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [abn,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [abn,anyt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, clock: anyt, target: [abn], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit + clock -> unit same', () => {
    test('unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, clock: anyt, target: ab, filter: (val): val is AB => val.a !== null})
        guard({source: ab, clock: anyt, target: voidt, filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: anyt, filter: (val) => val.a > 0})
        guard({source: ab, clock: anyt, target: ab, filter: (val) => val.a > 0})
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
        guard({source: abNull, clock: anyt, target: abn, filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: abn, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + clock -> array wide', () => {
    test('tuple + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: [lNum,anyt,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: [lNum,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: [lNum,anyt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: [lNum,lNumStr], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
    test('tuple + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,anyt,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,anyt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,lNumStr], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('object + clock -> array wide', () => {
    test('object + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: [aNum,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: [aNum,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: [aNum,anyt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: [aNum], filter: (val) => val.a > 0})
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
        guard({source: {a, b}, clock: anyt, target: [aStr,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,ab], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit wide', () => {
    test('tuple + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: lNum, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: lStr, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        Operator '>' cannot be applied to types 'string' and 'number'.
        "
      `)
    })
  })
  describe('object + clock -> unit wide', () => {
    test('object + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: aNum, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: aStr, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        Operator '>' cannot be applied to types 'string' and 'number'.
        "
      `)
    })
  })
  describe('tuple + clock -> array same', () => {
    test('tuple + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: [lNumStr,anyt,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: [lNumStr,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: [lNumStr,anyt], filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: [lNumStr], filter: (val) => val[0] > 0})
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
        guard({source: [a, b], clock: anyt, target: [lNumNum,anyt,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum,anyt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('object + clock -> array same', () => {
    test('object + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: [ab,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: [ab,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: [ab,anyt], filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: [ab], filter: (val) => val.a > 0})
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
        guard({source: {a, b}, clock: anyt, target: [abn,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit same', () => {
    test('tuple + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: voidt, filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: anyt, filter: (val) => val[0] > 0})
        guard({source: [a, b], clock: anyt, target: lNumStr, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'void'.
          Property '0' does not exist on type 'void'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: lNumNum, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object + clock -> unit same', () => {
    test('object + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: voidt, filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: anyt, filter: (val) => val.a > 0})
        guard({source: {a, b}, clock: anyt, target: ab, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        Property 'a' does not exist on type 'void'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: abn, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
})
describe('fn filter, no clock', () => {
  describe('unit -> array wide', () => {
    test('unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, target: [aNum,anyt,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, target: [aNum,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, target: [aNum,anyt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, target: [aNum], filter: (val): val is AB => val.a !== null})
        guard({source: ab, target: [aNum,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: ab, target: [aNum,voidt], filter: (val) => val.a > 0})
        guard({source: ab, target: [aNum,anyt], filter: (val) => val.a > 0})
        guard({source: ab, target: [aNum], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        "
      `)
    })
    test('unit -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: abNull, target: [aStr,anyt,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, target: [aStr,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, target: [aStr,anyt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, target: [aStr,ab], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, target: [aStr,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, target: [aStr,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, target: [aStr,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, target: [aStr,ab], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit -> unit wide', () => {
    test('unit -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, target: aNum, filter: (val): val is AB => val.a !== null})
        guard({source: ab, target: aNum, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        "
      `)
    })
    test('unit -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: abNull, target: aStr, filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, target: aStr, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit -> array same', () => {
    test('unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, target: [ab,anyt,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, target: [ab,voidt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, target: [ab,anyt], filter: (val): val is AB => val.a !== null})
        guard({source: abNull, target: [ab], filter: (val): val is AB => val.a !== null})
        guard({source: ab, target: [ab,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: ab, target: [ab,voidt], filter: (val) => val.a > 0})
        guard({source: ab, target: [ab,anyt], filter: (val) => val.a > 0})
        guard({source: ab, target: [ab], filter: (val) => val.a > 0})
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
        guard({source: abNull, target: [abn,anyt,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, target: [abn,voidt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, target: [abn,anyt], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: abNull, target: [abn], filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, target: [abn,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, target: [abn,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, target: [abn,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: ab, target: [abn], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('unit -> unit same', () => {
    test('unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: abNull, target: ab, filter: (val): val is AB => val.a !== null})
        guard({source: ab, target: voidt, filter: (val) => val.a > 0})
        guard({source: ab, target: anyt, filter: (val) => val.a > 0})
        guard({source: ab, target: ab, filter: (val) => val.a > 0})
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
        guard({source: abNull, target: abn, filter: (val): val is AB => val.a !== null})
        //@ts-expect-error
        guard({source: ab, target: abn, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple -> array wide', () => {
    test('tuple -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: [lNum,anyt,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], target: [lNum,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], target: [lNum,anyt], filter: (val) => val[0] > 0})
        guard({source: [a, b], target: [lNum,lNumStr], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
    test('tuple -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,anyt,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,anyt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,lNumStr], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('object -> array wide', () => {
    test('object -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: [aNum,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, target: [aNum,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, target: [aNum,anyt], filter: (val) => val.a > 0})
        guard({source: {a, b}, target: [aNum], filter: (val) => val.a > 0})
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
        guard({source: {a, b}, target: [aStr,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,ab], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple -> unit wide', () => {
    test('tuple -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: lNum, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: lStr, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        Operator '>' cannot be applied to types 'string' and 'number'.
        "
      `)
    })
  })
  describe('object -> unit wide', () => {
    test('object -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: aNum, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, target: aStr, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        Operator '>' cannot be applied to types 'string' and 'number'.
        "
      `)
    })
  })
  describe('tuple -> array same', () => {
    test('tuple -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: [lNumStr,anyt,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], target: [lNumStr,voidt], filter: (val) => val[0] > 0})
        guard({source: [a, b], target: [lNumStr,anyt], filter: (val) => val[0] > 0})
        guard({source: [a, b], target: [lNumStr], filter: (val) => val[0] > 0})
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
        guard({source: [a, b], target: [lNumNum,anyt,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum,voidt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum,anyt], filter: (val) => val[0] > 0})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum], filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('object -> array same', () => {
    test('object -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: [ab,anyt,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, target: [ab,voidt], filter: (val) => val.a > 0})
        guard({source: {a, b}, target: [ab,anyt], filter: (val) => val.a > 0})
        guard({source: {a, b}, target: [ab], filter: (val) => val.a > 0})
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
        guard({source: {a, b}, target: [abn,anyt,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn,voidt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn,anyt], filter: (val) => val.a > 0})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn], filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple -> unit same', () => {
    test('tuple -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: voidt, filter: (val) => val[0] > 0})
        guard({source: [a, b], target: anyt, filter: (val) => val[0] > 0})
        guard({source: [a, b], target: lNumStr, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        Element implicitly has an 'any' type because expression of type '0' can't be used to index type 'void'.
          Property '0' does not exist on type 'void'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: lNumNum, filter: (val) => val[0] > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object -> unit same', () => {
    test('object -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: voidt, filter: (val) => val.a > 0})
        guard({source: {a, b}, target: anyt, filter: (val) => val.a > 0})
        guard({source: {a, b}, target: ab, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        Property 'a' does not exist on type 'void'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, target: abn, filter: (val) => val.a > 0})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
})
describe('store filter, array clock', () => {
  describe('tuple + [clock] -> array wide', () => {
    test('tuple + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: [lNum,anyt,voidt], filter: $filter})
        guard({source: [a, b], clock: [anyt], target: [lNum,voidt], filter: $filter})
        guard({source: [a, b], clock: [anyt], target: [lNum,anyt], filter: $filter})
        guard({source: [a, b], clock: [anyt], target: [lNum,lNumStr], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('tuple + [clock] -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lStr,lNumStr], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object + [clock] -> array wide', () => {
    test('object + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: [aNum,anyt,voidt], filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: [aNum,voidt], filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: [aNum,anyt], filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: [aNum], filter: $filter})
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
        guard({source: {a, b}, clock: [anyt], target: [aStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [aStr,ab], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array wide', () => {
    test('unit + [clock] -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: [anyt], target: [aNum,anyt,voidt], filter: $filter})
        guard({source: ab, clock: [anyt], target: [aNum,voidt], filter: $filter})
        guard({source: ab, clock: [anyt], target: [aNum,anyt], filter: $filter})
        guard({source: ab, clock: [anyt], target: [aNum], filter: $filter})
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
        guard({source: ab, clock: [anyt], target: [aStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [aStr,ab], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit wide', () => {
    test('tuple + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: lNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: lStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit wide', () => {
    test('object + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: aNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object + [clock] -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: aStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit wide', () => {
    test('unit + [clock] -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: [anyt], target: aNum, filter: $filter})
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
        guard({source: ab, clock: [anyt], target: aStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> array same', () => {
    test('tuple + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: [lNumStr,anyt,voidt], filter: $filter})
        guard({source: [a, b], clock: [anyt], target: [lNumStr,voidt], filter: $filter})
        guard({source: [a, b], clock: [anyt], target: [lNumStr,anyt], filter: $filter})
        guard({source: [a, b], clock: [anyt], target: [lNumStr], filter: $filter})
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
        guard({source: [a, b], clock: [anyt], target: [lNumNum,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: [lNumNum], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object + [clock] -> array same', () => {
    test('object + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: [ab,anyt,voidt], filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: [ab,voidt], filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: [ab,anyt], filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: [ab], filter: $filter})
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
        guard({source: {a, b}, clock: [anyt], target: [abn,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: [abn], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> array same', () => {
    test('unit + [clock] -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: [anyt], target: [ab,anyt,voidt], filter: $filter})
        guard({source: ab, clock: [anyt], target: [ab,voidt], filter: $filter})
        guard({source: ab, clock: [anyt], target: [ab,anyt], filter: $filter})
        guard({source: ab, clock: [anyt], target: [ab], filter: $filter})
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
        guard({source: ab, clock: [anyt], target: [abn,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: [anyt], target: [abn], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + [clock] -> unit same', () => {
    test('tuple + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: [anyt], target: voidt, filter: $filter})
        guard({source: [a, b], clock: [anyt], target: anyt, filter: $filter})
        guard({source: [a, b], clock: [anyt], target: lNumStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: [anyt], target: lNumNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object + [clock] -> unit same', () => {
    test('object + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: [anyt], target: voidt, filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: anyt, filter: $filter})
        guard({source: {a, b}, clock: [anyt], target: ab, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object + [clock] -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: [anyt], target: abn, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
  describe('unit + [clock] -> unit same', () => {
    test('unit + [clock] -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: [anyt], target: voidt, filter: $filter})
        guard({source: ab, clock: [anyt], target: anyt, filter: $filter})
        guard({source: ab, clock: [anyt], target: ab, filter: $filter})
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
        guard({source: ab, clock: [anyt], target: abn, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
})
describe('store filter, unit clock', () => {
  describe('tuple + clock -> array wide', () => {
    test('tuple + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: [lNum,anyt,voidt], filter: $filter})
        guard({source: [a, b], clock: anyt, target: [lNum,voidt], filter: $filter})
        guard({source: [a, b], clock: anyt, target: [lNum,anyt], filter: $filter})
        guard({source: [a, b], clock: anyt, target: [lNum,lNumStr], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('tuple + clock -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lStr,lNumStr], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object + clock -> array wide', () => {
    test('object + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: [aNum,anyt,voidt], filter: $filter})
        guard({source: {a, b}, clock: anyt, target: [aNum,voidt], filter: $filter})
        guard({source: {a, b}, clock: anyt, target: [aNum,anyt], filter: $filter})
        guard({source: {a, b}, clock: anyt, target: [aNum], filter: $filter})
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
        guard({source: {a, b}, clock: anyt, target: [aStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [aStr,ab], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit + clock -> array wide', () => {
    test('unit + clock -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: anyt, target: [aNum,anyt,voidt], filter: $filter})
        guard({source: ab, clock: anyt, target: [aNum,voidt], filter: $filter})
        guard({source: ab, clock: anyt, target: [aNum,anyt], filter: $filter})
        guard({source: ab, clock: anyt, target: [aNum], filter: $filter})
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
        guard({source: ab, clock: anyt, target: [aStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [aStr,ab], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit wide', () => {
    test('tuple + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: lNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: lStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        "
      `)
    })
  })
  describe('object + clock -> unit wide', () => {
    test('object + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: aNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object + clock -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: aStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        "
      `)
    })
  })
  describe('unit + clock -> unit wide', () => {
    test('unit + clock -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: anyt, target: aNum, filter: $filter})
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
        guard({source: ab, clock: anyt, target: aStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + clock -> array same', () => {
    test('tuple + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: [lNumStr,anyt,voidt], filter: $filter})
        guard({source: [a, b], clock: anyt, target: [lNumStr,voidt], filter: $filter})
        guard({source: [a, b], clock: anyt, target: [lNumStr,anyt], filter: $filter})
        guard({source: [a, b], clock: anyt, target: [lNumStr], filter: $filter})
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
        guard({source: [a, b], clock: anyt, target: [lNumNum,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: [lNumNum], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object + clock -> array same', () => {
    test('object + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: [ab,anyt,voidt], filter: $filter})
        guard({source: {a, b}, clock: anyt, target: [ab,voidt], filter: $filter})
        guard({source: {a, b}, clock: anyt, target: [ab,anyt], filter: $filter})
        guard({source: {a, b}, clock: anyt, target: [ab], filter: $filter})
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
        guard({source: {a, b}, clock: anyt, target: [abn,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: [abn], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit + clock -> array same', () => {
    test('unit + clock -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: anyt, target: [ab,anyt,voidt], filter: $filter})
        guard({source: ab, clock: anyt, target: [ab,voidt], filter: $filter})
        guard({source: ab, clock: anyt, target: [ab,anyt], filter: $filter})
        guard({source: ab, clock: anyt, target: [ab], filter: $filter})
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
        guard({source: ab, clock: anyt, target: [abn,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, clock: anyt, target: [abn], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple + clock -> unit same', () => {
    test('tuple + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], clock: anyt, target: voidt, filter: $filter})
        guard({source: [a, b], clock: anyt, target: anyt, filter: $filter})
        guard({source: [a, b], clock: anyt, target: lNumStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], clock: anyt, target: lNumNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object + clock -> unit same', () => {
    test('object + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, clock: anyt, target: voidt, filter: $filter})
        guard({source: {a, b}, clock: anyt, target: anyt, filter: $filter})
        guard({source: {a, b}, clock: anyt, target: ab, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object + clock -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, clock: anyt, target: abn, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
  describe('unit + clock -> unit same', () => {
    test('unit + clock -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, clock: anyt, target: voidt, filter: $filter})
        guard({source: ab, clock: anyt, target: anyt, filter: $filter})
        guard({source: ab, clock: anyt, target: ab, filter: $filter})
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
        guard({source: ab, clock: anyt, target: abn, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
})
describe('store filter, no clock', () => {
  describe('tuple -> array wide', () => {
    test('tuple -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: [lNum,anyt,voidt], filter: $filter})
        guard({source: [a, b], target: [lNum,voidt], filter: $filter})
        guard({source: [a, b], target: [lNum,anyt], filter: $filter})
        guard({source: [a, b], target: [lNum,lNumStr], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('tuple -> array wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], target: [lStr,lNumStr], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object -> array wide', () => {
    test('object -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: [aNum,anyt,voidt], filter: $filter})
        guard({source: {a, b}, target: [aNum,voidt], filter: $filter})
        guard({source: {a, b}, target: [aNum,anyt], filter: $filter})
        guard({source: {a, b}, target: [aNum], filter: $filter})
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
        guard({source: {a, b}, target: [aStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, target: [aStr,ab], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit -> array wide', () => {
    test('unit -> array wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, target: [aNum,anyt,voidt], filter: $filter})
        guard({source: ab, target: [aNum,voidt], filter: $filter})
        guard({source: ab, target: [aNum,anyt], filter: $filter})
        guard({source: ab, target: [aNum], filter: $filter})
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
        guard({source: ab, target: [aStr,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, target: [aStr,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, target: [aStr,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, target: [aStr,ab], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<AB> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple -> unit wide', () => {
    test('tuple -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: lNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: lStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        "
      `)
    })
  })
  describe('object -> unit wide', () => {
    test('object -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: aNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object -> unit wide (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, target: aStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: string; }>'.
        "
      `)
    })
  })
  describe('unit -> unit wide', () => {
    test('unit -> unit wide (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, target: aNum, filter: $filter})
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
        guard({source: ab, target: aStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple -> array same', () => {
    test('tuple -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: [lNumStr,anyt,voidt], filter: $filter})
        guard({source: [a, b], target: [lNumStr,voidt], filter: $filter})
        guard({source: [a, b], target: [lNumStr,anyt], filter: $filter})
        guard({source: [a, b], target: [lNumStr], filter: $filter})
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
        guard({source: [a, b], target: [lNumNum,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: [a, b], target: [lNumNum], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, number]>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('object -> array same', () => {
    test('object -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: [ab,anyt,voidt], filter: $filter})
        guard({source: {a, b}, target: [ab,voidt], filter: $filter})
        guard({source: {a, b}, target: [ab,anyt], filter: $filter})
        guard({source: {a, b}, target: [ab], filter: $filter})
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
        guard({source: {a, b}, target: [abn,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: {a, b}, target: [abn], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<ABN>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit -> array same', () => {
    test('unit -> array same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, target: [ab,anyt,voidt], filter: $filter})
        guard({source: ab, target: [ab,voidt], filter: $filter})
        guard({source: ab, target: [ab,anyt], filter: $filter})
        guard({source: ab, target: [ab], filter: $filter})
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
        guard({source: ab, target: [abn,anyt,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, target: [abn,voidt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, target: [abn,anyt], filter: $filter})
        //@ts-expect-error
        guard({source: ab, target: [abn], filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<ABN>)[]' is not assignable to type 'Unit<AB>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>[]' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
  describe('tuple -> unit same', () => {
    test('tuple -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: [a, b], target: voidt, filter: $filter})
        guard({source: [a, b], target: anyt, filter: $filter})
        guard({source: [a, b], target: lNumStr, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, string]>'.
        "
      `)
    })
    test('tuple -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: [a, b], target: lNumNum, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object -> unit same', () => {
    test('object -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: {a, b}, target: voidt, filter: $filter})
        guard({source: {a, b}, target: anyt, filter: $filter})
        guard({source: {a, b}, target: ab, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<void>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<void>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<any>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<any>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<AB>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<AB>'.
        "
      `)
    })
    test('object -> unit same (should fail)', () => {
      //prettier-ignore
      {
        //@ts-expect-error
        guard({source: {a, b}, target: abn, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<ABN>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<ABN>'.
        "
      `)
    })
  })
  describe('unit -> unit same', () => {
    test('unit -> unit same (should pass)', () => {
      //prettier-ignore
      {
        guard({source: ab, target: voidt, filter: $filter})
        guard({source: ab, target: anyt, filter: $filter})
        guard({source: ab, target: ab, filter: $filter})
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
        guard({source: ab, target: abn, filter: $filter})
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<ABN>' is not assignable to type 'Unit<AB>'.
        "
      `)
    })
  })
})
