import * as redux from 'redux'
import {from, periodic} from 'most'
import {from as rxjsFrom, interval} from 'rxjs'
import {
  fromObservable,
  createEvent,
  createStore,
  createEffect,
  createDomain,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

function createEmitter<T>() {
  const emitter = {
    listener: (() => {}) as (p: T) => void,
    subscribe: (cb: (p: T) => void) => {
      emitter.listener = cb

      return () => {
        emitter.listener = () => {}
      }
    },
    emit: (p: T) => {
      emitter.listener(p)
    },
  }
  return emitter
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('fromObservable', () => {
  it('works with typical Symbol.observable library: redux', () => {
    const fn = jest.fn()
    const reduxStore = redux.createStore((state = 1, action) => {
      switch (action.type) {
        case 'inc':
          return state + 1
        default:
          return state
      }
    })
    const effectorEvent = fromObservable(reduxStore)
    effectorEvent.watch(e => {
      fn(e)
    })
    reduxStore.dispatch({type: 'inc'})
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        2,
      ]
    `)
  })

  describe('works with itself', () => {
    test('event support', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const target = fromObservable(trigger)
      target.watch(fn)
      trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
        ]
      `)
    })
    test('effect support', async () => {
      const fn = jest.fn()
      const trigger = createEffect({
        handler() {},
      })
      const target = fromObservable(trigger)
      target.watch(fn)
      await trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
        ]
      `)
    })
    test('store support', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const store = createStore(0).on(trigger, x => x + 1)
      const target = fromObservable(store)
      target.watch(fn)
      trigger()
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          1,
        ]
      `)
    })
  })
})

describe('.subscribe', () => {
  describe('observer support', () => {
    test('event support', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      trigger.subscribe({next: fn})
      trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
        ]
      `)
    })
    test('effect support', async () => {
      const fn = jest.fn()
      const trigger = createEffect({
        handler() {},
      })
      trigger.subscribe({next: fn})
      await trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
        ]
      `)
    })
    test('store support', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const store = createStore(0).on(trigger, x => x + 1)
      store.subscribe({next: fn})
      trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
          1,
        ]
      `)
    })
  })
  describe('function support', () => {
    test('event support', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      trigger.subscribe(fn)
      trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
        ]
      `)
    })
    test('effect support', async () => {
      const fn = jest.fn()
      const trigger = createEffect({
        handler() {},
      })
      trigger.subscribe(fn)
      await trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
        ]
      `)
    })
    test('store support', () => {
      const fn = jest.fn()
      const trigger = createEvent()
      const store = createStore(0).on(trigger, x => x + 1)
      store.subscribe(fn)
      trigger(0)
      expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          0,
          1,
        ]
      `)
    })
  })
})

describe('port', () => {
  test('port should work correctly', async () => {
    const used = jest.fn()
    const usedEff = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent()
    const eff = domain.createEvent()
    event.watch(used)
    eff.watch(usedEff)
    const str$ = periodic(50)
      .scan(a => a + 1, 0)
      .take(5)
    await Promise.all([str$.map(event).drain(), str$.map(eff).drain()])
    expect(used).toHaveBeenCalledTimes(5)
    expect(usedEff).toHaveBeenCalledTimes(5)
  })
})

it('works with most use cases', async () => {
  const fn = jest.fn()
  const timeout = createEvent()
  timeout.watch(fn)

  await periodic(300)
    .take(5)
    .observe(() => timeout())

  expect(fn).toHaveBeenCalledTimes(5)
})

test('subscription', async () => {
  const fn = jest.fn()

  const domain = createDomain()

  const eff = domain.createEffect()
  eff.use(() => {})
  expect(() => {
    from(eff).observe(fn)
  }).not.toThrow()
  const event = domain.createEvent()
  expect(() => {
    from(event).observe(fn)
  }).not.toThrow()
  event()
  await eff('')
  expect(fn).toHaveBeenCalledTimes(2)
})

