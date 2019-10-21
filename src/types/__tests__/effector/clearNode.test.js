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
    Argument of type 'Domain' is not assignable to parameter of type 'Unit<any> | Step'.
      Property '__' is missing in type 'Domain' but required in type 'Unit<any>'.


    --flow--
    no errors
    "
  `)
})
