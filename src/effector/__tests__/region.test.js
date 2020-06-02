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
        const unit = createNode({}) // <- node
        let unsubscribe
        withRegion(unit, () => {
          unsubscribe = fn()
        })
        return () => {
          unsubscribe && unsubscribe()
          clearNode(unit)
        }
      }

      const reset = createEvent()
      const increment = createEvent()
      const decrement = createEvent()
      const counter = createStore(0).reset(reset)

      // -> 0
      counter.watch(fn)

      let updateCounter

      // -> 35
      const stopInterval = apply(() => {
        updateCounter = createEvent()
        counter.on(updateCounter, (_, payload) => payload)
        updateCounter(35)
        return () => updateCounter(-1)
      })
      const stopInteraction = apply(() => {
        counter.on(increment, state => state + 1)
        counter.on(decrement, state => state - 1)
      })

      // -> 36
      increment()
      // -> 37
      increment()
      // -> 36
      decrement()
      // -> 42
      updateCounter(42)
      // -1
      stopInterval()
      // -> 0
      increment()
      // -> 1
      increment()
      // -> 2
      increment()
      // -> 0
      reset()
      // nothing
      updateCounter(11)
      // nothing
      updateCounter(12)
      // -> -1
      decrement()
      // -> -2
      decrement()
      // -> 0
      reset()
      // -> 1
      increment()
      // -> 2
      increment()
      stopInteraction()
      // nothing
      increment()
      // nothing
      increment()
      // nothing
      decrement()
      // -> 0
      reset()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
              Array [
                0,
                35,
                36,
                37,
                36,
                42,
                -1,
                0,
                1,
                2,
                0,
                -1,
                -2,
                0,
                1,
                2,
                0,
              ]
          `)
    })
    test('unexpected behavior', () => {
      const fn = jest.fn()

      const node = createNode({}) // <- node

      function apply(unit, fn) {
        let unsubscribe
        withRegion(unit, () => {
          unsubscribe = fn()
        })
        return () => {
          unsubscribe && unsubscribe()
          clearNode(unit)
        }
      }

      const reset = createEvent()
      const increment = createEvent()
      const decrement = createEvent()
      const counter = createStore(0).reset(reset)

      // -> 0
      counter.watch(fn)

      let updateCounter

      // -> 35
      const stopInterval = apply(node, () => {
        updateCounter = createEvent()
        counter.on(updateCounter, (_, payload) => payload)
        updateCounter(35)
        return () => updateCounter(-1)
      })
      const stopInteraction = apply(node, () => {
        counter.on(increment, state => state + 1)
        counter.on(decrement, state => state - 1)
      })

      // -> 36
      increment()
      // -> 37
      increment()
      // -> 36
      decrement()
      // -> 42
      updateCounter(42)
      // -1
      stopInterval()
      // -> 0
      increment()
      // -> 1
      increment()
      // -> 2
      increment()
      // -> 0
      reset()
      // nothing
      updateCounter(11)
      // nothing
      updateCounter(12)
      // -> -1
      decrement()
      // -> -2
      decrement()
      // -> 0
      reset()
      // -> 1
      increment()
      // -> 2
      increment()
      stopInteraction()
      // nothing
      increment()
      // nothing
      increment()
      // nothing
      decrement()
      // -> 0
      reset()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
          35,
          36,
          37,
          36,
          42,
          -1,
          0,
        ]
      `)
    })
    test('domain behavior', () => {
      const fn = jest.fn()

      function apply(fn) {
        const unit = createDomain() // <- domain
        let unsubscribe
        withRegion(unit, () => {
          unsubscribe = fn()
        })
        return () => {
          unsubscribe && unsubscribe()
          clearNode(unit)
        }
      }

      const reset = createEvent()
      const increment = createEvent()
      const decrement = createEvent()
      const counter = createStore(0).reset(reset)

      // -> 0
      counter.watch(fn)

      let updateCounter

      // -> 35
      const stopInterval = apply(() => {
        updateCounter = createEvent()
        counter.on(updateCounter, (_, payload) => payload)
        updateCounter(35)
        return () => updateCounter(-1)
      })
      const stopInteraction = apply(() => {
        counter.on(increment, state => state + 1)
        counter.on(decrement, state => state - 1)
      })

      // -> 36
      increment()
      // -> 37
      increment()
      // -> 36
      decrement()
      // -> 42
      updateCounter(42)
      // -1
      stopInterval()
      // -> 0
      increment()
      // -> 1
      increment()
      // -> 2
      increment()
      // -> 0
      reset()
      // nothing
      updateCounter(11)
      // nothing
      updateCounter(12)
      // -> -1
      decrement()
      // -> -2
      decrement()
      // -> 0
      reset()
      // -> 1
      increment()
      // -> 2
      increment()
      stopInteraction()
      // nothing
      increment()
      // nothing
      increment()
      // nothing
      decrement()
      // -> 0
      reset()

      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
              Array [
                0,
                35,
                36,
                37,
                36,
                42,
                -1,
              ]
          `)
    })
  })
})
