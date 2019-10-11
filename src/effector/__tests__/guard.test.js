//@flow

import {guard, createEvent, createStore, createApi} from 'effector'
import {argumentHistory, spy} from 'effector/fixtures'

it('supports store guards', () => {
  const trigger = createEvent()
  const target = createEvent()
  const unlocked = createStore(true)
  const {lock, unlock} = createApi(unlocked, {
    lock: () => false,
    unlock: () => true,
  })

  guard({
    source: trigger,
    filter: unlocked,
    target,
  })

  target.watch(spy)
  trigger('A')
  lock()
  trigger('B')
  unlock()
  trigger('C')

  expect(argumentHistory(spy)).toEqual(['A', 'C'])
})

it('supports function predicate', () => {
  const source = createEvent()
  const target = createEvent()
  target.watch(spy)

  guard({
    source,
    filter: x => x > 0,
    target,
  })

  source(0)
  source(1)
  expect(argumentHistory(spy)).toEqual([1])
})
