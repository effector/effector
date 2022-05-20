import * as React from 'react'
import {createEvent, createStore} from 'effector'
import {createContextComponent} from 'effector-react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'

let warn: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>

beforeEach(() => {
  warn = jest.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  warn.mockRestore()
})

test('createContextComponent', async () => {
  const store = createStore('foo')
  const changeText = createEvent()
  store.on(changeText, (_, e) => e)
  const Context = React.createContext('bar')

  const Display = createContextComponent(
    store,
    Context,
    (props, store, context) => (
      <span>
        Store text: {store}
        <br />
        Context text: {context}
      </span>
    ),
  )

  expect(warn.mock.calls.map(([msg]) => msg)).toEqual([
    'createContextComponent is deprecated',
  ])

  await render(<Display />)
  expect(container.textContent).toMatchInlineSnapshot(
    `"Store text: fooContext text: bar"`,
  )
  await act(async () => {
    changeText('bar')
  })
  expect(container.textContent).toMatchInlineSnapshot(
    `"Store text: barContext text: bar"`,
  )

  await render(
    <Context.Provider value="test">
      <Display />
    </Context.Provider>,
  )
  expect(container.textContent).toMatchInlineSnapshot(
    `"Store text: barContext text: test"`,
  )
  await act(async () => {
    changeText('foo')
  })
  expect(container.textContent).toMatchInlineSnapshot(
    `"Store text: fooContext text: test"`,
  )
})
