/* eslint-disable no-unused-vars */
import {createStore, createEffect, attach, sample, Effect} from 'effector'

const typecheck = '{global}'

describe('explicit generics', () => {
  test('attach<params, source, effect>', () => {
    const source = createStore(0)
    const effect = createEffect(({foo}: {foo: number}) => foo)
    const fx = attach<number, typeof source, typeof effect>({
      source,
      effect,
      mapParams: (params, source) => ({foo: params + source}),
    })
    const assert: Effect<number, number> = fx
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('attach<params, effect>', () => {
    const effect = createEffect(({foo}: {foo: number}) => foo)
    const fx = attach<number, typeof effect>({
      effect,
      mapParams: params => ({foo: params}),
    })
    const assert: Effect<number, number> = fx
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('factories with generics support', () => {
  function createModel<T>() {
    const $data = createStore<T | null>(null)

    const loadFx = attach({
      source: {
        /* Assume we use some $api with external API we don't control */
      },
      effect() {
        const result: any = /* API returns `any` */ null

        return result as T /* explicit cast, becase we know result is T */
      },
    })

    sample({clock: loadFx.doneData, target: $data})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 15 'sample({clock: loadFx.doneData, target: $data})'
    Type 'StoreWritable<T | null>' is not assignable to type 'RebuildTargetClockLoop<[Event<Awaited<T>>], StoreWritable<T | null>, T | null, \\"noFilter\\">'.
    "
  `)
})

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
describe('params type mismatch', () => {
  test('params type mismatch [with source] (should fail)', () => {
    const source = createStore(8900)
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx: Effect<string, string, {message: string}> = attach({
      source,
      effect,
      //@ts-expect-error
      mapParams: (text: number, source) => ({foo: text}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '(text: number, source: number) => { foo: number; }' is not assignable to type '(params: any, source: number) => { foo: string; }'.
            Call signature return types '{ foo: number; }' and '{ foo: string; }' are incompatible.
              The types of 'foo' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
      "
    `)
  })

  test('params type mismatch [without source] (should fail)', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    //@ts-expect-error
    const fx: Effect<string, string, {message: string}> = attach({
      effect,
      //@ts-expect-error
      mapParams: (text: number) => ({foo: text}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Effect<number, string, { message: string; }>' is not assignable to type 'Effect<string, string, { message: string; }>'.
        Types of property 'done' are incompatible.
          Type 'Event<{ params: number; result: string; }>' is not assignable to type 'Event<{ params: string; result: string; }>'.
            Type '{ params: number; result: string; }' is not assignable to type '{ params: string; result: string; }'.
              Types of property 'params' are incompatible.
                Type 'number' is not assignable to type 'string'.
      No overload matches this call.
        The last overload gave the following error.
          Type '(text: number) => { foo: number; }' is not assignable to type '(params: any, source: any) => { foo: string; }'.
            Call signature return types '{ foo: number; }' and '{ foo: string; }' are incompatible.
              The types of 'foo' are incompatible between these types.
                Type 'number' is not assignable to type 'string'.
      "
    `)
  })
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
    no errors
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

test('effect with explicit name (should pass)', () => {
  const effect: Effect<void, void, Error> = createEffect()
  const fx: Effect<void, void, Error> = attach({effect, name: 'fx'})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('unknown params type', () => {
  test('unknown params type [with source] (?)', () => {
    const source = createStore(0)
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx = attach({
      source,
      effect,
      //@ts-expect-error
      mapParams: (text, source) => ({foo: text}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'unknown' is not assignable to type 'string'.
      "
    `)
  })
  test('unknown params type [without source] (?)', () => {
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx = attach({
      effect,
      mapParams: text => ({foo: text}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('unknown params type [with source shape] (?)', () => {
    const a = createStore('')
    const b = createStore(0)
    //prettier-ignore
    const effect: Effect<{foo: string}, string, {message: string}> = createEffect()
    const fx = attach({
      source: {a, b},
      effect,
      //@ts-expect-error
      mapParams: (text, source) => ({foo: text}),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'unknown' is not assignable to type 'string'.
      "
    `)
  })
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
      //@ts-expect-error
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
      //@ts-expect-error
      mapParams: (params, data) => {
        console.log('Created effect called with', params, 'and data', data)
        return {wrapped: params, data}
      },
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type '(params: unknown, data: number) => { wrapped: unknown; data: number; }' is not assignable to type '(params: any, source: number) => string'.
            Type '{ wrapped: unknown; data: number; }' is not assignable to type 'string'.
      "
    `)
  })
})
describe('string subtyping', () => {
  test('valid case (should pass)', () => {
    const effectFx = createEffect(
      (payload: {string: 'one' | 'two' | 'three'}) => 'response',
    )

    const attachedFx1: Effect<void, 'response'> = attach({
      effect: effectFx,
      mapParams: () => ({
        string: 'one',
      }),
    })
    const attachedFx2: Effect<void, 'response'> = attach({
      effect: effectFx,
      mapParams: () => ({
        string: 'one' as const,
      }),
    })

    function run() {
      effectFx({string: 'one'})
      attachedFx1()
      attachedFx2()
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 8 'string: 'one','
      No overload matches this call.
        The last overload gave the following error.
          Type 'string' is not assignable to type '\\"one\\" | \\"two\\" | \\"three\\"'.
      "
    `)
  })
  test('type mismatch (should fail)', () => {
    const effectFx = createEffect(
      (payload: {string: 'one' | 'two' | 'three'}) => 'response',
    )

    const attachedFx3 = attach({
      effect: effectFx,
      mapParams: () => ({
        //@ts-expect-error
        string: 'ones',
      }),
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Type 'string' is not assignable to type '\\"one\\" | \\"two\\" | \\"three\\"'.
      "
    `)
  })
})
