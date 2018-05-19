//@flow

import {from} from 'most'
import {createEvent} from '..'
import type {Event, Effect, Store} from '../../effector/index.h'

import {getSpyCalls, spy} from '../../fixtures/test-utils'

describe('symbol-observable support', () => {
 test('most.from(event) //stream of events', () => {
  expect(() => {
   from(createEvent(''))
  }).not.toThrow()
  const ev1 = createEvent('ev1')
  const ev2 = createEvent('ev2')
  const ev1$ = from(ev1)
  ev1$.observe(spy)
  ev1(0)
  ev1(1)
  ev1(2)
  ev2('should ignore')
  expect(spy).toHaveBeenCalledTimes(3)

  expect(spy.mock.calls).toEqual([[0], [1], [2]])
 })
})

test('event.watch(fn)', () => {
 const click = createEvent('click')
 click.watch(spy)
 click()
 click(1)
 click(2)
 expect(spy).toHaveBeenCalledTimes(3)
 expect(getSpyCalls()).toEqual([
  [undefined, 'click'],
  [1, 'click'],
  [2, 'click'],
 ])
})
