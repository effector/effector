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
