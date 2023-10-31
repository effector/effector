/* eslint-disable no-unused-vars */
import {
  restore,
  createEvent,
  createEffect,
  createStore,
  Store,
  StoreWritable,
} from 'effector'

const typecheck = '{global}'

describe('restore cases (should pass)', () => {
  test('restore(Event<number>, number): Store<number>', () => {
    const ev = createEvent<number>()

    let restored = restore(ev, 0)
    let store: StoreWritable<number>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('restore(Event<number>, null): Store<number|null>', () => {
    const ev = createEvent<number>()

    let restored = restore(ev, null)
    let store: StoreWritable<number | null>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('restore(Effect<any,number,Error>, number): Store<number>', () => {
    const eff = createEffect<any, number, Error>()

    let restored = restore(eff, 0)
    let store: StoreWritable<number>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('restore(Effect<any,number,Error>, null): Store<number|null>', () => {
    const eff = createEffect<any, number, Error>()

    let restored = restore(eff, null)
    let store: StoreWritable<number | null>

    store = restored
    restored = store

    expect(typecheck).toMatchInlineSnapshot(`
      "
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
      n: StoreWritable<number>
      s: StoreWritable<string>
      b: StoreWritable<boolean>
      l: StoreWritable<string>
    }

    shape = restored
    restored = shape

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

describe('restore cases (should fail)', () => {
  test('restore(Event<number>, string)', () => {
    const ev = createEvent<number>()
    //@ts-expect-error
    restore(ev, 'initial')

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'string' is not assignable to parameter of type 'number'.
      "
    `)
  })
  test('restore(Effect<any,number,Error>, string)', () => {
    const eff = createEffect<any, number, Error>()
    //@ts-expect-error
    restore(eff, 'initial')

    expect(typecheck).toMatchInlineSnapshot(`
      "
      No overload matches this call.
        The last overload gave the following error.
          Argument of type 'Effect<any, number, Error>' is not assignable to parameter of type 'Event<string>'.
            Types of property 'kind' are incompatible.
              Type '\\"effect\\"' is not assignable to type '\\"event\\"'.
      "
    `)
  })
  test('restore(Event<any>)', () => {
    try {
      const ev = createEvent<number>()

      let restored = restore(ev)
      let store: StoreWritable<number>

      store = restored
      //@ts-expect-error
      restored = store
    } catch (e) {}

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'StoreWritable<number>' is not assignable to type 'never'.
      "
    `)
  })
  test('restore(Effect<any,number,Error>)', () => {
    try {
      const eff = createEffect<any, number, Error>()

      let restored = restore(eff)
      let store: StoreWritable<number>

      store = restored
      //@ts-expect-error
      restored = store
    } catch (e) {}

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'StoreWritable<number>' is not assignable to type 'never'.
      "
    `)
  })
})
