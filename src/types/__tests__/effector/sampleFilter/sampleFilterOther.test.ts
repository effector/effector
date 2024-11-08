/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  StoreWritable,
  Event,
  EventCallable,
} from 'effector'
const typecheck = '{global}'

test('clock param name in the function', () => {
  const trigger: EventCallable<number> = createEvent()
  const allow: StoreWritable<string> = createStore('no')

  const result1 = sample({
    source: trigger,
    //@ts-expect-error
    filter: allow,
  })
  const result2 = sample({
    source: trigger,
    clock: trigger,
    //@ts-expect-error
    filter: allow,
  })
  const result3 = sample({
    clock: trigger,
    //@ts-expect-error
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'StoreWritable<string>' is not assignable to type 'Store<boolean>'.
        Types of property 'map' are incompatible.
          Type '<T>(fn: (state: string) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>' is not assignable to type '<T>(fn: (state: boolean) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>'.
            Types of parameters 'fn' and 'fn' are incompatible.
              Types of parameters 'state' and 'state' are incompatible.
                Type 'string' is not assignable to type 'boolean'.
    Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'StoreWritable<string>' is not assignable to type 'Store<boolean>'.
        Types of property 'map' are incompatible.
          Type '<T>(fn: (state: string) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>' is not assignable to type '<T>(fn: (state: boolean) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>'.
            Types of parameters 'fn' and 'fn' are incompatible.
              Types of parameters 'state' and 'state' are incompatible.
                Type 'string' is not assignable to type 'boolean'.
    Type 'StoreWritable<string>' is not assignable to type 'Store<boolean> | (() => boolean)'.
      Type 'StoreWritable<string>' is not assignable to type 'Store<boolean>'.
        Types of property 'map' are incompatible.
          Type '<T>(fn: (state: string) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>' is not assignable to type '<T>(fn: (state: boolean) => T, config?: { skipVoid?: boolean | undefined; } | undefined) => Store<T>'.
            Types of parameters 'fn' and 'fn' are incompatible.
              Types of parameters 'state' and 'state' are incompatible.
                Type 'string' is not assignable to type 'boolean'.
    "
  `)
})

test('custom typeguards: target array support (1)', () => {
  function debounce<T>(event: Event<T>): Event<T> {
    return event
  }
  const $store = createStore<string | number>(0)
  const $flag = createStore(false)
  const trigger = createEvent<number>()

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
    Unmarked error at test line 25 'targetVoid,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ field: string | number; data: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ field: string | number; data: number; }'.
    Unmarked error at test line 27 'targetB,'
    Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type 'Unit<{ field: string | number; data: number; }>'.
      The types of '__.data' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 28 'targetC,'
    Type 'EventCallable<{ field: unknown; data: number; }>' is not assignable to type 'Unit<{ field: string | number; data: number; }>'.
      The types of '__.field' are incompatible between these types.
        Type 'unknown' is not assignable to type 'string | number'.
    Unmarked error at test line 30 'targetE,'
    Type 'EventCallable<{ field: any; }>' is not assignable to type 'Unit<{ field: string | number; data: number; }>'.
      Types of property '__' are incompatible.
        Property 'data' is missing in type '{ field: any; }' but required in type '{ field: string | number; data: number; }'.
    "
  `)
})

test('custom typeguards: target array support (2)', () => {
  function debounce<T>(event: Event<T>): Event<T> {
    return event
  }
  const $store = createStore<string | number>(0)
  const $flag = createStore(false)
  const trigger = createEvent<number>()

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
    Unmarked error at test line 26 'targetVoid,'
    Type 'EventCallable<void>' is not assignable to type 'Unit<{ field: number; data: number; }>'.
      Types of property '__' are incompatible.
        Type 'void' is not assignable to type '{ field: number; data: number; }'.
    Unmarked error at test line 27 'targetA,'
    Type 'Effect<{ field: string | number; data: number; }, void, Error>' is not assignable to type 'Unit<{ field: number; data: number; }>'.
      The types of '__.field' are incompatible between these types.
        Type 'string | number' is not assignable to type 'number'.
          Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 28 'targetB,'
    Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type 'Unit<{ field: number; data: number; }>'.
      The types of '__.field' are incompatible between these types.
        Type 'string | number' is not assignable to type 'number'.
          Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 29 'targetC,'
    Type 'EventCallable<{ field: unknown; data: number; }>' is not assignable to type 'Unit<{ field: number; data: number; }>'.
      The types of '__.field' are incompatible between these types.
        Type 'unknown' is not assignable to type 'number'.
    Unmarked error at test line 30 'targetD,'
    Type 'EventCallable<{ field: string; data: number; }>' is not assignable to type 'Unit<{ field: number; data: number; }>'.
      The types of '__.field' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Unmarked error at test line 31 'targetE,'
    Type 'EventCallable<{ field: any; }>' is not assignable to type 'Unit<{ field: number; data: number; }>'.
      Types of property '__' are incompatible.
        Property 'data' is missing in type '{ field: any; }' but required in type '{ field: number; data: number; }'.
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
        Unmarked error at test line 5 'fn: ({a}) => a,'
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
        Unmarked error at test line 5 'fn: ({a}) => a,'
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
