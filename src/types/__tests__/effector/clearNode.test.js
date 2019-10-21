// @flow
/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  createDomain,
  clearNode,
} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

test('clearNode(store)', () => {
  const store = createStore(null)
  clearNode(store)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('clearNode(event)', () => {
  const event = createEvent()
  clearNode(event)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('clearNode(effect)', () => {
  const fx = createEffect()
  clearNode(fx)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('clearNode(domain)', () => {
  const domain = createDomain()
  clearNode(domain)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('clearNode(incorrect)', () => {
  try {
    clearNode(null)
  } catch (err) {}

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type 'null' is not assignable to parameter of type 'Unit<any> | Step'.


    --flow--
    Cannot call 'clearNode' with 'null' bound to 'unit' because: Either property 'kind' is missing in null [1] but exists in 'Unit' [2]. Or property 'family' is missing in null [1] but exists in 'Step' [3]
      clearNode(null)
                ^^^^
          clearNode(null)
                [1] ^^^^
          unit: Unit<any> | Step,
            [2] ^^^^^^^^^
          unit: Unit<any> | Step,
                        [3] ^^^^
    "
  `)
})
