/* eslint-disable no-unused-vars */
import {
  createDomain,
  Store,
  fork,
  serialize,
  allSettled,
  Json,
  StoreWritable,
  createStore,
} from 'effector'

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
      Type 'EventCallable<void>' is missing the following properties from type 'Store<any>': updates, getState, thru, defaultState
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
        // TS expects homogenous Map by default :shrug:
        // @ts-expect-error
        values: new Map([
          [foo, 1],
          [bar, 'b'],
        ]),
      })

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          Overload 1 of 4, '(iterable?: Iterable<readonly [StoreWritable<number>, number]> | null | undefined): Map<StoreWritable<number>, number>', gave the following error.
            Argument of type '([StoreWritable<number>, number] | [StoreWritable<string>, string])[]' is not assignable to parameter of type 'Iterable<readonly [StoreWritable<number>, number]>'.
              The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
                Type 'IteratorResult<[StoreWritable<number>, number] | [StoreWritable<string>, string], any>' is not assignable to type 'IteratorResult<readonly [StoreWritable<number>, number], any>'.
                  Type 'IteratorYieldResult<[StoreWritable<number>, number] | [StoreWritable<string>, string]>' is not assignable to type 'IteratorResult<readonly [StoreWritable<number>, number], any>'.
                    Type 'IteratorYieldResult<[StoreWritable<number>, number] | [StoreWritable<string>, string]>' is not assignable to type 'IteratorYieldResult<readonly [StoreWritable<number>, number]>'.
                      Type '[StoreWritable<number>, number] | [StoreWritable<string>, string]' is not assignable to type 'readonly [StoreWritable<number>, number]'.
                        Type '[StoreWritable<string>, string]' is not assignable to type 'readonly [StoreWritable<number>, number]'.
                          Type at position 0 in source is not compatible with type at position 0 in target.
                            The types of '____._' are incompatible between these types.
                              Type 'string' is not assignable to type 'number'.
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
  describe('strictly types tuple', () => {
    test('as tuple', () => {
      const foo = createStore<number>(0)
      const bar = createStore<string>('a')
      const baz = createStore({
        nested: {
          value: 0,
        },
      })

      const scope = fork({
        values: [
          [foo, 1],
          [bar, 'b'],
          [
            baz,
            {
              nested: {
                value: 42,
              },
            },
          ],
        ],
      })

      expect(typecheck).toMatchInlineSnapshot(`
              "
              no errors
              "
          `)
    })

    test('derived stores are not allowed', () => {
      const foo = createStore<number>(0)
      const bar = createStore<string>('a')
      const baz = createStore({
        nested: {
          value: 0,
        },
      })
      const map = foo.map(x => x)

      function nocall() {
        const scope = fork({
          // @ts-expect-error
          values: [
            [map, 1],
            [bar, 'b'],
            [
              baz,
              {
                nested: {
                  value: 42,
                },
              },
            ],
          ],
        })
      }

      expect(typecheck).toMatchInlineSnapshot(`
        "
        No overload matches this call.
          Overload 1 of 2, '(config?: { values?: SerializedState | LegacyMap | StorePair<any>[] | undefined; handlers?: Handlers | undefined; } | undefined): Scope', gave the following error.
            Type '([StoreWritable<string>, string] | [Store<number>, number] | [StoreWritable<{ nested: { value: number; }; }>, { nested: { value: number; }; }])[]' is not assignable to type 'SerializedState | LegacyMap | StorePair<any>[] | undefined'.
              Type '([StoreWritable<string>, string] | [Store<number>, number] | [StoreWritable<{ nested: { value: number; }; }>, { nested: { value: number; }; }])[]' is not assignable to type 'StorePair<any>[]'.
                Type '[StoreWritable<string>, string] | [Store<number>, number] | [StoreWritable<{ nested: { value: number; }; }>, { nested: { value: number; }; }]' is not assignable to type 'StorePair<any>'.
                  Type '[Store<number>, number]' is not assignable to type '[StoreWritable<any>, any]'.
                    Type at position 0 in source is not compatible with type at position 0 in target.
                      Type 'Store<number>' is missing the following properties from type 'StoreWritable<any>': ____, on, off, reset, and 2 more.
          Overload 2 of 2, '(domain: Domain, config?: { values?: [StoreWritable<any>, any][] | SerializedState | LegacyMap | undefined; handlers?: Handlers | undefined; } | undefined): Scope', gave the following error.
            Argument of type '{ values: ((string | StoreWritable<string>)[] | (number | Store<number>)[] | (StoreWritable<{ nested: { value: number; }; }> | { nested: { value: number; }; })[])[]; }' is not assignable to parameter of type 'Domain'.
              Object literal may only specify known properties, and 'values' does not exist in type 'Domain'.
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
        values: new Map<StoreWritable<any>, any>([
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
