//@flow

import * as React from 'react'
import {mount} from 'enzyme'
import {createEvent, createStore} from 'effector'
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
