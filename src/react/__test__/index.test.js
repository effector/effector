//@flow

import * as React from 'react'
import {shallow, mount, render} from 'enzyme'
import {
 createEvent,
 createStore,
 type Event,
 type Store,
} from '../../effector'
import {createReactState} from '..'

test('basic', () => {
 const store = createStore('hello')
 const changeText = createEvent('change text')

 const {Provider, Consumer} = createReactState(store)

 const tree = mount(
  <Provider>
   <Consumer>
    {({value, ref}) => <span>{value}</span>}
   </Consumer>
  </Provider>
 )
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()
})
