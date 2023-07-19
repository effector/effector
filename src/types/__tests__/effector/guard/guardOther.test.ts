/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  guard,
  Store,
  Event,
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

test('clock param name in the function', () => {
  const trigger: Event<number> = createEvent()
  const allow: Store<string> = createStore('no')

  const result1 = guard({
    source: trigger,
    //@ts-expect-error
    filter: allow,
  })
  const result2 = guard({
    source: trigger,
    clock: trigger,
    //@ts-expect-error
    filter: allow,
  })
  const result3 = guard({
    clock: trigger,
    //@ts-expect-error
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<string>' is not assignable to type 'Store<boolean> | ((source: number) => boolean)'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<string>' is not assignable to type 'Store<boolean> | ((source: number, clock: number) => boolean)'.
          Type 'Store<string>' is not assignable to type 'Store<boolean>'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<string>' is not assignable to type 'Store<boolean> | ((clock: number) => boolean)'.
          Type 'Store<string>' is not assignable to type 'Store<boolean>'.
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

  const res = guard({
    source: sample({
      clock: debounce(trigger),
      source: [$flag, $store],
      fn: ([isAble, field], data) => (isAble ? {field, data} : null),
    }),
    filter: (e): e is {field: number | string; data: number} => !!e,
    target: [
      targetVoid,
      targetA,
      //@ts-expect-error
      targetB,
      targetC,
      //@ts-expect-error
      targetD,
      targetE,
      //@ts-expect-error
      targetF,
      targetAny,
    ],
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '([isAble, field]: [any, any], data: any) => { field: any; data: any; } | null' is not assignable to type '((src: (string | number | boolean)[], clk: { a: number; }) => any) & (([isAble, field]: [any, any], data: any) => { field: any; data: any; } | null)'.
      Type '([isAble, field]: [any, any], data: any) => { field: any; data: any; } | null' is not assignable to type '(src: (string | number | boolean)[], clk: { a: number; }) => any'.
        Types of parameters '__0' and 'src' are incompatible.
          Type '(string | number | boolean)[]' is not assignable to type '[any, any]'.
            Target requires 2 element(s) but source may have fewer.
    Binding element 'isAble' implicitly has an 'any' type.
    Binding element 'field' implicitly has an 'any' type.
    Parameter 'data' implicitly has an 'any' type.
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

  const res = guard({
    source: sample({
      clock: debounce(trigger),
      source: [$flag, $store],
      fn: ([isAble, field], data) => (isAble ? {field, data} : null),
    }),
    filter: (e): e is {field: number; data: number} => !!e,
    target: [
      targetVoid,
      targetA,
      //@ts-expect-error
      targetB,
      targetC,
      //@ts-expect-error
      targetD,
      targetE,
      //@ts-expect-error
      targetF,
      targetAny,
    ],
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type '([isAble, field]: [any, any], data: any) => { field: any; data: any; } | null' is not assignable to type '((src: (string | number | boolean)[], clk: { a: number; }) => any) & (([isAble, field]: [any, any], data: any) => { field: any; data: any; } | null)'.
      Type '([isAble, field]: [any, any], data: any) => { field: any; data: any; } | null' is not assignable to type '(src: (string | number | boolean)[], clk: { a: number; }) => any'.
        Types of parameters '__0' and 'src' are incompatible.
          Type '(string | number | boolean)[]' is not assignable to type '[any, any]'.
    Binding element 'isAble' implicitly has an 'any' type.
    Binding element 'field' implicitly has an 'any' type.
    Parameter 'data' implicitly has an 'any' type.
    "
  `)
})

test('generic support', () => {
  const source = createEvent<null | number>()
  const target = createEvent<number>()

  function filter<T>(value: T): value is NonNullable<T> {
    return value != null
  }

  guard({source, filter, target})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<number>' is not assignable to type '\\"incompatible unit in target\\"'.
    "
  `)
})
