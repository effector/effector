//@flow

import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({
  adapter: new Adapter(),
})

import * as React from 'react'
import {mount} from 'enzyme'
import {argumentHistory} from 'effector/fixtures'
import {act, render, cleanup} from 'effector/fixtures/react'
import {
  type Store,
  createStore,
  createStoreObject,
  createEvent,
  createApi,
} from 'effector'
import {createComponent} from '..'

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

  test('should throw', () => {
    expect(() =>
      createComponent(50, (_, {a, b}) => a * b),
    ).toThrowErrorMatchingInlineSnapshot(
      `"shape should be a store or object with stores"`,
    )
  })

  test('createStoreObject', () => {
    const a = createStore(2)
    const b = createStore(2)
    const ObjectComponent = createComponent({a, b}, (_, {a, b}) => a * b)
    const tree = mount(<ObjectComponent />)
    expect(tree.text()).toMatchInlineSnapshot(`"4"`)
  })

  test('mounted/unmounted events', () => {
    const text = createStore('foo')
    const spy = jest.fn()
    const Component = createComponent(text, () => null)
    Component.mounted.watch(spy)
    Component.unmounted.watch(spy)
    const tree = mount(<Component foo={1} />)
    act(() => {
      //$off
      text.setState('bar')
    })
    tree.unmount()
    expect(spy.mock.calls).toMatchInlineSnapshot(`
                                    Array [
                                      Array [
                                        Object {
                                          "props": Object {
                                            "foo": 1,
                                          },
                                          "state": "foo",
                                        },
                                      ],
                                      Array [
                                        Object {
                                          "props": Object {
                                            "foo": 1,
                                          },
                                          "state": "bar",
                                        },
                                      ],
                                    ]
                        `)
  })

  test('mount event', async () => {
    const a = createStore(1)
    const b = createStore('bar')
    const {add} = createApi(a, {
      add: (x, y) => x + y,
    })
    const updateValue = createEvent()
    const c = createStoreObject({a, b})
    const spy = jest.fn()
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={updateValue}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    Foo.mounted.watch(spy)
    await render(<Foo a="A" />)
    await act(async () => {
      add(5)
    })
    await render(<Foo b="B" />)
    await cleanup()
    expect(argumentHistory(spy)).toMatchInlineSnapshot(`
            Array [
              Object {
                "props": Object {
                  "a": "A",
                },
                "state": Object {
                  "a": 1,
                  "b": "bar",
                },
              },
            ]
        `)
  })
  test('unmount event', async () => {
    const a = createStore(1)
    const b = createStore('bar')
    const {add} = createApi(a, {
      add: (x, y) => x + y,
    })
    const updateValue = createEvent()
    const c = createStoreObject({a, b})
    const spy = jest.fn()
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={updateValue}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    Foo.unmounted.watch(spy)
    await render(<Foo a="A" />)
    await act(async () => {
      add(5)
    })
    await render(<Foo b="B" />)
    await cleanup()
    expect(argumentHistory(spy)).toMatchInlineSnapshot(`
      Array [
        Object {
          "props": Object {
            "b": "B",
          },
          "state": Object {
            "a": 6,
            "b": "bar",
          },
        },
      ]
    `)
  })

  test('hooks', () => {
    const text = createStore('foo')
    const HookComponent = createComponent(text, (_, text) => {
      const [count, setCount] = React.useState(0)
      return (
        <>
          <div>Text: {text}</div>
          <div>Counter: {count}</div>
          <button id="increment" onClick={() => setCount(count + 1)}>
            incr
          </button>
        </>
      )
    })
    const tree = mount(<HookComponent />)
    expect(tree.html()).toMatchInlineSnapshot(
      `"<div>Text: foo</div><div>Counter: 0</div><button id=\\"increment\\">incr</button>"`,
    )
    act(() => {
      tree.find('#increment').simulate('click')
    })
    expect(tree.html()).toMatchInlineSnapshot(
      `"<div>Text: foo</div><div>Counter: 1</div><button id=\\"increment\\">incr</button>"`,
    )
  })
})
