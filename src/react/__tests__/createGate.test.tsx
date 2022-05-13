import * as React from 'react'
import {render, cleanup, container, act} from 'effector/fixtures/react'
import {createGate, useGate, useStore} from 'effector-react'

import {argumentHistory} from 'effector/fixtures'
import {
  allSettled,
  createEvent,
  createStore,
  fork,
  forward,
  serialize,
} from 'effector'

test('plain gate', async () => {
  const Gate = createGate('plain gate')
  expect(Gate.status.getState()).toBe(false)
  await render(
    <section>
      <div>div</div>
      <Gate />
    </section>,
  )
  expect(Gate.status.getState()).toBe(true)
  await cleanup()
  expect(Gate.status.getState()).toBe(false)
})

test('plain gate hook', async () => {
  const Gate = createGate('plain gate')
  expect(Gate.status.getState()).toBe(false)
  const Component = () => {
    useGate(Gate)
    return (
      <section>
        <div>div</div>
      </section>
    )
  }
  await render(<Component />)

  expect(Gate.status.getState()).toBe(true)
  await cleanup()
  expect(Gate.status.getState()).toBe(false)
})

test('gate with props', async () => {
  const Gate = createGate('gate with props')
  await render(
    <section>
      <Gate foo="bar" />
    </section>,
  )
  expect(Gate.state.getState()).toMatchObject({foo: 'bar'})
  expect(container.firstChild).toMatchInlineSnapshot(`<section />`)
  await cleanup()
  expect(Gate.state.getState()).toMatchObject({})
})

test('gate with props hook', async () => {
  const Gate = createGate('gate with props')
  const Component = () => {
    useGate(Gate, {foo: 'bar'})
    return <section />
  }
  await render(<Component />)
  expect(Gate.state.getState()).toMatchObject({foo: 'bar'})
  expect(container.firstChild).toMatchInlineSnapshot(`<section />`)
  await cleanup()
  expect(Gate.state.getState()).toMatchObject({})
})

describe('updates deduplication', () => {
  test('with component', async () => {
    const fn = jest.fn()
    const Gate = createGate()
    const update = createEvent()
    const count = createStore(0).on(update, x => x + 1)

    Gate.state.updates.watch(fn)

    const Component = () => {
      const x = useStore(count)
      return (
        <section>
          <Gate field={x === 2} />
          {x}
        </section>
      )
    }
    await render(<Component />)
    await act(async () => {
      update()
    })
    await act(async () => {
      update()
    })
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "field": false,
        },
        Object {
          "field": true,
        },
      ]
    `)
  })
  test('with hook', async () => {
    const fn = jest.fn()
    const Gate = createGate()
    const update = createEvent()
    const count = createStore(0).on(update, x => x + 1)

    Gate.state.updates.watch(fn)

    const Component = () => {
      const x = useStore(count)
      useGate(Gate, {field: x === 2})
      return <section>{x}</section>
    }
    await render(<Component />)
    await act(async () => {
      update()
    })
    await act(async () => {
      update()
    })
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "field": false,
        },
        Object {
          "field": true,
        },
      ]
    `)
  })
})

test('gate properties', async () => {
  const Gate = createGate('gate properties')
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  Gate.status.watch(isOpen => fn1(isOpen))
  Gate.state.watch(props => fn2(props))
  await render(
    <section>
      <Gate foo="bar" />
    </section>,
  )
  await cleanup()
  expect(argumentHistory(fn1)).toEqual([false, true, false])
  expect(argumentHistory(fn2)).toEqual([{}, {foo: 'bar'}, {}])
})

test.skip('Gate.state should have sid', () => {
  const Gate = createGate('default')
  expect(Gate.state.sid).toBeDefined()
  expect(Gate.state.sid).toBeTruthy()
})

test.skip('gate should be correctly serialized via fork #672', async () => {
  const Gate = createGate('default')
  const scope = fork()
  await allSettled(Gate.open, {scope, params: 'another'})

  const states = serialize(scope)
  expect(states[Gate.state.sid!]).toBe('another')
})

test('gate properties hook', async () => {
  const Gate = createGate('gate properties')
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  Gate.status.watch(isOpen => fn1(isOpen))
  Gate.state.watch(props => fn2(props))
  const Component = () => {
    useGate(Gate, {foo: 'bar'})
    return <section />
  }
  await render(<Component />)
  await cleanup()
  expect(argumentHistory(fn1)).toEqual([false, true, false])
  expect(argumentHistory(fn2)).toEqual([{}, {foo: 'bar'}, {}])
})

test('setState warning', async () => {
  const oldConsoleError = console.error
  const fn = jest.fn()
  console.error = (...args: any[]) => {
    fn(args.slice(0, -1).join(', '))
  }
  const setText = createEvent<string>()
  const gate = createGate<string>()
  const store = createStore('').on(setText, (_, text) => text)
  forward({
    from: gate.state,
    to: setText,
  })
  function Test({changeText}: {changeText: Function}) {
    const text = useStore(store)
    return (
      <div>
        <button
          id="button"
          onClick={() => {
            changeText(Math.random().toString(16))
          }}>
          update
        </button>
        {text}
      </div>
    )
  }
  function App() {
    const [text, setText] = React.useState(Math.random().toString(16))
    useGate(gate, text)

    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Test changeText={setText} />
      </div>
    )
  }
  await render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
  await act(async () => {
    container.querySelector('#button').click()
  })
  console.error = oldConsoleError
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`Array []`)
})
