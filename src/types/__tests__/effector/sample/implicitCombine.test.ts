/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  sample,
  Store,
  Event,
  guard,
} from 'effector'

const typecheck = '{global}'

it('supports store objects as a source (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample({
    source: {a, b},
    clock,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports a list of stores as a source (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample({
    source: [a, b],
    clock,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports store objects as a source + mapping (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample({
    source: {a, b},
    clock,
    fn: ({a, b}, clock) => a.toString() + b + clock.toString(),
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports a list of stores as a source + mapping (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample({
    source: [a, b],
    clock,
    fn: ([a, b], clock) => a.toString() + b + clock.toString(),
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports store objects as a source + target forwarding (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()
  const target = createEvent<{a: number; b: string}>()

  const result = sample({
    source: {a, b},
    clock,
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports a list of stores as a source + target forwarding (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()
  const target = createEvent<[number, string]>()

  const result = sample({
    source: [a, b],
    clock,
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '{ source: (StoreWritable<number> | StoreWritable<string>)[]; clock: EventCallable<number>; target: EventCallable<[number, string]>; }' is not assignable to parameter of type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
      Object literal may only specify known properties, and 'source' does not exist in type '{ error: \\"source should extend target type\\"; targets: { sourceType: (string | number)[]; targetType: [number, string]; }; }'.
    "
  `)
})

it('supports store objects as a source + mapping + target forwarding (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()
  const target = createEvent<string>()

  const result = sample({
    source: {a, b},
    clock,
    fn: ({a, b}, clock) => a.toString() + b + clock.toString(),
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports a list of stores as a source + mapping + target forwarding (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()
  const target = createEvent<string>()

  const result = sample({
    source: [a, b],
    clock,
    fn: ([a, b], clock) => a.toString() + b + clock.toString(),
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports store objects as a source (should pass) [non-config sample overload]', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample({a, b}, clock)

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports a list of stores as a source (should pass) [non-config sample overload]', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample([a, b], clock)

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports store objects as a source + mapping (should pass) [non-config sample overload]', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample(
    {a, b},
    clock,
    ({a, b}, clock) => a.toString() + b + clock.toString(),
  )

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

it('supports a list of stores as a source + mapping (should pass) [non-config sample overload]', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  const result = sample(
    [a, b],
    clock,
    ([a, b], clock) => a.toString() + b + clock.toString(),
  )

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
