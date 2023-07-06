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
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; } | { a: 2; }>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; }>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; }>; }'.
    Type 'Event<{ a: 1; } | { a: 2; } | { a: 3; }>' is not assignable to type 'Event<{ a: 1; } | { a: 2; }>'.
      Type '{ a: 1; } | { a: 2; } | { a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
        Type '{ a: 3; }' is not assignable to type '{ a: 1; } | { a: 2; }'.
          Type '{ a: 3; }' is not assignable to type '{ a: 2; }'.
            Types of property 'a' are incompatible.
              Type '3' is not assignable to type '2'.
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; } | { a: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; }>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; }>[]; }'.
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
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; } | { a: 3; }>; }'.
    Argument of type '{ clock: Event<{ a: 1; } | { a: 2; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; } | { a: 2; } | { a: 3; }>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; } | { a: 3; }>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; } | { a: 2; } | { a: 3; }>[]; }'.
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
    Argument of type '{ clock: Event<unknown>; filter: StoreWritable<boolean>; target: Event<string>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<string>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<string>; }'.
    Type 'Event<unknown>' is not assignable to type 'Event<string>'.
    Argument of type '{ clock: Event<unknown>; filter: StoreWritable<boolean>; target: Event<string>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<string>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<string>[]; }'.
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
    Argument of type '{ clock: Event<string>; filter: StoreWritable<boolean>; target: Event<unknown>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<unknown>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<unknown>; }'.
    Argument of type '{ clock: Event<string>; filter: StoreWritable<boolean>; target: Event<unknown>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<unknown>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<unknown>[]; }'.
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
    Argument of type '{ clock: Event<{ a: 1; b?: 2 | undefined; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; b: 2; }>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; }>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; }>; }'.
    Type 'Event<{ a: 1; b?: 2 | undefined; }>' is not assignable to type 'Event<{ a: 1; b: 2; }>'.
      Type '{ a: 1; b?: 2 | undefined; }' is not assignable to type '{ a: 1; b: 2; }'.
        Types of property 'b' are incompatible.
          Type '2 | undefined' is not assignable to type '2'.
            Type 'undefined' is not assignable to type '2'.
    Argument of type '{ clock: Event<{ a: 1; b?: 2 | undefined; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; b: 2; }>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; }>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; }>[]; }'.
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
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; }>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; }>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; }>; }'.
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; }>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; }>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; }>[]; }'.
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
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; b: 2; c: 3; }>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; c: 3; }>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; c: 3; }>; }'.
    Type 'Event<{ a: 1; b: 2; }>' is not assignable to type 'Event<{ a: 1; b: 2; c: 3; }>'.
      Property 'c' is missing in type '{ a: 1; b: 2; }' but required in type '{ a: 1; b: 2; c: 3; }'.
    Argument of type '{ clock: Event<{ a: 1; b: 2; }>; filter: StoreWritable<boolean>; target: Event<{ a: 1; b: 2; c: 3; }>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; c: 3; }>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<{ a: 1; b: 2; c: 3; }>[]; }'.
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
    Argument of type '{ source: { foo: StoreWritable<string>; }; filter: () => boolean; target: EventCallable<{ foo: string; bar: string; }>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: { foo: string; }; targetType: { foo: string; bar: string; }; }; }'.
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
    Argument of type '{ source: Event<[1, 2, 3]>; filter: StoreWritable<boolean>; target: Event<[1, 2]>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2]>; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2]>; }'.
    Argument of type '{ source: Event<[1, 2, 3]>; filter: StoreWritable<boolean>; target: Event<[1, 2]>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2]>[]; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2]>[]; }'.
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
    Argument of type '{ source: Event<[1, 2]>; filter: StoreWritable<boolean>; target: Event<[1, 2, 3]>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2, 3]>; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2, 3]>; }'.
    Argument of type '{ source: Event<[1, 2]>; filter: StoreWritable<boolean>; target: Event<[1, 2, 3]>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2, 3]>[]; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<[1, 2, 3]>[]; }'.
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
    Argument of type '{ clock: Event<(string | number | boolean)[]>; filter: StoreWritable<boolean>; target: Event<(string | number)[]>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number)[]>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number)[]>; }'.
    Type 'Event<(string | number | boolean)[]>' is not assignable to type 'Event<(string | number)[]>'.
    Argument of type '{ clock: Event<(string | number | boolean)[]>; filter: StoreWritable<boolean>; target: Event<(string | number)[]>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number)[]>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number)[]>[]; }'.
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
    Argument of type '{ clock: Event<(string | number)[]>; filter: StoreWritable<boolean>; target: Event<(string | number | boolean)[]>; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number | boolean)[]>; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number | boolean)[]>; }'.
    Argument of type '{ clock: Event<(string | number)[]>; filter: StoreWritable<boolean>; target: Event<(string | number | boolean)[]>[]; }' is not assignable to parameter of type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number | boolean)[]>[]; }'.
      Object literal may only specify known properties, and 'clock' does not exist in type '{ error: \\"target should be unit or array of units\\"; got: Event<(string | number | boolean)[]>[]; }'.
    "
  `)
})
