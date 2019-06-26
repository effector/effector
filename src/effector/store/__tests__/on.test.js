//@flow

import {spy, getSpyCalls} from 'effector/fixtures'
import {createEvent} from '../../event'
import {createStore} from '..'

it('supports stores', () => {
  const newWord = createEvent<string>('new word')
  const a = createStore('word').on(newWord, (_, word) => word)

  const b = createStore(['word'])

  b.on(a, (b, a) => {
    spy(b, a)
    return [...b, a]
  })

  newWord('lol')
  expect(spy).toHaveBeenCalledTimes(1)

  newWord('')
  expect(spy).toHaveBeenCalledTimes(2)
  newWord(' ')
  expect(spy).toHaveBeenCalledTimes(3)

  newWord('long word')
  expect(spy).toHaveBeenCalledTimes(4)
  expect(getSpyCalls()).toEqual([
    [['word'], 'lol'],
    [['word', 'lol'], ''],
    [['word', 'lol', ''], ' '],
    [['word', 'lol', '', ' '], 'long word'],
  ])
})
it('supports events', () => {
  const trigger = createEvent('trigger')

  const b = createStore(0)

  b.on(trigger, (b, trigger) => {
    spy(b, trigger)
    return b + 1
  })

  trigger('lol')
  expect(spy).toHaveBeenCalledTimes(1)

  trigger('')
  expect(spy).toHaveBeenCalledTimes(2)
  trigger(' ')
  expect(spy).toHaveBeenCalledTimes(3)

  trigger('long word')
  expect(spy).toHaveBeenCalledTimes(4)
  expect(getSpyCalls()).toEqual([
    [0, 'lol'],
    [1, ''],
    [2, ' '],
    [3, 'long word'],
  ])
})
it('replace old links', () => {
  const event = createEvent('event')

  const store = createStore('')
    .on(event, () => 'a')
    .on(event, () => 'b')

  event()

  expect(store.getState()).toBe('b')

  store.off(event)

  store.setState('x')

  event()

  expect(store.getState()).toBe('x')
})
