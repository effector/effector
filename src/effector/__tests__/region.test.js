//@flow

import {
  createStore,
  createEvent,
  createDomain,
  withRegion,
  clearNode,
  createNode,
  forward,
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

describe('api features support', () => {
  it('support on', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)
    const region = createNode({})

    withRegion(region, () => {
      createStore(0).on(store, x => {
        fn(x)
        return x + 1
      })
    })
    inc()
    clearNode(region)
    inc()
    expect(argumentHistory(fn)).toEqual([0])
  })
  it('support forward', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)
    const target = createEvent()
    target.watch(fn)
    const region = createNode({})
    withRegion(region, () => {
      forward({
        from: store,
        to: target,
      })
    })
    inc()
    clearNode(region)
    inc()
    expect(argumentHistory(fn)).toEqual([1])
  })
})

describe('protect external units from destroy', () => {
  test('with on', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)

    store.updates.watch(fn)
    inc()

    const region = createNode({})

    withRegion(region, () => {
      createStore(0).on(store.updates, x => x + 1)
    })
    clearNode(region)
    inc()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `)
  })
  test('with watch', () => {
    const fn = jest.fn()
    const inc = createEvent()
    const store = createStore(0).on(inc, x => x + 1)

    store.updates.watch(fn)
    inc()

    const region = createNode({})

    withRegion(region, () => {
      store.updates.watch(() => {})
    })
    clearNode(region)
    inc()
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        1,
        2,
      ]
    `)
  })
})
