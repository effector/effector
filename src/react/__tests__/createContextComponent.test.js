//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {createStore} from 'effector'
import {createEvent} from 'effector'
import {createContextComponent} from '..'

test('createContextComponent', () => {
  const store = createStore('foo')
  const Context = React.createContext('bar')
  const changeText = createEvent('change text')
  changeText.to(store)

  const Display = createContextComponent(
    store,
    Context,
    (props, store, context) => (
      <span>
        Store text: {store}
        <br />
        Context text: {context}
      </span>
    ),
  )

  const tree = mount(<Display />)
  expect(tree.text()).toMatchSnapshot()
  changeText('bar')
  expect(tree.text()).toMatchSnapshot()
  tree.unmount()

  const tree2 = mount(
    <Context.Provider value="test">
      <Display />
    </Context.Provider>,
  )
  expect(tree2.text()).toMatchSnapshot()
  changeText('foo')
  expect(tree2.text()).toMatchSnapshot()
  tree2.unmount()
})
