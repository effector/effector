//@flow

import {sample, Kind} from '../'

import {createEvent} from '../event'
import {createStore} from '../store'
import {createEffect} from '../effect'

import {spy, getSpyCalls} from 'effector/fixtures'

describe('sample type', () => {
  test.each`
    source            | clock             | kind
    ${createStore(0)} | ${createStore(0)} | ${Kind.store}
    ${createStore(0)} | ${createEvent()}  | ${Kind.event}
    ${createEvent()}  | ${createStore(0)} | ${Kind.event}
    ${createEvent()}  | ${createEvent()}  | ${Kind.event}
  `(`$kind <- $source.kind by $clock.kind`, ({source, clock, kind}) => {
  expect(sample(source, clock).kind).toBe(kind)
})
  test.each`
    source            | clock             | kind
    ${createStore(0)} | ${createStore(0)} | ${Kind.store}
    ${createStore(0)} | ${createEvent()}  | ${Kind.event}
    ${createEvent()}  | ${createStore(0)} | ${Kind.event}
    ${createEvent()}  | ${createEvent()}  | ${Kind.event}
  `(
  `$kind <- $source.kind by $clock.kind with handler`,
  ({source, clock, kind}) => {
    expect(
      sample(source, clock, (source, clock) => ({source, clock})).kind,
    ).toBe(kind)
  },
)
})

describe('sample', () => {
  describe('sample with event as source', () => {
    it('not depended on order of execution', () => {
      const A = createEvent()
      const B = A.map(x => ({x}))
      sample(B, A).watch(e => spy(e))
      A(1)
      A(2)
      expect(getSpyCalls()).toEqual([[{x: 1}], [{x: 2}]])
    })
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
    test('no updates until first source update', () => {
      const data = createEvent('data')
      const stop = createEvent('stop')

      const lastData = sample(data, stop)

      lastData.watch(value => spy(value))

      stop()
      stop()
      expect(spy).not.toHaveBeenCalled()
      data({x: 'baz'})
      expect(spy).not.toHaveBeenCalled()
      stop()
      expect(getSpyCalls()).toEqual([[{x: 'baz'}]])
      expect(spy).toHaveBeenCalledTimes(1)
    })
    test(
      'edge case: no updates until first source update ' +
        'even when clock is store',
      () => {
        const data = createEvent('data')
        const add = createEvent('+ n')
        const stop = createStore(0).on(add, (x, n) => x + n)

        const lastData = sample(data, stop)

        lastData.watch(value => spy(value))

        add(1)
        add(2)
        expect(spy).not.toHaveBeenCalled()
        data({x: 'baz'})
        add(0) //edge case: store will not be updated
        expect(spy).not.toHaveBeenCalled()
        add(3)
        expect(getSpyCalls()).toEqual([[{x: 'baz'}]])
        expect(spy).toHaveBeenCalledTimes(1)
        add(4)
        expect(getSpyCalls()).toEqual([[{x: 'baz'}], [{x: 'baz'}]])
        expect(spy).toHaveBeenCalledTimes(2)
      },
    )
    test('handler works', () => {
      const release = createEvent()
      const emit = createEvent()
      const received = sample(emit, release, (last, payload) => [last, payload])
      received.watch(value => spy(value))
      release(0)
      emit(1)
      emit(2)
      release(3)
      release(4)
      emit(5)
      expect(getSpyCalls()).toEqual([[[2, 3]], [[2, 4]]])
    })
    test('store as clock', () => {
      const source = createEvent()
      const clock = createStore(0)
      const result = sample(source, clock)
      result.watch(value => spy(value))
      clock.setState(1)
      expect(spy).not.toHaveBeenCalled()
      source('run')
      expect(spy).not.toHaveBeenCalled()
      clock.setState(2)
      expect(getSpyCalls()).toEqual([['run']])
    })
    test('store as clock with handler', () => {
      const spy = jest.fn()
      const handler = jest.fn(x => x)
      const source = createEvent()
      const clock = createStore(0)
      const result = sample(source, clock, (source, clock) =>
        handler({
          source,
          clock,
        }),
      )
      result.watch(value => spy(value))
      clock.setState(1)
      expect(spy).not.toHaveBeenCalled()
      expect(handler).not.toHaveBeenCalled()
      source('run')
      expect(spy).not.toHaveBeenCalled()
      expect(handler).not.toHaveBeenCalled()
      clock.setState(2)
      expect(spy.mock.calls).toEqual([[{source: 'run', clock: 2}]])
      expect(handler.mock.calls).toEqual([[{source: 'run', clock: 2}]])
    })

    test('event source with store as target', () => {})
    test('event source with effect as target', () => {})
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

    test('effect source with store as target', () => {})
    test('effect source with effect as target', () => {})
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

      expect(getSpyCalls()).toEqual([[2]])
    })
    test('store has the same state as source', () => {
      const stop = createEvent()

      const s1 = createStore(0)
      s1.setState(1)

      const s2 = sample(s1, stop)
      s2.watch(e => spy(e))
      stop()
      expect(getSpyCalls()).toEqual([[1]])
    })

    test('store has its own defaultState', () => {
      const stop = createStore(0)

      const s1 = createStore(0)
      s1.setState(1)

      const s2 = sample(s1, stop)

      expect(s2.defaultState).toEqual(1)
    })

    test('store source with event as target plain', () => {
      const foo = createStore([1, 2, 3])
      const bar = createStore([4, 5, 6])
      const stop = createEvent()

      const baz = sample(bar, stop)

      foo.on(baz, (store1, store2) => [...store1, ...store2])

      console.log(baz)
      stop(['stop'])
      expect(foo.getState()).toEqual([1, 2, 3, 4, 5, 6])
    })
    test('store source with effect as target', () => {})
  })
  test('store with handler', () => {
    const stop = createEvent()

    const s1 = createStore(0)
    s1.setState(1)

    const s2 = sample(s1, stop, (s1, stop) => ({s1, stop}))

    s2.watch(value => spy(value))
    expect(spy).toHaveBeenCalledTimes(0)
    s1.setState(2)

    stop('x')
    expect(getSpyCalls()).toEqual([[{s1: 2, stop: 'x'}]])
    expect(spy).toHaveBeenCalledTimes(1)
  })
  test('store x store x handler', () => {
    const stop = createStore(false)

    const s1 = createStore(0)
    s1.setState(1)

    const s2 = sample(s1, stop, (s1, stop) => ({s1, stop}))

    s2.watch(value => spy(value))
    expect(getSpyCalls()).toEqual([[{s1: 1, stop: false}]])
    s1.setState(2)
    s1.setState(0)

    stop.setState(true)
    expect(getSpyCalls()).toEqual([
      [{s1: 1, stop: false}],
      [{s1: 0, stop: true}],
    ])
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
