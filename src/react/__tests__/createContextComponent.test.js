//@flow

import * as React from 'react'
import {createEvent, createStore} from 'effector'
import {createContextComponent} from 'effector-react'
import {render, container, act} from 'effector/fixtures/react'

test('createContextComponent', async() => {
  const store = createStore('foo')
  const changeText = createEvent('change text')
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

  await render(<Display />)
  expect(container.textContent).toMatchInlineSnapshot(
    `"Store text: fooContext text: bar"`,
  )
  await act(async() => {
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
  await act(async() => {
    changeText('foo')
  })
  expect(container.textContent).toMatchInlineSnapshot(
    `"Store text: fooContext text: test"`,
  )
})
