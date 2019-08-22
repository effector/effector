//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {act} from 'effector/fixtures/react'
import {createStore} from 'effector'
import {createEvent} from 'effector'
import {createContextComponent} from '..'

test('createContextComponent', () => {
  const store = createStore('foo')
  const changeText = createEvent('change text')
  store.on(changeText, (_, e) => e)
  const Context = React.createContext('bar')

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
  expect(tree.text()).toMatchInlineSnapshot(
    `"Store text: fooContext text: bar"`,
  )
  act(() => {
    changeText('bar')
  })
  expect(tree.text()).toMatchInlineSnapshot(
    `"Store text: barContext text: bar"`,
  )
  tree.unmount()

  const tree2 = mount(
    <Context.Provider value="test">
      <Display />
    </Context.Provider>,
  )
  expect(tree2.text()).toMatchInlineSnapshot(
    `"Store text: barContext text: test"`,
  )
  act(() => {
    changeText('foo')
  })
  expect(tree2.text()).toMatchInlineSnapshot(
    `"Store text: fooContext text: test"`,
  )
  tree2.unmount()
})
