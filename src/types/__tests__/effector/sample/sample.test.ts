/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  Store,
  Event,
  StoreWritable,
  EventCallable,
} from 'effector'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('guard')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

const typecheck = '{global}'

describe('explicit generics', () => {
  test('sample<A, B, R>({source, clock, fn, target})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    const target = createEvent<number>()
    //@ts-expect-error
    sample<string, number, number>({
      source,
      clock,
      //@ts-expect-error
      fn: str => str.length,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 19 type arguments, but got 3.
      Parameter 'str' implicitly has an 'any' type.
      "
    `)
  })
  test('sample<A, B>({source, fn, target})', () => {
    const source = createEvent<string>()
    const target = createEvent<number>()
    //@ts-expect-error
    sample<string, number>({
      source,
      //@ts-expect-error
      fn: str => str.length,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 19 type arguments, but got 2.
      Parameter 'str' implicitly has an 'any' type.
      "
    `)
  })
  test('sample<A>({source, clock, target})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    const target = createEvent<string>()
    //@ts-expect-error
    sample<string>({
      source,
      clock,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 19 type arguments, but got 1.
      "
    `)
  })
  test('sample<A>({source, target})', () => {
    const source = createEvent<string>()
    const target = createEvent<string>()
    //@ts-expect-error
    sample<string>({
      source,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 19 type arguments, but got 1.
      "
    `)
  })
  test('sample<A, B, R>({source, clock, fn})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    //@ts-expect-error
    const result: Event<number> = sample<string, number, number>({
      source,
      clock,
      //@ts-expect-error
      fn: (str, num) => str.length + num,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'string' is not assignable to type 'Event<number>'.
      Expected 19 type arguments, but got 3.
      Parameter 'str' implicitly has an 'any' type.
      Parameter 'num' implicitly has an 'any' type.
      "
    `)
  })
  test('sample<A>({source: store, clock})', () => {
    const source = createStore('')
    const clock = createEvent<number>()
    //@ts-expect-error
    sample<string>({
      source,
      clock,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 19 type arguments, but got 1.
      "
    `)
  })
  test('sample<A>({source: event, clock})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    //@ts-expect-error
    sample<string>({
      source,
      clock,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 19 type arguments, but got 1.
      "
    `)
  })
})

describe('generic edge cases', () => {
  test('generic edge cases (should pass)', () => {
    function generic1<A, B>(target: StoreWritable<A>, clock: EventCallable<B>) {
      {
        sample({
          source: target,
          clock,
          target,
        })
        const result = sample({
          source: target,
          clock,
        })
      }
      {
        const result: Store<A> = sample({
          source: target,
          clock,
          fn: (source, clock) => source,
          target,
        })
      }
      {
        const result: Event<B> = sample({
          source: target,
          clock,
          fn: (source, clock) => clock,
          target: clock,
        })
      }
      {
        sample({
          clock,
          source: target,
          filter: Boolean,
          target,
        })
        const result = sample({
          clock,
          source: target,
          filter: Boolean,
        })
      }
      {
        sample({
          clock,
          source: target,
          filter: Boolean,
          fn: (source, clock) => source,
          target,
        })
        const result = sample({
          clock,
          source: target,
          filter: Boolean,
          fn: (source, clock) => source,
        })
      }
      {
        sample({
          clock,
          source: target,
          filter: (source, clock) => true,
          fn: (source, clock) => source,
          target,
        })
        const result = sample({
          clock,
          source: target,
          filter: (source, clock) => true,
          fn: (source, clock) => source,
        })
      }
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('generic edge cases (should fail)', () => {
    function generic1<A, B>(target: StoreWritable<A>, clock: EventCallable<B>) {
      {
        //@ts-expect-error
        sample({
          source: target,
          clock,
          target: clock,
        })
      }
      {
        //@ts-expect-error
        sample({
          source: target,
          clock,
          fn: (source, clock) => source,
          target: clock,
        })
      }
      {
        //@ts-expect-error
        sample({
          source: target,
          clock,
          fn: (source, clock) => clock,
          target,
        })
      }
      {
        //@ts-expect-error
        const result = sample({
          clock,
          source: target,
          filter: Boolean,
          target: clock,
        })
      }
      {
        //@ts-expect-error
        const result = sample({
          clock,
          source: target,
          filter: Boolean,
          fn: (source, clock) => clock,
          target,
        })
      }
      {
        //@ts-expect-error
        const result = sample({
          clock,
          source: target,
          filter: (source, clock) => true,
          fn: (source, clock) => clock,
          target,
        })
      }
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '[{ source: StoreWritable<A>; clock: EventCallable<B>; target: EventCallable<B>; }]' is not assignable to parameter of type 'TargetOrError<A, \\"src\\", EventCallable<B>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: undefined; target: EventCallable<B>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }>'.
      Argument of type '[{ source: StoreWritable<A>; clock: EventCallable<B>; fn: (source: A, clock: B) => A; target: EventCallable<B>; }]' is not assignable to parameter of type 'TargetOrError<A, \\"fnRet\\", EventCallable<B>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: undefined; fn: (source: A, clock: B) => A; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }>'.
      Argument of type '[{ source: StoreWritable<A>; clock: EventCallable<B>; fn: (source: A, clock: B) => B; target: StoreWritable<A>; }]' is not assignable to parameter of type 'TargetOrError<B, \\"fnRet\\", StoreWritable<A>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: undefined; fn: (source: A, clock: B) => B; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }>'.
      Argument of type '[{ clock: EventCallable<B>; source: StoreWritable<A>; filter: BooleanConstructor; target: EventCallable<B>; }]' is not assignable to parameter of type 'TargetOrError<NonFalsy<A>, \\"src\\", EventCallable<B>, { clock: EventCallable<B>; source: StoreWritable<A>; filter: BooleanConstructor; target: EventCallable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }>'.
      Argument of type '[{ clock: EventCallable<B>; source: StoreWritable<A>; filter: BooleanConstructor; fn: (source: NonFalsy<A>, clock: B) => B; target: StoreWritable<...>; }]' is not assignable to parameter of type 'TargetOrError<B, \\"fnRet\\", StoreWritable<A>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: BooleanConstructor | undefined; fn?: ((source: NonFalsy<...>, clock: B) => B) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }>'.
      Argument of type '[{ clock: EventCallable<B>; source: StoreWritable<A>; filter: (source: A, clock: B) => true; fn: (source: A, clock: B) => B; target: StoreWritable<...>; }]' is not assignable to parameter of type 'TargetOrError<B, \\"fnRet\\", StoreWritable<A>, { clock: EventCallable<B>; source: StoreWritable<A>; filter?: ((source: A, clock: B) => true) | undefined; fn?: ((source: A, clock: B) => B) | undefined; target: StoreWritable<...>; greedy?: boolean | undefined; batch?: boolean | undefined; } & { ...; }>'.
      "
    `)
  })
})

