/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard} from 'effector'
const typecheck = '{global}'

const $filter = createStore(true)
const a = createStore(0)
const b = createStore('')
const voidt = createEvent()
const anyt = createEvent<any>()
const ab = createEvent<{a: number; b: string}>()
const nullableAB = createEvent<{a: number; b: string} | null>()
type AB = {a: number; b: string}
const abNull = createEvent<{a: number | null; b: string}>()
const aNum = createEvent<{a: number}>()
const aStr = createEvent<{a: string}>()
const lNum = createEvent<[number]>()
const lStr = createEvent<[string]>()
const lNumStr = createEvent<[number, string]>()
const lNumNum = createEvent<[number, number]>()
const aNumBStr = createEvent<{a: number; b: string}>()
const aNumBNum = createEvent<{a: number; b: number}>()

describe('bool filter', () => {
  describe('unit array wide', () => {
    test('unit array wide (should pass)', () => {
      guard({source: nullableAB, target: [voidt, anyt, aNum], filter: Boolean})
      guard({source: nullableAB, target: [voidt, aNum, anyt], filter: Boolean})
      guard({source: nullableAB, target: [anyt, voidt, aNum], filter: Boolean})
      guard({source: nullableAB, target: [anyt, aNum, voidt], filter: Boolean})
      guard({source: nullableAB, target: [aNum, voidt, anyt], filter: Boolean})
      guard({source: nullableAB, target: [aNum, anyt, voidt], filter: Boolean})
      guard({source: nullableAB, target: [voidt, aNum], filter: Boolean})
      guard({source: nullableAB, target: [aNum, voidt], filter: Boolean})
      guard({source: nullableAB, target: [anyt, aNum], filter: Boolean})
      guard({source: nullableAB, target: [aNum, anyt], filter: Boolean})
      guard({source: nullableAB, target: [aNum], filter: Boolean})
      guard({source: ab, target: [voidt, anyt, aNum], filter: Boolean})
      guard({source: ab, target: [voidt, aNum, anyt], filter: Boolean})
      guard({source: ab, target: [anyt, voidt, aNum], filter: Boolean})
      guard({source: ab, target: [anyt, aNum, voidt], filter: Boolean})
      guard({source: ab, target: [aNum, voidt, anyt], filter: Boolean})
      guard({source: ab, target: [aNum, anyt, voidt], filter: Boolean})
      guard({source: ab, target: [voidt, aNum], filter: Boolean})
      guard({source: ab, target: [aNum, voidt], filter: Boolean})
      guard({source: ab, target: [anyt, aNum], filter: Boolean})
      guard({source: ab, target: [aNum, anyt], filter: Boolean})
      guard({source: ab, target: [aNum], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        "
      `)
    })
    test('unit array wide (should fail)', () => {
      guard({source: nullableAB, target: [voidt, anyt, aStr], filter: Boolean})
      guard({source: nullableAB, target: [voidt, aStr, anyt], filter: Boolean})
      guard({source: nullableAB, target: [anyt, voidt, aStr], filter: Boolean})
      guard({source: nullableAB, target: [anyt, aStr, voidt], filter: Boolean})
      guard({source: nullableAB, target: [aStr, voidt, anyt], filter: Boolean})
      guard({source: nullableAB, target: [aStr, anyt, voidt], filter: Boolean})
      guard({source: nullableAB, target: [voidt, aStr], filter: Boolean})
      guard({source: nullableAB, target: [aStr, voidt], filter: Boolean})
      guard({source: nullableAB, target: [anyt, aStr], filter: Boolean})
      guard({source: nullableAB, target: [aStr, anyt], filter: Boolean})
      guard({source: nullableAB, target: [aNumBStr, aStr], filter: Boolean})
      guard({source: nullableAB, target: [aStr, aNumBStr], filter: Boolean})
      guard({source: ab, target: [voidt, anyt, aStr], filter: Boolean})
      guard({source: ab, target: [voidt, aStr, anyt], filter: Boolean})
      guard({source: ab, target: [anyt, voidt, aStr], filter: Boolean})
      guard({source: ab, target: [anyt, aStr, voidt], filter: Boolean})
      guard({source: ab, target: [aStr, voidt, anyt], filter: Boolean})
      guard({source: ab, target: [aStr, anyt, voidt], filter: Boolean})
      guard({source: ab, target: [voidt, aStr], filter: Boolean})
      guard({source: ab, target: [aStr, voidt], filter: Boolean})
      guard({source: ab, target: [anyt, aStr], filter: Boolean})
      guard({source: ab, target: [aStr, anyt], filter: Boolean})
      guard({source: ab, target: [aNumBStr, aStr], filter: Boolean})
      guard({source: ab, target: [aStr, aNumBStr], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('unit unit wide', () => {
    test('unit unit wide (should pass)', () => {
      guard({source: nullableAB, target: aNum, filter: Boolean})
      guard({source: ab, target: aNum, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
    test('unit unit wide (should fail)', () => {
      guard({source: nullableAB, target: aStr, filter: Boolean})
      guard({source: ab, target: aStr, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: number; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
  })
  describe('unit array same', () => {
    test('unit array same (should pass)', () => {
      guard({
        source: nullableAB,
        target: [voidt, anyt, aNumBStr],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [voidt, aNumBStr, anyt],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [anyt, voidt, aNumBStr],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [anyt, aNumBStr, voidt],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [aNumBStr, voidt, anyt],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [aNumBStr, anyt, voidt],
        filter: Boolean,
      })
      guard({source: nullableAB, target: [voidt, aNumBStr], filter: Boolean})
      guard({source: nullableAB, target: [aNumBStr, voidt], filter: Boolean})
      guard({source: nullableAB, target: [anyt, aNumBStr], filter: Boolean})
      guard({source: nullableAB, target: [aNumBStr, anyt], filter: Boolean})
      guard({source: nullableAB, target: [aNumBStr], filter: Boolean})
      guard({source: ab, target: [voidt, anyt, aNumBStr], filter: Boolean})
      guard({source: ab, target: [voidt, aNumBStr, anyt], filter: Boolean})
      guard({source: ab, target: [anyt, voidt, aNumBStr], filter: Boolean})
      guard({source: ab, target: [anyt, aNumBStr, voidt], filter: Boolean})
      guard({source: ab, target: [aNumBStr, voidt, anyt], filter: Boolean})
      guard({source: ab, target: [aNumBStr, anyt, voidt], filter: Boolean})
      guard({source: ab, target: [voidt, aNumBStr], filter: Boolean})
      guard({source: ab, target: [aNumBStr, voidt], filter: Boolean})
      guard({source: ab, target: [anyt, aNumBStr], filter: Boolean})
      guard({source: ab, target: [aNumBStr, anyt], filter: Boolean})
      guard({source: ab, target: [aNumBStr], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        "
      `)
    })
    test('unit array same (should fail)', () => {
      guard({
        source: nullableAB,
        target: [voidt, anyt, aNumBNum],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [voidt, aNumBNum, anyt],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [anyt, voidt, aNumBNum],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [anyt, aNumBNum, voidt],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [aNumBNum, voidt, anyt],
        filter: Boolean,
      })
      guard({
        source: nullableAB,
        target: [aNumBNum, anyt, voidt],
        filter: Boolean,
      })
      guard({source: nullableAB, target: [voidt, aNumBNum], filter: Boolean})
      guard({source: nullableAB, target: [aNumBNum, voidt], filter: Boolean})
      guard({source: nullableAB, target: [anyt, aNumBNum], filter: Boolean})
      guard({source: nullableAB, target: [aNumBNum, anyt], filter: Boolean})
      guard({source: nullableAB, target: [aNumBNum], filter: Boolean})
      guard({source: ab, target: [voidt, anyt, aNumBNum], filter: Boolean})
      guard({source: ab, target: [voidt, aNumBNum, anyt], filter: Boolean})
      guard({source: ab, target: [anyt, voidt, aNumBNum], filter: Boolean})
      guard({source: ab, target: [anyt, aNumBNum, voidt], filter: Boolean})
      guard({source: ab, target: [aNumBNum, voidt, anyt], filter: Boolean})
      guard({source: ab, target: [aNumBNum, anyt, voidt], filter: Boolean})
      guard({source: ab, target: [voidt, aNumBNum], filter: Boolean})
      guard({source: ab, target: [aNumBNum, voidt], filter: Boolean})
      guard({source: ab, target: [anyt, aNumBNum], filter: Boolean})
      guard({source: ab, target: [aNumBNum, anyt], filter: Boolean})
      guard({source: ab, target: [aNumBNum], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<{ a: number; b: string; } | null>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<{ a: number; b: string; }>': kind, __
        "
      `)
    })
  })
  describe('unit unit same', () => {
    test('unit unit same (should pass)', () => {
      guard({source: nullableAB, target: aNumBStr, filter: Boolean})
      guard({source: ab, target: voidt, filter: Boolean})
      guard({source: ab, target: anyt, filter: Boolean})
      guard({source: ab, target: aNumBStr, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit unit same (should fail)', () => {
      guard({source: nullableAB, target: aNumBNum, filter: Boolean})
      guard({source: ab, target: aNumBNum, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>' is not assignable to type 'Unit<{ a: number; b: string; } | null>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        "
      `)
    })
  })
  describe('tuple array wide', () => {
    test('tuple array wide (should pass)', () => {
      guard({source: [a, b], target: [voidt, anyt, lNum], filter: Boolean})
      guard({source: [a, b], target: [voidt, lNum, anyt], filter: Boolean})
      guard({source: [a, b], target: [anyt, voidt, lNum], filter: Boolean})
      guard({source: [a, b], target: [anyt, lNum, voidt], filter: Boolean})
      guard({source: [a, b], target: [lNum, voidt, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNum, anyt, voidt], filter: Boolean})
      guard({source: [a, b], target: [voidt, lNum], filter: Boolean})
      guard({source: [a, b], target: [lNum, voidt], filter: Boolean})
      guard({source: [a, b], target: [anyt, lNum], filter: Boolean})
      guard({source: [a, b], target: [lNum, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNumStr, lNum], filter: Boolean})
      guard({source: [a, b], target: [lNum, lNumStr], filter: Boolean})
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[number]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
    test('tuple array wide (should fail)', () => {
      guard({source: [a, b], target: [voidt, anyt, lStr], filter: Boolean})
      guard({source: [a, b], target: [voidt, lStr, anyt], filter: Boolean})
      guard({source: [a, b], target: [anyt, voidt, lStr], filter: Boolean})
      guard({source: [a, b], target: [anyt, lStr, voidt], filter: Boolean})
      guard({source: [a, b], target: [lStr, voidt, anyt], filter: Boolean})
      guard({source: [a, b], target: [lStr, anyt, voidt], filter: Boolean})
      guard({source: [a, b], target: [voidt, lStr], filter: Boolean})
      guard({source: [a, b], target: [lStr, voidt], filter: Boolean})
      guard({source: [a, b], target: [anyt, lStr], filter: Boolean})
      guard({source: [a, b], target: [lStr, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNumStr, lStr], filter: Boolean})
      guard({source: [a, b], target: [lStr, lNumStr], filter: Boolean})
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<[string]> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
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
  describe('object array wide', () => {
    test('object array wide (should pass)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aNum], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aNum, anyt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, voidt, aNum], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aNum, voidt], filter: Boolean})
      guard({source: {a, b}, target: [aNum, voidt, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNum, anyt, voidt], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aNum], filter: Boolean})
      guard({source: {a, b}, target: [aNum, voidt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aNum], filter: Boolean})
      guard({source: {a, b}, target: [aNum, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNum], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('object array wide (should fail)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aStr], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aStr, anyt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, voidt, aStr], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aStr, voidt], filter: Boolean})
      guard({source: {a, b}, target: [aStr, voidt, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aStr, anyt, voidt], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aStr], filter: Boolean})
      guard({source: {a, b}, target: [aStr, voidt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aStr], filter: Boolean})
      guard({source: {a, b}, target: [aStr, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBStr, aStr], filter: Boolean})
      guard({source: {a, b}, target: [aStr, aNumBStr], filter: Boolean})
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
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('tuple unit wide', () => {
    test('tuple unit wide (should pass)', () => {
      guard({source: [a, b], target: lNum, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[number]>': kind, __
        "
      `)
    })
    test('tuple unit wide (should fail)', () => {
      guard({source: [a, b], target: lStr, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[string]>': kind, __
        "
      `)
    })
  })
  describe('object unit wide', () => {
    test('object unit wide (should pass)', () => {
      guard({source: {a, b}, target: aNum, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object unit wide (should fail)', () => {
      guard({source: {a, b}, target: aStr, filter: Boolean})
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
  describe('tuple array same', () => {
    test('tuple array same (should pass)', () => {
      guard({source: [a, b], target: [voidt, anyt, lNumStr], filter: Boolean})
      guard({source: [a, b], target: [voidt, lNumStr, anyt], filter: Boolean})
      guard({source: [a, b], target: [anyt, voidt, lNumStr], filter: Boolean})
      guard({source: [a, b], target: [anyt, lNumStr, voidt], filter: Boolean})
      guard({source: [a, b], target: [lNumStr, voidt, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNumStr, anyt, voidt], filter: Boolean})
      guard({source: [a, b], target: [voidt, lNumStr], filter: Boolean})
      guard({source: [a, b], target: [lNumStr, voidt], filter: Boolean})
      guard({source: [a, b], target: [anyt, lNumStr], filter: Boolean})
      guard({source: [a, b], target: [lNumStr, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNumStr], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, string]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, string]>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('tuple array same (should fail)', () => {
      guard({source: [a, b], target: [voidt, anyt, lNumNum], filter: Boolean})
      guard({source: [a, b], target: [voidt, lNumNum, anyt], filter: Boolean})
      guard({source: [a, b], target: [anyt, voidt, lNumNum], filter: Boolean})
      guard({source: [a, b], target: [anyt, lNumNum, voidt], filter: Boolean})
      guard({source: [a, b], target: [lNumNum, voidt, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNumNum, anyt, voidt], filter: Boolean})
      guard({source: [a, b], target: [voidt, lNumNum], filter: Boolean})
      guard({source: [a, b], target: [lNumNum, voidt], filter: Boolean})
      guard({source: [a, b], target: [anyt, lNumNum], filter: Boolean})
      guard({source: [a, b], target: [lNumNum, anyt], filter: Boolean})
      guard({source: [a, b], target: [lNumNum], filter: Boolean})
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
  describe('object array same', () => {
    test('object array same (should pass)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aNumBStr], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aNumBStr, anyt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, voidt, aNumBStr], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aNumBStr, voidt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBStr, voidt, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBStr, anyt, voidt], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aNumBStr], filter: Boolean})
      guard({source: {a, b}, target: [aNumBStr, voidt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aNumBStr], filter: Boolean})
      guard({source: {a, b}, target: [aNumBStr, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBStr], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
    test('object array same (should fail)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aNumBNum], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aNumBNum, anyt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, voidt, aNumBNum], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aNumBNum, voidt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBNum, voidt, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBNum, anyt, voidt], filter: Boolean})
      guard({source: {a, b}, target: [voidt, aNumBNum], filter: Boolean})
      guard({source: {a, b}, target: [aNumBNum, voidt], filter: Boolean})
      guard({source: {a, b}, target: [anyt, aNumBNum], filter: Boolean})
      guard({source: {a, b}, target: [aNumBNum, anyt], filter: Boolean})
      guard({source: {a, b}, target: [aNumBNum], filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<unknown>': kind, __
        "
      `)
    })
  })
  describe('tuple unit same', () => {
    test('tuple unit same (should pass)', () => {
      guard({source: [a, b], target: voidt, filter: Boolean})
      guard({source: [a, b], target: anyt, filter: Boolean})
      guard({source: [a, b], target: lNumStr, filter: Boolean})
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
    test('tuple unit same (should fail)', () => {
      guard({source: [a, b], target: lNumNum, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is missing the following properties from type 'Unit<[number, number]>': kind, __
        "
      `)
    })
  })
  describe('object unit same', () => {
    test('object unit same (should pass)', () => {
      guard({source: {a, b}, target: voidt, filter: Boolean})
      guard({source: {a, b}, target: anyt, filter: Boolean})
      guard({source: {a, b}, target: aNumBStr, filter: Boolean})
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
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('object unit same (should fail)', () => {
      guard({source: {a, b}, target: aNumBNum, filter: Boolean})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; b: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; b: number; }>'.
        "
      `)
    })
  })
})
describe('fn filter', () => {
  describe('unit array wide', () => {
    test('unit array wide (should pass)', () => {
      guard({
        source: abNull,
        target: [voidt, anyt, aNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aNum, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, voidt, aNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aNum, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNum, voidt, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNum, anyt, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNum, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNum, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({source: ab, target: [voidt, anyt, aNum], filter: val => val.a > 0})
      guard({source: ab, target: [voidt, aNum, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, voidt, aNum], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, aNum, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [aNum, voidt, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [aNum, anyt, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [voidt, aNum], filter: val => val.a > 0})
      guard({source: ab, target: [aNum, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, aNum], filter: val => val.a > 0})
      guard({source: ab, target: [aNum, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [aNum], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('unit array wide (should fail)', () => {
      guard({
        source: abNull,
        target: [voidt, anyt, aStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aStr, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, voidt, aStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aStr, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aStr, voidt, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aStr, anyt, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aStr, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aStr, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBStr, aStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aStr, aNumBStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({source: ab, target: [voidt, anyt, aStr], filter: val => val.a > 0})
      guard({source: ab, target: [voidt, aStr, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, voidt, aStr], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, aStr, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [aStr, voidt, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [aStr, anyt, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [voidt, aStr], filter: val => val.a > 0})
      guard({source: ab, target: [aStr, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, aStr], filter: val => val.a > 0})
      guard({source: ab, target: [aStr, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBStr, aStr], filter: val => val.a > 0})
      guard({source: ab, target: [aStr, aNumBStr], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('unit unit wide', () => {
    test('unit unit wide (should pass)', () => {
      guard({
        source: abNull,
        target: aNum,
        filter: (val): val is AB => val.a !== null,
      })
      guard({source: ab, target: aNum, filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number | null; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: number; }' but required in type '{ a: number; b: string; }'.
        "
      `)
    })
    test('unit unit wide (should fail)', () => {
      guard({
        source: abNull,
        target: aStr,
        filter: (val): val is AB => val.a !== null,
      })
      guard({source: ab, target: aStr, filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
              Types of property '__' are incompatible.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: number | null; b: string; }'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('unit array same', () => {
    test('unit array same (should pass)', () => {
      guard({
        source: abNull,
        target: [voidt, anyt, aNumBStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aNumBStr, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, voidt, aNumBStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aNumBStr, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBStr, voidt, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBStr, anyt, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aNumBStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBStr, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aNumBStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBStr, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBStr],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: ab,
        target: [voidt, anyt, aNumBStr],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [voidt, aNumBStr, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [anyt, voidt, aNumBStr],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [anyt, aNumBStr, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [aNumBStr, voidt, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [aNumBStr, anyt, voidt],
        filter: val => val.a > 0,
      })
      guard({source: ab, target: [voidt, aNumBStr], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBStr, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, aNumBStr], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBStr, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBStr], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('unit array same (should fail)', () => {
      guard({
        source: abNull,
        target: [voidt, anyt, aNumBNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aNumBNum, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, voidt, aNumBNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aNumBNum, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBNum, voidt, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBNum, anyt, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [voidt, aNumBNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBNum, voidt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [anyt, aNumBNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBNum, anyt],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: abNull,
        target: [aNumBNum],
        filter: (val): val is AB => val.a !== null,
      })
      guard({
        source: ab,
        target: [voidt, anyt, aNumBNum],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [voidt, aNumBNum, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [anyt, voidt, aNumBNum],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [anyt, aNumBNum, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [aNumBNum, voidt, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: ab,
        target: [aNumBNum, anyt, voidt],
        filter: val => val.a > 0,
      })
      guard({source: ab, target: [voidt, aNumBNum], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBNum, voidt], filter: val => val.a > 0})
      guard({source: ab, target: [anyt, aNumBNum], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBNum, anyt], filter: val => val.a > 0})
      guard({source: ab, target: [aNumBNum], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is missing the following properties from type 'Unit<{ a: number | null; b: string; }>': kind, __
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('unit unit same', () => {
    test('unit unit same (should pass)', () => {
      guard({
        source: abNull,
        target: aNumBStr,
        filter: (val): val is AB => val.a !== null,
      })
      guard({source: ab, target: voidt, filter: val => val.a > 0})
      guard({source: ab, target: anyt, filter: val => val.a > 0})
      guard({source: ab, target: aNumBStr, filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit unit same (should fail)', () => {
      guard({
        source: abNull,
        target: aNumBNum,
        filter: (val): val is AB => val.a !== null,
      })
      guard({source: ab, target: aNumBNum, filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>' is not assignable to type 'Unit<{ a: number | null; b: string; }>'.
              The types of '__.b' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('tuple array wide', () => {
    test('tuple array wide (should pass)', () => {
      guard({
        source: [a, b],
        target: [voidt, anyt, lNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [voidt, lNum, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, voidt, lNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, lNum, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNum, voidt, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNum, anyt, voidt],
        filter: val => val[0] > 0,
      })
      guard({source: [a, b], target: [voidt, lNum], filter: val => val[0] > 0})
      guard({source: [a, b], target: [lNum, voidt], filter: val => val[0] > 0})
      guard({source: [a, b], target: [anyt, lNum], filter: val => val[0] > 0})
      guard({source: [a, b], target: [lNum, anyt], filter: val => val[0] > 0})
      guard({
        source: [a, b],
        target: [lNumStr, lNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNum, lNumStr],
        filter: val => val[0] > 0,
      })
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
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
    test('tuple array wide (should fail)', () => {
      guard({
        source: [a, b],
        target: [voidt, anyt, lStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [voidt, lStr, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, voidt, lStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, lStr, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lStr, voidt, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lStr, anyt, voidt],
        filter: val => val[0] > 0,
      })
      guard({source: [a, b], target: [voidt, lStr], filter: val => val[0] > 0})
      guard({source: [a, b], target: [lStr, voidt], filter: val => val[0] > 0})
      guard({source: [a, b], target: [anyt, lStr], filter: val => val[0] > 0})
      guard({source: [a, b], target: [lStr, anyt], filter: val => val[0] > 0})
      guard({
        source: [a, b],
        target: [lNumStr, lStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lStr, lNumStr],
        filter: val => val[0] > 0,
      })
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
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
  describe('object array wide', () => {
    test('object array wide (should pass)', () => {
      guard({
        source: {a, b},
        target: [voidt, anyt, aNum],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [voidt, aNum, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, voidt, aNum],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, aNum, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNum, voidt, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNum, anyt, voidt],
        filter: val => val.a > 0,
      })
      guard({source: {a, b}, target: [voidt, aNum], filter: val => val.a > 0})
      guard({source: {a, b}, target: [aNum, voidt], filter: val => val.a > 0})
      guard({source: {a, b}, target: [anyt, aNum], filter: val => val.a > 0})
      guard({source: {a, b}, target: [aNum, anyt], filter: val => val.a > 0})
      guard({source: {a, b}, target: [aNum], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
    test('object array wide (should fail)', () => {
      guard({
        source: {a, b},
        target: [voidt, anyt, aStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [voidt, aStr, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, voidt, aStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, aStr, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aStr, voidt, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aStr, anyt, voidt],
        filter: val => val.a > 0,
      })
      guard({source: {a, b}, target: [voidt, aStr], filter: val => val.a > 0})
      guard({source: {a, b}, target: [aStr, voidt], filter: val => val.a > 0})
      guard({source: {a, b}, target: [anyt, aStr], filter: val => val.a > 0})
      guard({source: {a, b}, target: [aStr, anyt], filter: val => val.a > 0})
      guard({
        source: {a, b},
        target: [aNumBStr, aStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aStr, aNumBStr],
        filter: val => val.a > 0,
      })
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
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple unit wide', () => {
    test('tuple unit wide (should pass)', () => {
      guard({source: [a, b], target: lNum, filter: val => val[0] > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple unit wide (should fail)', () => {
      guard({source: [a, b], target: lStr, filter: val => val[0] > 0})
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
  describe('object unit wide', () => {
    test('object unit wide (should pass)', () => {
      guard({source: {a, b}, target: aNum, filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object unit wide (should fail)', () => {
      guard({source: {a, b}, target: aStr, filter: val => val.a > 0})
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
  describe('tuple array same', () => {
    test('tuple array same (should pass)', () => {
      guard({
        source: [a, b],
        target: [voidt, anyt, lNumStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [voidt, lNumStr, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, voidt, lNumStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, lNumStr, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumStr, voidt, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumStr, anyt, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [voidt, lNumStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumStr, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, lNumStr],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumStr, anyt],
        filter: val => val[0] > 0,
      })
      guard({source: [a, b], target: [lNumStr], filter: val => val[0] > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, string]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, string]>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
    test('tuple array same (should fail)', () => {
      guard({
        source: [a, b],
        target: [voidt, anyt, lNumNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [voidt, lNumNum, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, voidt, lNumNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, lNumNum, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumNum, voidt, anyt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumNum, anyt, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [voidt, lNumNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumNum, voidt],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [anyt, lNumNum],
        filter: val => val[0] > 0,
      })
      guard({
        source: [a, b],
        target: [lNumNum, anyt],
        filter: val => val[0] > 0,
      })
      guard({source: [a, b], target: [lNumNum], filter: val => val[0] > 0})
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
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
  describe('object array same', () => {
    test('object array same (should pass)', () => {
      guard({
        source: {a, b},
        target: [voidt, anyt, aNumBStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [voidt, aNumBStr, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, voidt, aNumBStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, aNumBStr, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBStr, voidt, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBStr, anyt, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [voidt, aNumBStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBStr, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, aNumBStr],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBStr, anyt],
        filter: val => val.a > 0,
      })
      guard({source: {a, b}, target: [aNumBStr], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
    test('object array same (should fail)', () => {
      guard({
        source: {a, b},
        target: [voidt, anyt, aNumBNum],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [voidt, aNumBNum, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, voidt, aNumBNum],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, aNumBNum, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBNum, voidt, anyt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBNum, anyt, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [voidt, aNumBNum],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBNum, voidt],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [anyt, aNumBNum],
        filter: val => val.a > 0,
      })
      guard({
        source: {a, b},
        target: [aNumBNum, anyt],
        filter: val => val.a > 0,
      })
      guard({source: {a, b}, target: [aNumBNum], filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<unknown>'.
        Object is of type 'unknown'.
        "
      `)
    })
  })
  describe('tuple unit same', () => {
    test('tuple unit same (should pass)', () => {
      guard({source: [a, b], target: voidt, filter: val => val[0] > 0})
      guard({source: [a, b], target: anyt, filter: val => val[0] > 0})
      guard({source: [a, b], target: lNumStr, filter: val => val[0] > 0})
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
    test('tuple unit same (should fail)', () => {
      guard({source: [a, b], target: lNumNum, filter: val => val[0] > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object unit same', () => {
    test('object unit same (should pass)', () => {
      guard({source: {a, b}, target: voidt, filter: val => val.a > 0})
      guard({source: {a, b}, target: anyt, filter: val => val.a > 0})
      guard({source: {a, b}, target: aNumBStr, filter: val => val.a > 0})
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
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('object unit same (should fail)', () => {
      guard({source: {a, b}, target: aNumBNum, filter: val => val.a > 0})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; b: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; b: number; }>'.
        "
      `)
    })
  })
})
describe('store filter', () => {
  describe('tuple array wide', () => {
    test('tuple array wide (should pass)', () => {
      guard({source: [a, b], target: [voidt, anyt, lNum], filter: $filter})
      guard({source: [a, b], target: [voidt, lNum, anyt], filter: $filter})
      guard({source: [a, b], target: [anyt, voidt, lNum], filter: $filter})
      guard({source: [a, b], target: [anyt, lNum, voidt], filter: $filter})
      guard({source: [a, b], target: [lNum, voidt, anyt], filter: $filter})
      guard({source: [a, b], target: [lNum, anyt, voidt], filter: $filter})
      guard({source: [a, b], target: [voidt, lNum], filter: $filter})
      guard({source: [a, b], target: [lNum, voidt], filter: $filter})
      guard({source: [a, b], target: [anyt, lNum], filter: $filter})
      guard({source: [a, b], target: [lNum, anyt], filter: $filter})
      guard({source: [a, b], target: [lNumStr, lNum], filter: $filter})
      guard({source: [a, b], target: [lNum, lNumStr], filter: $filter})
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number]>)[]' is not assignable to type 'Unit<unknown>'.
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
    test('tuple array wide (should fail)', () => {
      guard({source: [a, b], target: [voidt, anyt, lStr], filter: $filter})
      guard({source: [a, b], target: [voidt, lStr, anyt], filter: $filter})
      guard({source: [a, b], target: [anyt, voidt, lStr], filter: $filter})
      guard({source: [a, b], target: [anyt, lStr, voidt], filter: $filter})
      guard({source: [a, b], target: [lStr, voidt, anyt], filter: $filter})
      guard({source: [a, b], target: [lStr, anyt, voidt], filter: $filter})
      guard({source: [a, b], target: [voidt, lStr], filter: $filter})
      guard({source: [a, b], target: [lStr, voidt], filter: $filter})
      guard({source: [a, b], target: [anyt, lStr], filter: $filter})
      guard({source: [a, b], target: [lStr, anyt], filter: $filter})
      guard({source: [a, b], target: [lNumStr, lStr], filter: $filter})
      guard({source: [a, b], target: [lStr, lNumStr], filter: $filter})
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[string]>)[]' is not assignable to type 'Unit<unknown>'.
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
  describe('object array wide', () => {
    test('object array wide (should pass)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aNum], filter: $filter})
      guard({source: {a, b}, target: [voidt, aNum, anyt], filter: $filter})
      guard({source: {a, b}, target: [anyt, voidt, aNum], filter: $filter})
      guard({source: {a, b}, target: [anyt, aNum, voidt], filter: $filter})
      guard({source: {a, b}, target: [aNum, voidt, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNum, anyt, voidt], filter: $filter})
      guard({source: {a, b}, target: [voidt, aNum], filter: $filter})
      guard({source: {a, b}, target: [aNum, voidt], filter: $filter})
      guard({source: {a, b}, target: [anyt, aNum], filter: $filter})
      guard({source: {a, b}, target: [aNum, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNum], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('object array wide (should fail)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aStr], filter: $filter})
      guard({source: {a, b}, target: [voidt, aStr, anyt], filter: $filter})
      guard({source: {a, b}, target: [anyt, voidt, aStr], filter: $filter})
      guard({source: {a, b}, target: [anyt, aStr, voidt], filter: $filter})
      guard({source: {a, b}, target: [aStr, voidt, anyt], filter: $filter})
      guard({source: {a, b}, target: [aStr, anyt, voidt], filter: $filter})
      guard({source: {a, b}, target: [voidt, aStr], filter: $filter})
      guard({source: {a, b}, target: [aStr, voidt], filter: $filter})
      guard({source: {a, b}, target: [anyt, aStr], filter: $filter})
      guard({source: {a, b}, target: [aStr, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNumBStr, aStr], filter: $filter})
      guard({source: {a, b}, target: [aStr, aNumBStr], filter: $filter})
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
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit array wide', () => {
    test('unit array wide (should pass)', () => {
      guard({source: ab, target: [voidt, anyt, aNum], filter: $filter})
      guard({source: ab, target: [voidt, aNum, anyt], filter: $filter})
      guard({source: ab, target: [anyt, voidt, aNum], filter: $filter})
      guard({source: ab, target: [anyt, aNum, voidt], filter: $filter})
      guard({source: ab, target: [aNum, voidt, anyt], filter: $filter})
      guard({source: ab, target: [aNum, anyt, voidt], filter: $filter})
      guard({source: ab, target: [voidt, aNum], filter: $filter})
      guard({source: ab, target: [aNum, voidt], filter: $filter})
      guard({source: ab, target: [anyt, aNum], filter: $filter})
      guard({source: ab, target: [aNum, anyt], filter: $filter})
      guard({source: ab, target: [aNum], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; }>[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('unit array wide (should fail)', () => {
      guard({source: ab, target: [voidt, anyt, aStr], filter: $filter})
      guard({source: ab, target: [voidt, aStr, anyt], filter: $filter})
      guard({source: ab, target: [anyt, voidt, aStr], filter: $filter})
      guard({source: ab, target: [anyt, aStr, voidt], filter: $filter})
      guard({source: ab, target: [aStr, voidt, anyt], filter: $filter})
      guard({source: ab, target: [aStr, anyt, voidt], filter: $filter})
      guard({source: ab, target: [voidt, aStr], filter: $filter})
      guard({source: ab, target: [aStr, voidt], filter: $filter})
      guard({source: ab, target: [anyt, aStr], filter: $filter})
      guard({source: ab, target: [aStr, anyt], filter: $filter})
      guard({source: ab, target: [aNumBStr, aStr], filter: $filter})
      guard({source: ab, target: [aStr, aNumBStr], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<{ a: string; }> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('tuple unit wide', () => {
    test('tuple unit wide (should pass)', () => {
      guard({source: [a, b], target: lNum, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number]>'.
        "
      `)
    })
    test('tuple unit wide (should fail)', () => {
      guard({source: [a, b], target: lStr, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[string]>'.
        "
      `)
    })
  })
  describe('object unit wide', () => {
    test('object unit wide (should pass)', () => {
      guard({source: {a, b}, target: aNum, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; }>'.
        "
      `)
    })
    test('object unit wide (should fail)', () => {
      guard({source: {a, b}, target: aStr, filter: $filter})
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
  describe('unit unit wide', () => {
    test('unit unit wide (should pass)', () => {
      guard({source: ab, target: aNum, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit unit wide (should fail)', () => {
      guard({source: ab, target: aStr, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: string; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('tuple array same', () => {
    test('tuple array same (should pass)', () => {
      guard({source: [a, b], target: [voidt, anyt, lNumStr], filter: $filter})
      guard({source: [a, b], target: [voidt, lNumStr, anyt], filter: $filter})
      guard({source: [a, b], target: [anyt, voidt, lNumStr], filter: $filter})
      guard({source: [a, b], target: [anyt, lNumStr, voidt], filter: $filter})
      guard({source: [a, b], target: [lNumStr, voidt, anyt], filter: $filter})
      guard({source: [a, b], target: [lNumStr, anyt, voidt], filter: $filter})
      guard({source: [a, b], target: [voidt, lNumStr], filter: $filter})
      guard({source: [a, b], target: [lNumStr, voidt], filter: $filter})
      guard({source: [a, b], target: [anyt, lNumStr], filter: $filter})
      guard({source: [a, b], target: [lNumStr, anyt], filter: $filter})
      guard({source: [a, b], target: [lNumStr], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<void> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type '(Event<any> | Event<[number, string]>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, string]>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<unknown>'.
              Type 'Event<[number, string]>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('tuple array same (should fail)', () => {
      guard({source: [a, b], target: [voidt, anyt, lNumNum], filter: $filter})
      guard({source: [a, b], target: [voidt, lNumNum, anyt], filter: $filter})
      guard({source: [a, b], target: [anyt, voidt, lNumNum], filter: $filter})
      guard({source: [a, b], target: [anyt, lNumNum, voidt], filter: $filter})
      guard({source: [a, b], target: [lNumNum, voidt, anyt], filter: $filter})
      guard({source: [a, b], target: [lNumNum, anyt, voidt], filter: $filter})
      guard({source: [a, b], target: [voidt, lNumNum], filter: $filter})
      guard({source: [a, b], target: [lNumNum, voidt], filter: $filter})
      guard({source: [a, b], target: [anyt, lNumNum], filter: $filter})
      guard({source: [a, b], target: [lNumNum, anyt], filter: $filter})
      guard({source: [a, b], target: [lNumNum], filter: $filter})
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
              Type '(Event<any> | Event<void> | Event<[number, number]>)[]' is not assignable to type 'Unit<unknown>'.
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
  describe('object array same', () => {
    test('object array same (should pass)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aNumBStr], filter: $filter})
      guard({source: {a, b}, target: [voidt, aNumBStr, anyt], filter: $filter})
      guard({source: {a, b}, target: [anyt, voidt, aNumBStr], filter: $filter})
      guard({source: {a, b}, target: [anyt, aNumBStr, voidt], filter: $filter})
      guard({source: {a, b}, target: [aNumBStr, voidt, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNumBStr, anyt, voidt], filter: $filter})
      guard({source: {a, b}, target: [voidt, aNumBStr], filter: $filter})
      guard({source: {a, b}, target: [aNumBStr, voidt], filter: $filter})
      guard({source: {a, b}, target: [anyt, aNumBStr], filter: $filter})
      guard({source: {a, b}, target: [aNumBStr, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNumBStr], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
    test('object array same (should fail)', () => {
      guard({source: {a, b}, target: [voidt, anyt, aNumBNum], filter: $filter})
      guard({source: {a, b}, target: [voidt, aNumBNum, anyt], filter: $filter})
      guard({source: {a, b}, target: [anyt, voidt, aNumBNum], filter: $filter})
      guard({source: {a, b}, target: [anyt, aNumBNum, voidt], filter: $filter})
      guard({source: {a, b}, target: [aNumBNum, voidt, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNumBNum, anyt, voidt], filter: $filter})
      guard({source: {a, b}, target: [voidt, aNumBNum], filter: $filter})
      guard({source: {a, b}, target: [aNumBNum, voidt], filter: $filter})
      guard({source: {a, b}, target: [anyt, aNumBNum], filter: $filter})
      guard({source: {a, b}, target: [aNumBNum, anyt], filter: $filter})
      guard({source: {a, b}, target: [aNumBNum], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<unknown>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<unknown>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<unknown>'.
                Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<unknown>'.
        "
      `)
    })
  })
  describe('unit array same', () => {
    test('unit array same (should pass)', () => {
      guard({source: ab, target: [voidt, anyt, aNumBStr], filter: $filter})
      guard({source: ab, target: [voidt, aNumBStr, anyt], filter: $filter})
      guard({source: ab, target: [anyt, voidt, aNumBStr], filter: $filter})
      guard({source: ab, target: [anyt, aNumBStr, voidt], filter: $filter})
      guard({source: ab, target: [aNumBStr, voidt, anyt], filter: $filter})
      guard({source: ab, target: [aNumBStr, anyt, voidt], filter: $filter})
      guard({source: ab, target: [voidt, aNumBStr], filter: $filter})
      guard({source: ab, target: [aNumBStr, voidt], filter: $filter})
      guard({source: ab, target: [anyt, aNumBStr], filter: $filter})
      guard({source: ab, target: [aNumBStr, anyt], filter: $filter})
      guard({source: ab, target: [aNumBStr], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: string; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: string; }>[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('unit array same (should fail)', () => {
      guard({source: ab, target: [voidt, anyt, aNumBNum], filter: $filter})
      guard({source: ab, target: [voidt, aNumBNum, anyt], filter: $filter})
      guard({source: ab, target: [anyt, voidt, aNumBNum], filter: $filter})
      guard({source: ab, target: [anyt, aNumBNum, voidt], filter: $filter})
      guard({source: ab, target: [aNumBNum, voidt, anyt], filter: $filter})
      guard({source: ab, target: [aNumBNum, anyt, voidt], filter: $filter})
      guard({source: ab, target: [voidt, aNumBNum], filter: $filter})
      guard({source: ab, target: [aNumBNum, voidt], filter: $filter})
      guard({source: ab, target: [anyt, aNumBNum], filter: $filter})
      guard({source: ab, target: [aNumBNum, anyt], filter: $filter})
      guard({source: ab, target: [aNumBNum], filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<void> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type '(Event<any> | Event<{ a: number; b: number; }>)[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>[]' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
  describe('tuple unit same', () => {
    test('tuple unit same (should pass)', () => {
      guard({source: [a, b], target: voidt, filter: $filter})
      guard({source: [a, b], target: anyt, filter: $filter})
      guard({source: [a, b], target: lNumStr, filter: $filter})
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
    test('tuple unit same (should fail)', () => {
      guard({source: [a, b], target: lNumNum, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '(Store<number> | Store<string>)[]' is not assignable to type 'Unit<[number, number]>'.
        "
      `)
    })
  })
  describe('object unit same', () => {
    test('object unit same (should pass)', () => {
      guard({source: {a, b}, target: voidt, filter: $filter})
      guard({source: {a, b}, target: anyt, filter: $filter})
      guard({source: {a, b}, target: aNumBStr, filter: $filter})
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
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; b: string; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
    test('object unit same (should fail)', () => {
      guard({source: {a, b}, target: aNumBNum, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type '{ a: Store<number>; b: Store<string>; }' is not assignable to type 'Unit<{ a: number; b: number; }>'.
              Object literal may only specify known properties, and 'a' does not exist in type 'Unit<{ a: number; b: number; }>'.
        "
      `)
    })
  })
  describe('unit unit same', () => {
    test('unit unit same (should pass)', () => {
      guard({source: ab, target: voidt, filter: $filter})
      guard({source: ab, target: anyt, filter: $filter})
      guard({source: ab, target: aNumBStr, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('unit unit same (should fail)', () => {
      guard({source: ab, target: aNumBNum, filter: $filter})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          The last overload gave the following error.
            Type 'Event<{ a: number; b: number; }>' is not assignable to type 'Unit<{ a: number; b: string; }>'.
        "
      `)
    })
  })
})
