/* eslint-disable no-unused-vars */
import {createStore, createEvent, sample} from 'effector'

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
    no errors
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

it('validates positional overload callback arguments (should fail)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()

  sample(
    //@ts-expect-error
    [a, b],
    clock,
    ([a]: [string], value: string) => a + value,
  )
  sample(
    //@ts-expect-error
    {a, b},
    clock,
    ({a}: {a: string}, value: string) => a + value,
  )

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '[[StoreWritable<number>, StoreWritable<string>], EventCallable<number>, ([a]: [string], value: string) => string]' is not assignable to parameter of type '[source: readonly [StoreWritable<number>, StoreWritable<string>], clock: EventCallable<number>, fn: (src: readonly [number, string], clk: number) => any] & [...]'.
      Type '[[StoreWritable<number>, StoreWritable<string>], EventCallable<number>, ([a]: [string], value: string) => string]' is not assignable to type '[source: readonly [StoreWritable<number>, StoreWritable<string>], clock: EventCallable<number>, fn: (src: readonly [number, string], clk: number) => any]'.
        Type at position 2 in source is not compatible with type at position 2 in target.
          Type '([a]: [string], value: string) => string' is not assignable to type '(src: readonly [number, string], clk: number) => any'.
            Types of parameters '__0' and 'src' are incompatible.
              The type 'readonly [number, string]' is 'readonly' and cannot be assigned to the mutable type '[string]'.
    Argument of type '[{ a: StoreWritable<number>; b: StoreWritable<string>; }, EventCallable<number>, ({ a }: { a: string; }, value: string) => string]' is not assignable to parameter of type '[source: { readonly a: StoreWritable<number>; readonly b: StoreWritable<string>; }, clock: EventCallable<number>, fn: (src: { readonly a: number; readonly b: string; }, clk: number) => any] & [...]'.
      Type '[{ a: StoreWritable<number>; b: StoreWritable<string>; }, EventCallable<number>, ({ a }: { a: string; }, value: string) => string]' is not assignable to type '[source: { readonly a: StoreWritable<number>; readonly b: StoreWritable<string>; }, clock: EventCallable<number>, fn: (src: { readonly a: number; readonly b: string; }, clk: number) => any]'.
        Type at position 2 in source is not compatible with type at position 2 in target.
          Type '({ a }: { a: string; }, value: string) => string' is not assignable to type '(src: { readonly a: number; readonly b: string; }, clk: number) => any'.
            Types of parameters '__0' and 'src' are incompatible.
              Type '{ readonly a: number; readonly b: string; }' is not assignable to type '{ a: string; }'.
                Types of property 'a' are incompatible.
                  Type 'number' is not assignable to type 'string'.
    "
  `)
})
