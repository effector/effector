// @flow
/* eslint-disable no-unused-vars */
import * as React from 'react'
import {createStore} from 'effector'
import {createComponent, createGate, useGate} from 'effector-react'

const typecheck = '{global}'

test('createComponent', () => {
  const ImplicitObject = createComponent(
    {
      a: createStore<number>(0),
      b: createStore<number>(1),
    },
    (props, state) => {
      const createComponent_implicitObject_check1: number = state.a
      const createComponent_implicitObject_check2: number = state.b
      return null
    },
  )
  const Store = createComponent(createStore(0), (props, state) => {
    const createComponent_createStore_check1: number = state
    return null
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('createGate', () => {
  const Foo = createGate<number>('foo')
  const Bar = createGate<{a: number}>('bar')
  const Baz = createGate<number | null>('baz', null)

  const Component = () => {
    useGate(Foo, 1)
    useGate(Bar, 1)
    useGate(Bar, {a: 1})
    useGate(Bar, {})

    useGate(Baz, null)
    useGate(Baz, 1)
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type '1' is not assignable to parameter of type '{ a: number; } | undefined'.
    Argument of type '{}' is not assignable to parameter of type '{ a: number; }'.
      Property 'a' is missing in type '{}' but required in type '{ a: number; }'.

    --flow--
    no errors
    "
  `)
})
