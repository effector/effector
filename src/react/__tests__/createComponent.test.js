//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {createStore, createStoreObject} from 'effector/store'
import {createEvent} from 'effector/event'
import {createComponent} from '..'

describe('createComponent', () => {
  const a = createStore(0)
  const b = createStore('bar')
  const updateValue = createEvent()
  const c = createStoreObject({a, b})
  const spy = jest.fn()

  test('createStoreObject', () => {
    //$todo
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={updateValue}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    a.setState(2)
    b.setState('foo')
    c.watch(spy)
    const tree = mount(<Foo />)
    expect(tree.html()).toMatchSnapshot()
    expect(spy.mock.calls).toMatchSnapshot()
    tree.unmount()
  })

  test('initial props', () => {
    const update = createEvent<{
      id: number,
      data: {text: string},
    }>()
    const list: Store<{[key: number]: {text: string}}> = createStore({}).on(
      update,
      (state, {id, data}) => ({
        ...state,
        [id]: {...state[id], ...data},
      }),
    )
    const Foo = createComponent(
      props => list.map(list => list[props.id] ?? {text: 'Loading...'}),
      (_, state) => <div>{state.text}</div>,
    )
    const tree = mount(<Foo id={24} />)
    update({
      id: 24,
      data: {text: 'nice'},
    })
    expect(tree.html()).toMatchSnapshot()
    tree.unmount()
  })
})