test('event by event', () => {
  const a = createEvent<number>()
  const b = createEvent<boolean>()
  const c = sample(a, b)

  const sample_ee_check1: Event<number> = c
  //@ts-expect-error
  const sample_ee_check2: Event<string> = c
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<number>' is not assignable to type 'Event<string>'.
    "
  `)
})
test('event by event with handler', () => {
  const a = createEvent<string>()
  const b = createEvent<boolean>()
  const c = sample(a, b, (a, b) => ({a, b}))

  const sample_eeh_check1: Event<{a: string; b: boolean}> = c
  //@ts-expect-error
  const sample_eeh_check2: Event<string> = c
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<{ a: string; b: boolean; }>' is not assignable to type 'Event<string>'.
      Type '{ a: string; b: boolean; }' is not assignable to type 'string'.
    "
  `)
})

test('store by event', () => {
  const d = createStore(0)
  const b = createEvent<boolean>()
  const e = sample(d, b)

  const sample_se_check1: Event<number> = e
  //@ts-expect-error
  const sample_se_check2: Event<string> = e
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<number>' is not assignable to type 'Event<string>'.
    "
  `)
})
test('store by event with handler', () => {
  const d = createStore('')
  const b = createEvent<boolean>()
  const e = sample(d, b, (a, b) => ({a, b}))

  const sample_seh_check1: Event<{a: string; b: boolean}> = e
  //@ts-expect-error
  const sample_seh_check2: Event<string> = e
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<{ a: string; b: boolean; }>' is not assignable to type 'Event<string>'.
      Type '{ a: string; b: boolean; }' is not assignable to type 'string'.
    "
  `)
})

