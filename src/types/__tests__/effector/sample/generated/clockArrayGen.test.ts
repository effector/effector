/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'
const typecheck = '{global}'
describe('plain source', () => {
  describe('plain', () => {
    test('plain, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
  describe('plain, fn', () => {
    test('plain, fn, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
  describe('plain, fn, secondArgument', () => {
    test('plain, fn, secondArgument, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, single [stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, secondArgument [voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, secondArgument [stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
  describe('plain, fn, explicitArgumentTypes', () => {
    test('plain, fn, explicitArgumentTypes, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes, single [stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes [voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes [stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
  describe('plain, fn, secondArgument, explicitArgumentTypes', () => {
    test('plain, fn, secondArgument, explicitArgumentTypes, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes, single [stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes [voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes [stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
  describe('plain, fn, secondArgument, unificationToAny', () => {
    test('plain, fn, secondArgument, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
  describe('plain, fn, explicitArgumentTypes, unificationToAny', () => {
    test('plain, fn, explicitArgumentTypes, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, explicitArgumentTypes, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
  describe('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny', () => {
    test('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
    test('plain, fn, secondArgument, explicitArgumentTypes, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
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
})
describe('combinable source', () => {
  describe('combinable', () => {
    test('combinable, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn', () => {
    test('combinable, fn, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn, secondArgument', () => {
    test('combinable, fn, secondArgument, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, single [stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument [voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument [stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn, explicitArgumentTypes', () => {
    test('combinable, fn, explicitArgumentTypes, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes, single [stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes [voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes [stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn, secondArgument, explicitArgumentTypes', () => {
    test('combinable, fn, secondArgument, explicitArgumentTypes, single [voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes, single [stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes [voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes [stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn, secondArgument, unificationToAny', () => {
    test('combinable, fn, secondArgument, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn, explicitArgumentTypes, unificationToAny', () => {
    test('combinable, fn, explicitArgumentTypes, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, explicitArgumentTypes, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
  describe('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny', () => {
    test('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny [anyt, voidt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny [anyt, stringt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny [voidt, anyt, stringt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny [voidt, stringt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny [stringt, anyt, voidt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
    test('combinable, fn, secondArgument, explicitArgumentTypes, unificationToAny [stringt, voidt, anyt] (should pass)', () => {
      const voidt = createEvent()
      const stringt = createEvent<string>()
      const anyt = createEvent<any>()
      const a = createStore('')
      const b = createStore(0)
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
})
