//@flow

import {configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {act} from 'effector/fixtures/react'
import {createStore, createEvent} from 'effector'
import {connect} from '..'

test('connect api', () => {
  const store = createStore('foo')
  const changeText = createEvent('change text')
  store.on(changeText, (_, e) => e)

  class Display extends React.Component<{
    text: string,
    count: number,
    ...
  }> {
    render() {
      return (
        <span>
          Text: {this.props.text}
          Counter: {this.props.count}
        </span>
      )
    }
  }
  const ConnectedDisplay = (connect(Display): any)(store.map(text => ({text})))

  const tree = mount(<ConnectedDisplay count={1} />)
  expect(tree.text()).toMatchInlineSnapshot(`"Text: fooCounter: 1"`)
  act(() => {
    changeText('bar')
  })
  expect(tree.text()).toMatchInlineSnapshot(`"Text: barCounter: 1"`)
  tree.unmount()
})

test('click counter', () => {
  const store = createStore(0)
  const increment = createEvent('increment')

  store.on(increment, state => state + 1)

  class Display extends React.Component<{
    count: number,
    ...
  }> {
    render() {
      return (
        <span>
          Counter: {this.props.count}
          <button id="increment" onClick={() => increment()}>
            Increment
          </button>
        </span>
      )
    }
  }
  const ConnectedDisplay = store
    .map(count => ({count}))
    .thru((connect(Display): any))

  const tree = mount(<ConnectedDisplay />)
  expect(tree.text()).toMatchInlineSnapshot(`"Counter: 0Increment"`)
  act(() => {
    tree.find('#increment').simulate('click')
  })
  expect(tree.text()).toMatchInlineSnapshot(`"Counter: 1Increment"`)
  tree.unmount()
})
