//@flow

import * as React from 'react'
import {argumentHistory} from 'effector/fixtures'
import {act, render, cleanup, container} from 'effector/fixtures/react'
import {
  type Store,
  createStore,
  combine,
  createEvent,
  createApi,
} from 'effector'
import {createComponent} from '..'

describe('createComponent', () => {
  test('combine', async() => {
    const a = createStore(0)
    const b = createStore('bar')
    const c = combine({a, b})
    const fn = jest.fn()
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={() => {}}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    await render(<Foo />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        bar
      </div>
    `)
    await act(async() => {
      //$todo
      a.setState(2)
      //$todo
      b.setState('foo')
      c.watch(fn)
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        foo
      </div>
    `)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "a": 2,
          "b": "foo",
        },
      ]
    `)
  })

  test('initial props', async() => {
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
    await render(<Foo id={24} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Loading...
      </div>
    `)
    await act(async() => {
      update({
        id: 24,
        data: {text: 'nice'},
      })
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        nice
      </div>
    `)
  })

  test('should throw', () => {
    expect(() => {
      //$off
      createComponent(50, (_, {a, b}) => a * b)
    }).toThrowErrorMatchingInlineSnapshot(
      `"shape should be a store or object with stores"`,
    )
  })

  test('combine', async() => {
    const a = createStore(2)
    const b = createStore(2)
    const ObjectComponent = createComponent({a, b}, (_, {a, b}) => a * b)
    await render(<ObjectComponent />)
    expect(container.firstChild).toMatchInlineSnapshot(`4`)
  })

  test('mounted/unmounted events', async() => {
    const text = createStore('foo')
    const fn = jest.fn()
    const Component = createComponent(text, () => null)
    Component.mounted.watch(fn)
    Component.unmounted.watch(fn)
    await render(<Component foo={1} />)
    await act(async() => {
      //$off
      text.setState('bar')
    })
    await cleanup()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "props": Object {
            "foo": 1,
          },
          "state": "foo",
        },
        Object {
          "props": Object {
            "foo": 1,
          },
          "state": "bar",
        },
      ]
    `)
  })

  test('mount event', async() => {
    const a = createStore(1)
    const b = createStore('bar')
    const {add} = createApi(a, {
      add: (x, y) => x + y,
    })
    const updateValue = createEvent()
    const c = combine({a, b})
    const fn = jest.fn()
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={updateValue}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    Foo.mounted.watch(fn)
    await render(<Foo a="A" />)
    await act(async() => {
      add(5)
    })
    await render(<Foo b="B" />)
    await cleanup()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
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
  test('unmount event', async() => {
    const a = createStore(1)
    const b = createStore('bar')
    const {add} = createApi(a, {
      add: (x, y) => x + y,
    })
    const updateValue = createEvent()
    const c = combine({a, b})
    const fn = jest.fn()
    const Foo = createComponent(c, (_, state) => (
      <>
        <div>{state.b}</div>
        <select value={state.b} onChange={updateValue}>
          <option value="bar">bar</option>
          <option value="foo">foo</option>
        </select>
      </>
    ))
    Foo.unmounted.watch(fn)
    await render(<Foo a="A" />)
    await act(async() => {
      add(5)
    })
    await render(<Foo b="B" />)
    await cleanup()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
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

  test('hooks', async() => {
    const text = createStore('foo')
    const HookComponent = createComponent(text, (_, text) => {
      const [count, setCount] = React.useState(0)
      return (
        <div>
          <div>Text: {text}</div>
          <div>Counter: {count}</div>
          <button id="increment" onClick={() => setCount(count + 1)}>
            incr
          </button>
        </div>
      )
    })
    await render(<HookComponent />)
    expect(container.firstChild).toMatchInlineSnapshot(`
<div>
  <div>
    Text: 
    foo
  </div>
  <div>
    Counter: 
    0
  </div>
  <button
    id="increment"
  >
    incr
  </button>
</div>
`)
    await act(async() => {
      container.firstChild.querySelector('#increment').click()
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
<div>
  <div>
    Text: 
    foo
  </div>
  <div>
    Counter: 
    1
  </div>
  <button
    id="increment"
  >
    incr
  </button>
</div>
`)
  })
  it('should not use props from failed renders', async() => {
    const fn = jest.fn()
    const text = createStore('foo')
    const Foo = createComponent(text, (props, text) => {
      if (props.shouldFail) {
        throw Error('[expect error]')
      }
      return (
        <div>
          {props.field} {text}
        </div>
      )
    })
    Foo.unmounted.watch(fn)
    const error = console.error
    //$off
    console.error = function errorMock(...args) {
      args
    }
    try {
      await render(<Foo shouldFail={false} field="init" />)
      await render(<Foo shouldFail={false} field="correct" />)
      await render(<Foo shouldFail={true} field="incorrect" />).catch(() => {})
      await cleanup()
    } finally {
      //$off
      console.error = error
    }
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "props": Object {
            "field": "correct",
            "shouldFail": false,
          },
          "state": "foo",
        },
      ]
    `)
  })
})
