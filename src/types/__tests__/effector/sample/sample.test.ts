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
  UnitTargetable,
} from 'effector'

const typecheck = '{global}'

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
      //@ts-expect-error
      fn: foo => foo,
      //@ts-expect-error
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'string' is not assignable to type 'number'.
      Type 'StoreWritable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
  test('with fn [clock array] (should fail)', () => {
    const foo = createStore(0)
    const bar = createStore(1)
    const target = createStore(2)

    sample({
      clock: [foo, bar],
      //@ts-expect-error
      fn: foo => true,
      //@ts-expect-error
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'boolean' is not assignable to type 'number'.
      Type 'StoreWritable<number>' is not assignable to type 'Unit<true>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'true'.
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
      Type 'StoreWritable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'StoreWritable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
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
      Type 'StoreWritable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'StoreWritable<boolean>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'boolean' is not assignable to type 'number'.
      Type 'StoreWritable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})

describe('no config', () => {
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
        Type 'number' is not assignable to type 'string'.
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
        Type 'number' is not assignable to type 'string'.
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
        Type 'string' is not assignable to type 'number'.
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
          Type 'string' is not assignable to type 'number'.
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
            Type 'string' is not assignable to type 'number'.
          "
        `)
      })
    })
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
    Type 'EventCallable<unknown>' is not assignable to type 'Unit<number>'.
      Types of property '__' are incompatible.
        Type 'unknown' is not assignable to type 'number'.
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
      Type 'Event<boolean>' is missing the following properties from type 'EventCallable<boolean>': prepend, targetable
      Type 'Store<boolean>' is missing the following properties from type 'StoreWritable<boolean>': ____, on, off, reset, and 2 more.
      Type 'Event<boolean>' is missing the following properties from type 'EventCallable<boolean>': prepend, targetable
      Type 'Store<boolean>' is missing the following properties from type 'StoreWritable<boolean>': ____, on, off, reset, and 2 more.
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
      Unmarked error at test line 13 'correct,'
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
      "
    `)
  })
  test('should not mark correct case near incorrect with clock (should pass)', () => {
    const clock = createEvent<{a: string; b: string}>()
    const incorrect = createEvent<{a: number}>()
    const correct = createEvent<{a: string; b: string} | {a: number}>()

    sample({
      clock,
      target: [correct],
    })

    sample({
      clock,
      target: [
        correct,
        //@ts-expect-error
        incorrect,
      ],
    })
    sample({
      clock: [clock],
      target: [
        correct,
        //@ts-expect-error
        incorrect,
      ],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 11 'clock,'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
      Unmarked error at test line 19 'clock: [clock],'
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
      Type 'EventCallable<{ a: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
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
      Type 'EventCallable<{ a: string; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
            Type 'null' is not assignable to type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; }>' is not assignable to type 'UnitTargetable<{ a: string; b: string; } | null>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
            Type 'null' is not assignable to type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; }>' is not assignable to type 'UnitTargetable<{ a: string; b: string; } | null>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; b: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | null' is not assignable to type '{ a: string; b: string; }'.
            Type 'null' is not assignable to type '{ a: string; b: string; }'.
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
      Type 'EventCallable<{ a: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; } | null' is not assignable to type '{ a: string; b: string; }'.
            Type 'null' is not assignable to type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; } | null>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; } | null' is not assignable to type '{ a: string; b: string; }'.
            Type 'null' is not assignable to type '{ a: string; b: string; }'.
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
      Type 'EventCallable<{ a: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: string; }' but required in type '{ a: string; b: string; }'.
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
      Unmarked error at test line 13 'correct,'
      Type 'EventCallable<{ a: string; b: string; } | { a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Type '{ a: string; b: string; } | { a: number; }' is not assignable to type '{ a: string; b: string; }'.
            Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: number; }>' is not assignable to type 'Unit<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
      Type 'EventCallable<{ a: string; b: string; }>' is not assignable to type 'Unit<{ a: number; }>'.
        The types of '__.a' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<{ a: number; }>' is not assignable to type 'UnitTargetable<{ a: string; b: string; }>'.
        Types of property '__' are incompatible.
          Property 'b' is missing in type '{ a: number; }' but required in type '{ a: string; b: string; }'.
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
    Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
      Types of property '__' are incompatible.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
      Types of property '__' are incompatible.
        Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
      Types of property '__' are incompatible.
        Type 'string' is not assignable to type 'number'.
    "
  `)
})

describe('void type with filter edge case', () => {
  test('inline filter (should pass)', () => {
    const $data = createStore<{data: any} | undefined>(undefined, {
      skipVoid: false,
    })

    const target = createEvent<{data: any}>()

    sample({
      source: $data,
      filter: (data): data is {data: any} => !!data,
      fn: data => data.data,
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 10 'fn: data => data.data,'
      'data' is possibly 'undefined'.
      "
    `)
  })
  test('filter as value (should pass)', () => {
    const $data = createStore<{data: any} | undefined>(undefined, {
      skipVoid: false,
    })

    const target = createEvent<{data: any}>()

    const hasData = (data: {data: any} | undefined): data is {data: any} =>
      !!data

    sample({
      source: $data,
      filter: hasData,
      fn: data => data.data,
      target,
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
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
      Type 'EventCallable<string>' is not assignable to type 'Unit<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
        Types of property '__' are incompatible.
          Type 'string' is not assignable to type 'number'.
      Type 'EventCallable<number>' is not assignable to type 'UnitTargetable<string>'.
        Types of property '__' are incompatible.
          Type 'number' is not assignable to type 'string'.
      "
    `)
  })
})

test('void target', () => {
  const clock = createEvent<number>()
  const voidt = createEvent<void>()
  sample({clock, target: voidt})
  sample({clock, target: [voidt]})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('partial edge case', () => {
  type Data = {
    type: 'ticket' | 'search'
    source: string
  }
  type SpreadData = Partial<{
    type: 'ticket' | 'search' | null
    source: string | null
  }>
  function spread<Payload>(
    targets: {
      [Key in keyof Payload]?: UnitTargetable<Payload[Key]>
    },
  ): EventCallable<Partial<Payload>> {
    return createEvent<Partial<Payload>>()
  }
  const clock = createEvent<Data>()
  const target = createEvent<SpreadData>()
  const $filter = createStore(true)
  const $type = createStore<'ticket' | 'search' | null>(null)
  const $source = createStore<string | null>(null)
  const voidTarget = createEvent()
  describe('no inline', () => {
    test('with filter, without array target (should pass)', () => {
      sample({clock, filter: $filter, target})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('with filter, with array target (should pass)', () => {
      sample({clock, filter: $filter, target: [target]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('without filter, without array target (should pass)', () => {
      sample({clock, target})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('without filter, with array target (should pass)', () => {
      sample({clock, target: [target]})
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
  describe('with inline', () => {
    describe('with filter', () => {
      describe('without array target', () => {
        test('argument type (should pass)', () => {
          sample({
            clock,
            filter: $filter,
            target: voidTarget.prepend((args: SpreadData) => {}),
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('generic type (should pass)', () => {
          sample({
            clock,
            filter: $filter,
            target: voidTarget.prepend<SpreadData>(args => {}),
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('spread type (should pass)', () => {
          sample({
            clock,
            filter: $filter,
            target: spread({
              type: $type,
              source: $source,
            }),
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
      })
      describe('with array target', () => {
        test('argument type (should pass)', () => {
          sample({
            clock,
            filter: $filter,
            target: [voidTarget.prepend((args: SpreadData) => {})],
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('generic type (should pass)', () => {
          sample({
            clock,
            filter: $filter,
            target: [voidTarget.prepend<SpreadData>(args => {})],
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('spread type (should pass)', () => {
          sample({
            clock,
            filter: $filter,
            target: [
              spread({
                type: $type,
                source: $source,
              }),
            ],
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            Unmarked error at test line 4 'target: ['
            Type 'EventCallable<Partial<{ type: \\"search\\" | \\"ticket\\" | null; source: string | null; }>>[]' is not assignable to type 'undefined'.
            "
          `)
        })
      })
    })
    describe('without filter', () => {
      describe('without array target', () => {
        test('argument type (should pass)', () => {
          sample({
            clock,
            target: voidTarget.prepend((args: SpreadData) => {}),
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('generic type (should pass)', () => {
          sample({
            clock,
            target: voidTarget.prepend<SpreadData>(args => {}),
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('generic type (should pass)', () => {
          sample({
            clock,
            target: spread({
              type: $type,
              source: $source,
            }),
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
      })
      describe('with array target', () => {
        test('argument type (should pass)', () => {
          sample({
            clock,
            target: [voidTarget.prepend((args: SpreadData) => {})],
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('generic type (should pass)', () => {
          sample({
            clock,
            target: [voidTarget.prepend<SpreadData>(args => {})],
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            no errors
            "
          `)
        })
        test('spread type (should pass)', () => {
          sample({
            clock,
            target: [
              spread({
                type: $type,
                source: $source,
              }),
            ],
          })
          expect(typecheck).toMatchInlineSnapshot(`
            "
            Unmarked error at test line 1 'sample({'
            Argument of type '[{ clock: EventCallable<Data>; target: EventCallable<Partial<{ type: \\"search\\" | \\"ticket\\" | null; source: string | null; }>>[]; }]' is not assignable to parameter of type '[config: { clock: EventCallable<Data>; source?: undefined; filter?: ((clk: Data) => clk is Data) | undefined; fn?: ((clk: Data) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }] | [config: ...]'.
              Type '[{ clock: EventCallable<Data>; target: EventCallable<Partial<{ type: \\"search\\" | \\"ticket\\" | null; source: string | null; }>>[]; }]' is not assignable to type '[config: { clock: EventCallable<Data>; source?: undefined; filter?: ((clk: Data) => boolean) | undefined; fn?: ((clk: Data) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }]'.
                Type '{ clock: EventCallable<Data>; target: EventCallable<Partial<{ type: \\"search\\" | \\"ticket\\" | null; source: string | null; }>>[]; }' is not assignable to type '{ clock: EventCallable<Data>; source?: undefined; filter?: ((clk: Data) => boolean) | undefined; fn?: ((clk: Data) => any) | undefined; target?: undefined; greedy?: boolean | undefined; batch?: boolean | undefined; name?: string | undefined; }'.
                  Types of property 'target' are incompatible.
                    Type 'EventCallable<Partial<{ type: \\"search\\" | \\"ticket\\" | null; source: string | null; }>>[]' is not assignable to type 'undefined'.
            "
          `)
        })
      })
    })
  })
})

test('sample should accept non-inline arrays in clock (should pass)', () => {
  const clock = [createEvent()]
  const target = createEvent()
  sample({
    clock,
    target,
  })
  sample({
    clock,
    fn: () => undefined,
    target,
  })
  sample({
    clock,
    filter: () => true,
    fn: () => undefined,
    target,
  })
  sample({
    clock,
    filter: () => true,
    target,
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('sample should accept non-inline arrays in target (should pass)', () => {
  const clock = createEvent()
  const target = [createEvent()]
  sample({
    clock,
    target,
  })
  sample({
    clock,
    fn: () => undefined,
    target,
  })
  sample({
    clock,
    filter: () => true,
    fn: () => undefined,
    target,
  })
  sample({
    clock,
    filter: () => true,
    target,
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('fn return cases', () => {
  const $name = createStore<string>('')
  const trigger = createEvent()
  const targetFull = createEvent<{name: string; age: number}>()
  const targetSmall = createEvent<{name: string}>()
  test('both units (should fail)', () => {
    sample({
      clock: trigger,
      source: {name: $name},
      // @ts-expect-error
      fn: ({name}) => {
        return {name}
      },
      target: [targetFull, targetSmall],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Unmarked error at test line 2 'clock: trigger,'
      Object literal may only specify known properties, and 'clock' does not exist in type '{ fn: (args_0: { readonly name: string; }) => { name: string; age: number; } | { name: string; }; target: readonly [Unit<{ name: string; }>, Unit<{ name: string; }>]; error: \\"fn result should extend target type\\"; }'.
      lack of expected error at test line 5 'fn: ({name}) => {'
      "
    `)
  })
  test('only full unit (should fail)', () => {
    sample({
      clock: trigger,
      source: {name: $name},
      // @ts-expect-error
      fn: ({name}) => {
        return {name}
      },
      target: [targetFull],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '({ name }: { readonly name: string; }) => { name: string; }' is not assignable to type '(args_0: { readonly name: string; }) => { name: string; age: number; }'.
        Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.
      "
    `)
  })
  test('only small unit (should pass)', () => {
    sample({
      clock: trigger,
      source: {name: $name},
      fn: ({name}) => {
        return {name}
      },
      target: [targetSmall],
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
