//@flow

import {guard, createEvent, createStore, createApi, is} from 'effector'
import {argumentHistory, spy} from 'effector/fixtures'

describe('without target', () => {
  it('returns event', () => {
    const trigger = createEvent()
    const unlocked = createStore(true)
    const target = guard(trigger, {
      filter: unlocked,
    })
    expect(is.event(target)).toBe(true)
  })
  it('supports store guards', () => {
    const trigger = createEvent()
    const unlocked = createStore(true)
    const {lock, unlock} = createApi(unlocked, {
      lock: () => false,
      unlock: () => true,
    })
    const target = guard(trigger, {
      filter: unlocked,
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
    const target = guard(source, {
      filter: x => x > 0,
    })

    target.watch(spy)

    source(0)
    source(1)
    expect(argumentHistory(spy)).toEqual([1])
  })
})

describe('with target', () => {
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
})
