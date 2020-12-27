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

it('should pass when a target receives a more strict value type from a source', () => {
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

it('should pass when a target receives an equal value type from a source', () => {
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

it('should pass when a target receives a more strict (or equal) value type from a mapping fn', () => {
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

it('should fail when a target receives a more loose value type from a source', () => {
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

it('should fail when a target receives a more loose value type from a mapping fn', () => {
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
describe('should fail when nullable field passed to strict target', () => {
  test('without clock', () => {
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
  test('with clock store', () => {
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
  it('should fail when a target receives a more loose value type from a source', () => {
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

  it('should fail when a target receives a more loose value type from a mapping fn', () => {
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
