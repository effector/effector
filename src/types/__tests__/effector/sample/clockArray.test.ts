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
      Argument of type '{ source: Store<{ a: string; b: string; }>; clock: (Event<any> | Event<void> | Event<string>)[]; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      Argument of type '{ source: Store<{ a: string; b: string; }>; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: any; b: any; }, clock: any) => { a: any; b: any; clock: any; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: string; b: string; }, clock: any) => { a: string; b: string; clock: any; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<void> | Event<string>)[]; fn: ({ a, b }: { a: string; b: string; }, clock: any) => { a: string; b: string; clock: any; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: string; b: string; }) => { a: string; b: string; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<void> | Event<string>)[]; fn: ({ a, b }: { a: string; b: string; }) => { a: string; b: string; }; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: any; b: any; }, clock: any) => { a: any; b: any; clock: any; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
            Binding element 'a' implicitly has an 'any' type.
            Binding element 'b' implicitly has an 'any' type.
            Parameter 'clock' implicitly has an 'any' type.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<void> | Event<string>)[]; fn: ({ a, b }: { a: any; b: any; }, clock: any) => { a: any; b: any; clock: any; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
            Binding element 'a' implicitly has an 'any' type.
            Binding element 'b' implicitly has an 'any' type.
            Parameter 'clock' implicitly has an 'any' type.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: any; b: any; }) => { a: any; b: any; }; target: Event<...>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
            Binding element 'a' implicitly has an 'any' type.
            Binding element 'b' implicitly has an 'any' type.
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
            Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<void> | Event<string>)[]; fn: ({ a, b }: { a: any; b: any; }) => { a: any; b: any; }; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
              Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
            Binding element 'a' implicitly has an 'any' type.
            Binding element 'b' implicitly has an 'any' type.
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
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: { a: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a }: { a: number; }, clock: any) => { a: number; clock: any; }; target: Event<{ a: string; clock: any; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Store<{ a: string; b: string; }>; clock: (Event<void> | Event<string>)[]; fn: ({ a, b }: any, clock: string) => { a: any; b: any; clock: string; }; target: Event<{ a: string; b: string; clock: string; }>; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
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
      Type 'void' is not assignable to type 'Event<{ a: string; b: string; }>'.
      Argument of type '{ source: Store<{ a: string; b: string; }>; clock: (Event<any> | Event<void> | Event<string>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      Type 'void' is not assignable to type 'Event<{ a: string; b: string; }>'.
      Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      Type 'void' is not assignable to type 'Event<{ a: string; b: string; clock: any; }>'.
      Argument of type '{ source: Store<{ a: string; b: string; }>; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: any; b: any; }, clock: any) => { a: any; b: any; clock: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
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
      Type 'void' is not assignable to type 'Event<{ a: string; b: string; clock: any; }>'.
      Argument of type '{ source: { a: Store<string>; b: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a, b }: { a: string; b: string; }, clock: any) => { a: string; b: string; clock: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      Type 'void' is not assignable to type 'Event<{ a: string; clock: any; }>'.
      Argument of type '{ source: { a: Store<string>; }; clock: (Event<any> | Event<void> | Event<string>)[]; fn: ({ a }: { a: number; }, clock: any) => { a: number; clock: any; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<any> | Event<void> | Event<string>)[]; }'.
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
      Type 'void' is not assignable to type 'Event<{ a: string; b: string; clock: string; }>'.
      Argument of type '{ source: Store<{ a: string; b: string; }>; clock: (Event<void> | Event<string>)[]; fn: ({ a, b }: any, clock: string) => { a: any; b: any; clock: string; }; }' is not assignable to parameter of type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"clock should be units\\"; got: (Event<void> | Event<string>)[]; }'.
      "
    `)
  })
})
