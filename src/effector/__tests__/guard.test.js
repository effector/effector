//@flow

import {guard, createEvent, createStore, createApi} from 'effector'
import {argumentHistory, spy} from 'effector/fixtures'

it('supports function predicate', () => {
  const source = createEvent()
  const target = createEvent()
  target.watch(spy)

  guard({
    source,
    when: x => x > 0,
    target,
  })

  source(0)
  source(1)
  expect(argumentHistory(spy)).toEqual([1])
})

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
    when: unlocked,
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

test.skip('temporal consistency', () => {
  const trigger = createEvent()
  const target = createEvent()

  guard({
    source: trigger,
    when: trigger.map(x => x > 0),
    target,
  })

  target.watch(spy)
  // trigger(1)
  trigger(0)
  trigger(2)

  expect(argumentHistory(spy)).toEqual([2])
})
