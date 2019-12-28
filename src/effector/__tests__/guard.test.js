//@flow

import {
  guard,
  createEvent,
  createStore,
  createApi,
  is,
  createEffect,
  sample,
} from 'effector'
import {argumentHistory, spy} from 'effector/fixtures'

test('use case', () => {
  const clickRequest = createEvent()
  const fetchRequest = createEffect({
    handler: n => new Promise(rs => setTimeout(rs, 500, n)),
  })
  const clicks = createStore(0).on(clickRequest, x => x + 1)

  const isIdle = fetchRequest.pending.map(pending => !pending)

  guard({
    source: sample(clicks, clickRequest),
    filter: isIdle,
    target: fetchRequest,
  })

  // or

  sample({
    source: clicks,
    clock: guard(clickRequest, {
      filter: isIdle,
    }),
    target: fetchRequest,
  })

  // or

  sample({
    source: clicks,
    clock: guard({
      source: sample(fetchRequest.pending, clickRequest),
      filter: pending => !pending,
    }),
    target: fetchRequest,
  })
})

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

describe('source as object support', () => {
  test('with store guard', () => {
    expect(() => {
      guard({
        source: {
          a: createStore(0),
          b: createStore(0),
        },
        filter: createStore(true),
      })
    }).not.toThrow()
  })
  test('with function guard', () => {
    expect(() => {
      guard({
        source: {
          a: createStore(0),
          b: createStore(0),
        },
        filter: () => true,
      })
    }).not.toThrow()
  })
})

test('temporal consistency', () => {
  const trigger = createEvent()
  const target = createEvent()
  const filter = trigger.map(x => x > 0)
  guard({
    source: trigger,
    filter,
    target,
  })

  target.watch(spy)
  // trigger(1)
  trigger(0)
  trigger(2)

  expect(argumentHistory(spy)).toEqual([2])
})
