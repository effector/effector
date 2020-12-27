/* eslint-disable no-unused-vars */
import {createDomain, Store, fork, serialize, allSettled} from 'effector'

const typecheck = '{global}'

describe('serialize cases (should pass)', () => {
  test('serialize(Scope): {[sid: string]: any}', () => {
    const app = createDomain()
    const $a = app.createStore('demo')

    const scope = fork(app)
    const values: {[sid: string]: string} = serialize(scope)

    expect(typecheck).toMatchInlineSnapshot(`
      "
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
        No overload matches this call.
          Overload 1 of 3, '(iterable: Iterable<readonly [Store<any>, any]>): Map<Store<any>, any>', gave the following error.
            Argument of type '((number | Store<number>)[] | (string | Store<string>)[])[]' is not assignable to parameter of type 'Iterable<readonly [Store<any>, any]>'.
              The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
                Type 'IteratorResult<(number | Store<number>)[] | (string | Store<string>)[], any>' is not assignable to type 'IteratorResult<readonly [Store<any>, any], any>'.
                  Type 'IteratorYieldResult<(number | Store<number>)[] | (string | Store<string>)[]>' is not assignable to type 'IteratorResult<readonly [Store<any>, any], any>'.
                    Type 'IteratorYieldResult<(number | Store<number>)[] | (string | Store<string>)[]>' is not assignable to type 'IteratorYieldResult<readonly [Store<any>, any]>'.
                      Type '(number | Store<number>)[] | (string | Store<string>)[]' is not assignable to type 'readonly [Store<any>, any]'.
                        Type '(number | Store<number>)[]' is not assignable to type 'readonly [Store<any>, any]'.
                          Target requires 2 element(s) but source may have fewer.
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
        no errors
        "
      `)
    })
  })
})

describe('allSettled', () => {
  test('event', () => {
    const app = createDomain()
    const event = app.createEvent<number>()
    const req: Promise<void> = allSettled(event, {
      scope: fork(app),
      params: 0,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('void event', () => {
    const app = createDomain()
    const event = app.createEvent()
    const req: Promise<void> = allSettled(event, {
      scope: fork(app),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('effect', () => {
    const app = createDomain()
    const fx = app.createEffect((x: number) => x.toString())
    const req: Promise<
      {status: 'done'; value: string} | {status: 'fail'; value: Error}
    > = allSettled(fx, {
      scope: fork(app),
      params: 0,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('void effect', () => {
    const app = createDomain()
    const fx = app.createEffect(() => 'ok')
    const req: Promise<
      {status: 'done'; value: string} | {status: 'fail'; value: Error}
    > = allSettled(fx, {
      scope: fork(app),
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
