/* eslint-disable no-unused-vars */
import {createStore, createEffect, attach, Effect} from 'effector'

const typecheck = '{global}'

describe('with source', () => {
  test('with single store (should pass)', () => {
    const foo = createStore<string>('foo')
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx: Effect<string, string, {message: string}> = attach({
      effect,
      source: foo,
      mapParams: (text, foo: string) => ({foo: `${text}${foo}`}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('with shape (should pass)', () => {
    const foo = createStore<string>('foo')
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx: Effect<string, string, {message: string}> = attach({
      effect,
      source: {foo},
      mapParams: (text, {foo}) => ({foo: `${text}${foo}`}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('without source (should pass)', () => {
  //prettier-ignore
  const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
  const fx: Effect<string, string, {message: string}> = attach({
    effect,
    mapParams: text => ({foo: text}),
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('mapParams without arguments (should pass)', () => {
  const effect = createEffect((word: string) => word.length)
  const fx = attach({
    effect,
    mapParams: () => 'foo',
  })
  const assert_type: Effect<void, number> = fx
  fx()
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Effect<unknown, number, Error>' is not assignable to type 'Effect<void, number, Error>'.
      The types of 'done.watch' are incompatible between these types.
        Type '(watcher: (payload: { params: unknown; result: number; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { params: void; result: number; }) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type '{ params: unknown; result: number; }' is not assignable to type '{ params: void; result: number; }'.
    Expected 1 arguments, but got 0.
    "
  `)
})

test('without source and mapParams (should pass)', () => {
  const effect: Effect<number, string, boolean> = createEffect()
  const fx: Effect<number, string, boolean> = attach({effect})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('difference in message quality between inferred types and explicit generics', () => {
  test('type mismatch between original effect and mapParams [explicit] (should fail)', () => {
    const original = createEffect((params: string) => {
      console.log('Original effect called with', params)
    })

    const data = createStore(8900)

    const created = attach<number, typeof data, typeof original>({
      effect: original,
      source: data,
      mapParams: (params, data) => {
        console.log('Created effect called with', params, 'and data', data)
        return {wrapped: params, data}
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(params: number, data: number) => { wrapped: number; data: number; }' is not assignable to type '(params: number, states: number) => string'.
        Type '{ wrapped: number; data: number; }' is not assignable to type 'string'.
      "
    `)
  })
  test('type mismatch between original effect and mapParams [inferred] (should fail)', () => {
    const original = createEffect((params: string) => {
      console.log('Original effect called with', params)
    })

    const data = createStore(8900)

    const created = attach({
      effect: original,
      source: data,
      mapParams: (params, data) => {
        console.log('Created effect called with', params, 'and data', data)
        return {wrapped: params, data}
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type '{ effect: Effect<string, void, Error>; source: Store<number>; mapParams: (params: unknown, data: number) => { wrapped: unknown; data: number; }; }' is not assignable to parameter of type '{ effect: Effect<string, void, Error>; }'.
            Object literal may only specify known properties, and 'source' does not exist in type '{ effect: Effect<string, void, Error>; }'.
      "
    `)
  })
})
