//@flow

import {forward, createEvent, createStore} from 'effector'

it('should forward data from one event to another', () => {
  const fn = jest.fn()
  const source1 = createEvent<string>('source 1')
  const source2 = createEvent<string>('source 2')
  const target = createEvent<string>('target')

  target.watch(e => fn(e))
  const unsubscribe = forward({
    from: source1,
    to: target,
  })
  forward({
    from: source2,
    to: target,
  })
  source1('should been forwarded [1]')
  source2('should been forwarded [2]')
  expect(fn.mock.calls).toEqual([
    ['should been forwarded [1]'],
    ['should been forwarded [2]'],
  ])
})

it('should stop forwarding after unsubscribe', () => {
  const fn = jest.fn()
  const source1 = createEvent<string>('source 1')
  const source2 = createEvent<string>('source 2')
  const target = createEvent<string>('target')

  target.watch(e => fn(e))
  const unsubscribe = forward({
    from: source1,
    to: target,
  })
  forward({
    from: source2,
    to: target,
  })
  source1('should been forwarded [1]')
  source2('should been forwarded [2]')
  expect(fn.mock.calls).toEqual([
    ['should been forwarded [1]'],
    ['should been forwarded [2]'],
  ])
  unsubscribe()
  source1('should not been forwarded')
  expect(fn.mock.calls).toEqual([
    ['should been forwarded [1]'],
    ['should been forwarded [2]'],
  ])
})

it('should unsubscribe only from relevant watchers', async() => {
  const dispatch = createEvent('dispatch')
  const store = createStore([])
  store.on(dispatch, (state, text) => [...state, text])
  function subscribe(fn) {
    let first = true
    return store.watch(data => {
      if (first) {
        first = false
        return
      }
      fn(data)
    })
  }
  const listenerA = jest.fn()
  const listenerB = jest.fn()
  const listenerC = jest.fn()

  subscribe(listenerA)
  const unSubB = subscribe(data => {
    listenerB(data)
    unSubB()
  })
  subscribe(listenerC)

  dispatch('item 1')
  dispatch('item 2')

  expect(listenerA.mock.calls.length).toBe(2)
  expect(listenerB.mock.calls.length).toBe(1)
  expect(listenerC.mock.calls.length).toBe(2)
})
