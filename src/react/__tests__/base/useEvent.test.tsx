import React from 'react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'
import {muteErrors} from 'effector/fixtures'
import {createEvent, fork, createWatch} from 'effector'
import {Provider, useEvent} from 'effector-react'

muteErrors(['useEvent', 'No scope found', 'AppFail'])

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

    function AppFail() {
      const handler = useEvent(event, {forceScope: true})

      return <button onClick={handler}>Click me</button>
    }

    expect(() => render(<AppFail />)).rejects.toMatchInlineSnapshot(
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

describe('useEvent is deprecated', () => {
  test('useEvent(event) is deprecated in favor of useUnit(event)', async () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})

    const event = createEvent('foo')

    function App() {
      useEvent(event)
      return null
    }

    await render(<App />)

    expect(warn).toBeCalledTimes(1)
    expect(warn.mock.calls[0][0]).toMatchInlineSnapshot(
      `"useEvent is deprecated, prefer useUnit instead"`,
    )

    warn.mockRestore()
  })

  test('useEvent({event, other}) is deprecated in favor of useUnit({event, other})', async () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})

    const event = createEvent('foo')
    const other = createEvent('bar')

    function App() {
      useEvent({event, other})
      return null
    }

    await render(<App />)

    expect(warn).toBeCalledTimes(1)
    expect(warn.mock.calls[0][0]).toMatchInlineSnapshot(
      `"useEvent is deprecated, prefer useUnit instead"`,
    )

    warn.mockRestore()
  })
})
