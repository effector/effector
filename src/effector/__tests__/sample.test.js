//@flow

import {sample} from '../'

import {createEvent} from 'effector/event'
import {createStore} from 'effector/store'
import {createEffect} from 'effector/effect'

import {spy, getSpyCalls} from 'effector/fixtures'

describe('sample', () => {
  describe('sample with event as source', () => {
    test('event', () => {
      const data = createEvent('data')
      const stop = createEvent('stop')

      const lastData = sample(data, stop)

      lastData.watch(value => spy(value))

      data({foo: 'bar'})
      data(true)
      data(false)
      data({x: 'baz'})

      stop()

      expect(getSpyCalls()).toEqual([[{x: 'baz'}]])
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
  describe('sample with effect as source', () => {
    test('effect', () => {
      const data = createEffect('data', {
        handler() {
          return 'resolved'
        },
      })
      const stop = createEvent('stop')

      const lastData = sample(data, stop)

      lastData.watch(value => spy(value))

      data({foo: 'bar'})
      data(true)
      data(false)
      data({x: 'baz'})

      stop()

      expect(getSpyCalls()).toEqual([[{x: 'baz'}]])
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
  describe('sample with store as source', () => {
    test('store', () => {
      const inc = createEvent('inc')
      const dec = createEvent('dec')
      const stop = createEvent('stop')

      const s1 = createStore(0)
      const s2 = sample(s1, stop)

      s2.watch(value => spy(value))

      s1.on(inc, n => n + 1).on(dec, n => n - 1)

      inc()
      dec()
      inc()
      inc()

      stop()

      expect(getSpyCalls()).toEqual([[0], [2]])
      expect(spy).toHaveBeenCalledTimes(2)
    })
    test('store has the same state as source', () => {
      const stop = createEvent()

      const s1 = createStore(0)
      s1.setState(1)

      const s2 = sample(s1, stop)

      expect(s2.getState()).toEqual(s1.getState())
    })

    test('store has its own defaultState', () => {
      const stop = createEvent()

      const s1 = createStore(0)
      s1.setState(1)

      const s2 = sample(s1, stop)

      expect(s2.defaultState).toEqual(1)
    })

    test('store updates if source updates', () => {
      const stop = createEvent()

      const s1 = createStore(0)
      s1.setState(1)

      const s2 = sample(s1, stop)

      s2.watch(value => spy(value)) // 1st call

      // Source updates
      s1.setState(2)
      s1.setState(0) // to initial state

      stop() // 2nd call
      expect(spy).toHaveBeenCalledTimes(2)
    })

    test('store updates only if source is changed', () => {
      const stop = createEvent()

      const s1 = createStore(0)
      const s2 = sample(s1, stop)

      s2.watch(value => spy(value)) // 1st call

      stop()
      s1.setState(0)
      stop()

      expect(spy).toHaveBeenCalledTimes(1)

      s1.setState(1)
      s1.setState(2)
      stop() // 2nd call
      stop()

      expect(spy).toHaveBeenCalledTimes(2)
    })
  })
})
