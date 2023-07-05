/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Event, ReadonlyEvent} from 'effector'
const typecheck = '{global}'

test('wide union (should fail)', () => {
  const trigger: Event<{a: 1} | {a: 2} | {a: 3}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<{a: 1} | {a: 2}> = createEvent()

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
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: Store<boolean>; target: ReadonlyEvent<{ a: 1; } | { a: 2; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
    Type 'ReadonlyEvent<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type 'ReadonlyEvent<{ a: 1; } | { a: 2; }>'.
      Type '{ a: 1; } | { a: 2; } | { a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
        Type '{ a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
          Type '{ a: 3; }' is not assignable to type '{ a: 2; }'.
            Types of property 'a' are incompatible.
              Type '3' is not assignable to type '2'.
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: Store<boolean>; target: ReadonlyEvent<{ a: 1; } | { a: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }[]; }'.
    Type 'ReadonlyEvent<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '[ReadonlyEvent<{ a: 1; } | { a: 2; }>]'.
    "
  `)
})

test('narrow union (should pass)', () => {
  const trigger: Event<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<{a: 1} | {a: 2} | {a: 3}> = createEvent()

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
  const trigger: Event<unknown> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<string> = createEvent()

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
    Argument of type '{ clock: Event<unknown>; filter: Store<boolean>; target: ReadonlyEvent<string>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
    Type 'ReadonlyEvent<unknown>' is not assignable to type 'ReadonlyEvent<string>'.
      Type 'unknown' is not assignable to type 'string'.
    Argument of type '{ clock: Event<unknown>; filter: Store<boolean>; target: ReadonlyEvent<string>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }[]; }'.
    Type 'ReadonlyEvent<unknown>' is not assignable to type '[ReadonlyEvent<string>]'.
    "
  `)
})

test('unknown type in target (should pass)', () => {
  const trigger: Event<string> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<unknown> = createEvent()

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
  const trigger: Event<{a: 1; b?: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<{a: 1; b: 2}> = createEvent()

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
    Argument of type '{ clock: Event<{ a: 1; b?: 2 | undefined; }>; filter: Store<boolean>; target: ReadonlyEvent<{ a: 1; b: 2; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
    Type 'ReadonlyEvent<{ a: 1; b?: 2 | undefined; }>' is not assignable to type 'ReadonlyEvent<{ a: 1; b: 2; }>'.
      Type '{ a: 1; b?: 2 | undefined; }' is not assignable to type '{ a: 1; b: 2; }'.
        Types of property 'b' are incompatible.
          Type '2 | undefined' is not assignable to type '2'.
            Type 'undefined' is not assignable to type '2'.
    Argument of type '{ clock: Event<{ a: 1; b?: 2 | undefined; }>; filter: Store<boolean>; target: ReadonlyEvent<{ a: 1; b: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }[]; }'.
    Type 'ReadonlyEvent<{ a: 1; b?: 2 | undefined; }>' is not assignable to type '[ReadonlyEvent<{ a: 1; b: 2; }>]'.
    "
  `)
})

test('wide object (should pass)', () => {
  const trigger: Event<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<{a: 1}> = createEvent()

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
  const trigger: Event<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<{a: 1; b: 2; c: 3}> = createEvent()

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
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: Store<boolean>; target: ReadonlyEvent<{ a: 1; b: 2; c: 3; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
    Type 'ReadonlyEvent<{ a: 1; b: 2; }>' is not assignable to type 'ReadonlyEvent<{ a: 1; b: 2; c: 3; }>'.
      Property 'c' is missing in type '{ a: 1; b: 2; }' but required in type '{ a: 1; b: 2; c: 3; }'.
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: Store<boolean>; target: ReadonlyEvent<{ a: 1; b: 2; c: 3; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }[]; }'.
    Type 'ReadonlyEvent<{ a: 1; b: 2; }>' is not assignable to type '[ReadonlyEvent<{ a: 1; b: 2; c: 3; }>]'.
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
    Argument of type '{ source: { foo: Store<string>; }; filter: () => boolean; target: Event<{ foo: string; bar: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; }; targetType: { foo: string; bar: string; }; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; }; targetType: { foo: string; bar: string; }; }; }'.
    "
  `)
})

test('wide tuple (should pass)', () => {
  const trigger: Event<[1, 2, 3]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<[1, 2]> = createEvent()

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
  const trigger: Event<[1, 2]> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<[1, 2, 3]> = createEvent()

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
    Argument of type '{ source: Event<[1, 2]>; filter: Store<boolean>; target: Event<[1, 2, 3]>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }; }'.
    Argument of type '{ source: Event<[1, 2]>; filter: Store<boolean>; target: Event<[1, 2, 3]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }[]; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2]; targetType: [1, 2, 3]; }[]; }'.
    "
  `)
})

test('wide union in array (should fail)', () => {
  const trigger: Event<Array<number | string | boolean>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: ReadonlyEvent<Array<number | string>> = createEvent()

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
    Argument of type '{ clock: Event<(string | number | boolean)[]>; filter: Store<boolean>; target: ReadonlyEvent<(string | number)[]>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
    Type 'ReadonlyEvent<(string | number | boolean)[]>' is not assignable to type 'ReadonlyEvent<(string | number)[]>'.
      Type '(string | number | boolean)[]' is not assignable to type '(string | number)[]'.
    Argument of type '{ clock: Event<(string | number | boolean)[]>; filter: Store<boolean>; target: ReadonlyEvent<(string | number)[]>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }[]; }'.
    Type 'ReadonlyEvent<(string | number | boolean)[]>' is not assignable to type '[ReadonlyEvent<(string | number)[]>]'.
    "
  `)
})

test('narrow union in array (should pass)', () => {
  const trigger: Event<Array<number | string>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<Array<number | string | boolean>> = createEvent()

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
