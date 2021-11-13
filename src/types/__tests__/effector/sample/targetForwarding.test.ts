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
  //@ts-expect-error
  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<{ a: string; }>; clock: Event<void>; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: string; }; targetType: { a: string; b: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: string; }; targetType: { a: string; b: string; }; }; }'.
    "
  `)
})

test('when a target receives a more loose value type from a source [without clock] (should fail)', () => {
  const source = createStore({a: ''})
  const target = createEvent<{a: string; b: string}>()
  //@ts-expect-error
  sample({source, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<{ a: string; }>; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: string; }; targetType: { a: string; b: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { a: string; }; targetType: { a: string; b: string; }; }; }'.
    "
  `)
})

test('when a target receives a more loose value type from a mapping fn [with clock] (should fail)', () => {
  const source = createStore(null)
  const clock = createEvent()
  const fn = () => ({a: ''})
  const target = createEvent<{a: string; b: string}>()
  //@ts-expect-error
  sample({source, clock, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<null>; clock: Event<void>; fn: () => { a: string; }; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; }; targetType: { a: string; b: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; }; targetType: { a: string; b: string; }; }; }'.
    "
  `)
})

test('when a target receives a more loose value type from a mapping fn [without clock] (should fail)', () => {
  const source = createStore(null)
  const fn = () => ({a: ''})
  const target = createEvent<{a: string; b: string}>()
  //@ts-expect-error
  sample({source, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<null>; fn: () => { a: string; }; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; }; targetType: { a: string; b: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: { a: string; }; targetType: { a: string; b: string; }; }; }'.
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
  //@ts-expect-error
  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<{ foo: string; bar: string | null; }>; clock: Store<string | null>; target: Effect<{ foo: string; bar: string; }, void, Error>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; bar: string | null; }; targetType: { foo: string; bar: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; bar: string | null; }; targetType: { foo: string; bar: string; }; }; }'.
    "
  `)
})

test('when nullable field passed to strict target [without clock] (should fail)', () => {
  const source = createStore<{foo: string; bar: string | null}>({
    foo: '',
    bar: null,
  })
  const target = createEffect<{foo: string; bar: string}, void, Error>()
  //@ts-expect-error
  sample({source, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: Store<{ foo: string; bar: string | null; }>; target: Effect<{ foo: string; bar: string; }, void, Error>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; bar: string | null; }; targetType: { foo: string; bar: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; bar: string | null; }; targetType: { foo: string; bar: string; }; }; }'.
    "
  `)
})

describe('edge case for {} type', () => {
  test('when a target receives a more loose value type from a source [with clock] (should fail)', () => {
    const source = createStore({})
    const clock = createEvent()
    const target = createEvent<{a: string; b: string}>()

    //@ts-expect-error
    sample({source, clock, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Store<{}>; clock: Event<void>; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: {}; targetType: { a: string; b: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: {}; targetType: { a: string; b: string; }; }; }'.
      "
    `)
  })
  test('when a target receives a more loose value type from a source [without clock] (should fail)', () => {
    const source = createStore({})
    const target = createEvent<{a: string; b: string}>()
    //@ts-expect-error
    sample({source, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Store<{}>; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: {}; targetType: { a: string; b: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: {}; targetType: { a: string; b: string; }; }; }'.
      "
    `)
  })

  test('when a target receives a more loose value type from a mapping fn [with clock] (should fail)', () => {
    const source = createStore(null)
    const clock = createEvent()
    const fn = () => ({})
    const target = createEvent<{a: string; b: string}>()
    //@ts-expect-error
    sample({source, clock, fn, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Store<null>; clock: Event<void>; fn: () => {}; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: {}; targetType: { a: string; b: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: {}; targetType: { a: string; b: string; }; }; }'.
      "
    `)
  })

  test('when a target receives a more loose value type from a mapping fn [without clock] (should fail)', () => {
    const source = createStore(null)
    const fn = () => ({})
    const target = createEvent<{a: string; b: string}>()
    //@ts-expect-error
    sample({source, fn, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ source: Store<null>; fn: () => {}; target: Event<{ a: string; b: string; }>; }' is not assignable to parameter of type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: {}; targetType: { a: string; b: string; }; }; }'.
        Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: {}; targetType: { a: string; b: string; }; }; }'.
      "
    `)
  })
})
