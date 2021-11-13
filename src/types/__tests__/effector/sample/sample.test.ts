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

describe('explicit generics', () => {
  test('sample<A, B, R>({source, clock, fn, target})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    const target = createEvent<number>()
    sample<string, number, number>({
      source,
      clock,
      fn: str => str.length,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 14 type arguments, but got 3.
      Parameter 'str' implicitly has an 'any' type.
      "
    `)
  })
  test('sample<A, B>({source, fn, target})', () => {
    const source = createEvent<string>()
    const target = createEvent<number>()
    sample<string, number>({
      source,
      fn: str => str.length,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 14 type arguments, but got 2.
      Parameter 'str' implicitly has an 'any' type.
      "
    `)
  })
  test('sample<A>({source, clock, target})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    const target = createEvent<string>()
    sample<string>({
      source,
      clock,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 14 type arguments, but got 1.
      "
    `)
  })
  test('sample<A>({source, target})', () => {
    const source = createEvent<string>()
    const target = createEvent<string>()
    sample<string>({
      source,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 14 type arguments, but got 1.
      "
    `)
  })
  test('sample<A, B, R>({source, clock, fn})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    const result: Event<number> = sample<string, number, number>({
      source,
      clock,
      fn: (str, num) => str.length + num,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'string' is not assignable to type 'Event<number>'.
      Expected 14 type arguments, but got 3.
      Parameter 'str' implicitly has an 'any' type.
      Parameter 'num' implicitly has an 'any' type.
      "
    `)
  })
  test('sample<A>({source: store, clock})', () => {
    const source = createStore('')
    const clock = createEvent<number>()
    sample<string>({
      source,
      clock,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 14 type arguments, but got 1.
      "
    `)
  })
  test('sample<A>({source: event, clock})', () => {
    const source = createEvent<string>()
    const clock = createEvent<number>()
    sample<string>({
      source,
      clock,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Expected 14 type arguments, but got 1.
      "
    `)
  })
})

test('generic edge cases', () => {
  function generic1<A, B>(target: Store<A>, clock: Event<B>) {
    const result = sample({
      source: target,
      clock,
      target,
    })
  }
  function generic2<A, B>(target: Store<A>, clock: Event<B>) {
    const result: Store<A> = sample({
      source: target,
      clock,
      fn: (source, clock) => source,
      target,
    })
  }
  function generic3<A, B>(target: Store<A>, clock: Event<B>) {
    const result: Event<B> = sample({
      source: target,
      clock,
      fn: (source, clock) => clock,
      target: clock,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
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
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: { a: string; b: boolean; }) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
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
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: { a: string; b: boolean; }) => any) => Subscription' is not assignable to type '(watcher: (payload: string) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
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
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: { a: string; b: boolean; }) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
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
      The types returned by 'getState()' are incompatible between these types.
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
      The types returned by 'getState()' are incompatible between these types.
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
describe('sample + guard (should pass)', () => {
  test("directly assign `guard` invocation to `sample`'s `clock` argument without losing inference in `sample`'s `fn` (should pass)", () => {
    const source = createStore(0)
    const clock = createEvent<number>()

    sample({
      source,
      clock: guard(clock, {
        filter: clock => clock > 0,
      }),
      fn: (source, clock) => source + clock,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test("directly assign `sample` invocation to `guard`'s `source` argument without losing inference in `guard`'s `filter` (should pass)", () => {
    const source = createStore(0)
    const clock = createEvent<number>()

    guard({
      source: sample({
        source,
        clock,
        fn: (source, clock) => source + clock,
      }),
      filter: n => n > 0,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('edge case (should pass)', () => {
    function debounce<T>(event: Event<T>): Event<T> {
      return event
    }
    const $store = createStore(0)
    const $flag = createStore(false)
    const trigger = createEvent<number>()
    const target = createEffect<{field: number; data: number}, void>()

    guard({
      source: sample({
        clock: debounce(trigger),
        source: [$flag, $store],
        fn: ([isAble, field], data) => (isAble ? {field, data} : null),
      }),
      filter: (e): e is {field: number; data: number} => !!e,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Binding element 'isAble' implicitly has an 'any' type.
      Binding element 'field' implicitly has an 'any' type.
      Parameter 'data' implicitly has an 'any' type.
      "
    `)
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
      //@ts-expect-error
      clock: foo,
      fn: foo => foo,
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Store<string>; fn: (foo: string) => string; target: Store<number>; }' is not assignable to parameter of type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: string; targetType: number; }; }'.
      "
    `)
  })
  test('with fn [clock array] (should fail)', () => {
    const foo = createStore(0)
    const bar = createStore(1)
    const target = createStore(2)

    sample({
      //@ts-expect-error
      clock: [foo, bar],
      fn: foo => true,
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Store<number>[]; fn: (foo: number) => boolean; target: Store<number>; }' is not assignable to parameter of type '{ error: \\"fn result should extend target type\\"; targets: { fnResult: boolean; targetType: number; }; }'.
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
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: Store<string>; target: Store<number>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: string; targetType: number; }; }'.
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
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type '{ clock: (Store<boolean> | Store<number> | Store<string>)[]; target: Store<number>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: string | number | boolean; targetType: number; }; }'.
        Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: string | number | boolean; targetType: number; }; }'.
      "
    `)
  })
})
describe('sample + .map', () => {
  test('directly assign `.map` result to `source` (should pass)', () => {
    const event: Event<[{foo: string}]> = createEvent()
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
    const event: Event<[{foo: 'payload'}]> = createEvent()
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
