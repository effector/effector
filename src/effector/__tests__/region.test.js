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
    const target = createStore(0)
    const region = createNode({})

    withRegion(region, () => {
      target.on(store, x => {
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

  describe('difference in behavior with domains', () => {
    test('reference behavior', () => {
      const fn = jest.fn()

      function apply(fn) {
        const unit = createNode() // <- node
        withRegion(unit, fn)
        return () => clearNode(unit)
      }

      const update = createEvent()
      const reset = createEvent()
      const increment = createEvent()
      const decrement = createEvent()
      const counter = createStore(0).reset(reset)

      counter.watch(fn)

      const stopUpdating = apply(() => {
        counter.on(update, (_, payload) => payload)
      })
      const stopCounting = apply(() => {
        counter.on(increment, state => state + 1)
        counter.on(decrement, state => state - 1)
      })

      increment()
      update(10)
      stopUpdating()
      decrement()
      update(20) // nothing
      increment()
      reset()
      update(30) // nothing
      decrement()
      decrement()
      stopCounting()
      increment() // nothing
      decrement() // nothing
      reset()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
          1,
          10,
          9,
          10,
          0,
          -1,
          -2,
          0,
        ]
      `)
    })
    test('domain behavior', () => {
      const fn = jest.fn()

      function apply(fn) {
        const unit = createDomain() // <- domain
        withRegion(unit, fn)
        return () => clearNode(unit)
      }

      const update = createEvent()
      const reset = createEvent()
      const increment = createEvent()
      const decrement = createEvent()
      const counter = createStore(0).reset(reset)

      counter.watch(fn)

      const stopUpdating = apply(() => {
        counter.on(update, (_, payload) => payload)
      })
      const stopCounting = apply(() => {
        counter.on(increment, state => state + 1)
        counter.on(decrement, state => state - 1)
      })

      increment()
      update(10)
      stopUpdating()
      decrement()
      update(20) // nothing
      increment()
      reset()
      update(30) // nothing
      decrement()
      decrement()
      stopCounting()
      increment() // nothing
      decrement() // nothing
      reset()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
          1,
          10,
        ]
      `)
    })
  })
})
