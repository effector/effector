//@flow

import * as React from 'react'
import {mount} from 'enzyme'
import {createEvent, createStore} from '../../effector'
import {createReactState, connect} from '..'

test('basic', () => {
 const store = createStore('foo')
 const changeText = createEvent('change text')
 changeText.to(store)

 const {Provider, Consumer} = createReactState(store)

 const tree = mount(
  <Provider>
   <Consumer>{({value, ref}) => <span>{value}</span>}</Consumer>
  </Provider>,
 )
 expect(tree.text()).toMatchSnapshot()
 changeText('bar')
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()
})

test('refined api', () => {
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
 const mappedStore = store.map(text => ({text}))
 const ConnectedDisplay = mappedStore.thru(connect(Display))

 const tree = mount(<ConnectedDisplay count={1} />)
 expect(tree.text()).toMatchSnapshot()
 changeText('bar')
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()
})

test('click counter', () => {
 const store = createStore(0)
 const increment = createEvent('increment')

 store.on(increment, (state) => state + 1)

 class Display extends React.Component<{
  count: number,
 }> {
  render() {
   return (
    <span>
     Counter: {this.props.count}
     <button id="increment" onClick={() => increment()}>Increment</button>
    </span>
   )
  }
 }
 const ConnectedDisplay = store
  .map(count => ({count}))
  .thru(connect(Display))

 const tree = mount(<ConnectedDisplay />)
 expect(tree.text()).toMatchSnapshot()
 tree.find('#increment').simulate('click')
 expect(tree.text()).toMatchSnapshot()
 tree.unmount()
})
