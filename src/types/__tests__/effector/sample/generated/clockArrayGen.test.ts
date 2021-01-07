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
    describe('plain, fnClock', () => {
      test('plain, fnClock, single [voidt] (should pass)', () => {
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
      test('plain, fnClock, single [stringt] (should pass)', () => {
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
      test('plain, fnClock [voidt, stringt] (should pass)', () => {
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
      test('plain, fnClock [stringt, voidt] (should pass)', () => {
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
    describe('plain, typedFn', () => {
      test('plain, typedFn, single [voidt] (should pass)', () => {
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
      test('plain, typedFn, single [stringt] (should pass)', () => {
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
      test('plain, typedFn [voidt, stringt] (should pass)', () => {
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
      test('plain, typedFn [stringt, voidt] (should pass)', () => {
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
    describe('plain, fnClock, typedFn', () => {
      test('plain, fnClock, typedFn, single [voidt] (should pass)', () => {
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
      test('plain, fnClock, typedFn, single [stringt] (should pass)', () => {
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
      test('plain, fnClock, typedFn [voidt, stringt] (should pass)', () => {
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
      test('plain, fnClock, typedFn [stringt, voidt] (should pass)', () => {
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
    describe('plain, fnClock, unificationToAny', () => {
      test('plain, fnClock, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
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
      test('plain, fnClock, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
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
      test('plain, fnClock, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
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
      test('plain, fnClock, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
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
      test('plain, fnClock, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
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
      test('plain, fnClock, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
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
    describe('plain, typedFn, unificationToAny', () => {
      test('plain, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
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
      test('plain, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
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
      test('plain, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
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
      test('plain, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
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
      test('plain, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
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
      test('plain, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
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
    describe('plain, fnClock, typedFn, unificationToAny', () => {
      test('plain, fnClock, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
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
      test('plain, fnClock, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
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
      test('plain, fnClock, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
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
      test('plain, fnClock, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
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
      test('plain, fnClock, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
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
      test('plain, fnClock, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
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
    describe('combinable, fnClock', () => {
      test('combinable, fnClock, single [voidt] (should pass)', () => {
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
      test('combinable, fnClock, single [stringt] (should pass)', () => {
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
      test('combinable, fnClock [voidt, stringt] (should pass)', () => {
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
      test('combinable, fnClock [stringt, voidt] (should pass)', () => {
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
    describe('combinable, typedFn', () => {
      test('combinable, typedFn, single [voidt] (should pass)', () => {
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
      test('combinable, typedFn, single [stringt] (should pass)', () => {
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
      test('combinable, typedFn [voidt, stringt] (should pass)', () => {
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
      test('combinable, typedFn [stringt, voidt] (should pass)', () => {
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
    describe('combinable, fnClock, typedFn', () => {
      test('combinable, fnClock, typedFn, single [voidt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn, single [stringt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn [voidt, stringt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn [stringt, voidt] (should pass)', () => {
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
    describe('combinable, fnClock, unificationToAny', () => {
      test('combinable, fnClock, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
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
      test('combinable, fnClock, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
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
      test('combinable, fnClock, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
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
      test('combinable, fnClock, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
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
      test('combinable, fnClock, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
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
      test('combinable, fnClock, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
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
    describe('combinable, typedFn, unificationToAny', () => {
      test('combinable, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
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
      test('combinable, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
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
      test('combinable, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
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
      test('combinable, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
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
      test('combinable, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
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
      test('combinable, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
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
    describe('combinable, fnClock, typedFn, unificationToAny', () => {
      test('combinable, fnClock, typedFn, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
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
      test('combinable, fnClock, typedFn, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Index signature is missing in type 'Store<string>'.
                    Type 'Event<string>' is not assignable to type 'Unit<void>'.
                      Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Index signature is missing in type 'Store<string>'.
                    Type 'Event<string>' is not assignable to type 'Unit<void>'.
                      Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Index signature is missing in type 'Store<string>'.
                    Type 'Event<string>' is not assignable to type 'Unit<void>'.
                      Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string) => { a: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string, clock: any) => { a: string; clock: any; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string, clock: any) => { a: string; clock: any; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string, clock: any) => { a: string; clock: any; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string, clock: any) => { a: string; clock: any; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string, clock: any) => { a: string; clock: any; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<string>' is not assignable to type 'Unit<void>'.
                    Type '(a: string, clock: any) => { a: string; clock: any; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: void) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                      Types of parameters 'a' and 'source' are incompatible.
                        Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                          Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<void>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Store<string>' is not assignable to type 'Combinable'.
                Type 'Store<string>' is not assignable to type '{ [key: string]: Store<any>; }'.
                  Type 'Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<void>' is not assignable to type 'Unit<string>'.
                      Type '(a: string, clock: string) => { a: string; clock: string; }' is not assignable to type '(source: any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>, clock: string) => { a: string; clock: any; }'.
                        Types of parameters 'a' and 'source' are incompatible.
                          Type 'any[] | [any] | GetCombinedValue<{ [key: string]: Store<any>; }>' is not assignable to type 'string'.
                            Type 'any[]' is not assignable to type 'string'.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>' is not assignable to type 'Unit<void>'.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
          Binding element 'a' implicitly has an 'any' type.
          Binding element 'b' implicitly has an 'any' type.
          Parameter 'clock' implicitly has an 'any' type.
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
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<void>' is not assignable to type 'Unit<string>'.
                Type 'Event<number>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
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
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
          "
        `)
      })
    })
  })
})
