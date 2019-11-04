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
