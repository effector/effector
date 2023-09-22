/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  Store,
  Event,
  EventCallable,
} from 'effector'
const typecheck = '{global}'

test('clock param name in the function', () => {
  const trigger: EventCallable<number> = createEvent()
  const allow: Store<string> = createStore('no')

  const result1 = sample({
    //@ts-expect-error
    source: trigger,
    filter: allow,
  })
  const result2 = sample({
    //@ts-expect-error
    source: trigger,
    clock: trigger,
    filter: allow,
  })
  const result3 = sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: EventCallable<number>; filter: Store<string>; }' is not assignable to parameter of type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
    Argument of type '{ source: EventCallable<number>; clock: EventCallable<number>; filter: Store<string>; }' is not assignable to parameter of type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
    Argument of type '{ clock: EventCallable<number>; filter: Store<string>; }' is not assignable to parameter of type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"filter unit should has boolean type\\"; got: string; }'.
    "
  `)
})

test('custom typeguards: target array support (1)', () => {
  function debounce<T>(event: Event<T>): Event<T> {
    return event
  }
  const $store = createStore<string | number>(0)
  const $flag = createStore(false)
  const trigger = createEvent<{a: number}>()

  const targetA = createEffect<{field: number | string; data: number}, void>()
  const targetB = createEvent<{field: number | string; data: string}>()
  const targetC = createEvent<{field: unknown; data: number}>()
  const targetD = createEvent<{field: number; data: number}>()
  const targetE = createEvent<{field: any}>()
  const targetF = createEvent<{field: any; data: any; extra: boolean}>()
  const targetVoid = createEvent()
  const targetAny = createEvent<any>()

  const res = sample({
    source: sample({
      clock: debounce(trigger),
      source: [$flag, $store],
      fn: ([isAble, field], data) => (isAble ? {field, data} : null),
    }),
    filter: (e): e is {field: number | string; data: number} => !!e,
    target: [
      targetVoid,
      targetA,
      targetB,
      targetC,
      targetD,
      targetE,
      targetF,
      targetAny,
    ],
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    A type predicate's type must be assignable to its parameter's type.
      Type '{ field: string | number; data: number; }' is not assignable to type '{ field: string | number | boolean; data: { a: number; }; }'.
        Types of property 'data' are incompatible.
          Type 'number' is not assignable to type '{ a: number; }'.
    "
  `)
})