test('rxjs support', async () => {
  const fn = jest.fn()
  const event = createEvent<string>()
  const event$ = rxjsFrom(event)
  const targetEvent = fromObservable(event$)
  targetEvent.watch(fn)
  event('a')
  event('b')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "a",
      "b",
    ]
  `)
})

test('most support', async () => {
  const fn = jest.fn()
  const event = createEvent<string>()
  const event$ = from(event)
  const targetEvent = fromObservable(event$)
  targetEvent.watch(fn)
  event('a')
  event('b')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      "a",
      "b",
    ]
  `)
})

describe('object shape', () => {
  it('should work with observable and start event', () => {
    const stream$ = rxjsFrom([1, 2, 3])
    const appStarted = createEvent()
    const event = fromObservable({
      start: appStarted,
      setup: stream$,
    })
    const mock = jest.fn()
    event.watch(mock)
    expect(mock).not.toBeCalled()

    appStarted()

    expect(mock).toBeCalledTimes(3)
    expect(argumentHistory(mock)).toEqual([1, 2, 3])
  })

  it('should work with observable and start and stop events', async () => {
    const stream$ = interval(10)
    const appStarted = createEvent()
    const appStopped = createEvent()
    const event = fromObservable({
      start: appStarted,
      stop: appStopped,
      setup: stream$,
    })
    const mock = jest.fn()
    event.watch(mock)
    expect(mock).not.toBeCalled()

    await delay(20)

    appStarted()

    await delay(35)

    expect(mock).toBeCalledTimes(3)
    expect(argumentHistory(mock)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)

    appStopped()

    await delay(20)

    expect(mock).toBeCalledTimes(3)
  })

  it('should work with function and start event', async () => {
    const emitter = createEmitter<number>()

    const appStarted = createEvent()
    const event = fromObservable<number>({
      start: appStarted,
      setup: listener => {
        emitter.subscribe(listener)
      },
    })
    const mock = jest.fn()
    event.watch(mock)

    emitter.emit(1)
    expect(mock).not.toBeCalled()

    appStarted()

    emitter.emit(1)
    emitter.emit(1)
    emitter.emit(1)

    expect(mock).toBeCalledTimes(3)
    expect(argumentHistory(mock)).toMatchInlineSnapshot(`
      Array [
        1,
        1,
        1,
      ]
    `)
  })

  it('should work with function and start and stop event', async () => {
    const emitter = createEmitter<number>()

    const appStarted = createEvent()
    const appStopped = createEvent()
    const event = fromObservable<number>({
      start: appStarted,
      stop: appStopped,
      setup: listener => {
        return emitter.subscribe(listener)
      },
    })
    const mock = jest.fn()
    event.watch(mock)

    emitter.emit(1)
    expect(mock).not.toBeCalled()

    appStarted()

    emitter.emit(1)
    emitter.emit(1)
    emitter.emit(1)

    expect(mock).toBeCalledTimes(3)
    expect(argumentHistory(mock)).toMatchInlineSnapshot(`
      Array [
        1,
        1,
        1,
      ]
    `)

    appStopped()

    emitter.emit(1)

    expect(mock).toBeCalledTimes(3)
  })

  it('should work with function and start and stop event and source', async () => {
    const emitter = createEmitter<number>()

    const $emitter = createStore(emitter)
    const appStarted = createEvent()
    const appStopped = createEvent()
    const event = fromObservable({
      source: $emitter,
      start: appStarted,
      setup: (listener, em) => {
        return em.subscribe(listener)
      },
    })
    const mock = jest.fn()
    event.watch(mock)

    emitter.emit(1)
    expect(mock).not.toBeCalled()

    appStarted()

    emitter.emit(1)
    emitter.emit(1)
    emitter.emit(1)

    expect(mock).toBeCalledTimes(3)
    expect(argumentHistory(mock)).toMatchInlineSnapshot(`
      Array [
        1,
        1,
        1,
      ]
    `)

    appStopped()

    emitter.emit(1)

    expect(mock).toBeCalledTimes(3)
  })
})
