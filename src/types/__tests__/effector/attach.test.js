// @flow
/* eslint-disable no-unused-vars */
import {createStore, createEffect, attach, Effect} from 'effector'

const typecheck = '{global}'

describe('with source', () => {
  describe('with single store', () => {
    test('params, result, error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      const fx: Effect<string, {result: string, foo: string}, Error> = attach({
        effect,
        source: foo,
        mapParams: (text, foo: string) => ({foo: `${text}${foo}`}),
        mapResult: (result, foo: string) => ({result, foo}),
        mapError: ({message}, foo: string) => Error(`${message}${foo}`),
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
    test('params, result', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      //prettier-ignore
      const fx: Effect<string, {result: string, foo: string}, {message: string}> = attach({
        effect,
        source: foo,
        mapParams: (text, foo: string) => ({foo: `${text}${foo}`}),
        mapResult: (result, foo: string) => ({result, foo}),
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
    test('params, error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      const fx: Effect<string, string, Error> = attach({
        effect,
        source: foo,
        mapParams: (text, foo: string) => ({foo: `${text}${foo}`}),
        mapError: ({message}, foo: string) => Error(`${message}${foo}`),
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
    test('result, error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      //prettier-ignore
      const fx: Effect<{foo: string}, {result: string, foo: string}, Error> = attach({
        effect,
        source: foo,
        mapResult: (result, foo: string) => ({result, foo}),
        mapError: ({message}, foo: string) => Error(`${message}${foo}`),
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
    test('params', () => {
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
    test('result', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      //prettier-ignore
      const fx: Effect<{foo: string}, {result: string, foo: string}, {message: string}> = attach({
        effect,
        source: foo,
        mapResult: (result, foo: string) => ({result, foo}),
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
    test('error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      const fx: Effect<{foo: string}, string, Error> = attach({
        effect,
        source: foo,
        mapError: ({message}, foo: string) => Error(`${message}${foo}`),
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
  describe('with shape', () => {
    test('params, result, error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      const fx: Effect<string, {result: string, foo: string}, Error> = attach({
        effect,
        source: {foo},
        mapParams: (text, {foo}) => ({foo: `${text}${foo}`}),
        mapResult: (result, {foo}) => ({result, foo}),
        mapError: ({message}, {foo}) => Error(`${message}${foo}`),
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
    test('params, result', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      //prettier-ignore
      const fx: Effect<string, {result: string, foo: string}, {message: string}> = attach({
        effect,
        source: {foo},
        mapParams: (text, {foo}) => ({foo: `${text}${foo}`}),
        mapResult: (result, {foo}) => ({result, foo}),
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
    test('params, error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      const fx: Effect<string, string, Error> = attach({
        effect,
        source: {foo},
        mapParams: (text, {foo}) => ({foo: `${text}${foo}`}),
        mapError: ({message}, {foo}) => Error(`${message}${foo}`),
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
    test('result, error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      //prettier-ignore
      const fx: Effect<{foo: string}, {result: string, foo: string}, Error> = attach({
        effect,
        source: {foo},
        mapResult: (result, {foo}) => ({result, foo}),
        mapError: ({message}, {foo}) => Error(`${message}${foo}`),
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
    test('params', () => {
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
    test('result', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      //prettier-ignore
      const fx: Effect<{foo: string}, {result: string, foo: string}, {message: string}> = attach({
        effect,
        source: {foo},
        mapResult: (result, {foo}) => ({result, foo}),
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
    test('error', () => {
      const foo = createStore<string>('foo')
      //prettier-ignore
      const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
      const fx: Effect<{foo: string}, string, Error> = attach({
        effect,
        source: {foo},
        mapError: ({message}, {foo}) => Error(`${message}${foo}`),
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
})

describe('without source', () => {
  test('params, result, error', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx: Effect<string, {result: string}, Error> = attach({
      effect,

      mapParams: text => ({foo: text}),
      mapResult: result => ({result}),
      mapError: ({message}) => Error(message),
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
  test('params, result', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    //prettier-ignore
    const fx: Effect<string, {result: string}, {message: string}> = attach({
      effect,
      
      mapParams: (text) => ({foo: text}),
      mapResult: (result) => ({result}),
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
  test('params, error', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx: Effect<string, string, Error> = attach({
      effect,

      mapParams: text => ({foo: text}),
      mapError: ({message}) => Error(message),
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
  test('result, error', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    //prettier-ignore
    const fx: Effect<{foo: string}, {result: string}, Error> = attach({
      effect,
      mapResult: (result) => ({result}),
      mapError: ({message}) => Error(message),
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
  test('params', () => {
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
  test('result', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    //prettier-ignore
    const fx: Effect<{foo: string}, {result: string}, {message: string}> = attach({
      effect,
      mapResult: (result) => ({result}),
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
  test('error', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx: Effect<{foo: string}, string, Error> = attach({
      effect,
      mapError: ({message}) => Error(message),
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
