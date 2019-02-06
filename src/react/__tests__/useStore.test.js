//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {createStore, createEvent} from 'effector'
import {useStore} from '..'

test('useStore', () => {
  const store = createStore('foo')
  const changeText = createEvent('change text')
  store.on(changeText, (_, e) => e)

  const Display = props => {
    const state = useStore(store)
    return <span>Store text: {state}</span>
  }

  const tree = mount(<Display />)
  expect(tree.text()).toMatchSnapshot()
  changeText('bar')
  //TODO: fix test
  expect(tree.text()).toMatchSnapshot()
  tree.unmount()
})
