/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample, Event} from 'effector'
const typecheck = '{global}'

test('wide union (should fail)', () => {
  const trigger: Event<{a: 1} | {a: 2} | {a: 3}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1} | {a: 2}> = createEvent()

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
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: Store<boolean>; target: Event<{ a: 1; } | { a: 2; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }; }'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type 'Event<{ a: 1; } | { a: 2; }>'.
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: { a: 1; } | { a: 2; } | { a: 3; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { a: 1; } | { a: 2; }) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type '{ a: 1; } | { a: 2; } | { a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: Store<boolean>; target: Event<{ a: 1; } | { a: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: { a: 1; } | { a: 2; } | { a: 3; }; targetType: { a: 1; } | { a: 2; }; }]; }'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type '[Event<{ a: 1; } | { a: 2; }>]'.
    "
  `)
})

test('narrow union (should pass)', () => {
  const trigger: Event<{a: 1} | {a: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1} | {a: 2} | {a: 3}> = createEvent()

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
  const target: Event<string> = createEvent()

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
    Argument of type '{ clock: Event<unknown>; filter: Store<boolean>; target: Event<string>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: unknown; targetType: string; }; }'.
    Type 'Event<unknown>' is not assignable to type 'Event<string>'.
    Argument of type '{ clock: Event<unknown>; filter: Store<boolean>; target: Event<string>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: unknown; targetType: string; }]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: unknown; targetType: string; }]; }'.
    Type 'Event<unknown>' is not assignable to type '[Event<string>]'.
    "
  `)
})

test('unknown type in target (should pass)', () => {
  const trigger: Event<string> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<unknown> = createEvent()

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
  const target: Event<{a: 1; b: 2}> = createEvent()

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
    Argument of type '{ clock: Event<{ a: 1; b?: 2 | undefined; }>; filter: Store<boolean>; target: Event<{ a: 1; b: 2; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }; }'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type 'Event<{ a: 1; b: 2; }>'.
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: { a: 1; b?: 2 | undefined; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { a: 1; b: 2; }) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type '{ a: 1; b?: 2 | undefined; }' is not assignable to type '{ a: 1; b: 2; }'.
    Argument of type '{ clock: Event<{ a: 1; b?: 2 | undefined; }>; filter: Store<boolean>; target: Event<{ a: 1; b: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: { a: 1; b?: 2 | undefined; }; targetType: { a: 1; b: 2; }; }]; }'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type '[Event<{ a: 1; b: 2; }>]'.
    "
  `)
})

test('wide object (should pass)', () => {
  const trigger: Event<{a: 1; b: 2}> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<{a: 1}> = createEvent()

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
  const target: Event<{a: 1; b: 2; c: 3}> = createEvent()

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
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: Store<boolean>; target: Event<{ a: 1; b: 2; c: 3; }>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }; }'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type 'Event<{ a: 1; b: 2; c: 3; }>'.
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: { a: 1; b: 2; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { a: 1; b: 2; c: 3; }) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type '{ a: 1; b: 2; }' is not assignable to type '{ a: 1; b: 2; c: 3; }'.
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: Store<boolean>; target: Event<{ a: 1; b: 2; c: 3; }>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: { a: 1; b: 2; }; targetType: { a: 1; b: 2; c: 3; }; }]; }'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type '[Event<{ a: 1; b: 2; c: 3; }>]'.
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
    Argument of type '{ source: Event<[1, 2, 3]>; filter: Store<boolean>; target: Event<[1, 2]>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2, 3]; targetType: [1, 2]; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: [1, 2, 3]; targetType: [1, 2]; }; }'.
    Argument of type '{ source: Event<[1, 2, 3]>; filter: Store<boolean>; target: Event<[1, 2]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [1, 2, 3]; targetType: [1, 2]; }]; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [1, 2, 3]; targetType: [1, 2]; }]; }'.
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
    Argument of type '{ source: Event<[1, 2]>; filter: Store<boolean>; target: Event<[1, 2, 3]>[]; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [1, 2]; targetType: [1, 2, 3]; }]; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: [{ sourceType: [1, 2]; targetType: [1, 2, 3]; }]; }'.
    "
  `)
})

test('wide union in array (should fail)', () => {
  const trigger: Event<Array<number | string | boolean>> = createEvent()
  const allow = createStore<boolean>(true)
  const target: Event<Array<number | string>> = createEvent()

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
    Argument of type '{ clock: Event<(string | number | boolean)[]>; filter: Store<boolean>; target: Event<(string | number)[]>; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: { clockType: (string | number | boolean)[]; targetType: (string | number)[]; }; }'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type 'Event<(string | number)[]>'.
    Argument of type '{ clock: Event<(string | number | boolean)[]>; filter: Store<boolean>; target: Event<(string | number)[]>[]; }' is not assignable to parameter of type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: (string | number | boolean)[]; targetType: (string | number)[]; }]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"clock should extend target type\\"; targets: [{ clockType: (string | number | boolean)[]; targetType: (string | number)[]; }]; }'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type '[Event<(string | number)[]>]'.
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
