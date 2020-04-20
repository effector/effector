import * as React from 'react'
import {act, render, cleanup, container} from 'effector/fixtures/react'
import {argumentHistory} from 'effector/fixtures'
import {createEvent, createStore, combine} from 'effector'
import {createStoreConsumer} from 'effector-react'

test('createStoreComponent attempt', async() => {
  const store1 = createStore('foo')
  const changeText = createEvent()
  store1.on(changeText, (_, payload) => payload)
  const Store1 = createStoreConsumer(store1)
  await render(<Store1>{state => <span>Current state: {state}</span>}</Store1>)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Current state: 
      foo
    </span>
  `)
  await act(async() => {
    changeText('bar')
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Current state: 
      bar
    </span>
  `)
})

test('no dull re-renders', async() => {
  const fn = jest.fn()
  const reset = createEvent()
  const inc = createEvent()
  const listSize = createStore(3)
    .on(inc, n => n + 1)
    .reset(reset)
  const currentList = createStore(
    Array.from({length: listSize.getState()}, (_, n) => n),
  )
    .on(inc, list => [...list, list.length])
    .reset(reset)
  const selected = createStore([])

  const fullStore = combine({listSize, currentList, selected})

  const CurrentList = createStoreConsumer(currentList)

  await render(
    <CurrentList>
      {state => {
        fn(state)
        return <span>Current state: {String(state)}</span>
      }}
    </CurrentList>,
  )
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Current state: 
      0,1,2
    </span>
  `)
  await act(async() => {
    inc()
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Current state: 
      0,1,2,3
    </span>
  `)
  await act(async() => {
    reset()
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <span>
      Current state: 
      0,1,2
    </span>
  `)
  await cleanup()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Array [
        0,
        1,
        2,
      ],
      Array [
        0,
        1,
        2,
        3,
      ],
      Array [
        0,
        1,
        2,
      ],
    ]
  `)
})
