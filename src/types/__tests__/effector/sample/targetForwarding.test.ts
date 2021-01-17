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

test('a target receives a more strict value type from a source [with clock] (should pass)', () => {
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

test('a target receives a more strict value type from a source [without clock] (should pass)', () => {
  const source = createStore({a: '', b: ''})
  const target = createEvent<{a: string}>()

  sample({source, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('a target receives an equal value type from a source [with clock] (should pass)', () => {
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

test('a target receives an equal value type from a source [without clock] (should pass)', () => {
  const source = createStore<{a: string; b?: string}>({a: '', b: ''})
  const target = createEvent<{a: string; b?: string}>()

  sample({source, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('a target receives a more strict (or equal) value type from a mapping fn [with clock] (should pass)', () => {
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

test('a target receives a more strict (or equal) value type from a mapping fn [without clock] (should pass)', () => {
  const source = createStore(null)
  const fn = () => ({a: '', b: ''})
  const target = createEvent<{a: string}>()

  sample({source, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('when a target receives a more loose value type from a source [with clock] (should fail)', () => {
  const source = createStore({a: ''})
  const clock = createEvent()
  const target = createEvent<{a: string; b: string}>()

  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<{ a: string; }>' is not assignable to type 'Combinable'.
          Type 'Store<{ a: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ a: string; }>'.
    "
  `)
})

test('when a target receives a more loose value type from a source [without clock] (should fail)', () => {
  const source = createStore({a: ''})
  const target = createEvent<{a: string; b: string}>()

  sample({source, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<{ a: string; }>' is not assignable to type 'Combinable'.
          Type 'Store<{ a: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ a: string; }>'.
    "
  `)
})

test('when a target receives a more loose value type from a mapping fn [with clock] (should fail)', () => {
  const source = createStore(null)
  const clock = createEvent()
  const fn = () => ({a: ''})
  const target = createEvent<{a: string; b: string}>()

  sample({source, clock, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'Combinable'.
          Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<null>'.
              Type '() => { a: string; }' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: void) => { a: string; b: string; }'.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'Combinable'.
          Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<null>'.
              Type '() => { a: string; }' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: void) => { a: string; b: string; }'.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
    "
  `)
})

test('when a target receives a more loose value type from a mapping fn [without clock] (should fail)', () => {
  const source = createStore(null)
  const fn = () => ({a: ''})
  const target = createEvent<{a: string; b: string}>()

  sample({source, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'Combinable'.
          Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Type '() => { a: string; }' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: unknown) => { a: string; b: string; }'.
              Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'Combinable'.
          Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Type '() => { a: string; }' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: unknown) => { a: string; b: string; }'.
              Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
    "
  `)
})

test('when nullable field passed to strict target [with clock] (should fail)', () => {
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
        Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type 'Combinable'.
          Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ foo: string; bar: string | null; }>'.
    "
  `)
})

test('when nullable field passed to strict target [without clock] (should fail)', () => {
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
        Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type 'Combinable'.
          Type 'Store<{ foo: string; bar: string | null; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ foo: string; bar: string | null; }>'.
    "
  `)
})

describe('edge case for {} type', () => {
  test('when a target receives a more loose value type from a source [with clock] (should fail)', () => {
    const source = createStore({})
    const clock = createEvent()
    const target = createEvent<{a: string; b: string}>()

    sample({source, clock, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{}>' is not assignable to type 'Combinable'.
            Type 'Store<{}>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{}>'.
      "
    `)
  })
  test('when a target receives a more loose value type from a source [without clock] (should fail)', () => {
    const source = createStore({})
    const target = createEvent<{a: string; b: string}>()

    sample({source, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{}>' is not assignable to type 'Combinable'.
            Type 'Store<{}>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{}>'.
      "
    `)
  })

  test('when a target receives a more loose value type from a mapping fn [with clock] (should fail)', () => {
    const source = createStore(null)
    const clock = createEvent()
    const fn = () => ({})
    const target = createEvent<{a: string; b: string}>()

    sample({source, clock, fn, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'Combinable'.
            Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '() => {}' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: void) => { a: string; b: string; }'.
                Type '{}' is missing the following properties from type '{ a: string; b: string; }': a, b
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'Combinable'.
            Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '() => {}' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: void) => { a: string; b: string; }'.
                Type '{}' is missing the following properties from type '{ a: string; b: string; }': a, b
      "
    `)
  })

  test('when a target receives a more loose value type from a mapping fn [without clock] (should fail)', () => {
    const source = createStore(null)
    const fn = () => ({})
    const target = createEvent<{a: string; b: string}>()

    sample({source, fn, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'Combinable'.
            Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '() => {}' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: unknown) => { a: string; b: string; }'.
                Type '{}' is missing the following properties from type '{ a: string; b: string; }': a, b
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'Combinable'.
            Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '() => {}' is not assignable to type '(source: any[] | [any] | { [x: string]: any; }, clock: unknown) => { a: string; b: string; }'.
                Type '{}' is missing the following properties from type '{ a: string; b: string; }': a, b
      "
    `)
  })
})
