import React from 'react'
//@ts-ignore
import {render, container, act} from 'effector/fixtures/react'
import {createEvent, fork, createWatch} from 'effector'
import {Provider, useEvent} from 'effector-react'

describe('useEvent', () => {
  test('bind event to scope if Provider is used', async () => {
    const event = createEvent()

    const scope = fork()

    const watcher = jest.fn()

    createWatch({unit: event, fn: watcher, scope})

    function App() {
      const handler = useEvent(event)

      return <button onClick={handler}>Click me</button>
    }

    await render(
      <Provider value={scope}>
        <App />
      </Provider>,
    )

    await act(async () => {
      container.firstChild?.click()
    })

    expect(watcher).toHaveBeenCalledTimes(1)
  })

  test('throw error if Provider is not used with forceScope', async () => {
    const event = createEvent()

    function App() {
      const handler = useEvent(event, {forceScope: true})

      return <button onClick={handler}>Click me</button>
    }

    expect(() => render(<App />)).rejects.toMatchInlineSnapshot(
      `[Error: No scope found, consider adding <Provider> to app root]`,
    )
  })

  test('return event as is for no Provider', async () => {
    const event = createEvent()

    const watcher = jest.fn()

    createWatch({unit: event, fn: watcher})

    function App() {
      const handler = useEvent(event)

      return <button onClick={handler}>Click me</button>
    }

    await render(<App />)

    await act(async () => {
      container.firstChild?.click()
    })

    expect(watcher).toHaveBeenCalledTimes(1)
  })
})