test('custom typeguards: target array support (2)', () => {
  function debounce<T>(event: Event<T>): Event<T> {
    return event
  }
  const $store = createStore<string | number>(0)
  const $flag = createStore(false)
  const trigger = createEvent<{a: number}>()

  const targetA = createEffect<{field: number | string; data: number}, void>()
  const targetB = createEvent<{field: number | string; data: string}>()
  const targetC = createEvent<{field: unknown; data: number}>()
  const targetD = createEvent<{field: string; data: number}>()
  const targetE = createEvent<{field: any}>()
  const targetF = createEvent<{field: any; data: any; extra: boolean}>()

  const targetVoid = createEvent()
  const targetAny = createEvent<any>()

  const res = sample({
    source: sample({
      clock: debounce(trigger),
      source: [$flag, $store],
      fn: ([isAble, field], data) => (isAble ? {field, data} : null),
    }),
    filter: (e): e is {field: number; data: number} => !!e,
    target: [
      targetVoid,
      targetA,
      targetB,
      targetC,
      targetD,
      targetE,
      targetF,
      targetAny,
    ],
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    A type predicate's type must be assignable to its parameter's type.
      Type '{ field: number; data: number; }' is not assignable to type '{ field: string | number | boolean; data: { a: number; }; }'.
        Types of property 'data' are incompatible.
          Type 'number' is not assignable to type '{ a: number; }'.
    "
  `)
})

test('generic support', () => {
  const source = createEvent<null | number>()
  const target = createEvent<number>()

  function filter<T>(value: T): value is NonNullable<T> {
    return value != null
  }

  sample({source, filter, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

describe('function without argument support', () => {
  const target = createEvent<string>()
  test('filter function', () => {
    const clock = createEvent<number>()
    const source = createEvent<number>()
    sample({
      clock,
      source,
      filter: arg => arg > 0,
      fn: () => 'ok',
    })
    sample({
      clock,
      filter: arg => arg > 0,
      fn: () => 'ok',
    })
    sample({
      source,
      filter: arg => arg > 0,
      fn: () => 'ok',
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('filter infer', () => {
    const clock = createEvent<number | null>()
    const source = createEvent<number | null>()
    sample({
      clock,
      source,
      filter: (arg): arg is number => typeof arg === 'number',
      fn: () => 'ok',
    })
    sample({
      clock,
      filter: (arg): arg is number => typeof arg === 'number',
      fn: () => 'ok',
    })
    sample({
      source,
      filter: (arg): arg is number => typeof arg === 'number',
      fn: () => 'ok',
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('filter bool', () => {
    const clock = createEvent<number | null>()
    const source = createEvent<number | null>()
    sample({
      clock,
      source,
      filter: Boolean,
      fn: () => 'ok',
    })
    sample({
      clock,
      filter: Boolean,
      fn: () => 'ok',
    })
    sample({
      source,
      filter: Boolean,
      fn: () => 'ok',
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('filter function + target', () => {
    const clock = createEvent<number>()
    const source = createEvent<number>()
    sample({
      clock,
      source,
      filter: arg => arg > 0,
      fn: () => 'ok',
      target,
    })
    sample({
      clock,
      filter: arg => arg > 0,
      fn: () => 'ok',
      target,
    })
    sample({
      source,
      filter: arg => arg > 0,
      fn: () => 'ok',
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('filter infer + target', () => {
    const clock = createEvent<number | null>()
    const source = createEvent<number | null>()
    sample({
      clock,
      source,
      filter: (arg): arg is number => typeof arg === 'number',
      fn: () => 'ok',
      target,
    })
    sample({
      clock,
      filter: (arg): arg is number => typeof arg === 'number',
      fn: () => 'ok',
      target,
    })
    sample({
      source,
      filter: (arg): arg is number => typeof arg === 'number',
      fn: () => 'ok',
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('filter bool + target', () => {
    const clock = createEvent<number | null>()
    const source = createEvent<number | null>()
    sample({
      clock,
      source,
      filter: Boolean,
      fn: () => 'ok',
      target,
    })
    sample({
      clock,
      filter: Boolean,
      fn: () => 'ok',
      target,
    })
    sample({
      source,
      filter: Boolean,
      fn: () => 'ok',
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('difference in behavior between typed and untyped filters/functions combinations', () => {
  type AN = {a: number}
  const aNumNull = createEvent<AN | null>()
  const num = createEvent<number>()
  const aNum = createEvent<number>()
  describe('with target', () => {
    test('typed filter, untyped fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val: AN | null): val is AN => val !== null,
        fn: ({a}) => a,
        target: aNum,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('typed filter, typed fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val: AN | null): val is AN => val !== null,
        fn: ({a}: AN) => a,
        target: aNum,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('untyped filter, untyped fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val): val is AN => val !== null,
        fn: ({a}) => a,
        target: aNum,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'a' does not exist on type 'AN | null'.
        "
      `)
    })
    test('untyped filter, typed fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val): val is AN => val !== null,
        fn: ({a}: AN) => a,
        target: aNum,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
  describe('without target', () => {
    test('typed filter, untyped fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val: AN | null): val is AN => val !== null,
        fn: ({a}) => a,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('typed filter, typed fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val: AN | null): val is AN => val !== null,
        fn: ({a}: AN) => a,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    test('untyped filter, untyped fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val): val is AN => val !== null,
        fn: ({a}) => a,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Property 'a' does not exist on type 'AN | null'.
        "
      `)
    })
    test('untyped filter, typed fn', () => {
      sample({
        clock: num,
        source: aNumNull,
        filter: (val): val is AN => val !== null,
        fn: ({a}: AN) => a,
      })
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
  })
})
