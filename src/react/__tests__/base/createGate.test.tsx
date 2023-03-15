import * as React from 'react'
//@ts-expect-error
import {render, cleanup, container, act} from 'effector/fixtures/react'
import {createGate, useGate, useStore, Provider} from 'effector-react'
import {createGate as createGateScope} from 'effector-react/scope'

import {argumentHistory} from 'effector/fixtures'
import {
  allSettled,
  createEffect,
  createEvent,
  createStore,
  fork,
  forward,
  sample,
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

test('Gate.state should have sid', () => {
  const Gate = createGate('default')
  expect(Gate.state.sid).toBeDefined()
  expect(Gate.state.sid).toBeTruthy()
  expect(Gate.state.sid!.length > 0).toBe(true)
})

test('Gate events should have sid', () => {
  const Gate = createGate('default')
  expect(Gate.open.sid).toBeDefined()
  expect(Gate.close.sid).toBeDefined()
  expect(Gate.open.sid!.match(/.*\|open/)?.length === 1).toBe(true)
  expect(Gate.close.sid!.match(/.*\|close/)?.length === 1).toBe(true)
})

test('Gate name set from variable name', () => {
  const exampleGate = createGate()
  expect(exampleGate.state.compositeName.fullName).toMatchInlineSnapshot(
    `"exampleGate.state"`,
  )
})

test('allows to pass defaultState with the name', async () => {
  const Gate = createGate('default', {counter: 0})
  const scope = fork()
  await allSettled(Gate.open, {scope, params: {counter: 1}})

  const states = serialize(scope)
  expect(states[Gate.state.sid!]).toEqual({counter: 1})
})

test('works without babel plugin', () => {
  const Gate1 = {_: createGate}._('name')
  const Gate2 = {_: createGate}._('name', {state: 1})
  const Gate3 = {_: createGate}._({name: 'name', defaultState: {state: 1}})
  const Gate4 = {_: createGate}._({
    name: 'name',
    defaultState: {state: 1},
    sid: 'custom-sid',
  })

  expect(Gate1.state.shortName).toMatchInlineSnapshot(`"name.state"`)
  expect(Gate2.state.shortName).toMatchInlineSnapshot(`"name.state"`)
  expect(Gate2.state.getState()).toEqual({state: 1})

  expect(Gate3.state.shortName).toMatchInlineSnapshot(`"name.state"`)
  expect(Gate3.state.getState()).toEqual({state: 1})

  expect(Gate4.state.shortName).toMatchInlineSnapshot(`"name.state"`)
  expect(Gate4.state.sid).toMatchInlineSnapshot(`"custom-sid"`)
})

test('gate should be correctly serialized via fork #672', async () => {
  const Gate = createGate('default')
  const scope = fork()
  await allSettled(Gate.open, {scope, params: 'another'})

  const states = serialize(scope)
  expect(states[Gate.state.sid!]).toBe('another')
})

test('gate component should be isomorphic to scope', async () => {
  const Gate = createGate('default')
  const logged = jest.fn()
  const logFx = createEffect(() => {})

  sample({
    clock: Gate.open,
    target: logFx,
  })

  const scope = fork({
    handlers: [[logFx, () => logged('scoped')]],
  })

  await render(
    <Provider value={scope}>
      <Gate />
    </Provider>,
  )

  expect(logged).toBeCalledTimes(1)
  expect(logged).toBeCalledWith('scoped')
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

describe('createGate without arguments', () => {
  test('common createGate', () => {
    expect(() => {
      ;({_: createGate}._())
    }).not.toThrow()
  })

  test('common createGate with babel-plugin', () => {
    expect(() => {
      createGate()
    }).not.toThrow()
  })

  test('scope createGate', () => {
    expect(() => {
      //@ts-expect-error
      ;({_: createGateScope}._())
    }).not.toThrow()
  })

  test('scope createGate with babel-plugin', () => {
    expect(() => {
      //@ts-expect-error
      createGateScope()
    }).not.toThrow()
  })
})
