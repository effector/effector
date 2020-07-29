// @flow
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' because: [incompatible-call] Either property 'kind' is missing in object literal [1] but exists in 'Unit' [2] in property 'source'. Or property 'kind' is missing in object literal [1] but exists in 'Unit' [3] in property 'source'
      const result = sample({
                     ^^^^^^
          source: {a, b},
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
          +source: Unit<A>,
               [3] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'CovariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                       [2] ^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'ContravariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                                         [2] ^^^^^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'Unit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample'
      const result = sample({
                     ^^^^^^
      property 'kind' is missing in object literal [1] but exists in 'Unit' [2] in property 'source'. [incompatible-call]
          source: {a, b},
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'CovariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                       [2] ^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'ContravariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                                         [2] ^^^^^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'Unit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
    "
  `)
})
it('supports store objects as a source + target forwarding (should pass)', () => {
  const a = createStore(1)
  const b = createStore('b')
  const clock = createEvent<number>()
  const target = createEvent<{a: number, b: string}>()
  const result = sample({
    source: {a, b},
    clock,
    target,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    Cannot call 'sample'
      const result = sample({
                     ^^^^^^
      property 'kind' is missing in object literal [1] but exists in 'Unit' [2] in property 'source'. [incompatible-call]
          source: {a, b},
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'CovariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                       [2] ^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'ContravariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                                         [2] ^^^^^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'Unit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample'
      const result = sample({
                     ^^^^^^
      property 'kind' is missing in object literal [1] but exists in 'Unit' [2] in property 'source'. [incompatible-call]
          source: {a, b},
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'CovariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                       [2] ^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'ContravariantUnit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                                                         [2] ^^^^^^^^^^^^^^^^^^^^
    Cannot call 'sample' with object literal bound to 'config'
      source: [a, b],
              ^^^^^^
      property 'kind' (did you mean 'find'?) is missing in array literal [1] but exists in 'Unit' [2] in property 'source'. [prop-missing]
          source: [a, b],
              [1] ^^^^^^
          +source: Unit<A>,
               [2] ^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' because: [incompatible-call] Either object literal [1] is incompatible with 'Store' [2]. Or object literal [1] is incompatible with 'Store' [3]
      const result = sample({a, b}, clock)
                     ^^^^^^
          const result = sample({a, b}, clock)
                            [1] ^^^^^^
          source: Store<A>,
              [2] ^^^^^^^^
          source: Store<A>,
              [3] ^^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample' because: [incompatible-call] Either array literal [1] is incompatible with 'Store' [2]. Or array literal [1] is incompatible with 'Store' [3]
      const result = sample([a, b], clock)
                     ^^^^^^
          const result = sample([a, b], clock)
                            [1] ^^^^^^
          source: Store<A>,
              [2] ^^^^^^^^
          source: Store<A>,
              [3] ^^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample'
      const result = sample(
                     ^^^^^^
      object literal [1] is incompatible with 'Store' [2]. [incompatible-call]
          {a, b},
      [1] ^^^^^^
          source: Store<A>,
              [2] ^^^^^^^^
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
    --typescript--
    no errors

    --flow--
    Cannot call 'sample'
      const result = sample(
                     ^^^^^^
      array literal [1] is incompatible with 'Store' [2]. [incompatible-call]
          [a, b],
      [1] ^^^^^^
          source: Store<A>,
              [2] ^^^^^^^^
    "
  `)
})