test('effect by event', () => {
  const f = createEffect<string, any, any>()
  const b = createEvent<boolean>()
  const g = sample(f, b)

  const sample_efe_check1: Event<string> = g
  //@ts-expect-error
  const sample_efe_check2: Event<number> = g
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<string>' is not assignable to type 'Event<number>'.
    "
  `)
})
test('effect by event with handler', () => {
  const f = createEffect<string, any, any>()
  const b = createEvent<boolean>()
  const g = sample(f, b, (a, b) => ({a, b}))

  const sample_efeh_check1: Event<{a: string; b: boolean}> = g
  //@ts-expect-error
  const sample_efeh_check2: Event<number> = g
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Event<{ a: string; b: boolean; }>' is not assignable to type 'Event<number>'.
      Type '{ a: string; b: boolean; }' is not assignable to type 'number'.
    "
  `)
})

test('store by store', () => {
  const a = createStore(false)
  const b = createStore(0)
  const c = sample(a, b)

  const sample_ss_check1: Store<boolean> = c
  //@ts-expect-error
  const sample_ss_check2: Store<string> = c
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Store<boolean>' is not assignable to type 'Store<string>'.
      Type 'boolean' is not assignable to type 'string'.
    "
  `)
})
test('store by store with handler', () => {
  const a = createStore('')
  const b = createStore(true)
  const c = sample(a, b, (a, b) => ({a, b}))

  const sample_ssh_check1: Store<{a: string; b: boolean}> = c
  //@ts-expect-error
  const sample_ssh_check2: Store<string> = c
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'Store<{ a: string; b: boolean; }>' is not assignable to type 'Store<string>'.
      Type '{ a: string; b: boolean; }' is not assignable to type 'string'.
    "
  `)
})
describe('sample(Store<T>):Store<T>', () => {
  test('correct case (should pass)', () => {
    const a = createStore('')
    const sample_s_correct: Store<string> = sample(a)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('incorrect case (should fail)', () => {
    const a = createStore('')
    //@ts-expect-error
    const sample_s_incorrect: Store<number> = sample(a)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Store<string>' is not assignable to type 'Store<number>'.
      "
    `)
  })
  describe('edge case', () => {
    test('correct case (should pass)', () => {
      const a = createStore('')
      const clock = createEvent()
      const sample_s_edge_correct: Event<string> = sample(a, clock)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('incorrect case (should fail)', () => {
      const a = createStore('')
      const clock = createEvent()
      //@ts-expect-error
      const sample_s_edge_incorrect: Event<number> = sample(a, clock)
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type 'Event<string>' is not assignable to type 'Event<number>'.
        "
      `)
    })
  })
})
describe('without clock', () => {
  test('with fn (should pass)', () => {
    const source = createStore([{foo: 'ok', bar: 0}])
    const target = createStore({foo: '...', bar: 1})

    sample({
      source,
      target,
      fn: ([obj]) => obj,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('with fn [combinable] (should pass)', () => {
    const foo = createStore('ok')
    const bar = createStore(0)
    const target = createStore({foo: '...', bar: 1})

    sample({
      source: {foo, bar},
      target,
      fn: ({foo, bar}) => ({foo, bar}),
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })

  test('without fn (should pass)', () => {
    const source = createEvent()
    const fx = createEffect<void, void, any>()

    sample({
      source,
      target: fx,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('without fn [combinable] (should pass)', () => {
    const foo = createStore('ok')
    const bar = createStore(0)
    const target = createStore({foo: '...', bar: 1})

    sample({
      source: {foo, bar},
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('without fn, any to void (should pass)', () => {
    const source = createEvent<string>()
    const target = createEvent<void>()
    sample({
      source,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
describe('clock without source', () => {
  test('with fn (should pass)', () => {
    const clock = createStore([{foo: 'ok', bar: 0}])
    const target = createStore({foo: '...', bar: 1})
    sample({
      clock,
      target,
      fn: ([obj]) => obj,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('with fn [clock array] (should pass)', () => {
    const clock = createStore({foo: 'ok', bar: 0})
    const target = createStore({foo: '...', bar: 1})
    sample({
      clock: [clock],
      target,
      fn: foo => foo,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('without fn (should pass)', () => {
    const clock = createEvent<number>()
    const fx = createEffect<number, void, any>()
    sample({
      clock,
      target: fx,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('without fn [void] (should pass)', () => {
    const clock = createEvent()
    const fx = createEffect<void, void, any>()
    sample({
      clock,
      target: fx,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('without fn [clock array] (should pass)', () => {
    const foo = createStore('ok')
    const bar = createStore(0)
    const target = createEvent<string | number>()
    sample({
      clock: [foo, bar],
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('without fn, any to void (should pass)', () => {
    const clock = createEvent<string>()
    const target = createEvent<void>()
    sample({
      clock,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('with fn (should fail)', () => {
    const foo = createStore('ok')
    const target = createStore(1)
    sample({
      clock: foo,
      fn: foo => foo,
      //@ts-expect-error
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }; }'.
      "
    `)
  })
  test('with fn [clock array] (should fail)', () => {
    const foo = createStore(0)
    const bar = createStore(1)
    const target = createStore(2)

    sample({
      clock: [foo, bar],
      fn: foo => true,
      //@ts-expect-error
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: boolean; targetType: number; }; }'.
      "
    `)
  })
  test('without fn (should fail)', () => {
    const foo = createStore('ok')
    const target = createStore(1)

    sample({
      //@ts-expect-error
      clock: foo,
      //@ts-expect-error
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }; }'.
      "
    `)
  })

  test('without fn [clock array] (should fail)', () => {
    const foo = createStore('ok')
    const bar = createStore(0)
    const baz = createStore(true)
    const target = createStore(1)

    sample({
      //@ts-expect-error
      clock: [foo, bar, baz],
      //@ts-expect-error
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string | number | boolean; targetType: number; }; }'.
      "
    `)
  })
})
describe('sample + .map', () => {
  test('directly assign `.map` result to `source` (should pass)', () => {
    const event: EventCallable<[{foo: string}]> = createEvent()
    const target = createStore('yes')

    sample({
      source: event.map(([obj]) => obj.foo),
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('directly assign `.map` result to `source` without losing inference in `fn` (should pass)', () => {
    const event: EventCallable<[{foo: 'payload'}]> = createEvent()
    const a = createStore(0)
    const b = createEvent<number | string>()

    sample({
      source: event.map(([obj]) => obj.foo),
      fn: payload =>
        // cast never if payload is any
        (payload as 0 extends 1 & typeof payload ? never : typeof payload)
          .length,
      target: [a, b],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('from unknown to known type (should fail)', () => {
  const emitUnknown = createEvent<unknown>()
  const receiveNumber = createEvent<number>()
  sample({
    //@ts-expect-error
    source: emitUnknown,
    target: receiveNumber,
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: unknown; targetType: number; }; }'.
    "
  `)
})

describe('derived unit in target', () => {
  test('should not allow derived unit in target (should fail)', () => {
    const start = createEvent()
    const started = start.map(() => true)
    const $store = createStore(false)
    const $storeMap = $store.map(() => true)

    const trigger = createEvent()

    function wrap() {
      sample({
        clock: trigger,
        //@ts-expect-error
        target: started,
      })

      sample({
        clock: trigger,
        //@ts-expect-error
        target: $storeMap,
      })

      sample({
        clock: trigger,
        fn: () => true,
        //@ts-expect-error
        target: [started, $store, $storeMap],
      })
    }

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"derived units are not allowed in target\\"; got: Event<boolean>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"derived units are not allowed in target\\"; got: Store<boolean>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"derived units are not allowed in target\\"; got: (Store<boolean> | Event<boolean>)[]; }'.
      "
    `)
  })
})

describe('mix of wider and narrower types', () => {
  /** exact type match is hard, so we accept wider types here */
  test('source exact, target exact and narrower (should pass)', () => {
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      source: exact,
      target: [exact, narrower],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock exact and narrower, target exact and narrower (should fail)', () => {
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      //@ts-expect-error
      clock: [exact, narrower],
      target: [exact, narrower],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  /** exact type match is hard, so we accept wider types here */
  test('clock exact, target exact and narrower (should pass)', () => {
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      clock: [exact],
      target: [exact, narrower],
    })
    sample({
      clock: exact,
      target: [exact, narrower],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock exact nullable, target exact and narrower (should fail)', () => {
    const clock = createEvent<{a: string; b: string} | null>()
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      //@ts-expect-error
      clock: [clock],
      //@ts-expect-error
      target: [exact, narrower],
    })
    sample({
      //@ts-expect-error
      clock,
      //@ts-expect-error
      target: [exact, narrower],
    })
    sample({
      //@ts-expect-error
      clock,
      target: [exact],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: string; b: string; } | null; targetType: { a: string; }; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: string; b: string; } | null; targetType: { a: string; }; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: string; b: string; } | null; targetType: { a: string; b: string; }; }[]; }'.
      "
    `)
  })
  /** exact type match is hard, so we accept wider types here */
  test('clock exact nullable, target exact and narrower, filter Boolean (should pass)', () => {
    const clock = createEvent<{a: string; b: string} | null>()
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      clock: [clock],
      filter: Boolean,
      target: [exact, narrower],
    })
    sample({
      clock,
      filter: Boolean,
      target: [exact, narrower],
    })
    sample({
      clock,
      filter: Boolean,
      target: [exact],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('clock exact and narrower nullable, target exact and narrower, filter Boolean (should fail)', () => {
    const clockExact = createEvent<{a: string; b: string} | null>()
    const clockNarrower = createEvent<{a: string} | null>()
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      clock: [
        clockExact,
        //@ts-expect-error
        clockNarrower,
      ],
      filter: Boolean,
      target: [exact, narrower],
    })
    sample({
      clock: [clockExact, clockNarrower],
      filter: Boolean,
      target: [narrower],
    })
    sample({
      clock: [
        clockExact,
        //@ts-expect-error
        clockNarrower,
      ],
      filter: Boolean,
      target: [exact],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: string; b: string; } | { a: string; }; targetType: { a: string; b: string; }; }[]; }'.
      "
    `)
  })
  test('clock exact and narrower, target exact (should fail)', () => {
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()

    sample({
      //@ts-expect-error
      clock: [exact, narrower],
      target: [exact],
    })
    sample({
      //@ts-expect-error
      clock: [exact, narrower],
      target: exact,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: string; b: string; } | { a: string; }; targetType: { a: string; b: string; }; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: string; b: string; } | { a: string; }; targetType: { a: string; b: string; }; }; }'.
      "
    `)
  })
  // clock types are failing when target is narrower so probably source should behave in that way too
  test('source exact, target union with narrower and exact (should pass)', () => {
    const exact = createEvent<{a: string; b: string}>()
    const narrower = createEvent<{a: string}>()
    const narrowerUnion = createEvent<{a: number} | {a: string; b: string}>()

    sample({clock: exact, target: narrower})
    sample({clock: exact, target: [narrower]})
    sample({clock: exact, target: narrowerUnion})
    sample({clock: exact, target: [narrowerUnion]})
    sample({clock: exact, target: [narrowerUnion, narrower]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('should not mark correct case near incorrect with source (should pass)', () => {
    const source = createEvent<{a: string; b: string}>()
    const incorrect = createEvent<{a: number}>()
    const correct = createEvent<{a: string; b: string} | {a: number}>()

    sample({
      source,
      target: [correct],
    })

    sample({
      source,
      target: [
        correct,
        //@ts-expect-error
        incorrect,
      ],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('should not mark correct case near incorrect with clock (should fail)', () => {
    const clock = createEvent<{a: string; b: string}>()
    const incorrect = createEvent<{a: number}>()
    const correct = createEvent<{a: string; b: string} | {a: number}>()

    // this should pass
    sample({
      clock,
      target: [correct],
    })

    sample({
      //@ts-expect-error
      clock,
      target: [
        correct,
        //@ts-expect-error
        incorrect,
      ],
    })
    sample({
      //@ts-expect-error
      clock: [clock],
      target: [
        correct,
        //@ts-expect-error
        incorrect,
      ],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('edge cases from issue #957 (should fail)', () => {
  const clock = createEvent<number>()

  const target1 = createEvent<number>()
  const target2 = createEvent<string>()

  sample({
    //@ts-expect-error
    clock,
    // @ts-expect-error
    target: [target1, target2],
  })

  sample({
    //@ts-expect-error
    clock,
    // @ts-expect-error
    target: [target2, target1],
  })

  sample({
    //@ts-expect-error
    clock,
    // @ts-expect-error
    target: [target2],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: number; targetType: string; }[]; }'.
    "
  `)
})

describe('cross mismatch', () => {
  test('cloct target cross mismatch (should fail)', () => {
    const str = createEvent<string>()
    const num = createEvent<number>()

    sample({
      //@ts-expect-error
      clock: [str, num],
      //@ts-expect-error
      target: [str, num],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
