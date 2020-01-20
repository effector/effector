//@flow

import {
  createStore,
  createEvent,
  createDomain,
  withRegion,
  clearNode,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

it('binds watchers to region lifetime', () => {
  const fn = jest.fn()
  const trigger = createEvent()

  const domain = createDomain()

  withRegion(domain, () => {
    trigger.watch(fn)
  })

  trigger(0)
  // => 0
  clearNode(domain)
  trigger(1)
  // no reaction

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      0,
    ]
  `)
})

it('binds units to region lifetime', () => {
  const fn = jest.fn()
  const inc = createEvent()
  const count = createStore(0).on(inc, x => x + 1)

  const domain = createDomain()

  withRegion(domain, () => {
    const countText = count.map(x => {
      fn(x)
      return x.toString()
    })
    // => 0 (initial value)
  })

  inc()
  // => 1
  clearNode(domain)
  inc()
  // no reaction

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      0,
      1,
    ]
  `)
})
