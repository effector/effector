/* eslint-disable no-unused-vars */
import {createDomain, Store, fork, serialize, allSettled, Json} from 'effector'

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
    //@ts-expect-error
    const values: {[sid: string]: any} = serialize(scope, {ignore: [event]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type 'Event<void>' is missing the following properties from type 'Store<any>': reset, getState, on, off, and 2 more.
      "
    `)
  })
})

describe('custom serialize for stores', () => {
  test('Correct case', () => {
    const d = createDomain()
    const $map = d.createStore<Map<number, number>, [number, number][]>(
      new Map<number, number>(),
      {
        serialize: {
          write: map => {
            const result = [...map.entries()]

            return result
          },
          read: jsonMap => {
            return new Map(jsonMap)
          },
        },
      },
    )

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('Incorrect case', () => {
    const d = createDomain()
    const $map = d.createStore<Map<number, number>>(new Map<number, number>(), {
      serialize: {
        // @ts-expect-error
        write: map => {
          return map // non-Json value
        },
        // @ts-expect-error
        read: jsonMap => {
          const serializedValue: typeof jsonMap extends Json
            ? typeof jsonMap
            : never = jsonMap

          // @ts-expect-error
          return new Map(serializedValue)
        },
      },
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      Type '(map: Map<number, number>) => Map<number, number>' is not assignable to type '(state: Map<number, number>) => Json'.
        Type 'Map<number, number>' is not assignable to type 'Json'.
          Type 'Map<number, number>' is not assignable to type '{ [k: string]: Json; }'.
            Index signature for type 'string' is missing in type 'Map<number, number>'.
      Type '(jsonMap: Json) => Map<string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined>' is not assignable to type '(json: Json) => Map<number, number>'.
        Type 'Map<string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined>' is not assignable to type 'Map<number, number>'.
          Type 'string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined' is not assignable to type 'number'.
            Type 'undefined' is not assignable to type 'number'.
      No overload matches this call.
        Overload 1 of 4, '(iterable?: Iterable<readonly [string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined]> | null | undefined): Map<...>', gave the following error.
          Argument of type 'Json' is not assignable to parameter of type 'Iterable<readonly [string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined]> | null | undefined'.
            Type 'string' is not assignable to type 'Iterable<readonly [string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined]>'.
        Overload 2 of 4, '(entries?: readonly (readonly [string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined])[] | null | undefined): Map<...>', gave the following error.
          Argument of type 'Json' is not assignable to parameter of type 'readonly (readonly [string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined])[] | null | undefined'.
            Type 'string' is not assignable to type 'readonly (readonly [string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined, string | number | boolean | Json[] | { [k: string]: Json; } | null | undefined])[]'.
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
          Overload 1 of 4, '(iterable?: Iterable<readonly [Store<number>, number]> | null | undefined): Map<Store<number>, number>', gave the following error.
            Argument of type '([Store<number>, number] | [Store<string>, string])[]' is not assignable to parameter of type 'Iterable<readonly [Store<number>, number]>'.
              The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
                Type 'IteratorResult<[Store<number>, number] | [Store<string>, string], any>' is not assignable to type 'IteratorResult<readonly [Store<number>, number], any>'.
                  Type 'IteratorYieldResult<[Store<number>, number] | [Store<string>, string]>' is not assignable to type 'IteratorResult<readonly [Store<number>, number], any>'.
                    Type 'IteratorYieldResult<[Store<number>, number] | [Store<string>, string]>' is not assignable to type 'IteratorYieldResult<readonly [Store<number>, number]>'.
                      Type '[Store<number>, number] | [Store<string>, string]' is not assignable to type 'readonly [Store<number>, number]'.
                        Type '[Store<string>, string]' is not assignable to type 'readonly [Store<number>, number]'.
                          Type at position 0 in source is not compatible with type at position 0 in target.
                            Type 'Store<string>' is not assignable to type 'Store<number>'.
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

describe('fork handlers', () => {
  test('effect with custom error', () => {
    const app = createDomain()
    const fooFx = app.createEffect<void, void, {message: string}>(() => {})

    const scope = fork(app, {
      handlers: [[fooFx, () => {}]],
    })

    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
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

  test('scope', () => {
    const app = createDomain()
    const fx = app.createEffect(() => 'ok')
    const req: Promise<void> = allSettled(fork())
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})
