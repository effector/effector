//@flow

import {combine, createStore, Store} from 'effector'

const typecheck = '{global}'

describe('combine cases (should pass)', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<{R: number, G: number, B: number}> = combine({R, G, B})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<[number, number, number]> = combine([R, G, B])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('combine([Store<number>,Store<string>])', () => {
    const sn = createStore(0)
    const ss = createStore('')
    const store = combine([sn, ss]).map(([n, s]) => {
      n.toFixed // should have method on type
      s.charAt // should have method on type
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      in the first argument: Either cannot get 'n.toFixed'
        const store = combine([sn, ss]).map(([n, s]) => {
                                   ^^
        property 'toFixed' is missing in 'String' [1]. Or cannot get 'n.toFixed'
            const ss = createStore('')
                               [1] ^^
            ): Store<State>
           [2] ^^^^^^^^^^^^
      "
    `)
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    const store: Store<{Color: string}> = combine({Color})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    const store: Store<[string]> = combine([Color])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<string> = combine(
      {R, G, B},
      ({R, G, B}) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test(`combine([R,G,B], ([R,G,B]) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<string> = combine(
      [R, G, B],
      ([R, G, B]) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test(`combine([Store<number>,Store<string>], ([number,string]) => ...)`, () => {
    const sn = createStore(0)
    const ss = createStore('')
    const store = combine([sn, ss], ([n, s]) => {
      n.toFixed // should have method on type
      s.charAt // should have method on type
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      in the first argument: Either cannot get 'n.toFixed'
        const store = combine([sn, ss], ([n, s]) => {
                                   ^^
        property 'toFixed' is missing in 'String' [1]. Or cannot get 'n.toFixed'
            const ss = createStore('')
                               [1] ^^
            ): Store<State>
           [2] ^^^^^^^^^^^^
      "
    `)
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test(`combine(Color, (Color) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine(Color, Color => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test(`combine(R,G,B, (R,G,B) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<string> = combine(
      R,
      G,
      B,
      (R, G, B) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('combine(R,G,B)', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<[number, number, number]> = combine(R, G, B)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<number>' is not assignable to parameter of type '(a: number, b: number) => [number, number, number]'.
        Type 'Store<number>' provides no match for the signature '(a: number, b: number): [number, number, number]'.

      --flow--
      Cannot call 'combine'
        const store: Store<[number, number, number]> = combine(R, G, B)
                                                                     ^
        a call signature declaring the expected parameter / return type is missing in 'Store' [1] but exists in function type [2]
            ): Store<State>
           [1] ^^^^^^^^^^^^
            fn: (a: A, b: B) => R,
            [2] ^^^^^^^^^^^^^^^^^
      "
    `)
  })
  test('combine(Color)', () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine(Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<{ reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }>' is not assignable to type 'Store<string>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }' is not assignable to type 'string'.

      --flow--
      Cannot assign 'combine(...)' to 'store'
        const store: Store<string> = combine(Color)
                                     ^^^^^^^^^^^^^^
        object type [1] is incompatible with string [2] in type argument 'State' [3]
            ): Store<$ObjMap<State, <S>(field: Store<S> | S) => S>>
                 [1] ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            const store: Store<string> = combine(Color)
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
})

describe('error inference (should fail with number -> string error)', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<{ R: number; G: number; B: number; }>' is not assignable to type 'Store<{ R: string; G: string; B: string; }>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ R: number; G: number; B: number; }' is not assignable to type '{ R: string; G: string; B: string; }'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
                                                                         ^
        number [1] is incompatible with string [2] in property 'R' of type argument 'State' [3]
            const R = createStore(233)
                              [1] ^^^
            const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
                               [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
                                                                            ^
        number [1] is incompatible with string [2] in property 'G' of type argument 'State' [3]
            const G = createStore(88)
                              [1] ^^
            const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
                                          [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
                                                                               ^
        number [1] is incompatible with string [2] in property 'B' of type argument 'State' [3]
            const B = createStore(1)
                              [1] ^
            const store: Store<{R: string, G: string, B: string}> = combine({R, G, B})
                                                     [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<[string, string, string]> = combine([R, G, B])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<[number, number, number]>' is not assignable to type 'Store<[string, string, string]>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '[number, number, number]' is not assignable to type '[string, string, string]'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<[string, string, string]> = combine([R, G, B])
                                                                ^
        number [1] is incompatible with string [2] in index 0 of type argument 'State' [3]
            const R = createStore(233)
                              [1] ^^^
            const store: Store<[string, string, string]> = combine([R, G, B])
                            [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<[string, string, string]> = combine([R, G, B])
                                                                   ^
        number [1] is incompatible with string [2] in index 1 of type argument 'State' [3]
            const G = createStore(88)
                              [1] ^^
            const store: Store<[string, string, string]> = combine([R, G, B])
                                    [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<[string, string, string]> = combine([R, G, B])
                                                                      ^
        number [1] is incompatible with string [2] in index 2 of type argument 'State' [3]
            const B = createStore(1)
                              [1] ^
            const store: Store<[string, string, string]> = combine([R, G, B])
                                            [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    const store: Store<{Color: number}> = combine({Color})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<{ Color: string; }>' is not assignable to type 'Store<{ Color: number; }>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ Color: string; }' is not assignable to type '{ Color: number; }'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<{Color: number}> = combine({Color})
                                                       ^^^^^
        string [1] is incompatible with number [2] in property 'Color' of type argument 'State' [3]
            const Color = createStore('#e95801')
                                  [1] ^^^^^^^^^
            const store: Store<{Color: number}> = combine({Color})
                                   [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    const store: Store<[number]> = combine([Color])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<[string]>' is not assignable to type 'Store<[number]>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '[string]' is not assignable to type '[number]'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<[number]> = combine([Color])
                                                ^^^^^
        string [1] is incompatible with number [2] in index 0 of type argument 'State' [3]
            const Color = createStore('#e95801')
                                  [1] ^^^^^^^^^
            const store: Store<[number]> = combine([Color])
                            [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<number> = combine(
      {R, G, B},
      ({R, G, B}) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.
        The types returned by 'getState()' are incompatible between these types.
          Type 'string' is not assignable to type 'number'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        {R, G, B},
               ^
        string [1] is incompatible with number [2] in type argument 'State' [3]. Or cannot call 'B.toString'
            '#' +
        [1] ^^^^^...
            const store: Store<number> = combine(
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
        <BUILTINS>/core.js
            toString(): string;
        [4] ^^^^^^^^^^^^^^^^^^
      "
    `)
  })
  test(`combine([R,G,B], ([R,G,B]) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<number> = combine(
      [R, G, B],
      ([R, G, B]) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        [R, G, B],
               ^
        string [1] is incompatible with number [2] in type argument 'State' [3]. Or cannot call 'B.toString'
            '#' +
        [1] ^^^^^...
            const store: Store<number> = combine(
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
        <BUILTINS>/core.js
            toString(): string;
        [4] ^^^^^^^^^^^^^^^^^^
      "
    `)
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<number> = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<number> = combine({Color}, ({Color}) => Color)
                                              ^^^^^
        string [1] is incompatible with number [2] in type argument 'State' [3]
            const Color = createStore('#e95801')
                                  [1] ^^^^^^^^^
            const store: Store<number> = combine({Color}, ({Color}) => Color)
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<number> = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.

      --flow--
      in the first argument: Either cannot assign 'combine(...)' to 'store'
        const store: Store<number> = combine([Color], ([Color]) => Color)
                                              ^^^^^
        string [1] is incompatible with number [2] in type argument 'State' [3]
            const Color = createStore('#e95801')
                                  [1] ^^^^^^^^^
            const store: Store<number> = combine([Color], ([Color]) => Color)
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test(`combine(Color, (Color) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<number> = combine(Color, Color => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.

      --flow--
      Cannot assign 'combine(...)' to 'store'
        const store: Store<number> = combine(Color, Color => Color)
                                                             ^^^^^
        string [1] is incompatible with number [2] in type argument 'State' [3]
            const Color = createStore('#e95801')
                                  [1] ^^^^^^^^^
            const store: Store<number> = combine(Color, Color => Color)
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test(`combine(R,G,B, (R,G,B) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<number> = combine(
      R,
      G,
      B,
      (R, G, B) =>
        '#' +
        R.toString(16).padStart(2, '0') +
        G.toString(16).padStart(2, '0') +
        B.toString(16).padStart(2, '0'),
    )
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<string>' is not assignable to type 'Store<number>'.

      --flow--
      Cannot assign 'combine(...)' to 'store'
        '#' +
        ^^^^^...
        string [1] is incompatible with number [2] in type argument 'State' [3]
            '#' +
        [1] ^^^^^...
            const store: Store<number> = combine(
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
  test('combine(R,G,B)', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store: Store<[string, string, string]> = combine(R, G, B)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<number>' is not assignable to parameter of type '(a: number, b: number) => [string, string, string]'.
        Type 'Store<number>' provides no match for the signature '(a: number, b: number): [string, string, string]'.

      --flow--
      Cannot call 'combine'
        const store: Store<[string, string, string]> = combine(R, G, B)
                                                                     ^
        a call signature declaring the expected parameter / return type is missing in 'Store' [1] but exists in function type [2]
            ): Store<State>
           [1] ^^^^^^^^^^^^
            fn: (a: A, b: B) => R,
            [2] ^^^^^^^^^^^^^^^^^
      "
    `)
  })
  test('combine(Color)', () => {
    const Color = createStore('#e95801')
    const store: Store<number> = combine(Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'Store<{ reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }>' is not assignable to type 'Store<number>'.
        The types returned by 'getState()' are incompatible between these types.
          Type '{ reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }' is not assignable to type 'number'.

      --flow--
      Cannot assign 'combine(...)' to 'store'
        const store: Store<number> = combine(Color)
                                     ^^^^^^^^^^^^^^
        object type [1] is incompatible with number [2] in type argument 'State' [3]
            ): Store<$ObjMap<State, <S>(field: Store<S> | S) => S>>
                 [1] ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            const store: Store<number> = combine(Color)
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
})
