//@flow

import {createStore} from '..'
import {createEvent} from 'effector/event'
import {argumentHistory} from 'effector/fixtures'

test('reset before computation', () => {
  const fn = jest.fn()
  const A = createEvent('A')
  const B = A.map(d => `${d}->B`)

  const target = createStore('init')
    .reset(B)
    .on(A, (state, d) => `${state} + ${d}`)

  target.watch(e => {
    fn(e)
  })

  A('[1]')
  A('[2]')

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "init",
      "init + [1]",
      "init",
      "init + [2]",
      "init",
    ]
  `)
})

test('computation before reset', () => {
  const fn = jest.fn()
  const A = createEvent('A')
  const B = A.map(d => `${d}->B`)

  const target = createStore('init')
    .reset(A)
    .on(B, (state, d) => `${state} + ${d}`)

  target.watch(e => {
    fn(e)
  })

  A('[1]')
  A('[2]')

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "init",
      "init + [1]->B",
      "init",
      "init + [2]->B",
    ]
  `)
})
