/* eslint-disable no-unused-vars */
import {
  createNode,
  createEvent,
  Event,
  split,
  EventCallable,
} from 'effector'

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
        const source: EventCallable<string[]> = createEvent()
        const {
          emptyList,
          oneElement,
          __: commonList,
        } = split(source, {
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
        const source: EventCallable<string[]> = createEvent()
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
        const source: EventCallable<string[]> = createEvent()
        const {emptyList, oneElement} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        //@ts-expect-error
        const split_result__nofpos__user_defined_1: Event<number> = emptyList
        //@ts-expect-error
        const split_result__nofpos__user_defined_2: null = oneElement
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
            Type 'string[]' is not assignable to type 'number'.
          Type 'Event<string[]>' is not assignable to type 'null'.
          "
        `)
      })
      test('split result no false-positive defaults 1', () => {
        const source: EventCallable<string[]> = createEvent()
        const {__} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        //@ts-expect-error
        const split_result__nofpos__defaults_1: Event<number> = __
        expect(typecheck).toMatchInlineSnapshot(`
          "
          Type 'Event<string[]>' is not assignable to type 'Event<number>'.
          "
        `)
      })
      test('split result no false-positive defaults 2', () => {
        const source: EventCallable<string[]> = createEvent()
        const {__} = split(source, {
          emptyList: list => list.length === 0,
          oneElement: list => list.length === 1,
        })
        //@ts-expect-error
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
    const source: EventCallable<string[]> = createEvent()
    split(source, {
      //@ts-expect-error
      wrongResult: list => null,
      //@ts-expect-error
      wrongArg_1: (list: null) => true,
      //@ts-expect-error
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
