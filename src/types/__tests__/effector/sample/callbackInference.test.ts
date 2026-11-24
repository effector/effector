import {createEvent, createStore, sample, Event, EventCallable} from 'effector'

const typecheck = '{global}'
type IsAny<T> = 0 extends 1 & T ? true : false
const notAny = <T extends false>() => {}
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false
const exact = <T extends true>() => {}

test('extracted predicate preserves exact no-target return type', () => {
  type Value = {value: number}
  const source = createStore<Value | null>(null)
  const clock = createEvent<void>()
  const keep = (value: Value | null): value is Value => value !== null
  const result = sample({source, filter: keep})
  const withClock = sample({source, clock, filter: keep})
  const withClocks = sample({source, clock: [clock], filter: keep})
  exact<Equal<typeof result, Event<Value>>>()
  exact<Equal<typeof withClock, Event<Value>>>()
  exact<Equal<typeof withClocks, Event<Value>>>()
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('generic callback parameters and return unit remain exact', () => {
  function history<T>() {
    const undo = createEvent<void>()
    const goTo = createEvent<number>()
    const state = createStore<{stack: T[]; cursor: number}>({
      stack: [],
      cursor: 0,
    })
    const restored = createEvent<T>()
    const result = sample({
      clock: [undo, goTo],
      source: state,
      fn: ({stack, cursor}, clock) => {
        notAny<IsAny<typeof stack>>()
        notAny<IsAny<typeof cursor>>()
        notAny<IsAny<typeof clock>>()
        exact<Equal<typeof stack, T[]>>()
        exact<Equal<typeof cursor, number>>()
        exact<Equal<typeof clock, void | number>>()
        return stack[cursor]
      },
      target: restored,
    })
    exact<Equal<typeof result, EventCallable<T>>>()
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('invalid callback accesses and target payload are rejected', () => {
  const tick = createEvent<void>()
  const index = createEvent<number>()
  const state = createStore({stack: ['value'], cursor: 0})
  function invalid() {
    sample({
      clock: [tick, index],
      source: state,
      fn: ({stack, cursor}, clock) => {
        //@ts-expect-error
        stack.missing
        //@ts-expect-error
        cursor.toUpperCase()
        //@ts-expect-error
        const wrong: string = clock
        return stack[cursor]
      },
      target: createEvent<string>(),
    })
    sample({
      clock: [tick, index],
      source: state,
      //@ts-expect-error
      fn: ({stack, cursor}) => stack[cursor],
      //@ts-expect-error
      target: createEvent<number>(),
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Property 'missing' does not exist on type 'string[]'.
    Property 'toUpperCase' does not exist on type 'number'.
    Type 'void | number' is not assignable to type 'string'.
      Type 'void' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    "
  `)
})
