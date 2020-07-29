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

describe('with target', () => {
  it('support clock array in cases without fn (should pass)', () => {
    const target = createEvent<{a: string; b: string}>()
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source,
      clock: [clockA, clockB, clockC],
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type '(Event<any> | Event<void> | Event<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type '(Event<any> | Event<void> | Event<string>)[]' is missing the following properties from type 'Unit<unknown>': kind, __
      "
    `)
  })
  it('support clock array in cases with fn (should pass)', () => {
    const target = createEvent<{a: string; b: string; clock: any}>()
    const source = createStore({a: '', b: ''})
    const clockA = createEvent()
    const clockB = createEvent<any>()
    const clockC = createEvent<string>()

    sample({
      source,
      clock: [clockA, clockB, clockC],
      fn: ({a, b}, clock) => ({a, b, clock}),
      target,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type '(Event<any> | Event<void> | Event<string>)[]' is missing the following properties from type 'Unit<any>': kind, __
      No overload matches this call.
        The last overload gave the following error.
          Type 'Store<{ a: string; b: string; }>' is not assignable to type 'Combinable'.
            Type 'Store<{ a: string; b: string; }>' is not assignable to type '{ [key: string]: Store<any>; }'.
              Index signature is missing in type 'Store<{ a: string; b: string; }>'.
                Type '(Event<any> | Event<void> | Event<string>)[]' is missing the following properties from type 'Unit<any>': kind, __
      Binding element 'a' implicitly has an 'any' type.
      Binding element 'b' implicitly has an 'any' type.
      Parameter 'clock' implicitly has an 'any' type.
      "
    `)
  })
})
