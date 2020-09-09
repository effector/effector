// @flow
/* eslint-disable no-unused-vars */
import {createStore, createEffect, attach, Effect} from 'effector'

const typecheck = '{global}'

describe('with source', () => {
  test('with single store', () => {
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
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('with shape', () => {
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
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})

test('without source', () => {
  //prettier-ignore
  const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
  const fx: Effect<string, string, {message: string}> = attach({
    effect,
    mapParams: text => ({foo: text}),
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
    --typescript--
    Type 'Effect<unknown, number, Error>' is not assignable to type 'Effect<void, number, Error>'.
      The types of 'done.watch' are incompatible between these types.
        Type '(watcher: (payload: { params: unknown; result: number; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { params: void; result: number; }) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type '{ params: unknown; result: number; }' is not assignable to type '{ params: void; result: number; }'.
    Expected 1 arguments, but got 0.

    --flow--
    no errors
    "
  `)
})
