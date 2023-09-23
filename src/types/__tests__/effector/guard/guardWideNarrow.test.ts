/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard, EventCallable} from 'effector'
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

test('wide union (should fail)', () => {
  const trigger: EventCallable<{a: 1} | {a: 2} | {a: 3}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1} | {a: 2}> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target,
  })

  //@ts-expect-error
  const result1: typeof target = guard({
    clock: trigger,
    filter: allow,
  })

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = guard({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ a: 1; } | { a: 2; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is missing the following properties from type 'EventCallable<{ a: 1; } | { a: 2; }>': prepend, __can_be_used_in_target__
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ a: 1; } | { a: 2; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '[EventCallable<{ a: 1; } | { a: 2; }>]'.
    "
  `)
})

test('narrow union (should pass)', () => {
  const trigger: EventCallable<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1} | {a: 2} | {a: 3}> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    target,
  })

  guard({
    clock: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('unknown type in source (should fail)', () => {
  const trigger: EventCallable<unknown> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<string> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target,
  })

  //@ts-expect-error
  const result1: typeof target = guard({
    clock: trigger,
    filter: allow,
  })

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = guard({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<unknown>' is missing the following properties from type 'EventCallable<string>': prepend, __can_be_used_in_target__
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<string>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<unknown>' is not assignable to type '[EventCallable<string>]'.
    "
  `)
})

test('unknown type in target (should pass)', () => {
  const trigger: EventCallable<string> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<unknown> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    target,
  })

  guard({
    clock: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('optional props (should fail)', () => {
  const trigger: EventCallable<{a: 1; b?: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1; b: 2}> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target,
  })

  //@ts-expect-error
  const result1: typeof target = guard({
    clock: trigger,
    filter: allow,
  })

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = guard({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ a: 1; b: 2; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is missing the following properties from type 'EventCallable<{ a: 1; b: 2; }>': prepend, __can_be_used_in_target__
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ a: 1; b: 2; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type '[EventCallable<{ a: 1; b: 2; }>]'.
    "
  `)
})

test('wide object (should pass)', () => {
  const trigger: EventCallable<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1}> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    target,
  })

  guard({
    clock: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('narrow object (should fail)', () => {
  const trigger: EventCallable<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1; b: 2; c: 3}> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target,
  })

  //@ts-expect-error
  const result1: typeof target = guard({
    clock: trigger,
    filter: allow,
  })

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = guard({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ a: 1; b: 2; c: 3; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<{ a: 1; b: 2; }>' is missing the following properties from type 'EventCallable<{ a: 1; b: 2; c: 3; }>': prepend, __can_be_used_in_target__
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ a: 1; b: 2; c: 3; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type '[EventCallable<{ a: 1; b: 2; c: 3; }>]'.
    "
  `)
})

test('narrow object combined (should fail)', () => {
  const foo = createStore('not enough')
  const target = createEvent<{foo: string; bar: string}>()

  guard({
    source: {foo},
    filter: () => true,
    //@ts-expect-error
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<{ foo: string; bar: string; }>' is not assignable to type '\\"incompatible unit in target\\"'.
    "
  `)
})

test('wide tuple (should pass)', () => {
  const trigger: EventCallable<[1, 2, 3]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<[1, 2]> = createEvent()

  guard({
    source: trigger,
    filter: allow,
    target,
  })

  guard({
    source: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('narrow tuple (should fail)', () => {
  const trigger: EventCallable<[1, 2]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<[1, 2, 3]> = createEvent()

  guard({
    source: trigger,
    filter: allow,
    //@ts-expect-error
    target,
  })

  guard({
    source: trigger,
    filter: allow,
    //@ts-expect-error
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<[1, 2, 3]>' is not assignable to type '\\"incompatible unit in target\\"'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<[1, 2, 3]>' is not assignable to type '\\"incompatible unit in target\\"'.
    "
  `)
})

test('wide union in array (should fail)', () => {
  const trigger: EventCallable<Array<number | string | boolean>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<Array<number | string>> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target,
  })

  //@ts-expect-error
  const result1: typeof target = guard({
    clock: trigger,
    filter: allow,
  })

  guard({
    clock: trigger,
    filter: allow,
    //@ts-expect-error
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = guard({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<(string | number)[]>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<(string | number | boolean)[]>' is missing the following properties from type 'EventCallable<(string | number)[]>': prepend, __can_be_used_in_target__
    No overload matches this call.
      The last overload gave the following error.
        Type 'EventCallable<(string | number)[]>' is not assignable to type '\\"incompatible unit in target\\"'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type '[EventCallable<(string | number)[]>]'.
    "
  `)
})

test('narrow union in array (should pass)', () => {
  const trigger: EventCallable<Array<number | string>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<Array<number | string | boolean>> = createEvent()

  guard({
    clock: trigger,
    filter: allow,
    target,
  })

  guard({
    clock: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
