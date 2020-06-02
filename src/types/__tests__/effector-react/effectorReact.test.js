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

  const list = createStore<{
    [key: number]: {
      text: string,
    },
  }>({})
  const InitialProps = createComponent(
    (initialProps: {id: number}) => {
      const createComponent_initialProps_check1: number = initialProps.id
      const createComponent_initialProps_check2: string = initialProps.id
      const createComponent_initialProps_check3: string =
        initialProps.unknownProp
      return list.map(list => list[initialProps.id] || {text: 'Loading...'})
    },
    (_, state) => {
      const createComponent_initialProps_check4: string = state.text
      const createComponent_initialProps_check5: number = state.text
      return null
    },
  )
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Type 'number' is not assignable to type 'string'.
    Property 'unknownProp' does not exist on type '{ id: number; }'.
    Type 'string' is not assignable to type 'number'.

    --flow--
    Cannot assign 'initialProps.id' to 'createComponent_initialProps_check2'
      const createComponent_initialProps_check2: string = initialProps.id
                                                          ^^^^^^^^^^^^^^^
      number [1] is incompatible with string [2]. [incompatible-type]
          (initialProps: {id: number}) => {
                          [1] ^^^^^^
          const createComponent_initialProps_check2: string = initialProps.id
                                                 [2] ^^^^^^
    Cannot get 'initialProps.unknownProp'
      initialProps.unknownProp
                   ^^^^^^^^^^^
      property 'unknownProp' is missing in object type [1]. [prop-missing]
          (initialProps: {id: number}) => {
                     [1] ^^^^^^^^^^^^
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
    Type 'number' does not satisfy the constraint 'object'.
    Argument of type '1' is not assignable to parameter of type '{ a: number; } | undefined'.
    Argument of type '{}' is not assignable to parameter of type '{ a: number; }'.
      Property 'a' is missing in type '{}' but required in type '{ a: number; }'.

    --flow--
    no errors
    "
  `)
})
