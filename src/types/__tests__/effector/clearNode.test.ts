/* eslint-disable no-unused-vars */
import {
  createStore,
  createEvent,
  createEffect,
  createDomain,
  clearNode,
} from 'effector'

const typecheck = '{global}'

test('clearNode(store)', () => {
  const store = createStore(null)
  clearNode(store)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('clearNode(event)', () => {
  const event = createEvent()
  clearNode(event)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('clearNode(effect)', () => {
  const fx = createEffect()
  clearNode(fx)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('clearNode(domain)', () => {
  const domain = createDomain()
  clearNode(domain)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('clearNode(incorrect)', () => {
  try {
    //@ts-expect-error
    clearNode(null)
  } catch (err) {}

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type 'null' is not assignable to parameter of type 'Unit<any> | Node | Scope'.
    "
  `)
})
