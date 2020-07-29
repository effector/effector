// @flow
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
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

it('should pass when a target receives an equal value type from a source', () => {
  const source = createStore<{a: string, b?: string}>({a: '', b: ''})
  const clock = createEvent()
  const target = createEvent<{a: string, b?: string}>()

  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
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
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

it('should fail when a target receives a more loose value type from a source', () => {
  const source = createStore({a: ''})
  const clock = createEvent()
  const target = createEvent<{a: string, b: string}>()

  sample({source, clock, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<{ a: string; }>' is not assignable to type 'Combinable'.
          Type 'Store<{ a: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<{ a: string; }>'.

    --flow--
    Cannot call 'sample' with object literal bound to 'config'
      sample({source, clock, target})
             ^^^^^^^^^^^^^^^^^^^^^^^
      property 'b' is missing in object literal [1] but exists in object type [2] in type argument 'T' [3] of property 'target'. [prop-missing]
          const source = createStore({a: ''})
                                 [1] ^^^^^^^
          const target = createEvent<{a: string, b: string}>()
                                 [2] ^^^^^^^^^^^^^^^^^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                            [3] ^
    "
  `)
})

it('should fail when a target receives a more loose value type from a mapping fn', () => {
  const source = createStore(null)
  const clock = createEvent()
  const fn = () => ({a: ''})
  const target = createEvent<{a: string, b: string}>()

  sample({source, clock, fn, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'Combinable'.
          Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<null>'.
              Type '() => { a: string; }' is not assignable to type '(source: any[] | GetCombinedValue<{ [key: string]: Store<any>; }> | [any], clock: void) => { a: string; b: string; }'.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<null>' is not assignable to type 'Combinable'.
          Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
            Index signature is missing in type 'Store<null>'.
              Type '() => { a: string; }' is not assignable to type '(source: any[] | GetCombinedValue<{ [key: string]: Store<any>; }> | [any], clock: void) => { a: string; b: string; }'.
                Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.

    --flow--
    Cannot call 'sample' with object literal bound to 'config'
      sample({source, clock, fn, target})
             ^^^^^^^^^^^^^^^^^^^^^^^^^^^
      property 'b' is missing in object literal [1] but exists in object type [2] in type argument 'T' [3] of property 'target'. [prop-missing]
          const fn = () => ({a: ''})
                        [1] ^^^^^^^
          const target = createEvent<{a: string, b: string}>()
                                 [2] ^^^^^^^^^^^^^^^^^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                            [3] ^
    "
  `)
})
describe('edge case for {} type', () => {
  it('should fail when a target receives a more loose value type from a source', () => {
    const source = createStore({})
    const clock = createEvent()
    const target = createEvent<{a: string, b: string}>()

    sample({source, clock, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{}>' is not assignable to type 'Combinable'.
            Type 'Store<{}>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{}>'.

      --flow--
      no errors
      "
    `)
  })

  it('should fail when a target receives a more loose value type from a mapping fn', () => {
    const source = createStore(null)
    const clock = createEvent()
    const fn = () => ({})
    const target = createEvent<{a: string, b: string}>()

    sample({source, clock, fn, target})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'Combinable'.
            Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '() => {}' is not assignable to type '(source: any[] | GetCombinedValue<{ [key: string]: Store<any>; }> | [any], clock: void) => { a: string; b: string; }'.
                Type '{}' is missing the following properties from type '{ a: string; b: string; }': a, b
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<null>' is not assignable to type 'Combinable'.
            Type 'Store<null>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Type '() => {}' is not assignable to type '(source: any[] | GetCombinedValue<{ [key: string]: Store<any>; }> | [any], clock: void) => { a: string; b: string; }'.
                Type '{}' is missing the following properties from type '{ a: string; b: string; }': a, b

      --flow--
      no errors
      "
    `)
  })
})
