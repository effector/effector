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
