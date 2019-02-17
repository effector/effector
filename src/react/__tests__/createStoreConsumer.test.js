//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {createEvent, createStore, createStoreObject} from 'effector'
import {createStoreConsumer} from '../createStoreConsumer'
import {createComponent} from '../createComponent'

test('createStoreComponent attempt', () => {
  const store1 = createStore('foo')
  const changeText = createEvent('change text')
  store1.on(changeText, (_, payload) => payload)
  const Store1 = createStoreConsumer(store1)
  const tree = mount(
    <Store1>{state => <span>Current state: {state}</span>}</Store1>,
  )
  expect(tree.text()).toMatchSnapshot()
  changeText('bar')
  expect(tree.text()).toMatchSnapshot()
  tree.unmount()
})

// test('should pass state consistently to consumer', () => {
//   const store = createStore('')
//   const event = createEvent()

//   store.on(event, (state, payload) => state + payload)

//   event('a')
//   let childMapStateInvokes = 0

//   const ChildContainer = createComponent(store, (props, state) => {
//     childMapStateInvokes++
//     childCalls.push([state, props.parentState])

//     return <div />
//   })

//   const Container = createComponent(store, (props, state) => (
//     <div>
//       <button type="submit" onClick={() => event('b')}>
//         change
//       </button>
//       <ChildContainer parentState={state} />
//     </div>
//   ))

//   const childCalls = []

//   const tree = mount(<Container />)

//   expect(childMapStateInvokes).toBe(1)
//   event('c')
//   expect(childMapStateInvokes).toBe(3)
//   expect(childCalls).toEqual([['a', 'a'], ['ac', 'ac']])

//   // setState calls DOM handlers are batched
//   tree
//     .find('[type="submit"]')
//     .get(0)
//     .click()
//   event('d')

//   expect(childCalls).toEqual([
//     ['a', 'a'],
//     ['ac', 'ac'], // then store update is processed
//     ['acb', 'acb'], // then store update is processed
//     ['acbd', 'acbd'], // then store update is processed
//   ])
//   expect(childMapStateInvokes).toBe(4)
// })

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
  expect(tree.text()).toMatchSnapshot()
  inc()
  expect(tree.text()).toMatchSnapshot()
  reset()
  expect(tree.text()).toMatchSnapshot()
  tree.unmount()

  expect(fn.mock.calls).toEqual([[[0, 1, 2]], [[0, 1, 2, 3]], [[0, 1, 2]]])
  expect(fn).toHaveBeenCalledTimes(3)
})
