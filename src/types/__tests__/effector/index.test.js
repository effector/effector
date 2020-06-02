// @flow
/* eslint-disable no-unused-vars */
import {step, createNode, createEvent, Event, launch, split} from 'effector'

const typecheck = '{global}'

describe('split', () => {
  describe('split infer result', () => {
    describe('split result no false-negative', () => {
      it('works with user-defined event', () => {
        const source: Event<string[]> = createEvent()
        const {emptyList, oneElement, __: commonList} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofneg__user_defined: Event<string[]> = emptyList
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          no errors

          --flow--
          no errors
          "
        `)
      })
      it('works with default event', () => {
        const source: Event<string[]> = createEvent()
        const {emptyList, oneElement, __} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofneg__defaults: Event<string[]> = __
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
    describe('split result no false-positive', () => {
      test('split result no false-positive user-defined', () => {
        const source: Event<string[]> = createEvent()
        const {emptyList, oneElement} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofpos__user_defined_1: Event<number> = emptyList
        const split_result__nofpos__user_defined_2: null = oneElement
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
            Types of property 'watch' are incompatible.
              Type '(watcher: (payload: string[]) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
                Types of parameters 'watcher' and 'watcher' are incompatible.
                  Types of parameters 'payload' and 'payload' are incompatible.
                    Type 'string[]' is not assignable to type 'number'.
          Type 'Event<string[]>' is not assignable to type 'null'.

          --flow--
          Cannot assign 'emptyList' to 'split_result__nofpos__user_defined_1'
            const split_result__nofpos__user_defined_1: Event<number> = emptyList
                                                                        ^^^^^^^^^
            array type [1] is incompatible with number [2] in type argument 'Payload' [3]. [incompatible-type-arg]
                const source: Event<string[]> = createEvent()
                                [1] ^^^^^^^^
                const split_result__nofpos__user_defined_1: Event<number> = emptyList
                                                              [2] ^^^^^^
                declare export class Event<Payload> implements Unit<Payload> {
                                       [3] ^^^^^^^
          Cannot assign 'oneElement' to 'split_result__nofpos__user_defined_2'
            const split_result__nofpos__user_defined_2: null = oneElement
                                                               ^^^^^^^^^^
            'Event' [1] is incompatible with null [2]. [incompatible-type]
                (h: (payload: S) => boolean) => Event<S>,
                                            [1] ^^^^^^^^
                const split_result__nofpos__user_defined_2: null = oneElement
                                                        [2] ^^^^
          "
        `)
      })
      test('split result no false-positive defaults 1', () => {
        const source: Event<string[]> = createEvent()
        const {__} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofpos__defaults_1: Event<number> = __
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.

          --flow--
          Cannot assign '__' to 'split_result__nofpos__defaults_1'
            const split_result__nofpos__defaults_1: Event<number> = __
                                                                    ^^
            array type [1] is incompatible with number [2] in type argument 'Payload' [3]. [incompatible-type-arg]
                const source: Event<string[]> = createEvent()
                                [1] ^^^^^^^^
                const split_result__nofpos__defaults_1: Event<number> = __
                                                          [2] ^^^^^^
                declare export class Event<Payload> implements Unit<Payload> {
                                       [3] ^^^^^^^
          "
        `)
      })
      test('split result no false-positive defaults 2', () => {
        const source: Event<string[]> = createEvent()
        const {__} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        const split_result__nofpos__defaults_2: null = __
        expect(typecheck).toMatchInlineSnapshot(`
          "
          --typescript--
          Type 'Event<string[]>' is not assignable to type 'null'.

          --flow--
          Cannot assign '__' to 'split_result__nofpos__defaults_2'
            const split_result__nofpos__defaults_2: null = __
                                                           ^^
            'Event' [1] is incompatible with null [2]. [incompatible-type]
                (h: (payload: S) => boolean) => Event<S>,
                                            [1] ^^^^^^^^
                const split_result__nofpos__defaults_2: null = __
                                                    [2] ^^^^
          "
        `)
      })
    })
  })

  test('split arguments no false-positive', () => {
    const source: Event<string[]> = createEvent()
    split(source, {
      wrongResult: list => null,
      wrongArg_1: (list: null) => true,
      wrongArg_2: (list: number[]) => true,
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      Type 'null' is not assignable to type 'boolean'.
      Type '(list: null) => true' is not assignable to type '(payload: string[]) => boolean'.
        Types of parameters 'list' and 'payload' are incompatible.
          Type 'string[]' is not assignable to type 'null'.
      Type '(list: number[]) => true' is not assignable to type '(payload: string[]) => boolean'.
        Types of parameters 'list' and 'payload' are incompatible.
          Type 'string[]' is not assignable to type 'number[]'.
            Type 'string' is not assignable to type 'number'.

      --flow--
      Cannot call 'split'
        split(source, {
        ^^^^^
        null [1] is incompatible with array type [2] in property 'wrongArg_1'. [incompatible-call]
            wrongArg_1: (list: null) => true,
                           [1] ^^^^
            const source: Event<string[]> = createEvent()
                            [2] ^^^^^^^^
      Cannot call 'split' with object literal bound to 'cases'
        wrongResult: list => null,
                             ^^^^
        null [1] is incompatible with boolean [2] in the return value of property 'wrongResult'. [incompatible-call]
            wrongResult: list => null,
                             [1] ^^^^
            +[name: string]: (payload: S) => boolean,
                                         [2] ^^^^^^^
      Cannot call 'split' with object literal bound to 'cases'
        wrongArg_1: (list: null) => true,
                           ^^^^
        null [1] is incompatible with array type [2] in the first argument of property 'wrongArg_1'. [incompatible-call]
            wrongArg_1: (list: null) => true,
                           [1] ^^^^
            const source: Event<string[]> = createEvent()
                            [2] ^^^^^^^^
      Cannot call 'split' with object literal bound to 'cases'
        wrongArg_2: (list: number[]) => true,
                           ^^^^^^
        number [1] is incompatible with string [2] in array element of the first argument of property 'wrongArg_2'. [incompatible-call]
            wrongArg_2: (list: number[]) => true,
                           [1] ^^^^^^
            const source: Event<string[]> = createEvent()
                            [2] ^^^^^^
      "
    `)
  })
})
