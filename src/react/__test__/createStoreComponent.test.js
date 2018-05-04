//@flow

import * as React from 'react'
import {mount} from 'enzyme'
import {createEvent, createStore, createStoreObject} from 'effector'
import {createStoreComponent} from '../createStoreComponent'

test('createStoreComponent attempt', () => {
 const store1 = createStore('foo')
 const changeText = createEvent('change text')
 store1.on(changeText, (_, payload) => payload)
 const Store1 = createStoreComponent(store1)
 const tree = mount(
  <Store1>{state => <span>Current state: {state}</span>}</Store1>,
 )
 expect(tree.text()).toMatchSnapshot()
 changeText('bar')
 expect(tree.text()).toMatchSnapshot()
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

 const CurrentList = createStoreComponent(currentList)

 const tree = mount(
  <CurrentList>
   {state => {
    fn(state)
    return <span>Current state: {String(state)}</span>
   }}
  </CurrentList>,
 )
 expect(tree.text()).toMatchSnapshot()
 inc()
 expect(tree.text()).toMatchSnapshot()
 reset()
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()

 expect(fn.mock.calls).toEqual([[[0, 1, 2]], [[0, 1, 2, 3]], [[0, 1, 2]]])
 expect(fn).toHaveBeenCalledTimes(3)
})
