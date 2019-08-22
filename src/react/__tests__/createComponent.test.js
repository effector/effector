//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {act} from 'effector/fixtures/react'
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
    const tree = mount(<Foo />)
    expect(tree.html()).toMatchInlineSnapshot(
      `"<div>bar</div><select><option value=\\"bar\\">bar</option><option value=\\"foo\\">foo</option></select>"`,
    )
    act(() => {
      //$todo
      a.setState(2)
      //$todo
      b.setState('foo')
      c.watch(spy)
    })
    expect(tree.html()).toMatchInlineSnapshot(
      `"<div>foo</div><select><option value=\\"bar\\">bar</option><option value=\\"foo\\">foo</option></select>"`,
    )
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "a": 2,
            "b": "foo",
          },
        ],
      ]
    `)
    tree.unmount()
  })

  test('initial props', () => {
    type ListItem = {
      text: string,
    }
    const update = createEvent<{|
      id: number,
      data: ListItem,
    |}>()
    const list: Store<{
      [key: number]: ListItem,
      ...,
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
    expect(tree.html()).toMatchInlineSnapshot(`"<div>Loading...</div>"`)
    act(() => {
      update({
        id: 24,
        data: {text: 'nice'},
      })
    })
    expect(tree.html()).toMatchInlineSnapshot(`"<div>nice</div>"`)
    tree.unmount()
  })
})
