//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {type Store, createStore, createStoreObject, createEvent} from 'effector'
import {createComponent} from 'effector-react'

describe('createComponent', () => {
  const a = createStore(0)
  const b = createStore('bar')
  const updateValue = createEvent()
  const c = createStoreObject({a, b})
  const spy = jest.fn()

  test('createStoreObject', () => {
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={updateValue}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    //$todo
    a.setState(2)
    //$todo
    b.setState('foo')
    c.watch(spy)
    const tree = mount(<Foo />)
    expect(tree.html()).toMatchSnapshot()
    expect(spy.mock.calls).toMatchSnapshot()
    tree.unmount()
  })

  test('initial props', () => {
    type ListItem = {|
      text: string,
    |}
    const update = createEvent<{|
      id: number,
      data: ListItem,
    |}>()
    const list: Store<{
      [key: number]: ListItem,
    }> = createStore({}).on(update, (state, {id, data}) => ({
      ...state,
      [id]: {...state[id], ...data},
    }))
    const Foo = createComponent(
      initialProps =>
        list.map(list => list[initialProps.id] ?? {text: 'Loading...'}),
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
