// @flow
/* eslint-disable no-unused-vars */
import {step, createNode, createEvent, Event, launch, split} from 'effector'

const typecheck = '{global}'

test('launch(unit, payload)', () => {
  const foo = createEvent<number>()
  const customNode = createNode({
    scope: {max: 100, lastValue: -1, add: 10},
    child: [foo],
    node: [
      step.compute({
        fn: (arg, {add}) => arg + add,
      }),
      step.filter({
        fn: (arg, {max, lastValue}) => arg < max && arg !== lastValue,
      }),
      step.compute({
        fn(arg, scope) {
          scope.lastValue = arg
          return arg
        },
      }),
    ],
  })
  launch(foo, '')
  launch(foo, 0)
  launch(customNode, 100)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type '\\"\\"' is not assignable to parameter of type 'number'.

    --flow--
    Cannot call 'launch'
      launch(foo, '')
      ^^^^^^
      string [1] is incompatible with number [2]
          launch(foo, '')
                  [1] ^^
          const foo = createEvent<number>()
                              [2] ^^^^^^
    "
  `)
})
test('launch({target: unit})', () => {
  const foo = createEvent<number>()
  const customNode = createNode({
    scope: {max: 100, lastValue: -1, add: 10},
    child: [foo],
    node: [
      step.compute({
        fn: (arg, {add}) => arg + add,
      }),
      step.filter({
        fn: (arg, {max, lastValue}) => arg < max && arg !== lastValue,
      }),
      step.compute({
        fn(arg, scope) {
          scope.lastValue = arg
          return arg
        },
      }),
    ],
  })
  launch({target: foo, params: ''})
  launch({target: foo, params: 0})
  launch({target: customNode, params: 100})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Type 'string' is not assignable to type 'number'.

    --flow--
    Cannot call 'launch' with object literal bound to 'config'
      launch({target: foo, params: ''})
             ^^^^^^^^^^^^^^^^^^^^^^^^^
      number [1] is incompatible with string [2] in type argument 'T' [3] of property 'target'
          const foo = createEvent<number>()
                              [1] ^^^^^^
          launch({target: foo, params: ''})
                                   [2] ^^
          export interface Unit<T> extends CovariantUnit<T>, ContravariantUnit<T> {
                            [3] ^
    "
  `)
})
