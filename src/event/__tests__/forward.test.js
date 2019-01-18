//@flow

import {forward, createEvent} from '..'

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
