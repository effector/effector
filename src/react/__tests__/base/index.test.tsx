import * as React from 'react'
import {act, render, container} from 'effector/fixtures/react'
import {createStore, createEvent} from 'effector'
import {connect} from 'effector-react'

test('connect api', async() => {
  const text = createStore('foo')
  const store = text.map(text => ({text}))
  const changeText = createEvent()
  text.on(changeText, (_, e) => e)

  class Display extends React.Component<{
    text: string,
    count: number,
  }> {
    render() {
      return (
        <span>
          Text: {this.props.text}/ Counter: {this.props.count}
        </span>
      )
    }
  }
  const ConnectedDisplay = connect(Display)(store)

  await render(<ConnectedDisplay count={1} />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Text: 
      foo
      / Counter: 
      1
    </span>
  `)
  await act(async() => {
    changeText('bar')
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Text: 
      bar
      / Counter: 
      1
    </span>
  `)
})

test('click counter', async() => {
  const count = createStore(0)
  const store = count.map(text => ({text}))
  const increment = createEvent()

  count.on(increment, state => state + 1)

  class Display extends React.Component<{count: number}> {
    render() {
      return (
        <span>
          Counter: {this.props.count}
          <button id="increment" onClick={() => increment()}>
            Increment
          </button>
        </span>
      )
    }
  }
  const ConnectedDisplay = connect(Display)(store)

  await render(<ConnectedDisplay />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Counter: 
      <button
        id="increment"
      >
        Increment
      </button>
    </span>
  `)
  await act(async() => {
    container.firstChild.querySelector('#increment').click()
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Counter: 
      <button
        id="increment"
      >
        Increment
      </button>
    </span>
  `)
})
