//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
 adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {createEvent, createStore} from '../../effector'
import {connect} from '..'

test('connect api', () => {
 const store = createStore('foo')
 const changeText = createEvent('change text')
 changeText.to(store)

 class Display extends React.Component<{
  text: string,
  count: number,
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
 const ConnectedDisplay = store.map(text => ({text})).thru(connect(Display))

 const tree = mount(<ConnectedDisplay count={1} />)
 expect(tree.text()).toMatchSnapshot()
 changeText('bar')
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()
})

test('click counter', () => {
 const store = createStore(0)
 const increment = createEvent('increment')

 store.on(increment, state => state + 1)

 class Display extends React.Component<{
  count: number,
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
 const ConnectedDisplay = store.map(count => ({count})).thru(connect(Display))

 const tree = mount(<ConnectedDisplay />)
 expect(tree.text()).toMatchSnapshot()
 tree.find('#increment').simulate('click')
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()
})
