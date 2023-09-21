/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard, Event} from 'effector'
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
  const trigger: Event<{a: 1} | {a: 2} | {a: 3}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1} | {a: 2}> = createEvent()

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
        Type 'Event<{ a: 1; } | { a: 2; }>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<{ a: 1; } | { a: 2; }>' is not assignable to type '[any?, ...any[]]'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type 'Event<{ a: 1; } | { a: 2; }>'.
      Type '{ a: 1; } | { a: 2; } | { a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
        Type '{ a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
          Type '{ a: 3; }' is not assignable to type '{ a: 2; }'.
            Types of property 'a' are incompatible.
              Type '3' is not assignable to type '2'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; } | { a: 2; }>' is not assignable to type '\\"non-unit item in target\\"'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '[Event<{ a: 1; } | { a: 2; }>]'.
    "
  `)
})

test('narrow union (should pass)', () => {
  const trigger: Event<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1} | {a: 2} | {a: 3}> = createEvent()

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
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '[any?, ...any[]]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '\\"non-unit item in target\\"'.
    "
  `)
})

test('unknown type in source (should fail)', () => {
  const trigger: Event<unknown> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<string> = createEvent()

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
        Type 'Event<string>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<string>' is not assignable to type '[any?, ...any[]]'.
    Type 'Event<unknown>' is not assignable to type 'Event<string>'.
      Type 'unknown' is not assignable to type 'string'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<string>' is not assignable to type '\\"non-unit item in target\\"'.
    Type 'Event<unknown>' is not assignable to type '[Event<string>]'.
    "
  `)
})

test('unknown type in target (should pass)', () => {
  const trigger: Event<string> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<unknown> = createEvent()

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
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<unknown>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<unknown>' is not assignable to type '[any?, ...any[]]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<unknown>' is not assignable to type '\\"non-unit item in target\\"'.
    "
  `)
})

test('optional props (should fail)', () => {
  const trigger: Event<{a: 1; b?: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1; b: 2}> = createEvent()

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
        Type 'Event<{ a: 1; b: 2; }>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<{ a: 1; b: 2; }>' is not assignable to type '[any?, ...any[]]'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type 'Event<{ a: 1; b: 2; }>'.
      Type '{ a: 1; b?: 2 | undefined; }' is not assignable to type '{ a: 1; b: 2; }'.
        Types of property 'b' are incompatible.
          Type '2 | undefined' is not assignable to type '2'.
            Type 'undefined' is not assignable to type '2'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; b: 2; }>' is not assignable to type '\\"non-unit item in target\\"'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type '[Event<{ a: 1; b: 2; }>]'.
    "
  `)
})

test('wide object (should pass)', () => {
  const trigger: Event<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1}> = createEvent()

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
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; }>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<{ a: 1; }>' is not assignable to type '[any?, ...any[]]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; }>' is not assignable to type '\\"non-unit item in target\\"'.
    "
  `)
})

test('narrow object (should fail)', () => {
  const trigger: Event<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1; b: 2; c: 3}> = createEvent()

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
        Type 'Event<{ a: 1; b: 2; c: 3; }>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<{ a: 1; b: 2; c: 3; }>' is not assignable to type '[any?, ...any[]]'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type 'Event<{ a: 1; b: 2; c: 3; }>'.
      Property 'c' is missing in type '{ a: 1; b: 2; }' but required in type '{ a: 1; b: 2; c: 3; }'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<{ a: 1; b: 2; c: 3; }>' is not assignable to type '\\"non-unit item in target\\"'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type '[Event<{ a: 1; b: 2; c: 3; }>]'.
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
  const trigger: Event<[1, 2, 3]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<[1, 2]> = createEvent()

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
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<[1, 2]>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<[1, 2]>' is not assignable to type '[any?, ...any[]]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<[1, 2]>' is not assignable to type '\\"non-unit item in target\\"'.
    "
  `)
})

test('narrow tuple (should fail)', () => {
  const trigger: Event<[1, 2]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<[1, 2, 3]> = createEvent()

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
        Type 'Event<[1, 2, 3]>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<[1, 2, 3]>' is not assignable to type '[any?, ...any[]]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<[1, 2, 3]>' is not assignable to type '\\"non-unit item in target\\"'.
    "
  `)
})

test('wide union in array (should fail)', () => {
  const trigger: Event<Array<number | string | boolean>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<Array<number | string>> = createEvent()

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
        Type 'Event<(string | number)[]>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<(string | number)[]>' is not assignable to type '[any?, ...any[]]'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type 'Event<(string | number)[]>'.
      Type '(string | number | boolean)[]' is not assignable to type '(string | number)[]'.
        Type 'string | number | boolean' is not assignable to type 'string | number'.
          Type 'boolean' is not assignable to type 'string | number'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<(string | number)[]>' is not assignable to type '\\"non-unit item in target\\"'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type '[Event<(string | number)[]>]'.
    "
  `)
})

test('narrow union in array (should pass)', () => {
  const trigger: Event<Array<number | string>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<Array<number | string | boolean>> = createEvent()

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
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<(string | number | boolean)[]>' is not assignable to type 'UnitTargetable<any> | [any?, ...any[]]'.
          Type 'Event<(string | number | boolean)[]>' is not assignable to type '[any?, ...any[]]'.
    No overload matches this call.
      The last overload gave the following error.
        Type 'Event<(string | number | boolean)[]>' is not assignable to type '\\"non-unit item in target\\"'.
    "
  `)
})
