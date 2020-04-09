//@flow

import {createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'

describe('event.filter with config {fn: (T) => boolean}', () => {
  it('filter out when fn returns falsy', () => {
    const fn = jest.fn()
    const event = createEvent()
    const filtered = event.filter({
      fn: x => x > 0,
    })
    filtered.watch(x => fn(x))
    event(2)
    event(-1)
    expect(argumentHistory(fn)).toEqual([2])
  })
  it('works with undefined as well', () => {
    const fn = jest.fn()
    const event = createEvent()
    const filtered = event.filter({
      fn: x => x === undefined,
    })
    filtered.watch(x => fn(x))
    event(2)
    event()
    expect(argumentHistory(fn)).toEqual([undefined])
  })
})
