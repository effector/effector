/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Event} from 'effector'

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
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '({ a }: { a: number; }, clock: any) => { a: number; clock: any; }' is not assignable to type '(src: { readonly a: string; }, clk: any) => any'.
        Types of parameters '__0' and 'src' are incompatible.
          Type '{ readonly a: string; }' is not assignable to type '{ a: number; }'.
            Types of property 'a' are incompatible.
              Type 'string' is not assignable to type 'number'.
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
      Type '({ a, b }: any, clock: string) => { a: any; b: any; clock: string; }' is not assignable to type '(src: { a: string; b: string; }, clk: string | void) => any'.
        Types of parameters 'clock' and 'clk' are incompatible.
          Type 'string | void' is not assignable to type 'string'.
            Type 'void' is not assignable to type 'string'.
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

    const target1 = sample({
      source,
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
    })
    const target2: Event<{a: string; b: string; clock: any}> = sample({
      source,
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
    })
    const target3: Event<{a: string; b: string; clock: any}> = sample({
      source,
      clock: [clockA, clockB, clockC],
      fn: ({a, b}: {a: string; b: string}, clock: any) => ({a, b, clock}),
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

    const target1 = sample({
      source: {a, b},
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
    })
    const target2: Event<{a: string; b: string; clock: any}> = sample({
      source: {a, b},
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
    })
    const target3: Event<{a: string; b: string; clock: any}> = sample({
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
      lack of expected error at test line 10 'fn: ({a}: {a: number}, clock: any) => ({a, clock}),'
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
      lack of expected error at test line 9 'fn: ({a, b}: any, clock: string) => ({a, b, clock}),'
      "
    `)
  })
})
