// @flow
/* eslint-disable no-unused-vars */
import {createStore, createEvent, createEffect, Event, forward} from 'effector'

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
    --typescript--
    no errors

    --flow--
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
      --typescript--
      no errors

      --flow--
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
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})

test('forward between stores', () => {
  const e = createStore(0)
  const f = createStore(0)
  forward({from: e, to: f})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
describe('forward with subtyping', () => {
  const str: Event<string> = createEvent()
  const strOrNum: Event<string | number> = createEvent()
  const num: Event<number> = createEvent()
  it('incompatible (should fail)', () => {
    forward({from: str, to: num})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string>' is not assignable to type 'Unit<number>'.
            Types of property '__' are incompatible.
              Type 'string' is not assignable to type 'number'.

      --flow--
      Cannot call 'forward' with object literal bound to 'opts'
        forward({from: str, to: num})
                ^^^^^^^^^^^^^^^^^^^^
        number [1] is incompatible with string [2] in type argument 'T' [3] of property 'to'
            const num: Event<number> = createEvent()
                         [1] ^^^^^^
            const str: Event<string> = createEvent()
                         [2] ^^^^^^
            export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                              [3] ^
      "
    `)
  })
  it('same types (should be ok)', () => {
    forward({from: str, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('more strict -> less strict type (should be ok)', () => {
    forward({from: str, to: strOrNum})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('less strict -> more strict type (should fail)', () => {
    forward({from: strOrNum, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Event<string | number>' is not assignable to type 'Unit<string>'.
            Types of property '__' are incompatible.
              Type 'string | number' is not assignable to type 'string'.
                Type 'number' is not assignable to type 'string'.

      --flow--
      Cannot call 'forward' with object literal bound to 'opts'
        forward({from: strOrNum, to: str})
                ^^^^^^^^^^^^^^^^^^^^^^^^^
        string [1] is incompatible with number [2] in type argument 'T' [3] of property 'to'
            const str: Event<string> = createEvent()
                         [1] ^^^^^^
            const strOrNum: Event<string | number> = createEvent()
                                       [2] ^^^^^^
            export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                              [3] ^
      "
    `)
  })
  it('generic from (?)', () => {
    forward<string | number>({from: strOrNum, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      Cannot call 'forward' with object literal bound to 'opts'
        forward<string | number>({from: strOrNum, to: str})
                                 ^^^^^^^^^^^^^^^^^^^^^^^^^
        string [1] is incompatible with number [2] in type argument 'T' [3] of property 'to'
            const str: Event<string> = createEvent()
                         [1] ^^^^^^
            forward<string | number>({from: strOrNum, to: str})
                         [2] ^^^^^^
            export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                              [3] ^
      "
    `)
  })
  it('generic to (should fail)', () => {
    forward<string>({from: strOrNum, to: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<string | number>' is not assignable to type 'Unit<string & {}>'.
        Types of property '__' are incompatible.
          Type 'string | number' is not assignable to type 'string & {}'.
            Type 'number' is not assignable to type 'string & {}'.
              Type 'number' is not assignable to type 'string'.

      --flow--
      Cannot call 'forward' with object literal bound to 'opts'
        forward<string>({from: strOrNum, to: str})
                        ^^^^^^^^^^^^^^^^^^^^^^^^^
        number [1] is incompatible with string [2] in type argument 'T' [3] of property 'from'
            const strOrNum: Event<string | number> = createEvent()
                                       [1] ^^^^^^
            forward<string>({from: strOrNum, to: str})
                [2] ^^^^^^
            interface CovariantUnit<+T> {
                                 [3] ^
      "
    `)
  })
  it('generics `to` and `from` (should pass)', () => {
    forward<string | number, string>({to: strOrNum, from: str})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('generics `to` and `from` (should fail on providing generics)', () => {
    forward<string, string | number>({to: str, from: strOrNum})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'string | number' does not satisfy the constraint 'string'.
        Type 'number' is not assignable to type 'string'.

      --flow--
      Cannot call 'forward' with object literal bound to 'opts'
        forward<string, string | number>({to: str, from: strOrNum})
                                         ^^^^^^^^^^^^^^^^^^^^^^^^^
        number [1] is incompatible with string [2] in type argument 'T' [3] of property 'from'
            const strOrNum: Event<string | number> = createEvent()
                                       [1] ^^^^^^
            forward<string, string | number>({to: str, from: strOrNum})
                [2] ^^^^^^
            interface CovariantUnit<+T> {
                                 [3] ^
      "
    `)
  })
})

describe('better inference experience', () => {
  it('should forward from `Unit<*>` to `Unit<void>`', () => {
    const from = createEvent<string>()
    const to = createEvent<void>()

    forward({from, to})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      Cannot call 'forward' with object literal bound to 'opts'
        forward({from, to})
                ^^^^^^^^^^
        undefined [1] is incompatible with string [2] in type argument 'T' [3] of property 'to'
            const to = createEvent<void>()
                               [1] ^^^^
            const from = createEvent<string>()
                                 [2] ^^^^^^
            export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                              [3] ^
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
    --typescript--
    no errors

    --flow--
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
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('edge case #1 (should fail)', () => {
  const event1 = createEvent<string>()
  const event2 = createEvent<{value: string}>()

  forward({
    from: event1,
    to: event2.map(value => ({value})),
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<string>' is not assignable to type 'Unit<{ value: { value: string; }; }>'.
          Types of property '__' are incompatible.
            Type 'string' is not assignable to type '{ value: { value: string; }; }'.

    --flow--
    no errors
    "
  `)
})

describe('array support', () => {
  describe('forward to array', () => {
    test('valid', () => {
      const s1 = createEvent<string>()
      const t1 = createEvent<string>()
      const t2 = createEvent<string>()
      forward({
        from: s1,
        to: [t1, t2],
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    describe('invalid', () => {
      test('type mismatch', () => {
        const s1 = createEvent<number>()
        const t1 = createEvent<string>()
        const t2 = createEvent<string>()
        forward({
          from: s1,
          to: [t1, t2],
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<number>' is not assignable to type 'Unit<string>'.
                Types of property '__' are incompatible.
                  Type 'number' is not assignable to type 'string'.

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            to: [t1, t2],
                ^^^^^^^^
            string [1] is incompatible with number [2] in type argument 'T' [3] of array element of property 'to'
                const t1 = createEvent<string>()
                                   [1] ^^^^^^
                const s1 = createEvent<number>()
                                   [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
      test('array mismatch', () => {
        const s1 = createEvent<string>()
        const t1 = createEvent<string>()
        const t2 = createEvent<number>()
        forward({
          from: s1,
          to: [t1, t2],
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<string> | Event<number>)[]' is not assignable to type 'Unit<string> | readonly Unit<string>[]'.
                Type '(Event<string> | Event<number>)[]' is not assignable to type 'readonly Unit<string>[]'.
                  Type 'Event<string> | Event<number>' is not assignable to type 'Unit<string>'.
                    Type 'Event<number>' is not assignable to type 'Unit<string>'.

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            to: [t1, t2],
                ^^^^^^^^
            number [1] is incompatible with string [2] in type argument 'T' [3] of array element of property 'to'
                const t2 = createEvent<number>()
                                   [1] ^^^^^^
                const t1 = createEvent<string>()
                                   [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
    })
  })
  describe('forward from array', () => {
    test('valid', () => {
      const s1 = createEvent<string>()
      const s2 = createEvent<string>()
      const t1 = createEvent<string>()
      forward({
        from: [s1, s2],
        to: t1,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    describe('invalid', () => {
      test('type mismatch', () => {
        const s1 = createEvent<string>()
        const s2 = createEvent<string>()
        const t1 = createEvent<number>()
        forward({
          from: [s1, s2],
          to: t1,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type 'Event<string>[]' is missing the following properties from type 'Unit<number>': kind, __

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            forward({
                    ^...
            number [1] is incompatible with string [2] in type argument 'T' [3] of property 'to'
                const t1 = createEvent<number>()
                                   [1] ^^^^^^
                const s1 = createEvent<string>()
                                   [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
      test('array mismatch', () => {
        const s1 = createEvent<string>()
        const s2 = createEvent<number>()
        const t1 = createEvent<string>()
        forward({
          from: [s1, s2],
          to: t1,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          No overload matches this call.
            The last overload gave the following error.
              Type '(Event<string> | Event<number>)[]' is missing the following properties from type 'Unit<string>': kind, __

          --flow--
          Cannot call 'forward' with object literal bound to 'opts'
            forward({
                    ^...
            string [1] is incompatible with number [2] in type argument 'T' [3] of property 'to'
                const t1 = createEvent<string>()
                                   [1] ^^^^^^
                const s2 = createEvent<number>()
                                   [2] ^^^^^^
                export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                  [3] ^
          "
        `)
      })
    })
  })
})
