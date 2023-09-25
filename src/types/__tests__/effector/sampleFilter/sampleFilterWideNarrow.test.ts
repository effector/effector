/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, EventCallable} from 'effector'
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
    Argument of type '{ clock: EventCallable<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: StoreWritable<boolean>; target: EventCallable<{ a: 1; } | { a: 2; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is missing the following properties from type 'EventCallable<{ a: 1; } | { a: 2; }>': prepend, targetable
    Argument of type '{ clock: EventCallable<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: StoreWritable<boolean>; target: EventCallable<{ a: 1; } | { a: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }[]; }'.
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
    Argument of type '{ clock: EventCallable<unknown>; filter: StoreWritable<boolean>; target: EventCallable<string>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
    Type 'Event<unknown>' is not assignable to type 'EventCallable<string>'.
    Argument of type '{ clock: EventCallable<unknown>; filter: StoreWritable<boolean>; target: EventCallable<string>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }[]; }'.
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
    Argument of type '{ clock: EventCallable<{ a: 1; b?: 2 | undefined; }>; filter: StoreWritable<boolean>; target: EventCallable<{ a: 1; b: 2; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is missing the following properties from type 'EventCallable<{ a: 1; b: 2; }>': prepend, targetable
    Argument of type '{ clock: EventCallable<{ a: 1; b?: 2 | undefined; }>; filter: StoreWritable<boolean>; target: EventCallable<{ a: 1; b: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }[]; }'.
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
    Argument of type '{ clock: EventCallable<{ a: 1; b: 2; }>; filter: StoreWritable<boolean>; target: EventCallable<{ a: 1; b: 2; c: 3; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
    Type 'Event<{ a: 1; b: 2; }>' is missing the following properties from type 'EventCallable<{ a: 1; b: 2; c: 3; }>': prepend, targetable
    Argument of type '{ clock: EventCallable<{ a: 1; b: 2; }>; filter: StoreWritable<boolean>; target: EventCallable<{ a: 1; b: 2; c: 3; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }[]; }'.
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
    Argument of type '{ source: { foo: StoreWritable<string>; }; filter: () => boolean; target: EventCallable<{ foo: string; bar: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; }; targetType: { foo: string; bar: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; }; targetType: { foo: string; bar: string; }; }; }'.
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
    Argument of type '{ source: EventCallable<[1, 2]>; filter: StoreWritable<boolean>; target: EventCallable<[1, 2, 3]>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }; }'.
    Argument of type '{ source: EventCallable<[1, 2]>; filter: StoreWritable<boolean>; target: EventCallable<[1, 2, 3]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }[]; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }[]; }'.
    "
  `)
})

test('wide union in array (should fail)', () => {
  const trigger: EventCallable<Array<number | string | boolean>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: EventCallable<Array<number | string>> = createEvent()

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
    Argument of type '{ clock: EventCallable<(string | number | boolean)[]>; filter: StoreWritable<boolean>; target: EventCallable<(string | number)[]>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type 'EventCallable<(string | number)[]>'.
    Argument of type '{ clock: EventCallable<(string | number | boolean)[]>; filter: StoreWritable<boolean>; target: EventCallable<(string | number)[]>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }[]; }'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type '[EventCallable<(string | number)[]>]'.
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
