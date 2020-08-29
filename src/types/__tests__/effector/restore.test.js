// @flow
/* eslint-disable no-unused-vars */
import {restore, createEvent, createEffect, createStore, Store} from 'effector'

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
  test('restore(Event<number>, null): Store<number|null>', () => {
    const ev = createEvent<number>()

    let restored = restore(ev, null)
    let store: Store<number | null>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      Cannot call 'restore'
        let restored = restore(ev, null)
                       ^^^^^^^
        'Event' [1] is incompatible with 'Effect' [2]. [incompatible-call]
            declare export function createEvent<E>(eventName?: string): Event<E>
                                                                    [1] ^^^^^^^^
            effect: Effect<any, Done, any>,
                [2] ^^^^^^^^^^^^^^^^^^^^^^
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
  test('restore(Effect<any,number,Error>, null): Store<number|null>', () => {
    const eff = createEffect<any, number, Error>()

    let restored = restore(eff, null)
    let store: Store<number | null>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      Cannot call 'restore'
        let restored = restore(eff, null)
                       ^^^^^^^
        'Effect' [1] is incompatible with 'Event' [2]. [incompatible-call]
            ): Effect<Params, Done, Fail>
           [1] ^^^^^^^^^^^^^^^^^^^^^^^^^^
            declare export function restore<E>(event: Event<E>, defaultState: E): Store<E>
                                                  [2] ^^^^^^^^
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

describe('restore cases (should fail)', () => {
  test('restore(Event<number>, string)', () => {
    const ev = createEvent<number>()
    restore(ev, 'initial')

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'string' is not assignable to parameter of type 'number'.

      --flow--
      Cannot call 'restore'
        restore(ev, 'initial')
        ^^^^^^^
        string [1] is incompatible with number [2]. [incompatible-call]
            restore(ev, 'initial')
                    [1] ^^^^^^^^^
            const ev = createEvent<number>()
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
        The last overload gave the following error.
          Argument of type 'Effect<any, number, Error>' is not assignable to parameter of type 'Event<string>'.
            Property 'thru' is missing in type 'Effect<any, number, Error>' but required in type 'Event<string>'.

      --flow--
      Cannot call 'restore'
        restore(eff, 'initial')
        ^^^^^^^
        string [1] is incompatible with number [2]. [incompatible-call]
            restore(eff, 'initial')
                     [1] ^^^^^^^^^
            const eff = createEffect<any, number, Error>()
                                      [2] ^^^^^^
      "
    `)
  })
})
