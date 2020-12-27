// @flow
/* eslint-disable no-unused-vars */
import {step, createNode, createEvent, Event, launch, split} from 'effector'

const typecheck = '{global}'

describe('createNode', () => {
  test('createNode({})', () => {
    const foo = createNode({})
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  test('createNode()', () => {
    const foo = createNode()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

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
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
            Types of property 'watch' are incompatible.
              Type '(watcher: (payload: string[]) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
                Types of parameters 'watcher' and 'watcher' are incompatible.
                  Types of parameters 'payload' and 'payload' are incompatible.
                    Type 'string[]' is not assignable to type 'number'.
          Type 'Event<string[]>' is not assignable to type 'null'.
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
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
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
          Type 'Event<string[]>' is not assignable to type 'null'.
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
      Type 'null' is not assignable to type 'boolean'.
      Type '(list: null) => true' is not assignable to type '(payload: string[]) => boolean'.
        Types of parameters 'list' and 'payload' are incompatible.
          Type 'string[]' is not assignable to type 'null'.
      Type '(list: number[]) => true' is not assignable to type '(payload: string[]) => boolean'.
        Types of parameters 'list' and 'payload' are incompatible.
          Type 'string[]' is not assignable to type 'number[]'.
            Type 'string' is not assignable to type 'number'.
      "
    `)
  })
})
