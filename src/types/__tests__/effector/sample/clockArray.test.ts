/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  Store,
  Event,
  guard,
} from 'effector'

const typecheck = '{global}'

describe('with target', () => {
  it('without fn (should pass)', () => {
    const target = createEvent<{a: string; b: string}>()
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source,
      clock: [clockA, clockB, clockC],
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('without fn with combinable source (should pass)', () => {
    const target = createEvent<{a: string; b: string}>()
    const a = createStore('')
    const b = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source: {a, b},
      clock: [clockA, clockB, clockC],
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('with fn (should pass)', () => {
    const target = createEvent<{a: string; b: string; clock: any}>()
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source,
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  describe('with fn and combinable source (should pass)', () => {
    describe('with explicitly typed arguments', () => {
      describe('with second argument in fn', () => {
        test('with unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string; clock: any}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockB = createEvent<any>()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockB, clockC],
            fn: ({a, b}: {a: string; b: string}, clock: any) => ({a, b, clock}),
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('without unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string; clock: any}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockC],
            fn: ({a, b}: {a: string; b: string}, clock: any) => ({a, b, clock}),
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
      })
      describe('without second argument in fn', () => {
        test('with unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockB = createEvent<any>()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockB, clockC],
            fn: ({a, b}: {a: string; b: string}) => ({a, b}),
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('without unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockC],
            fn: ({a, b}: {a: string; b: string}) => ({a, b}),
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
    describe('with implicitly typed arguments', () => {
      describe('with second argument in fn', () => {
        test('with unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string; clock: any}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockB = createEvent<any>()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockB, clockC],
            fn: ({a, b}, clock) => ({a, b, clock}),
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('without unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string; clock: any}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockC],
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
      describe('without second argument in fn', () => {
        test('with unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockB = createEvent<any>()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockB, clockC],
            fn: ({a, b}) => ({a, b}),
            target,
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('without unification to any (should pass)', () => {
          const target = createEvent<{a: string; b: string}>()
          const a = createStore('')
          const b = createStore('')
          const clockA = createEvent()
          const clockC = createEvent<string>()

          sample({
            source: {a, b},
            clock: [clockA, clockC],
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
    })
  })
  test('detect incorrect arguments in fn with combinable source (should fail)', () => {
    const target = createEvent<{a: string; clock: any}>()
    const a = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source: {a},
      clock: [clockA, clockB, clockC],
      //@ts-expect-error
      fn: ({a}: {a: number}, clock: any) => ({a, clock}),
      //@ts-expect-error
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: { a: number; }, clock: any) => { a: number; clock: any; }' is not assignable to type '(source: { a: string; }, clock: any) => { a: number; clock: any; }'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: string; }' is not assignable to type '{ a: number; }'.
                Types of property 'a' are incompatible.
                  Type 'string' is not assignable to type 'number'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: { a: number; }, clock: any) => { a: number; clock: any; }' is not assignable to type '(source: { a: string; }, clock: any) => { a: number; clock: any; }'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: string; }' is not assignable to type '{ a: number; }'.
                Types of property 'a' are incompatible.
                  Type 'string' is not assignable to type 'number'.
                    Type 'Event<{ a: string; clock: any; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
                      Type 'Event<{ a: string; clock: any; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      "
    `)
  })
  test('detect too wide type of clocks (should fail)', () => {
    const target = createEvent<{a: string; b: string; clock: string}>()
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockC = createEvent<string>()

    sample({
      source,
      clock: [clockA, clockC],
      //@ts-expect-error
      fn: ({a, b}: any, clock: string) => ({a, b, clock}),
      //@ts-expect-error
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type 'string'.
                Type 'Event<{ a: string; b: string; clock: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
                  Type 'Event<{ a: string; b: string; clock: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
            Types of property '__' are incompatible.
              Type 'void' is not assignable to type 'string'.
                Type 'Event<{ a: string; b: string; clock: string; }>' is not assignable to type '\\"non-unit item in target array\\"[] | [\\"non-unit item in target array\\"]'.
                  Type 'Event<{ a: string; b: string; clock: string; }>' is not assignable to type '[\\"non-unit item in target array\\"]'.
      "
    `)
  })
})

describe('without target', () => {
  it('without fn (should pass)', () => {
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    const target: Event<{a: string; b: string}> = sample({
      source,
      clock: [clockA, clockB, clockC],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('without fn with combinable source (should pass)', () => {
    const a = createStore('')
    const b = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    const target: Event<{a: string; b: string}> = sample({
      source: {a, b},
      clock: [clockA, clockB, clockC],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('with fn (should pass)', () => {
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    const target: Event<{a: string; b: string; clock: any}> = sample({
      source,
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('with fn and combinable source (should pass)', () => {
    const a = createStore('')
    const b = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    const target: Event<{a: string; b: string; clock: any}> = sample({
      source: {a, b},
      clock: [clockA, clockB, clockC],
      fn: ({a, b}: {a: string; b: string}, clock: any) => ({a, b, clock}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('should detect incorrect arguments in fn with combinable source (should fail)', () => {
    const a = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    const target: Event<{a: string; clock: any}> = sample({
      source: {a},
      clock: [clockA, clockB, clockC],
      //@ts-expect-error
      fn: ({a}: {a: number}, clock: any) => ({a, clock}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<unknown>' is missing the following properties from type 'Event<{ a: string; clock: any; }>': filter, filterMap, prepend, getType
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: { a: number; }, clock: any) => { a: number; clock: any; }' is not assignable to type '(source: { a: string; }, clock: any) => { a: number; clock: any; }'.
            Types of parameters '__0' and 'source' are incompatible.
              Type '{ a: string; }' is not assignable to type '{ a: number; }'.
                Types of property 'a' are incompatible.
                  Type 'string' is not assignable to type 'number'.
      "
    `)
  })
  it('should detect too wide type of clocks (should fail)', () => {
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockC = createEvent<string>()

    const target: Event<{a: string; b: string; clock: string}> = sample({
      source,
      clock: [clockA, clockC],
      //@ts-expect-error
      fn: ({a, b}: any, clock: string) => ({a, b, clock}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<unknown>' is missing the following properties from type 'Event<{ a: string; b: string; clock: string; }>': filter, filterMap, prepend, getType
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<void>' is not assignable to type 'Unit<string>'.
      "
    `)
  })
})
