/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  guard,
  Store,
  Event,
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

test('clock param name in the function', () => {
  const trigger: EventCallable<number> = createEvent()
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
    A type predicate's type must be assignable to its parameter's type.
      Type '{ field: string | number; data: number; }' is not assignable to type '{ field: string | number | boolean; data: { a: number; }; }'.
        Types of property 'data' are incompatible.
          Type 'number' is not assignable to type '{ a: number; }'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type 'EventCallable<{ field: number; data: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'EventCallable<{ field: any; data: any; extra: boolean; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type 'EventCallable<{ field: number; data: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'EventCallable<{ field: any; data: any; extra: boolean; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type 'EventCallable<{ field: number; data: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'EventCallable<{ field: any; data: any; extra: boolean; }>' is not assignable to type '\\"incompatible unit in target\\"'.
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
    A type predicate's type must be assignable to its parameter's type.
      Type '{ field: number; data: number; }' is not assignable to type '{ field: string | number | boolean; data: { a: number; }; }'.
        Types of property 'data' are incompatible.
          Type 'number' is not assignable to type '{ a: number; }'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type 'EventCallable<{ field: string; data: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'EventCallable<{ field: any; data: any; extra: boolean; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type 'EventCallable<{ field: string; data: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'EventCallable<{ field: any; data: any; extra: boolean; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ field: string | number; data: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
          Type 'EventCallable<{ field: string; data: number; }>' is not assignable to type '\\"incompatible unit in target\\"'.
            Type 'EventCallable<{ field: any; data: any; extra: boolean; }>' is not assignable to type '\\"incompatible unit in target\\"'.
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
        Type 'EventCallable<number>' is not assignable to type '\\"incompatible unit in target\\"'.
    "
  `)
})
