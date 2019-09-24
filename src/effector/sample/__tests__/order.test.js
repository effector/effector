//@flow

import {sample, createStore, createEvent, createStoreObject} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('store update will always performs before sampling', () => {
  const fn = jest.fn()
  const int = createStore(0)
  const trigger = createEvent()
  sample({
    source: int,
    clock: trigger,
  }).watch(x => {
    fn(x)
  })
  int.on(trigger, x => x + 1)
  trigger()
  expect(argumentHistory(fn)).toEqual([1])
})

test('store combination will always updates before sampling', () => {
  const fn = jest.fn()
  const int = createStore(0)
  const shape = createStoreObject({int})
  const trigger = createEvent()
  sample({
    source: shape,
    clock: trigger,
  }).watch(x => {
    fn(x)
  })
  int.on(trigger, x => x + 1)
  trigger()
  expect(argumentHistory(fn)).toEqual([{int: 1}])
})
