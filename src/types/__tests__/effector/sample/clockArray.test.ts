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
  it('support clock array in cases without fn (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('support clock array in cases without fn with combinable source (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('support clock array in cases with fn (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('support clock array in cases with fn and combinable source (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('shoudl detect incorrect arguments in fn with combinable source (should fail)', () => {
    const target = createEvent<{a: string; clock: any}>()
    const a = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source: {a},
      clock: [clockA, clockB, clockC],
      fn: ({a}: {a: number}, clock: any) => ({a, clock}),
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: { a: number; }, clock: any) => { a: number; clock: any; }' is not assignable to type '(source: GetCombinedValue<{ a: Store<string>; }>, clock: any) => { a: string; clock: any; }'.
            Types of parameters '__0' and 'source' are incompatible.
              Type 'GetCombinedValue<{ a: Store<string>; }>' is not assignable to type '{ a: number; }'.
                Types of property 'a' are incompatible.
                  Type 'string' is not assignable to type 'number'.
      "
    `)
  })
  it('should detect too wide type of clocks (should fail)', () => {
    const target = createEvent<{a: string; b: string; clock: string}>()
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockC = createEvent<string>()

    sample({
      source,
      clock: [clockA, clockC],
      fn: ({a, b}: any, clock: string) => ({a, b, clock}),
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
                  Types of property '__' are incompatible.
                    Type 'void' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
                  Types of property '__' are incompatible.
                    Type 'void' is not assignable to type 'string'.
      "
    `)
  })
})

describe('without target', () => {
  it('support clock array in cases without fn (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('support clock array in cases without fn with combinable source (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('support clock array in cases with fn (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('support clock array in cases with fn and combinable source (should pass)', () => {
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
      --typescript--
      no errors
      "
    `)
  })
  it('shoudl detect incorrect arguments in fn with combinable source (should fail)', () => {
    const a = createStore('')
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    const target: Event<{a: string; clock: any}> = sample({
      source: {a},
      clock: [clockA, clockB, clockC],
      fn: ({a}: {a: number}, clock: any) => ({a, clock}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Unit<{ a: string; clock: any; }>' is missing the following properties from type 'Event<{ a: string; clock: any; }>': watch, map, filter, filterMap, and 7 more.
      No overload matches this call.
        The last overload gave the following error.
          Type '({ a }: { a: number; }, clock: any) => { a: number; clock: any; }' is not assignable to type '(source: GetCombinedValue<{ a: Store<string>; }>, clock: any) => { a: string; clock: any; }'.
            Types of parameters '__0' and 'source' are incompatible.
              Type 'GetCombinedValue<{ a: Store<string>; }>' is not assignable to type '{ a: number; }'.
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
      fn: ({a, b}: any, clock: string) => ({a, b, clock}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Unit<{ a: string; b: string; clock: string; }>' is missing the following properties from type 'Event<{ a: string; b: string; clock: string; }>': watch, map, filter, filterMap, and 7 more.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type 'Event<void>' is not assignable to type 'Unit<string>'.
      "
    `)
  })
})
