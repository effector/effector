// @flow
/* eslint-disable no-unused-vars */
import {createDomain, Store} from 'effector'
import {fork, serialize} from 'effector/fork'

const typecheck = '{global}'

describe('serialize cases (should pass)', () => {
  test('serialize(Scope): {[sid: string]: any}', () => {
    const app = createDomain()
    const $a = app.createStore('demo')

    const scope = fork(app)
    const values: {[sid: string]: string} = serialize(scope)

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })

  test('serialize(Scope, {ignore:[Store<any>]}): {[sid: string]: any}', () => {
    const app = createDomain()
    const $a = app.createStore('demo')
    const $b = app.createStore(5)

    const scope = fork(app)
    const values: {[sid: string]: number} = serialize(scope, {ignore: [$b]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors
      "
    `)
  })
})

describe('serialize cases (should fail)', () => {
  test('serialize(Scope, {ignore:[Event<any>]}): {[sid: string]: any}', () => {
    const app = createDomain()
    const event = app.createEvent()

    const scope = fork(app)
    const values: {[sid: string]: any} = serialize(scope, {ignore: [event]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Event<void>' is missing the following properties from type 'Store<any>': reset, getState, on, off, and 2 more.
      "
    `)
  })
})

describe('fork values', () => {
  describe('without type annotations (should pass)', () => {
    test('fork values as js Map', () => {
      const app = createDomain()
      const foo = app.createStore<number>(0)
      const bar = app.createStore<string>('a')

      const scope = fork(app, {
        values: new Map([
          [foo, 1],
          [bar, 'b'],
        ]),
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        No overload matches this call.
          Overload 1 of 3, '(iterable: Iterable<readonly [Store<any>, any]>): Map<Store<any>, any>', gave the following error.
            Argument of type '((number | Store<number>)[] | (string | Store<string>)[])[]' is not assignable to parameter of type 'Iterable<readonly [Store<any>, any]>'.
              The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
                Type 'IteratorResult<(number | Store<number>)[] | (string | Store<string>)[], any>' is not assignable to type 'IteratorResult<readonly [Store<any>, any], any>'.
                  Type 'IteratorYieldResult<(number | Store<number>)[] | (string | Store<string>)[]>' is not assignable to type 'IteratorResult<readonly [Store<any>, any], any>'.
                    Type 'IteratorYieldResult<(number | Store<number>)[] | (string | Store<string>)[]>' is not assignable to type 'IteratorYieldResult<readonly [Store<any>, any]>'.
                      Type '(number | Store<number>)[] | (string | Store<string>)[]' is not assignable to type 'readonly [Store<any>, any]'.
                        Type '(number | Store<number>)[]' is missing the following properties from type 'readonly [Store<any>, any]': 0, 1
        "
      `)
    })
    test('fork values as sid map', () => {
      const app = createDomain()
      const foo = app.createStore<number>(0)
      const bar = app.createStore<string>('a')

      const scope = fork(app, {
        values: {
          [foo.sid]: 1,
          [bar.sid]: 'b',
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        "
      `)
    })
  })
  describe('with type annotations', () => {
    test('fork values as js Map', () => {
      const app = createDomain()
      const foo = app.createStore<number>(0)
      const bar = app.createStore<string>('a')

      const scope = fork(app, {
        values: new Map<Store<any>, any>([
          [foo, 1],
          [bar, 'b'],
        ]),
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })
    test('fork values as sid map', () => {
      const app = createDomain()
      const foo = app.createStore<number>(0)
      const bar = app.createStore<string>('a')

      const scope = fork(app, {
        values: {
          [foo.sid!]: 1,
          [bar.sid!]: 'b',
        },
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors
        "
      `)
    })
  })
})
