/* eslint-disable no-unused-vars */
import {
  createEffect,
  createStore,
  sample,
  Effect,
  Event,
  CompositeName,
  kind,
} from 'effector'

const typecheck = '{global}'

test('generics support', () => {
  function createModel<T>() {
    const $data = createStore<T | null>(null)
    const fx = createEffect(() => null as T)
    sample({clock: fx.doneData, target: $data})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 4 'sample({clock: fx.doneData, target: $data})'
    Type 'StoreWritable<T | null>' is not assignable to type 'RebuildTargetClockLoop<[Event<Awaited<T>>], StoreWritable<T | null>, T | null, \\"noFilter\\">'.
    "
  `)
})

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
    no errors
    "
  `)
})

describe('createEffect(handler)', () => {
  test('createEffect<P, D>(handler)', () => {
    const fx1: Effect<string, number> = createEffect<string, number>(
      word => word.length,
    )
    const fx2: Effect<string, number> = createEffect<string, number>(
      (word: string) => word.length,
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('createEffect<P, D, F>(handler)', () => {
    //prettier-ignore
    const fx1: Effect<string, number, TypeError> = createEffect<string, number, TypeError>(word => word.length)
    //prettier-ignore
    const fx2: Effect<string, number, TypeError> = createEffect<string, number, TypeError>((word: string) => word.length)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('createEffect<typeof handler>(handler)', () => {
    const handler = (word: string) => word.length
    const fx: Effect<string, number> = createEffect<typeof handler>(handler)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('createEffect<typeof handler, Error>(handler)', () => {
    const handler = (word: string) => word.length
    //prettier-ignore
    const fx: Effect<string, number, TypeError> = createEffect<typeof handler, TypeError>(handler)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('type inference support', () => {
    const fx: Effect<string, number> = createEffect(
      (word: string) => word.length,
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('edge case with function in params', () => {
    type Params = (x: number) => string
    const fx1: Effect<Params, string> = createEffect<Params, string>(fn =>
      fn(0),
    )
    const fx2: Effect<Params, string> = createEffect<Params, string>(
      (fn: Params) => fn(0),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
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
          no errors
          "
        `)
      })
      test('use sync generic, give async handler', () => {
        const foo: Effect<string, number> = createEffect<SyncFn>({
          handler: async (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Unmarked error at test line 2 'handler: async (_: string) => 0,'
          No overload matches this call.
            Overload 1 of 7, '(handler: SyncFn): Effect<string, number, Error>', gave the following error.
              Object literal may only specify known properties, and 'handler' does not exist in type 'SyncFn'.
            Overload 2 of 7, '(config: { name?: string | undefined; handler: SyncFn; sid?: string | undefined; domain?: Domain | undefined; }): Effect<string, number, Error>', gave the following error.
              Type '(_: string) => Promise<number>' is not assignable to type 'SyncFn'.
                Type 'Promise<number>' is not assignable to type 'number'.
          "
        `)
      })
      test('use async generic, give sync handler', () => {
        const foo: Effect<string, number> = createEffect<AsyncFn>({
          handler: (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Unmarked error at test line 2 'handler: (_: string) => 0,'
          No overload matches this call.
            Overload 1 of 7, '(handler: AsyncFn): Effect<string, number, Error>', gave the following error.
              Object literal may only specify known properties, and 'handler' does not exist in type 'AsyncFn'.
            Overload 2 of 7, '(config: { name?: string | undefined; handler: AsyncFn; sid?: string | undefined; domain?: Domain | undefined; }): Effect<string, number, Error>', gave the following error.
              Type '(_: string) => number' is not assignable to type 'AsyncFn'.
                Type 'number' is not assignable to type 'Promise<number>'.
          "
        `)
      })
      test('use async generic, give async handler', () => {
        const foo: Effect<string, number> = createEffect<AsyncFn>({
          handler: async (_: string) => 0,
        })
        expect(typecheck).toMatchInlineSnapshot(`
          "
          no errors
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
        Unmarked error at test line 2 'async handler(_: string) {'
        No overload matches this call.
          Overload 1 of 7, '(handler: SyncFn): Effect<string, number, Error>', gave the following error.
            Object literal may only specify known properties, and 'handler' does not exist in type 'SyncFn'.
          Overload 2 of 7, '(config: { name?: string | undefined; handler: SyncFn; sid?: string | undefined; domain?: Domain | undefined; }): Effect<string, number, Error>', gave the following error.
            Type '(_: string) => Promise<string>' is not assignable to type 'SyncFn'.
              Type 'Promise<string>' is not assignable to type 'number'.
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
        Unmarked error at test line 1 'const foo: Effect<string, number> = createEffect<string>({'
        Type 'string' does not satisfy the constraint 'Function'.
        "
      `)
    })
  })
  describe('without config', () => {
    test('function generic', () => {
      const foo: Effect<string, number> = createEffect<SyncFn>()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 1 'const foo: Effect<string, number> = createEffect<SyncFn>()'
        Expected 1-2 arguments, but got 0.
        "
      `)
    })
    test('non-function generic', () => {
      const foo = createEffect<string>()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Unmarked error at test line 1 'const foo = createEffect<string>()'
        Expected 1-2 arguments, but got 0.
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
    no errors
    "
  `)
})

test('#use', () => {
  const effect1 = createEffect()
  const foo = createEffect<number, string, any>()

  effect1.use(arg => Promise.resolve('foo'))
  //@ts-expect-error
  effect1.use(foo)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type 'Effect<number, string, any>' is not assignable to parameter of type '(params: unknown) => unknown'.
      Types of parameters 'params' and 'params' are incompatible.
        Type 'unknown' is not assignable to type 'number'.
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
      no errors
      "
    `)
  })

  it('should return correct event type (should fail)', () => {
    const fx = createEffect<number, string, any>()
    fx.use(params => String(params))

    //@ts-expect-error
    const filteredEvent: Event<boolean> = fx.filter({
      fn: params => params % 2 === 0,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Event<number>' is not assignable to type 'Event<boolean>'.
        Type 'number' is not assignable to type 'boolean'.
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
      no errors
      "
    `)
  })

  it('should return correct event type (should pass)', () => {
    const fx = createEffect<string, string, any>()
    fx.use(params => String(params))

    const filteredEvent: Event<number | void> = fx.filterMap(params => {
      if (params.length > 0) {
        return params.length
      }
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
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
    no errors
    "
  `)
})
describe('void params', () => {
  describe('should allow only calls without arguments', () => {
    test('createEffect(config)', () => {
      const handler = async () => 'ok'
      const effect = createEffect({handler})
      //@ts-expect-error
      effect(1)
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type 'number' is not assignable to parameter of type 'void'.
        "
      `)
    })
    test('createEffect(name, config)', () => {
      const handler = async () => 'ok'
      const effect = createEffect('effect', {handler})
      //@ts-expect-error
      effect(1)
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type 'number' is not assignable to parameter of type 'void'.
        "
      `)
    })
  })
  describe('with handler', () => {
    test('handler returns void', () => {
      const handler = () => {}
      const effect = createEffect({handler})
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
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
      Unmarked error at test line 3 'effect()'
      Expected 1 arguments, but got 0.
      "
    `)
  })
  describe('with createEffect(handler)', () => {
    test('void params should allow only call without arguments', () => {
      const fx = createEffect(() => 'ok')
      fx()
      //@ts-expect-error
      fx(1)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type 'number' is not assignable to parameter of type 'void'.
        "
      `)
    })
    test('optional params should allow call with and without arguments', () => {
      const fx = createEffect((params = 1) => 'ok')
      const assert: Effect<number | void, 'ok'> = fx
      fx()
      fx(1)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
  describe('with createEffect<P, D, F>(handler)', () => {
    test('void params should allow only call without arguments', () => {
      const fx = createEffect<void, string, TypeError>(() => 'ok')
      fx()
      //@ts-expect-error
      fx(1)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Argument of type 'number' is not assignable to parameter of type 'void'.
        "
      `)
    })
    test('optional params should allow call with and without arguments', () => {
      const fx = createEffect<number | void, 'ok', TypeError>(
        (params = 1) => 'ok',
      )
      fx()
      fx(1)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
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
        no errors
        "
      `)
    })
    test('no false-positive (should be type error)', () => {
      const nestedEffect: Effect<string, string> = createEffect()
      //@ts-expect-error
      const parentEffect: Effect<number, number> = createEffect(
        'should not throw',
        {
          handler: nestedEffect,
        },
      )
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Effect<string, string, Error>' is not assignable to type 'Effect<number, number, Error>'.
          Types of property 'done' are incompatible.
            Type 'Event<{ params: string; result: string; }>' is not assignable to type 'Event<{ params: number; result: number; }>'.
              Type '{ params: string; result: string; }' is not assignable to type '{ params: number; result: number; }'.
                Types of property 'params' are incompatible.
                  Type 'string' is not assignable to type 'number'.
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
        Unmarked error at test line 4 'effect()'
        Expected 1 arguments, but got 0.
        "
      `)
    })
  })
})
