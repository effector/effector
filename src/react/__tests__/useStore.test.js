//@flow

import * as React from 'react'
//$todo
import {render, cleanup, act} from 'react-testing-library'
import {createStore, createEvent} from 'effector'
import {useStore, useStoreFast} from '..'

afterEach(cleanup)

test('useStore', () => {
  const store = createStore('foo')
  const changeText = createEvent('change text')
  store.on(changeText, (_, e) => e)

  const Display = props => {
    const state = useStore(store)
    return <span>Store text: {state}</span>
  }

  const {container} = render(<Display />)
  expect(container.firstChild).toMatchSnapshot()
  act(() => {
    changeText('bar')
  })
  // flushEffects()
  expect(container.firstChild).toMatchSnapshot()
})

test('useStoreFast', () => {
  const store = createStore('foo')
  const changeText = createEvent('change text')
  store.on(changeText, (_, e) => e)

  const Display = props => {
    const state = useStoreFast(store)
    return <span>Store text: {state}</span>
  }

  const {container} = render(<Display />)
  expect(container.firstChild).toMatchSnapshot()
  act(() => {
    changeText('bar')
  })
  // flushEffects()
  expect(container.firstChild).toMatchSnapshot()
})
