/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'

const voidt = createEvent()
const anyt = createEvent<any>()
const stringt = createEvent<string>()
const numt = createEvent<number>()
const a = createStore('')
const b = createStore(0)

describe('no fn', () => {
  describe('plain source', () => {
    describe('plain', () => {
      test('plain, single [voidt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, single [stringt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain [voidt, stringt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [voidt, stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain [stringt, voidt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [stringt, voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, unificationToAny', () => {
      test('plain, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [anyt, voidt, stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [anyt, stringt, voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [voidt, anyt, stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [voidt, stringt, anyt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [stringt, anyt, voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<string>()
        sample({
          source: a,
          clock: [stringt, voidt, anyt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
  })
  describe('combinable source', () => {
    describe('combinable', () => {
      test('combinable, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, unificationToAny', () => {
      test('combinable, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, stringt, voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, stringt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt, anyt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, anyt, voidt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt, anyt],
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
  })
})
describe('fn', () => {
  describe('plain source', () => {
    describe('plain, fn', () => {
      test('plain, fn, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, stringt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, voidt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, fnClock', () => {
      test('plain, fn, fnClock, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, stringt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Parameter 'a' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
          "
        `)
      })
      test('plain, fn, fnClock [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt, voidt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Parameter 'a' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
          "
        `)
      })
    })
    describe('plain, fn, typedFn', () => {
      test('plain, fn, typedFn, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, stringt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, voidt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, fnClock, typedFn', () => {
      test('plain, fn, fnClock, typedFn, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, stringt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt, voidt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, unificationToAny', () => {
      test('plain, fn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [anyt, voidt, stringt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [anyt, stringt, voidt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, anyt, stringt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, stringt, anyt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, anyt, voidt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, voidt, anyt],
          fn: a => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, fnClock, unificationToAny', () => {
      test('plain, fn, fnClock, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [anyt, voidt, stringt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [anyt, stringt, voidt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, anyt, stringt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, stringt, anyt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt, anyt, voidt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt, voidt, anyt],
          fn: (a, clock) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, typedFn, unificationToAny', () => {
      test('plain, fn, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [anyt, voidt, stringt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [anyt, stringt, voidt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, anyt, stringt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, stringt, anyt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, anyt, voidt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, voidt, anyt],
          fn: (a: string) => ({a}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, fnClock, typedFn, unificationToAny', () => {
      test('plain, fn, fnClock, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [anyt, voidt, stringt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [anyt, stringt, voidt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, anyt, stringt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, stringt, anyt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt, anyt, voidt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [stringt, voidt, anyt],
          fn: (a: string, clock: any) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, fnClock, typedFn, assertFnType', () => {
      test('plain, fn, fnClock, typedFn, assertFnType, single [voidt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Index signature is missing in type 'Store<string>'.
                    Type 'Event<void>[]' is missing the following properties from type 'Unit<any>': kind, __
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Index signature is missing in type 'Store<string>'.
                    Type 'Event<void>[]' is missing the following properties from type 'Unit<any>': kind, __
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Index signature is missing in type 'Store<string>'.
                    Type 'Event<void>[]' is missing the following properties from type 'Unit<any>': kind, __
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                        Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, assertFnType, single [numt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [numt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type 'Event<number>[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type 'Event<number>[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type 'Event<number>[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, assertFnType [voidt, numt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, numt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, assertFnType [numt, voidt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [numt, voidt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
    })
    describe('plain, fn, fnClock, typedFn, unificationToAny, assertFnType', () => {
      test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType [anyt, voidt, numt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [anyt, voidt, numt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is missing the following properties from type 'Unit<any>': kind, __
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType [anyt, numt, voidt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [anyt, numt, voidt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType [voidt, anyt, numt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, anyt, numt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType [voidt, numt, anyt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [voidt, numt, anyt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType [numt, anyt, voidt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [numt, anyt, voidt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('plain, fn, fnClock, typedFn, unificationToAny, assertFnType [numt, voidt, anyt] (should fail)', () => {
        const target = createEvent<{a: string; clock: any}>()
        sample({
          source: a,
          clock: [numt, voidt, anyt],
          fn: (a: string, clock: string) => ({a, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'CombineSource<any>'.
                Type 'Store<string>' is not assignable to type '{ [x: string]: Store<any>; }'.
                  Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
    })
    describe('plain, fn, fnWithoutArgs', () => {
      test('plain, fn, fnWithoutArgs, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnWithoutArgs, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnWithoutArgs [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, stringt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, fnWithoutArgs [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, voidt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('plain, fn, unificationToAny, fnWithoutArgs', () => {
      test('plain, fn, unificationToAny, fnWithoutArgs [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [anyt, voidt, stringt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny, fnWithoutArgs [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [anyt, stringt, voidt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny, fnWithoutArgs [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, anyt, stringt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny, fnWithoutArgs [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [voidt, stringt, anyt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny, fnWithoutArgs [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, anyt, voidt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('plain, fn, unificationToAny, fnWithoutArgs [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string}>()
        sample({
          source: a,
          clock: [stringt, voidt, anyt],
          fn: () => ({a: ''}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
  })
  describe('combinable source', () => {
    describe('combinable, fn', () => {
      test('combinable, fn, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, fnClock', () => {
      test('combinable, fn, fnClock, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
          "
        `)
      })
      test('combinable, fn, fnClock [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
          "
        `)
      })
    })
    describe('combinable, fn, typedFn', () => {
      test('combinable, fn, typedFn, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, fnClock, typedFn', () => {
      test('combinable, fn, fnClock, typedFn, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, unificationToAny', () => {
      test('combinable, fn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, stringt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, stringt, voidt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, stringt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt, anyt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, anyt, voidt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt, anyt],
          fn: ({a, b}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, fnClock, unificationToAny', () => {
      test('combinable, fn, fnClock, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, stringt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [anyt, stringt, voidt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, stringt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt, anyt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt, anyt, voidt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt, anyt],
          fn: ({a, b}, clock) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, typedFn, unificationToAny', () => {
      test('combinable, fn, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, stringt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, stringt, voidt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, stringt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt, anyt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, anyt, voidt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt, anyt],
          fn: ({a, b}: {a: string; b: number}) => ({a, b}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, fnClock, typedFn, unificationToAny', () => {
      test('combinable, fn, fnClock, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, stringt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [anyt, stringt, voidt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, stringt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt, anyt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt, anyt, voidt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt, anyt],
          fn: ({a, b}: {a: string; b: number}, clock: any) => ({a, b, clock}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, fnClock, typedFn, assertFnType', () => {
      test('combinable, fn, fnClock, typedFn, assertFnType, single [voidt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<void>[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<void>[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, assertFnType, single [numt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [numt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, assertFnType [voidt, numt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, numt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, assertFnType [numt, voidt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [numt, voidt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
    })
    describe('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType', () => {
      test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType [anyt, voidt, numt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, numt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType [anyt, numt, voidt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [anyt, numt, voidt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType [voidt, anyt, numt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, numt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType [voidt, numt, anyt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [voidt, numt, anyt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType [numt, anyt, voidt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [numt, anyt, voidt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
      test('combinable, fn, fnClock, typedFn, unificationToAny, assertFnType [numt, voidt, anyt] (should fail)', () => {
        const target = createEvent<{a: string; b: number; clock: any}>()
        sample({
          source: {a, b},
          clock: [numt, voidt, anyt],
          fn: ({a, b}: {a: string; b: number}, clock: string) => ({
            a,
            b,
            clock,
          }),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<any> | Event<void> | Event<number>)[]' is not assignable to type 'Unit<any>'.
                Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: number; clock: any; }>' is not assignable to type '[Unit<any>]'.
          "
        `)
      })
    })
    describe('combinable, fn, fnWithoutArgs', () => {
      test('combinable, fn, fnWithoutArgs, single [voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnWithoutArgs, single [stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnWithoutArgs [voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, fnWithoutArgs [stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
    describe('combinable, fn, unificationToAny, fnWithoutArgs', () => {
      test('combinable, fn, unificationToAny, fnWithoutArgs [anyt, voidt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, voidt, stringt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny, fnWithoutArgs [anyt, stringt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [anyt, stringt, voidt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny, fnWithoutArgs [voidt, anyt, stringt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, anyt, stringt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny, fnWithoutArgs [voidt, stringt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [voidt, stringt, anyt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny, fnWithoutArgs [stringt, anyt, voidt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, anyt, voidt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
      test('combinable, fn, unificationToAny, fnWithoutArgs [stringt, voidt, anyt] (should pass)', () => {
        const target = createEvent<{a: string; b: number}>()
        sample({
          source: {a, b},
          clock: [stringt, voidt, anyt],
          fn: () => ({a: '', b: 2}),
          target,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
          "
        `)
      })
    })
  })
})
