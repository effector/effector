import {
  allSettled,
  createEffect,
  createEvent,
  createStore,
  createWatch,
  fork,
} from 'effector'

describe('createWatch on scope', () => {
  test('event', async () => {
    const event = createEvent()
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: event, scope, fn: listener})

    await allSettled(event, {scope})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(undefined)
  })

  test('event without scope', async () => {
    const event = createEvent()
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: event, scope, fn: listener})

    event()

    expect(listener).not.toHaveBeenCalled()
  })

  test('effect', async () => {
    const effect = createEffect(() => null)
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: effect, scope, fn: listener})

    await allSettled(effect, {scope})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(undefined)
  })

  test('effect without scope', async () => {
    const effect = createEffect(() => null)
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: effect, scope, fn: listener})

    effect()

    expect(listener).not.toHaveBeenCalled()
  })

  test('store', async () => {
    const event = createEvent<unknown>()
    const store = createStore<unknown>(null).on(event, (_, value) => value)
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: store, scope, fn: listener})

    await allSettled(event, {scope, params: {}})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith({})
  })

  test('store without scope', async () => {
    const event = createEvent<unknown>()
    const store = createStore<unknown>(null).on(event, state => state)
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: store, scope, fn: listener})

    event()

    expect(listener).not.toHaveBeenCalled()
  })
})

describe('createWatch without scope', () => {
  test('event', async () => {
    const event = createEvent()
    const listener = jest.fn()

    createWatch({unit: event, fn: listener})

    event()

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(undefined)
  })

  test('event with scope', async () => {
    const event = createEvent()
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: event, fn: listener})

    await allSettled(event, {scope})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(undefined)
  })

  test('effect', async () => {
    const effect = createEffect(() => null)
    const listener = jest.fn()

    createWatch({unit: effect, fn: listener})

    await effect()

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(undefined)
  })

  test('effect with scope', async () => {
    const effect = createEffect(() => null)
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: effect, fn: listener})

    await allSettled(effect, {scope})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith(undefined)
  })

  test('store', async () => {
    const event = createEvent<unknown>()
    const store = createStore<unknown>(null).on(event, (_, value) => value)
    const listener = jest.fn()

    createWatch({unit: store, fn: listener})

    event({})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith({})
  })

  test('store with scope', async () => {
    const event = createEvent<unknown>()
    const store = createStore<unknown>(null).on(event, (_, value) => value)
    const scope = fork()
    const listener = jest.fn()

    createWatch({unit: store, fn: listener})

    await allSettled(event, {scope, params: {}})

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toBeCalledWith({})
  })
})
