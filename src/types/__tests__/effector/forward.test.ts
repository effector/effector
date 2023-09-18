/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  Event,
  forward,
  EventCallable,
} from 'effector'

const typecheck = '{global}'

test('forward between events', () => {
  const forward_event1 = createEvent<number>()
  const forward_event2 = createEvent<number>()
  forward({
    from: forward_event1,
    to: forward_event2,
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
describe('forward between effects', () => {
  test('start in parallel with the same payload', () => {
    const forward_effect_par1 = createEffect<number, string, string>()
    const forward_effect_par2 = createEffect<number, string, string>()
    forward({
      from: forward_effect_par1,
      to: forward_effect_par2,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('start sequentially', () => {
    const forward_effect_seq1 = createEffect<number, string, string>()
    const forward_effect_seq2 = createEffect<string, boolean, boolean>()
    forward({
      from: forward_effect_seq1.done.map(({result}) => result),
      to: forward_effect_seq2,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('forward between stores (should pass)', () => {
  const e = createStore(0)
  const f = createStore(0)
  forward({from: e, to: f})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
test('from unknown to known type (should fail)', () => {
  const emitUnknown = createEvent<unknown>()
  const receiveNumber = createEvent<number>()
  forward({
    //@ts-expect-error
    from: emitUnknown,
    to: receiveNumber,
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
          Types of property '__' are incompatible.
            Type 'unknown' is not assignable to type 'number'.
    "
  `)
})
describe('forward with subtyping', () => {
  const str: EventCallable<string> = createEvent()
  const strOrNum: EventCallable<string | number> = createEvent()
  const num: EventCallable<number> = createEvent()
  it('incompatible (should fail)', () => {
    //@ts-expect-error
    forward({from: str, to: num})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'number'.
      "
    `)
  })
  it('same types (should pass)', () => {
    forward({from: str, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('more strict -> less strict type (should pass)', () => {
    forward({from: str, to: strOrNum})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('less strict -> more strict type (should fail)', () => {
    //@ts-expect-error
    forward({from: strOrNum, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
            Types of property '__' are incompatible.
              Type 'string | number' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  it('cannot narrow type from string|number to string (should fail)', () => {
    //@ts-expect-error
    forward<string | number>({from: strOrNum, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('generic to (should fail)', () => {
    //@ts-expect-error
    forward<string>({from: strOrNum, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'EventCallable<string | number>' is not assignable to type 'Unit<string>'.
      "
    `)
  })
  it('generics `to` and `from` (should pass)', () => {
    forward<string | number, string>({to: strOrNum, from: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('generics `to` and `from` (should fail on providing generics)', () => {
    //@ts-expect-error
    forward<string, string | number>({to: str, from: strOrNum})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'string | number' does not satisfy the constraint 'string'.
        Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})

describe('any to void support', () => {
  it('should forward from `Unit<*>` to `Unit<void>` (should pass)', () => {
    const from = createEvent<string>()
    const to = createEvent<void>()

    forward({from, to})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('should forward from `Unit<*>[]` to `Unit<void>[]` (should pass)', () => {
    const from = createEvent<string>()
    const to = createEvent<void>()

    forward({from: [from], to: [to]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('should forward from `Unit<*>` to `Unit<void>[]` (should pass)', () => {
    const from = createEvent<string>()
    const to = createEvent<void>()

    forward({from, to: [to]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('should forward from `Unit<*>` to array with mixed units (should pass)', () => {
    const from = createEvent<string>()
    const to1 = createEvent<void>()
    const to2 = createEvent<string>()
    forward({from, to: [to1, to2]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'EventCallable<string>' is not assignable to type 'Unit<void>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'void'.
                Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
                  Types of property '__' are incompatible.
                    Type 'string' is not assignable to type 'void'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'EventCallable<string>' is not assignable to type 'Unit<void>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'void'.
                Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<void>'.
                  Types of property '__' are incompatible.
                    Type 'string' is not assignable to type 'void'.
      "
    `)
  })
  it('should forward from `Unit<*>[]` to `Unit<void>` (should pass)', () => {
    const from = createEvent<string>()
    const to = createEvent<void>()

    forward({from: [from], to})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('forward form event.map (should pass)', () => {
  const event1 = createEvent<string>()
  const event2 = createEvent<{value: string}>()

  forward({
    from: event1.map(value => ({value})),
    to: event2,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('forward to event.prepend (should pass)', () => {
  const event1 = createEvent<string>()
  const event2 = createEvent<{value: string}>()

  forward({
    from: event1,
    to: event2.prepend(value => ({value})),
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('edge case #1 (should fail)', () => {
  const event1 = createEvent<string>()
  const event2 = createEvent<{value: string}>()

  forward({
    //@ts-expect-error
    from: event1,
    //@ts-expect-error
    to: event2.map(value => ({value})),
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ value: { value: string; }; }>' is not assignable to type 'UnitTargetable<unknown> | readonly UnitTargetable<unknown>[]'.
          Type 'Event<{ value: { value: string; }; }>' is missing the following properties from type 'readonly UnitTargetable<unknown>[]': length, concat, join, slice, and 24 more.
    "
  `)
})

describe('array support', () => {
  describe('forward to array', () => {
    test('valid (should pass)', () => {
      const s1 = createEvent<string>()
      const t1 = createEvent<string>()
      const t2 = createEvent<string>()
      forward({
        from: s1,
        to: [t1, t2],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    describe('invalid', () => {
      test('type mismatch (should fail)', () => {
        const s1 = createEvent<number>()
        const t1 = createEvent<string>()
        const t2 = createEvent<string>()
        forward({
          //@ts-expect-error
          from: s1,
          to: [t1, t2],
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
                Types of property '__' are incompatible.
                  Type 'number' is not assignable to type 'string'.
          "
        `)
      })
      test('array mismatch (should fail)', () => {
        const s1 = createEvent<string>()
        const t1 = createEvent<string>()
        const t2 = createEvent<number>()
        forward({
          from: s1,
          //@ts-expect-error
          to: [t1, t2],
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
                Types of property '__' are incompatible.
                  Type 'number' is not assignable to type 'string'.
          "
        `)
      })
    })
  })
  describe('forward from array', () => {
    test('valid (should pass)', () => {
      const s1 = createEvent<string>()
      const s2 = createEvent<string>()
      const t1 = createEvent<string>()
      forward({
        from: [s1, s2],
        to: t1,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    describe('invalid', () => {
      test('type mismatch (should fail)', () => {
        const s1 = createEvent<string>()
        const s2 = createEvent<string>()
        const t1 = createEvent<number>()
        forward({
          //@ts-expect-error
          from: [s1, s2],
          to: t1,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type 'EventCallable<string>[]' is missing the following properties from type 'Unit<number>': kind, __
          "
        `)
      })
      test('array mismatch (should fail)', () => {
        const s1 = createEvent<string>()
        const s2 = createEvent<number>()
        const t1 = createEvent<string>()
        forward({
          //@ts-expect-error
          from: [s1, s2],
          to: t1,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          No overload matches this call.
            The last overload gave the following error.
              Type '(EventCallable<string> | EventCallable<number>)[]' is missing the following properties from type 'Unit<string>': kind, __
          "
        `)
      })
    })
  })
})
