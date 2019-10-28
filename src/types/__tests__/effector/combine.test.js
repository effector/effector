//@flow

import {combine, createStore} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

describe('combine cases', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine({R, G, B})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '{ R: Store<number>; G: Store<number>; B: Store<number>; }' is not assignable to parameter of type '() => unknown'.
        Object literal may only specify known properties, and 'R' does not exist in type '() => unknown'.

      --flow--
      Cannot call 'combine' because: Either a call signature declaring the expected parameter / return type is missing in object literal [1] but exists in function type [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]. Or object literal [1] is incompatible with 'Store' [13]
        const store = combine({R, G, B})
                      ^^^^^^^
            const store = combine({R, G, B})
                              [1] ^^^^^^^^^
            declare export function combine<R>(fn: () => R): Store<R>
                                               [2] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
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
             a: Store<A>,
           [13] ^^^^^^^^
      "
    `)
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine([R, G, B])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<number>[]' is not assignable to parameter of type '() => unknown'.
        Type 'Store<number>[]' provides no match for the signature '(): unknown'.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with function type [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]. Or array literal [1] is incompatible with 'Store' [13]
        const store = combine([R, G, B])
                      ^^^^^^^
            const store = combine([R, G, B])
                              [1] ^^^^^^^^^
            declare export function combine<R>(fn: () => R): Store<R>
                                               [2] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
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
             a: Store<A>,
           [13] ^^^^^^^^
      "
    `)
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    const store = combine({Color})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '{ Color: Store<string>; }' is not assignable to parameter of type '() => unknown'.
        Object literal may only specify known properties, and 'Color' does not exist in type '() => unknown'.

      --flow--
      Cannot call 'combine' because: Either a call signature declaring the expected parameter / return type is missing in object literal [1] but exists in function type [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]. Or object literal [1] is incompatible with 'Store' [13]
        const store = combine({Color})
                      ^^^^^^^
            const store = combine({Color})
                              [1] ^^^^^^^
            declare export function combine<R>(fn: () => R): Store<R>
                                               [2] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
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
             a: Store<A>,
           [13] ^^^^^^^^
      "
    `)
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    const store = combine([Color])
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<string>[]' is not assignable to parameter of type '() => unknown'.
        Type 'Store<string>[]' provides no match for the signature '(): unknown'.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with function type [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]. Or array literal [1] is incompatible with 'Store' [13]
        const store = combine([Color])
                      ^^^^^^^
            const store = combine([Color])
                              [1] ^^^^^^^
            declare export function combine<R>(fn: () => R): Store<R>
                                               [2] ^^^^^^^
            declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
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
             a: Store<A>,
           [13] ^^^^^^^^
      "
    `)
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine(
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
        const store = combine(
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
    const store = combine(
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
        const store = combine(
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
    const store = combine({Color}, ({Color}) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type '{ Color: Store<string>; }' is not assignable to parameter of type 'Store<unknown>'.
        Object literal may only specify known properties, and 'Color' does not exist in type 'Store<unknown>'.
      Binding element 'Color' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either object literal [1] is incompatible with 'Store' [2]. Or object literal [1] is incompatible with 'Store' [3]. Or object literal [1] is incompatible with 'Store' [4]. Or object literal [1] is incompatible with 'Store' [5]. Or object literal [1] is incompatible with 'Store' [6]. Or object literal [1] is incompatible with 'Store' [7]. Or object literal [1] is incompatible with 'Store' [8]. Or object literal [1] is incompatible with 'Store' [9]. Or object literal [1] is incompatible with 'Store' [10]. Or object literal [1] is incompatible with 'Store' [11]. Or object literal [1] is incompatible with 'Store' [12]
        const store = combine({Color}, ({Color}) => Color)
                      ^^^^^^^
            const store = combine({Color}, ({Color}) => Color)
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
    const store = combine([Color], ([Color]) => Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<string>[]' is not assignable to parameter of type 'Store<unknown>'.
        Type 'Store<string>[]' is missing the following properties from type 'Store<unknown>': reset, getState, on, off, and 11 more.
      Binding element 'Color' implicitly has an 'any' type.

      --flow--
      Cannot call 'combine' because: Either array literal [1] is incompatible with 'Store' [2]. Or array literal [1] is incompatible with 'Store' [3]. Or array literal [1] is incompatible with 'Store' [4]. Or array literal [1] is incompatible with 'Store' [5]. Or array literal [1] is incompatible with 'Store' [6]. Or array literal [1] is incompatible with 'Store' [7]. Or array literal [1] is incompatible with 'Store' [8]. Or array literal [1] is incompatible with 'Store' [9]. Or array literal [1] is incompatible with 'Store' [10]. Or array literal [1] is incompatible with 'Store' [11]. Or array literal [1] is incompatible with 'Store' [12]
        const store = combine([Color], ([Color]) => Color)
                      ^^^^^^^
            const store = combine([Color], ([Color]) => Color)
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
    const store = combine(Color, Color => Color)
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
    const store = combine(
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
    const store = combine(R, G, B)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<number>' is not assignable to parameter of type '(a: number, b: number) => unknown'.
        Type 'Store<number>' provides no match for the signature '(a: number, b: number): unknown'.

      --flow--
      Cannot call 'combine'
        const store = combine(R, G, B)
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
    const store = combine(Color)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Argument of type 'Store<string>' is not assignable to parameter of type '() => unknown'.
        Type 'Store<string>' provides no match for the signature '(): unknown'.


      --flow--
      Cannot call 'combine'
        const store = combine(Color)
                              ^^^^^
        a call signature declaring the expected parameter / return type is missing in 'Store' [1] but exists in function type [2]
            ): Store<State>
           [1] ^^^^^^^^^^^^
            declare export function combine<R>(fn: () => R): Store<R>
                                               [2] ^^^^^^^
      "
    `)
  })
})
