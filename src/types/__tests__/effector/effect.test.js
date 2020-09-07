// @flow
/* eslint-disable no-unused-vars */
import {
  createEffect,
  Effect,
  Event,
  /*::type*/ CompositeName,
  /*::type*/ kind,
} from 'effector'

const typecheck = '{global}'

test('createEffect', () => {
  const createEffect_effect1: Effect<number, string> = createEffect()
  const createEffect_effect2 = createEffect('', {
    handler: createEffect_effect1,
  })

  const createEffect_effect3 = createEffect('', {
    handler() {
      return 'foo'
    },
  })
  const createEffect_effect4: Effect<number, string> = createEffect('fx 4')
  const createEffect_effect5: Effect<number, string> = createEffect({
    name: 'fx 5',
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

describe('single generic', () => {
  type SyncFn = (_: string) => number
  type AsyncFn = (_: string) => Promise<number>
  describe('with config', () => {
    describe('valid case', () => {
      test('use sync generic, give sync handler', () => {
        const foo: Effect<string, number> = createEffect<SyncFn>({
          handler: (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
            const foo: Effect<string, number> = createEffect<SyncFn>({
                                                ^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(
                                                [1] ^^^^^^^^^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(config: {
                                                [2] ^^^^^^^^^^^^^^^^^^^^
          "
        `)
      })
      test('use sync generic, give async handler', () => {
        const foo: Effect<string, number> = createEffect<SyncFn>({
          handler: async (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          No overload matches this call.
            Overload 1 of 4, '(handler: SyncFn): Effect<string, number, Error>', gave the following error.
              Argument of type '{ handler: (_: string) => Promise<number>; }' is not assignable to parameter of type 'SyncFn'.
                Object literal may only specify known properties, and 'handler' does not exist in type 'SyncFn'.
            Overload 2 of 4, '(config: { name?: string | undefined; handler: SyncFn; sid?: string | undefined; }): Effect<string, number, Error>', gave the following error.
              Type '(_: string) => Promise<number>' is not assignable to type 'SyncFn'.
                Type 'Promise<number>' is not assignable to type 'number'.

          --flow--
          Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
            const foo: Effect<string, number> = createEffect<SyncFn>({
                                                ^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(
                                                [1] ^^^^^^^^^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(config: {
                                                [2] ^^^^^^^^^^^^^^^^^^^^
          "
        `)
      })
      test('use async generic, give sync handler', () => {
        const foo: Effect<string, number> = createEffect<AsyncFn>({
          handler: (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          No overload matches this call.
            Overload 1 of 4, '(handler: AsyncFn): Effect<string, number, Error>', gave the following error.
              Argument of type '{ handler: (_: string) => number; }' is not assignable to parameter of type 'AsyncFn'.
                Object literal may only specify known properties, and 'handler' does not exist in type 'AsyncFn'.
            Overload 2 of 4, '(config: { name?: string | undefined; handler: AsyncFn; sid?: string | undefined; }): Effect<string, number, Error>', gave the following error.
              Type '(_: string) => number' is not assignable to type 'AsyncFn'.
                Type 'number' is not assignable to type 'Promise<number>'.

          --flow--
          Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
            const foo: Effect<string, number> = createEffect<AsyncFn>({
                                                ^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(
                                                [1] ^^^^^^^^^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(config: {
                                                [2] ^^^^^^^^^^^^^^^^^^^^
          "
        `)
      })
      test('use async generic, give async handler', () => {
        const foo: Effect<string, number> = createEffect<AsyncFn>({
          handler: async (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
            const foo: Effect<string, number> = createEffect<AsyncFn>({
                                                ^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(
                                                [1] ^^^^^^^^^^^^^^^^^^^^
                declare export function createEffect<Params, Done, Fail>(config: {
                                                [2] ^^^^^^^^^^^^^^^^^^^^
          "
        `)
      })
    })
    test('config type mismatch (should fail)', () => {
      const foo = createEffect<SyncFn>({
        async handler(_: string) {
          return '--'
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        No overload matches this call.
          Overload 1 of 4, '(handler: SyncFn): Effect<string, number, Error>', gave the following error.
            Argument of type '{ handler(_: string): Promise<string>; }' is not assignable to parameter of type 'SyncFn'.
              Object literal may only specify known properties, and 'handler' does not exist in type 'SyncFn'.
          Overload 2 of 4, '(config: { name?: string | undefined; handler: SyncFn; sid?: string | undefined; }): Effect<string, number, Error>', gave the following error.
            Type '(_: string) => Promise<string>' is not assignable to type 'SyncFn'.
              Type 'Promise<string>' is not assignable to type 'number'.

        --flow--
        Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
          const foo = createEffect<SyncFn>({
                      ^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(
                                              [1] ^^^^^^^^^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(config: {
                                              [2] ^^^^^^^^^^^^^^^^^^^^
        "
      `)
    })
    test('non-function generic', () => {
      const foo: Effect<string, number> = createEffect<string>({
        async handler(_: string) {
          return '--'
        },
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'string' does not satisfy the constraint 'Function'.

        --flow--
        Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
          const foo: Effect<string, number> = createEffect<string>({
                                              ^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(
                                              [1] ^^^^^^^^^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(config: {
                                              [2] ^^^^^^^^^^^^^^^^^^^^
        "
      `)
    })
  })
  describe('without config', () => {
    test('function generic', () => {
      const foo: Effect<string, number> = createEffect<SyncFn>()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Expected 1 arguments, but got 0.

        --flow--
        Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
          const foo: Effect<string, number> = createEffect<SyncFn>()
                                              ^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(
                                              [1] ^^^^^^^^^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(config: {
                                              [2] ^^^^^^^^^^^^^^^^^^^^
        "
      `)
    })
    test('non-function generic', () => {
      const foo = createEffect<string>()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Expected 1 arguments, but got 0.

        --flow--
        Cannot call 'createEffect' because: [incompatible-call] Either cannot use function type [1] with fewer than 3 type arguments. Or cannot use function type [2] with fewer than 3 type arguments
          const foo = createEffect<string>()
                      ^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(
                                              [1] ^^^^^^^^^^^^^^^^^^^^
              declare export function createEffect<Params, Done, Fail>(config: {
                                              [2] ^^^^^^^^^^^^^^^^^^^^
        "
      `)
    })
  })
})

test('#(properties)', () => {
  const effect = createEffect()
  const kind1: kind = effect.kind
  const shortName: string = effect.shortName
  const compositeName: CompositeName = effect.compositeName

  const computed = effect.map(() => 'hello')
  const kind2: kind = computed.kind
  const shortName1: string = computed.shortName
  const compositeName1: CompositeName = computed.compositeName
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#use', () => {
  const effect1 = createEffect()
  const foo = createEffect<number, string, any>()

  effect1.use(params => Promise.resolve('foo'))
  effect1.use(foo)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type 'Effect<number, string, any>' is not assignable to parameter of type '(params: unknown) => unknown'.
      Types of parameters 'payload' and 'params' are incompatible.
        Type 'unknown' is not assignable to type 'number'.

    --flow--
    no errors
    "
  `)
})

describe('#filter', () => {
  it('should filter values (should be ok)', () => {
    const fx = createEffect<number, string, any>()
    fx.use(params => String(params))

    const filteredEvent: Event<number> = fx.filter({
      fn: params => params % 2 === 0,
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

  it('should return correct event type (should fail)', () => {
    const fx = createEffect<number, string, any>()
    fx.use(params => String(params))

    const filteredEvent: Event<boolean> = fx.filter({
      fn: params => params % 2 === 0,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<number>' is not assignable to type 'Event<boolean>'.
        Types of property 'watch' are incompatible.
          Type '(watcher: (payload: number) => any) => Subscription' is not assignable to type '(watcher: (payload: boolean) => any) => Subscription'.
            Types of parameters 'watcher' and 'watcher' are incompatible.
              Types of parameters 'payload' and 'payload' are incompatible.
                Type 'number' is not assignable to type 'boolean'.

      --flow--
      Cannot assign 'fx.filter(...)' to 'filteredEvent'
        const filteredEvent: Event<boolean> = fx.filter({
                                              ^^^^^^^^^^^...
        number [1] is incompatible with boolean [2] in type argument 'Payload' [3]. [incompatible-type-arg]
            const fx = createEffect<number, string, any>()
                                [1] ^^^^^^
            const filteredEvent: Event<boolean> = fx.filter({
                                   [2] ^^^^^^^
            declare export class Event<Payload> implements Unit<Payload> {
                                   [3] ^^^^^^^
      "
    `)
  })
})

describe('#filterMap', () => {
  it('should filter and map values (should be ok)', () => {
    const fx = createEffect<number | string | boolean, string, any>()
    fx.use(params => String(params))

    const filteredEvent: Event<string> = fx.filterMap(params => {
      if (params !== false) {
        return String(params)
      }
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

  it('should return correct event type (should fail)', () => {
    const fx = createEffect<string, string, any>()
    fx.use(params => String(params))

    const filteredEvent: Event<number | void> = fx.filterMap(params => {
      if (params.length > 0) {
        return params.length
      }
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<number>' is not assignable to type 'Event<number | void>'.
        Types of parameters 'payload' and 'payload' are incompatible.
          Type 'number | void' is not assignable to type 'number'.
            Type 'void' is not assignable to type 'number'.

      --flow--
      no errors
      "
    `)
  })
})

it('should pass', () => {
  const handler = (_: any) => {}
  const effect = createEffect<any, any, any>({handler})
  effect(1)
  effect('')
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
it('should allow any value', () => {
  const handler = (_: any) => {}
  const effect = createEffect({handler})
  effect(1)
  effect('')
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
describe('void params', () => {
  it('should allow only calls without arguments', () => {
    const handler = async () => 'ok'
    const effect = createEffect({handler})
    effect(1)
    effect()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'number' is not assignable to parameter of type 'void'.

      --flow--
      no errors
      "
    `)
  })
  describe('with handler', () => {
    test('handler returns void', () => {
      const handler = () => {}
      const effect = createEffect({handler})
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    test('handler returns value', () => {
      const handler = () => 'ok'
      const effect = createEffect({handler})
      const result: Promise<string> = effect()
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
  test('with use', () => {
    const handler = () => {}
    const effect = createEffect('').use(handler)
    effect()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Expected 1 arguments, but got 0.

      --flow--
      no errors
      "
    `)
  })
})
describe('nested effects', () => {
  describe('with handler', () => {
    it('support nesting (should be ok)', () => {
      const nestedEffect: Effect<string, string> = createEffect()
      const parentEffect: Effect<string, string> = createEffect({
        handler: nestedEffect,
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
    test('no false-positive (should be type error)', () => {
      const nestedEffect: Effect<string, string> = createEffect()
      const parentEffect: Effect<number, number> = createEffect(
        'should not throw',
        {
          handler: nestedEffect,
        },
      )
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Effect<string, string, Error>' is not assignable to type 'Effect<number, number, Error>'.
          The types of 'done.watch' are incompatible between these types.
            Type '(watcher: (payload: { params: string; result: string; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { params: number; result: number; }) => any) => Subscription'.
              Types of parameters 'watcher' and 'watcher' are incompatible.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type '{ params: string; result: string; }' is not assignable to type '{ params: number; result: number; }'.

        --flow--
        Cannot assign 'createEffect(...)' to 'parentEffect'
          const parentEffect: Effect<number, number> = createEffect(
                                                       ^^^^^^^^^^^^^...
          number [1] is incompatible with string [2] in type argument 'Params' [3]. [incompatible-type-arg]
              const parentEffect: Effect<number, number> = createEffect(
                                     [1] ^^^^^^
              const nestedEffect: Effect<string, string> = createEffect()
                                     [2] ^^^^^^
              declare export class Effect<Params, Done, Fail = Error>
                                      [3] ^^^^^^
        Cannot assign 'createEffect(...)' to 'parentEffect'
          const parentEffect: Effect<number, number> = createEffect(
                                                       ^^^^^^^^^^^^^...
          string [1] is incompatible with number [2] in type argument 'Done' [3]. [incompatible-type-arg]
              const nestedEffect: Effect<string, string> = createEffect()
                                             [1] ^^^^^^
              const parentEffect: Effect<number, number> = createEffect(
                                             [2] ^^^^^^
              declare export class Effect<Params, Done, Fail = Error>
                                              [3] ^^^^
        "
      `)
    })
  })
  test('with use', () => {})
})
describe('optional params', () => {
  describe('inference of optional argument type from handler type', () => {
    it('should allow calls with and w/o arguments', () => {
      const handler = (params = 0) => params
      const effect = createEffect({handler})
      effect(1)
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    it('should allow calls with and w/o arguments in case of `params?: any`', () => {
      const handler = (params?: any) => params
      const effect = createEffect({handler})
      effect('really anything')
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Expected 1 arguments, but got 0.

        --flow--
        no errors
        "
      `)
    })
  })
})
