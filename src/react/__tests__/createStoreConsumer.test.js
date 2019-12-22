//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {act} from 'effector/fixtures/react'
import {createEvent, createStore, createStoreObject} from 'effector'
import {createStoreConsumer} from '../createStoreConsumer'

test('createStoreComponent attempt', () => {
  const store1 = createStore('foo')
  const changeText = createEvent('change text')
  store1.on(changeText, (_, payload) => payload)
  const Store1 = createStoreConsumer(store1)
  const tree = mount(
    <Store1>{state => <span>Current state: {state}</span>}</Store1>,
  )
  expect(tree.text()).toMatchInlineSnapshot(`"Current state: foo"`)
  act(() => {
    changeText('bar')
  })
  expect(tree.text()).toMatchInlineSnapshot(`"Current state: bar"`)
  tree.unmount()
})

test('no dull re-renders', () => {
  const fn = jest.fn()
  const reset = createEvent('reset')
  const inc = createEvent('inc')
  const listSize = createStore(3)
    .on(inc, n => n + 1)
    .reset(reset)
  const currentList = createStore(
    Array.from({length: listSize.getState()}, (_, n) => n),
  )
    .on(inc, list => [...list, list.length])
    .reset(reset)
  const selected = createStore([])

  const fullStore = createStoreObject({listSize, currentList, selected})

  const CurrentList = createStoreConsumer(currentList)

  const tree = mount(
    <CurrentList>
      {state => {
        fn(state)
        return <span>Current state: {String(state)}</span>
      }}
    </CurrentList>,
  )
  expect(tree.text()).toMatchInlineSnapshot(`"Current state: 0,1,2"`)
  act(() => {
    inc()
  })
  expect(tree.text()).toMatchInlineSnapshot(`"Current state: 0,1,2,3"`)
  act(() => {
    reset()
  })
  expect(tree.text()).toMatchInlineSnapshot(`"Current state: 0,1,2"`)
  tree.unmount()

  expect(fn.mock.calls).toEqual([[[0, 1, 2]], [[0, 1, 2, 3]], [[0, 1, 2]]])
  expect(fn).toHaveBeenCalledTimes(3)
})
