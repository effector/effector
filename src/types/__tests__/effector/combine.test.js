//@flow

import {combine, createStore, Store} from 'effector'
import setupLocation from '../../setupLocation'
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
      Argument of type '{ R: Store<number>; G: Store<number>; B: Store<number>; }' is not assignable to parameter of type 'Store<unknown>'.
        Object literal may only specify known properties, and 'R' does not exist in type 'Store<unknown>'.
      Binding element 'R' implicitly has an 'any' type.
      Binding element 'G' implicitly has an 'any' type.
      Binding element 'B' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either object literal [1] is incompatible with 'Store' [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]
        const store: Store<string> = combine(
                                     ^^^^^^^
            {R, G, B},
        [1] ^^^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
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
      Argument of type 'Store<number>[]' is not assignable to parameter of type 'Store<unknown>'.
        Type 'Store<number>[]' is missing the following properties from type 'Store<unknown>': reset, getState, on, off, and 11 more.
      Binding element 'R' implicitly has an 'any' type.
      Binding element 'G' implicitly has an 'any' type.
      Binding element 'B' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with 'Store' [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]
        const store: Store<string> = combine(
                                     ^^^^^^^
            [R, G, B],
        [1] ^^^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
      "
    `)
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '{ Color: Store<string>; }' is not assignable to parameter of type 'Store<unknown>'.
        Object literal may only specify known properties, and 'Color' does not exist in type 'Store<unknown>'.
      Binding element 'Color' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either object literal [1] is incompatible with 'Store' [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]
        const store: Store<string> = combine({Color}, ({Color}) => Color)
                                     ^^^^^^^
            const store: Store<string> = combine({Color}, ({Color}) => Color)
                                             [1] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
      "
    `)
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<string> = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<string>[]' is not assignable to parameter of type 'Store<unknown>'.
        Type 'Store<string>[]' is missing the following properties from type 'Store<unknown>': reset, getState, on, off, and 11 more.
      Binding element 'Color' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with 'Store' [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]
        const store: Store<string> = combine([Color], ([Color]) => Color)
                                     ^^^^^^^
            const store: Store<string> = combine([Color], ([Color]) => Color)
                                             [1] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
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
        Types of property 'getState' are incompatible.
          Type '() => { reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }' is not assignable to type '() => string'.
            Type '{ reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }' is not assignable to type 'string'.

      --flow--
      Cannot assign 'combine(...)' to 'store'
        const store: Store<string> = combine(Color)
                                     ^^^^^^^^^^^^^^
        object type [1] is incompatible with string [2] in type argument 'State' [3]
            $ObjMap<
        [1] ^^^^^^^^...
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
        Types of property 'getState' are incompatible.
          Type '() => { R: number; G: number; B: number; }' is not assignable to type '() => { R: string; G: string; B: string; }'.
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
        Types of property 'getState' are incompatible.
          Type '() => [number, number, number]' is not assignable to type '() => [string, string, string]'.
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
        Types of property 'getState' are incompatible.
          Type '() => { Color: string; }' is not assignable to type '() => { Color: number; }'.
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
        Types of property 'getState' are incompatible.
          Type '() => [string]' is not assignable to type '() => [number]'.
            Type '[string]' is not assignable to type '[number]'.

      --flow--
      'Store' [1] is not a valid argument of '$ObjMap' [2]
        $ObjMap<
        ^^^^^^^^...
            ): Store<State>
           [1] ^^^^^^^^^^^^
            $ObjMap<
        [2] ^^^^^^^^...
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
      Argument of type '{ R: Store<number>; G: Store<number>; B: Store<number>; }' is not assignable to parameter of type 'Store<unknown>'.
        Object literal may only specify known properties, and 'R' does not exist in type 'Store<unknown>'.
      Binding element 'R' implicitly has an 'any' type.
      Binding element 'G' implicitly has an 'any' type.
      Binding element 'B' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either object literal [1] is incompatible with 'Store' [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]
        const store: Store<number> = combine(
                                     ^^^^^^^
            {R, G, B},
        [1] ^^^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
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
      Argument of type 'Store<number>[]' is not assignable to parameter of type 'Store<unknown>'.
      Binding element 'R' implicitly has an 'any' type.
      Binding element 'G' implicitly has an 'any' type.
      Binding element 'B' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with 'Store' [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]
        const store: Store<number> = combine(
                                     ^^^^^^^
            [R, G, B],
        [1] ^^^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
      "
    `)
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<number> = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '{ Color: Store<string>; }' is not assignable to parameter of type 'Store<unknown>'.
        Object literal may only specify known properties, and 'Color' does not exist in type 'Store<unknown>'.
      Binding element 'Color' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either object literal [1] is incompatible with 'Store' [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]
        const store: Store<number> = combine({Color}, ({Color}) => Color)
                                     ^^^^^^^
            const store: Store<number> = combine({Color}, ({Color}) => Color)
                                             [1] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
      "
    `)
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    const store: Store<number> = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<string>[]' is not assignable to parameter of type 'Store<unknown>'.
      Binding element 'Color' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with 'Store' [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]
        const store: Store<number> = combine([Color], ([Color]) => Color)
                                     ^^^^^^^
            const store: Store<number> = combine([Color], ([Color]) => Color)
                                             [1] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
                                                 [2] ^^^^^^^^
            a: Store<A>,
           [3] ^^^^^^^^
            a: Store<A>,
           [4] ^^^^^^^^
            a: Store<A>,
           [5] ^^^^^^^^
            a: Store<A>,
           [6] ^^^^^^^^
            a: Store<A>,
           [7] ^^^^^^^^
            a: Store<A>,
           [8] ^^^^^^^^
            a: Store<A>,
           [9] ^^^^^^^^
             a: Store<A>,
           [10] ^^^^^^^^
             a: Store<A>,
           [11] ^^^^^^^^
             a: Store<A>,
           [12] ^^^^^^^^
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
        Types of property 'getState' are incompatible.
          Type '() => string' is not assignable to type '() => number'.
            Type 'string' is not assignable to type 'number'.

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
        Types of property 'getState' are incompatible.
          Type '() => { reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }' is not assignable to type '() => number'.
            Type '{ reset: (...triggers: Unit<any>[]) => Store<string>; getState: () => string; map: { <T>(fn: (state: string, lastState?: T | undefined) => T): Store<T>; <T>(fn: (state: string, lastState: T) => T, firstState: T): Store<...>; }; ... 12 more ...; readonly __: string; }' is not assignable to type 'number'.


      --flow--
      Cannot assign 'combine(...)' to 'store'
        const store: Store<number> = combine(Color)
                                     ^^^^^^^^^^^^^^
        object type [1] is incompatible with number [2] in type argument 'State' [3]
            $ObjMap<
        [1] ^^^^^^^^...
            const store: Store<number> = combine(Color)
                           [2] ^^^^^^
            declare export class Store<State> implements Unit<State> {
                                   [3] ^^^^^
      "
    `)
  })
})
