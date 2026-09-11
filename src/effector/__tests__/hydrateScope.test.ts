import {
  hydrateScope,
  serialize,
  fork,
  combine,
  createStore,
  createEvent,
  allSettled,
  createWatch,
} from 'effector'

describe('hydrateScope', () => {
  test('should hydrate scope with given values', async () => {
    const $store = createStore(0)
    const $store2 = createStore(0)
    const run = createEvent<number>()
    $store.on(run, (state, value) => state + value)
    $store2.on(run, (state, value) => state + value)
    const combined = combine(
      {store: $store, store2: $store2},
      state => state.store + state.store2,
    )

    const scope = fork()

    await allSettled(run, {scope, params: 1})

    const values = serialize(scope)

    const clientScope = fork()

    hydrateScope({scope: clientScope, values})

    expect(clientScope.getState($store)).toBe(1)
    expect(clientScope.getState($store2)).toBe(1)
    expect(clientScope.getState(combined)).toBe(2)
  })

  test('should support custom serialize store config', async () => {
    const $store = createStore(new Date(0), {
      serialize: {
        write: value => value.toISOString(),
        read: value => new Date(value),
      },
    })
    const $store2 = createStore(new Date(0), {
      serialize: {
        write: value => value.toISOString(),
        read: value => new Date(value),
      },
    })
    const combined = combine(
      {store: $store, store2: $store2},
      state => state.store.getTime() + state.store2.getTime(),
    )

    const run = createEvent()

    $store.on(run, () => new Date(1))
    $store2.on(run, () => new Date(2))

    const scope = fork()

    await allSettled(run, {scope})

    const values = JSON.parse(JSON.stringify(serialize(scope)))

    const clientScope = fork()

    hydrateScope({scope: clientScope, values})

    expect(clientScope.getState($store)).toEqual(new Date(1))
    expect(clientScope.getState($store2)).toEqual(new Date(2))
    expect(clientScope.getState(combined)).toEqual(3)
  })

  test('should call scope watchers in sync by default', async () => {
    const $store = createStore(0, {sid: '$store'})
    const $store2 = createStore(0, {sid: '$store2'})
    const combined = combine(
      {store: $store, store2: $store2},
      state => state.store + state.store2,
    )
    const run = createEvent<number>()
    $store.on(run, (state, value) => state + value)
    $store2.on(run, (state, value) => state + value)

    const scope = fork()

    await allSettled(run, {scope, params: 1})

    const values = serialize(scope)

    const clientScope = fork()

    const watchersCalled = jest.fn()

    createWatch({unit: $store, scope: clientScope, fn: watchersCalled})
    createWatch({unit: $store2, scope: clientScope, fn: watchersCalled})
    createWatch({unit: combined, scope: clientScope, fn: watchersCalled})

    hydrateScope({scope: clientScope, values})

    expect(clientScope.getState($store)).toBe(1)
    expect(clientScope.getState($store2)).toBe(1)
    expect(clientScope.getState(combined)).toBe(2)
    expect(watchersCalled).toHaveBeenCalledTimes(3)
    expect(watchersCalled).toHaveBeenCalledWith(1)
    expect(watchersCalled).toHaveBeenCalledWith(1)
    expect(watchersCalled).toHaveBeenCalledWith(2)
  })

  test('should call scope watchers according to scheduleWatchers', async () => {
    const $store = createStore(0, {sid: '$store'})
    const $store2 = createStore(0, {sid: '$store2'})
    const combined = combine(
      {store: $store, store2: $store2},
      state => state.store + state.store2,
    )
    const run = createEvent<number>()
    $store.on(run, (state, value) => state + value)
    $store2.on(run, (state, value) => state + value)

    const scope = fork()

    await allSettled(run, {scope, params: 1})

    const values = serialize(scope)

    const clientScope = fork()

    const watchersCalled = jest.fn()

    createWatch({unit: $store, scope: clientScope, fn: watchersCalled})
    createWatch({unit: $store2, scope: clientScope, fn: watchersCalled})
    createWatch({unit: combined, scope: clientScope, fn: watchersCalled})

    hydrateScope({
      scope: clientScope,
      values,
      scheduleWatchers: run => {
        Promise.resolve().then(run)
      },
    })

    expect(clientScope.getState($store)).toBe(1)
    expect(clientScope.getState($store2)).toBe(1)
    expect(clientScope.getState(combined)).toBe(2)
    expect(watchersCalled).toHaveBeenCalledTimes(0)

    await Promise.resolve()

    expect(watchersCalled).toHaveBeenCalledTimes(3)
    expect(watchersCalled).toHaveBeenCalledWith(1)
    expect(watchersCalled).toHaveBeenCalledWith(1)
    expect(watchersCalled).toHaveBeenCalledWith(2)
  })
})
