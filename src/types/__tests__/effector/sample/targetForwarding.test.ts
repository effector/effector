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

test('a target receives a more strict value type from a source (should pass)', () => {
  const source = createStore({a: '', b: ''})
  const clock = createEvent()
  const target = createEvent<{a: string}>()

  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('a target receives an equal value type from a source (should pass)', () => {
  const source = createStore<{a: string; b?: string}>({a: '', b: ''})
  const clock = createEvent()
  const target = createEvent<{a: string; b?: string}>()

  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('a target receives a more strict (or equal) value type from a mapping fn (should pass)', () => {
  const source = createStore(null)
  const clock = createEvent()
  const fn = () => ({a: '', b: ''})
  const target = createEvent<{a: string}>()

  sample({source, clock, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('when a target receives a more loose value type from a source (should fail)', () => {
  const source = createStore({a: ''})
  const clock = createEvent()
  const target = createEvent<{a: string; b: string}>()

  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<{ a: string; }>' is not assignable to type 'CombineSource<any>'.
          Type 'Store<{ a: string; }>' is not assignable to type '{ [x: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ a: string; }>'.
              Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<{ a: string; }>' is not assignable to type 'CombineSource<any>'.
          Type 'Store<{ a: string; }>' is not assignable to type '{ [x: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ a: string; }>'.
              Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
    "
  `)
})

test('when a target receives a more loose value type from a mapping fn (should fail)', () => {
  const source = createStore(null)
  const clock = createEvent()
  const fn = () => ({a: ''})
  const target = createEvent<{a: string; b: string}>()

  sample({source, clock, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'CombineSource<any>'.
          Type 'Store<null>' is not assignable to type '{ [x: string]: Store<any>; }'.
            Index signature is missing in type 'Store<null>'.
              Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'CombineSource<any>'.
          Type 'Store<null>' is not assignable to type '{ [x: string]: Store<any>; }'.
            Index signature is missing in type 'Store<null>'.
              Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
    "
  `)
})
describe('when nullable field passed to strict target (should fail)', () => {
  test('without clock (should fail)', () => {
    const source = createStore<{foo: string; bar: string | null}>({
      foo: '',
      bar: null,
    })
    const target = createEffect<{foo: string; bar: string}, void, Error>()
    sample({
      source,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ foo: string; bar: string | null; }>'.
                Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type '[Unit<any>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ foo: string; bar: string | null; }>'.
                Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type '[Unit<any>]'.
      "
    `)
  })
  test('with clock store (should fail)', () => {
    const source = createStore<{foo: string; bar: string | null}>({
      foo: '',
      bar: null,
    })
    const clock = createStore<string | null>(null)
    const target = createEffect<{foo: string; bar: string}, void, Error>()
    sample({
      source,
      clock,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ foo: string; bar: string | null; }>'.
                Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type '[Unit<any>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ foo: string; bar: string | null; }>'.
                Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Effect<{ foo: string; bar: string; }, void, Error>' is not assignable to type '[Unit<any>]'.
      "
    `)
  })
})
describe('edge case for {} type', () => {
  test('when a target receives a more loose value type from a source (should fail)', () => {
    const source = createStore({})
    const clock = createEvent()
    const target = createEvent<{a: string; b: string}>()

    sample({source, clock, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{}>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<{}>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{}>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{}>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<{}>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{}>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                  Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
      "
    `)
  })

  test('when a target receives a more loose value type from a mapping fn (should fail)', () => {
    const source = createStore(null)
    const clock = createEvent()
    const fn = () => ({})
    const target = createEvent<{a: string; b: string}>()

    sample({source, clock, fn, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<null>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'CombineSource<any>'.
            Type 'Store<null>' is not assignable to type '{ [x: string]: Store<any>; }'.
              Type 'Event<{ a: string; b: string; }>' is not assignable to type 'Tuple<Unit<any>>'.
                Type 'Event<{ a: string; b: string; }>' is not assignable to type '[Unit<any>]'.
      "
    `)
  })
})
