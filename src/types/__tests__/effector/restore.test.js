// @flow
/* eslint-disable no-unused-vars */
import {restore, createEvent, createEffect, createStore, Store} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

describe('restore cases (should pass)', () => {
  test('restore(Event<number>, number): Store<number>', () => {
    const ev = createEvent<number>()

    let restored = restore(ev, 0)
    let store: Store<number>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
      `)
  })
  test('restore(Effect<any,number,Error>, number): Store<number>', () => {
    const eff = createEffect<any, number, Error>()

    let restored = restore(eff, 0)
    let store: Store<number>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
      `)
  })
  test('restore(Dictionary<?>): wraps each non-Store dictionary property into Store', () => {
    const dictionary = {
      n: 0,
      s: '',
      b: false,
      l: createStore(''),
    }

    let restored = restore(dictionary)

    let shape: {
      n: Store<number>,
      s: Store<string>,
      b: Store<boolean>,
      l: Store<string>,
    }

    shape = restored
    restored = shape

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})

describe('restore cases (should pass for `strictFunctionTypes: true`)', () => {
  test('restore<number|null>(Event<number>, null): Store<number|null>', () => {
    const ev = createEvent<number>()

    let restored = restore<number | null>(ev, null)
    let store: Store<number | null>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        Overload 1 of 3, '(effect: Effect<any, number | null, any>, defaultState: number | null): Store<number | null>', gave the following error.
          Argument of type 'Event<number>' is not assignable to parameter of type 'Effect<any, number | null, any>'.
            Type 'Event<number>' is missing the following properties from type 'Effect<any, number | null, any>': done, fail, finally, use, pending
        Overload 2 of 3, '(event: Event<number | null>, defaultState: number | null): Store<number | null>', gave the following error.
          Argument of type 'Event<number>' is not assignable to parameter of type 'Event<number | null>'.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type 'number | null' is not assignable to type 'number'.
                Type 'null' is not assignable to type 'number'.

      --flow--
      Cannot call 'restore'
        let restored = restore<number | null>(ev, null)
                                              ^^
        number [1] is incompatible with null [2] in type argument 'Payload' [3]
            const ev = createEvent<number>()
                               [1] ^^^^^^
            let restored = restore<number | null>(ev, null)
                                        [2] ^^^^
            declare export class Event<Payload> implements Unit<Payload> {
                                   [3] ^^^^^^^
      "
    `)
  })
  test('restore<number|null>(Effect<any,number,Error>, null): Store<number|null>', () => {
    const eff = createEffect<any, number, Error>()

    let restored = restore<number | null>(eff, null)
    let store: Store<number | null>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        Overload 1 of 3, '(effect: Effect<any, number | null, any>, defaultState: number | null): Store<number | null>', gave the following error.
          Argument of type 'Effect<any, number, Error>' is not assignable to parameter of type 'Effect<any, number | null, any>'.
            Types of property 'done' are incompatible.
              Type 'Event<{ params: any; result: number; }>' is not assignable to type 'Event<{ params: any; result: number | null; }>'.
                Types of parameters 'payload' and 'payload' are incompatible.
                  Type '{ params: any; result: number | null; }' is not assignable to type '{ params: any; result: number; }'.
        Overload 2 of 3, '(event: Event<number | null>, defaultState: number | null): Store<number | null>', gave the following error.
          Argument of type 'Effect<any, number, Error>' is not assignable to parameter of type 'Event<number | null>'.
            Type 'Effect<any, number, Error>' is missing the following properties from type 'Event<number | null>': filter, filterMap, thru

      --flow--
      Cannot call 'restore'
        let restored = restore<number | null>(eff, null)
                                              ^^^
        number [1] is incompatible with null [2] in type argument 'Done' [3]
            const eff = createEffect<any, number, Error>()
                                      [1] ^^^^^^
            let restored = restore<number | null>(eff, null)
                                        [2] ^^^^
            declare export class Effect<Params, Done, Fail = Error>
                                            [3] ^^^^
      "
    `)
  })
})

describe('restore cases (should fail)', () => {
  test('restore(Event<number>, string)', () => {
    const eff = createEvent<number>()
    restore(eff, 'initial')

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        Overload 1 of 3, '(effect: Effect<any, string, any>, defaultState: string): Store<string>', gave the following error.
          Argument of type 'Event<number>' is not assignable to parameter of type 'Effect<any, string, any>'.
            Type 'Event<number>' is missing the following properties from type 'Effect<any, string, any>': done, fail, finally, use, pending
        Overload 2 of 3, '(event: Event<number>, defaultState: number): Store<number>', gave the following error.
          Argument of type '\\"initial\\"' is not assignable to parameter of type 'number'.

      --flow--
      Cannot call 'restore'
        restore(eff, 'initial')
                     ^^^^^^^^^
        string [1] is incompatible with number [2]
            restore(eff, 'initial')
                     [1] ^^^^^^^^^
            const eff = createEvent<number>()
                                [2] ^^^^^^
      "
    `)
  })
  test('restore(Effect<any,number,Error>, string)', () => {
    const eff = createEffect<any, number, Error>()
    restore(eff, 'initial')

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        Overload 1 of 3, '(effect: Effect<any, number, any>, defaultState: number): Store<number>', gave the following error.
          Argument of type '\\"initial\\"' is not assignable to parameter of type 'number'.
        Overload 2 of 3, '(event: Event<string>, defaultState: string): Store<string>', gave the following error.
          Argument of type 'Effect<any, number, Error>' is not assignable to parameter of type 'Event<string>'.
            Type 'Effect<any, number, Error>' is missing the following properties from type 'Event<string>': filter, filterMap, thru


      --flow--
      Cannot call 'restore'
        restore(eff, 'initial')
                     ^^^^^^^^^
        string [1] is incompatible with number [2]
            restore(eff, 'initial')
                     [1] ^^^^^^^^^
            const eff = createEffect<any, number, Error>()
                                      [2] ^^^^^^
      "
    `)
  })
})
