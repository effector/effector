//@flow

import {createEvent} from 'effector/event'
import {createStore} from '..'
import {combine} from '../../effector'

test('diamonds', () => {
  const fn = jest.fn()
  const trigger = createEvent('trigger')
  const nodeA = createStore(1).on(trigger, x => x + 1)
  const nodeB = nodeA.map(x => x + 1)
  const nodeC = nodeB.map(x => x + 1)
  const nodeD = nodeA.map(x => x + 1)
  const nodeE = combine(nodeC, nodeD, (c, d) => [c, d])
  nodeE.watch(x => fn(x))
  trigger()
  expect(fn.mock.calls).toEqual([[[3, 2]], [[4, 3]]])
})
