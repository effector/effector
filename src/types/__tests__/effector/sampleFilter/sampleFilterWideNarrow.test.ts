/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, EventCallable, Event} from 'effector'
const typecheck = '{global}'

test('wide union (should fail)', () => {
  const trigger: EventCallable<{a: 1} | {a: 2} | {a: 3}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1} | {a: 2}> = createEvent()

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target,
  })

  //@ts-expect-error
  const result1: typeof target = sample({
    clock: trigger,
    filter: allow,
  })

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = sample({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is missing the following properties from type 'EventCallable<{ a: 1; } | { a: 2; }>': prepend, targetable
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }[]; }'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '[EventCallable<{ a: 1; } | { a: 2; }>]'.
    "
  `)
})

test('narrow union (should pass)', () => {
  const trigger: EventCallable<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1} | {a: 2} | {a: 3}> = createEvent()

  sample({
    clock: trigger,
    filter: allow,
    target,
  })

  sample({
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

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target,
  })

  //@ts-expect-error
  const result1: typeof target = sample({
    clock: trigger,
    filter: allow,
  })

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = sample({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
    Type 'Event<unknown>' is missing the following properties from type 'EventCallable<string>': prepend, targetable
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }[]; }'.
    Type 'Event<unknown>' is not assignable to type '[EventCallable<string>]'.
    "
  `)
})

test('unknown type in target (should pass)', () => {
  const trigger: EventCallable<string> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<unknown> = createEvent()

  sample({
    clock: trigger,
    filter: allow,
    target,
  })

  sample({
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

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target,
  })

  //@ts-expect-error
  const result1: typeof target = sample({
    clock: trigger,
    filter: allow,
  })

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = sample({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is missing the following properties from type 'EventCallable<{ a: 1; b: 2; }>': prepend, targetable
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }[]; }'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type '[EventCallable<{ a: 1; b: 2; }>]'.
    "
  `)
})

test('wide object (should pass)', () => {
  const trigger: EventCallable<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<{a: 1}> = createEvent()

  sample({
    clock: trigger,
    filter: allow,
    target,
  })

  sample({
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

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target,
  })

  //@ts-expect-error
  const result1: typeof target = sample({
    clock: trigger,
    filter: allow,
  })

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target: [target],
  })

  //@ts-expect-error
  const result2: [typeof target] = sample({
    clock: trigger,
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
    Type 'Event<{ a: 1; b: 2; }>' is missing the following properties from type 'EventCallable<{ a: 1; b: 2; c: 3; }>': prepend, targetable
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }[]; }'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type '[EventCallable<{ a: 1; b: 2; c: 3; }>]'.
    "
  `)
})

test('narrow object combined (should fail)', () => {
  const foo = createStore('not enough')
  const target = createEvent<{foo: string; bar: string}>()

  sample({
    //@ts-expect-error
    source: {foo},
    filter: () => true,
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Property 'bar' is missing in type '{ foo: StoreWritable<string>; }' but required in type '{ foo: Store<string>; bar: Store<string>; }'.
    "
  `)
})

test('wide tuple (should pass)', () => {
  const trigger: EventCallable<[1, 2, 3]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<[1, 2]> = createEvent()

  sample({
    source: trigger,
    filter: allow,
    target,
  })

  sample({
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

  sample({
    //@ts-expect-error
    source: trigger,
    filter: allow,
    target,
  })

  sample({
    //@ts-expect-error
    source: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 9 'target,'
    lack of expected error at test line 7 'source: trigger,'
    Type 'EventCallable<[1, 2, 3]>' is not assignable to type 'Unit<[1, 2]>'.
      Types of property '__' are incompatible.
        Type '[1, 2, 3]' is not assignable to type '[1, 2]'.
          Source has 3 element(s) but target allows only 2.
    Unmarked error at test line 16 'target: [target],'
    lack of expected error at test line 14 'source: trigger,'
    Type 'EventCallable<[1, 2, 3]>' is not assignable to type 'Unit<[1, 2]>'.
      Types of property '__' are incompatible.
        Type '[1, 2, 3]' is not assignable to type '[1, 2]'.
          Source has 3 element(s) but target allows only 2.
    "
  `)
})

test('wide union in array (should fail)', () => {
  const trigger = createEvent<Array<number | string | boolean>>()
  const allow = createStore<boolean>(true)
  const target = createEvent<Array<number | string>>()

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target,
  })

  //@ts-expect-error
  const result1: Event<Array<number | string>> = sample({
    clock: trigger,
    filter: allow,
  })

  sample({
    //@ts-expect-error
    clock: trigger,
    filter: allow,
    target: [target],
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type 'Event<(string | number)[]>'.
      Type '(string | number | boolean)[]' is not assignable to type '(string | number)[]'.
        Type 'string | number | boolean' is not assignable to type 'string | number'.
          Type 'boolean' is not assignable to type 'string | number'.
    Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }[]; }'.
    "
  `)
})

test('narrow union in array (should pass)', () => {
  const trigger: EventCallable<Array<number | string>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<Array<number | string | boolean>> = createEvent()

  sample({
    clock: trigger,
    filter: allow,
    target,
  })

  sample({
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
