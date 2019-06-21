//@flow

import {createStoreObject, createEvent, createStore, is} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('store.fail is event', () => {
  const store = createStore(0)
  expect(is.event(store.fail)).toBe(true)
})

it('triggers after failed .on', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const store = createStore(0)
  store.on(trigger, () => {
    throw new Error('Unknown error')
  })
  store.fail.watch(e => fn(e))

  store.setState(1)
  expect(fn).not.toBeCalled()
  trigger()
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: Unknown error],
            "state": 1,
          },
        ]
    `)
})

it('triggers after failed .watch', () => {
  const fn = jest.fn()
  const store = createStore(0)
  const sub = store.watch(v => {
    if (v > 0) throw new Error('Unknown error')
  })
  sub.fail.watch(e => fn(e))

  expect(fn).not.toBeCalled()
  store.setState(1)
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: Unknown error],
            "params": 1,
          },
        ]
    `)
})

it('triggers after failed .map', () => {
  const fn = jest.fn()
  const store = createStore(0)
  const mappedStore = store.map(state => {
    if (state > 5) throw new Error('Unknown error')
    return state
  })
  mappedStore.fail.watch(e => fn(e))

  store.setState(1)
  expect(fn).not.toBeCalled()
  store.setState(6)
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: Unknown error],
            "state": 1,
          },
        ]
    `)
})

describe("doesn't prevent other stores from updating", () => {
  test('sanity check', () => {
    const fooFn = jest.fn()
    const barFn = jest.fn()
    const bazFn = jest.fn()
    const fooBazFn = jest.fn()
    const barBazFn = jest.fn()

    const trigger = createEvent()
    const baz = createStore(0)
    const foo = createStore(0)
    const bar = createStore(0)
    const fooBaz = createStoreObject({foo, baz})
    const barBaz = createStoreObject({bar, baz})

    baz.on(trigger, (_, p) => p)
    foo.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('foo error')
      return state
    })
    bar.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('bar error')
      return state
    })

    baz.watch(p => bazFn(p))
    foo.watch(p => fooFn(p))
    bar.watch(p => barFn(p))

    fooBaz.watch(p => fooBazFn(p))
    barBaz.watch(p => barBazFn(p)) // where is watch?

    trigger(30)

    expect(argumentHistory(fooBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "baz": 0,
          "foo": 0,
        },
        Object {
          "baz": 30,
          "foo": 0,
        },
      ]
    `)
    expect(argumentHistory(barBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "bar": 0,
          "baz": 0,
        },
        Object {
          "bar": 0,
          "baz": 30,
        },
      ]
    `)
  })

  test('sanity check 2', () => {
    const fooFn = jest.fn()
    const barFn = jest.fn()
    const bazFn = jest.fn()
    const fooBazFn = jest.fn()
    const barBazFn = jest.fn()

    const trigger = createEvent()
    const baz = createStore(0)
    const foo = createStore(0)
    const bar = createStore(0)
    const fooBaz = createStoreObject({foo, baz})
    const barBaz = createStoreObject({bar, baz})

    baz.on(trigger, (_, p) => p)
    foo.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('foo error')
      return state
    })
    bar.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('bar error')
      return state
    })

    baz.watch(p => bazFn(p))
    foo.watch(p => fooFn(p))
    bar.watch(p => barFn(p))

    fooBaz.watch(p => fooBazFn(p))
    barBaz.watch(p => barBazFn(p)) // where is watch?

    trigger(20)

    expect(argumentHistory(fooBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "baz": 0,
          "foo": 0,
        },
        Object {
          "baz": 20,
          "foo": 0,
        },
      ]
    `)
    expect(argumentHistory(barBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "bar": 0,
          "baz": 0,
        },
        Object {
          "bar": 0,
          "baz": 20,
        },
      ]
    `)
  })

  test('correct update', () => {
    const failFn = jest.fn()
    const fooFn = jest.fn()
    const barFn = jest.fn()
    const bazFn = jest.fn()
    const fooBazFn = jest.fn()
    const barBazFn = jest.fn()

    const trigger = createEvent()
    const baz = createStore(0)
    const foo = createStore(0)
    const bar = createStore(0)
    const fooBaz = createStoreObject({foo, baz})
    const barBaz = createStoreObject({bar, baz})

    baz.on(trigger, (_, p) => p)
    foo.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('foo error')
      return state
    })
    bar.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('bar error')
      return state
    })

    baz.watch(p => bazFn(p))
    foo.watch(p => fooFn(p))
    bar.watch(p => barFn(p))

    // My lord, is that... legal?
    // This is no-op
    foo.fail.watch(err => {
      failFn(err)
      foo.setState(err.state)
    })

    fooBaz.watch(p => fooBazFn(p))
    barBaz.watch(p => barBazFn(p)) // where is watch?

    trigger(20)

    expect(argumentHistory(failFn)).toEqual([])
    expect(argumentHistory(bazFn)).toEqual([0, 20])
    expect(argumentHistory(fooFn)).toEqual([0])
    expect(argumentHistory(barFn)).toEqual([0])

    expect(argumentHistory(fooBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "baz": 0,
          "foo": 0,
        },
        Object {
          "baz": 20,
          "foo": 0,
        },
      ]
    `)
    expect(argumentHistory(barBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "bar": 0,
          "baz": 0,
        },
        Object {
          "bar": 0,
          "baz": 20,
        },
      ]
    `)
  })

  test.only('actual test', () => {
    const failFn = jest.fn()
    const fooFn = jest.fn()
    const barFn = jest.fn()
    const bazFn = jest.fn()
    // const fooBazFn = jest.fn()
    const barBazFn = jest.fn()

    const trigger = createEvent()
    const baz = createStore(0)
    const foo = createStore(0)
    const bar = createStore(0)
    // const fooBaz = createStoreObject({foo, baz})
    const barBaz = createStoreObject({bar, baz})

    baz.on(trigger, (_, p) => p)
    foo.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('foo error')
      return state
    })
    bar.on(trigger, (state, payload) => {
      if (payload > 25) throw new Error('bar error')
      return state
    })

    baz.watch(p => bazFn(p))
    foo.watch(p => fooFn(p))
    bar.watch(p => barFn(p))

    // My lord, is that... legal?
    foo.fail.watch(err => {
      failFn(err)
      // foo.setState(err.state)
    })

    // fooBaz.watch(p => fooBazFn(p))
    barBaz.watch(p => barBazFn(p)) // where is watch?

    trigger(30)

    expect(argumentHistory(failFn)).toEqual([
      {error: new Error('foo error'), state: 0},
    ])
    expect(argumentHistory(bazFn)).toEqual([0, 30])
    expect(argumentHistory(fooFn)).toEqual([0])
    expect(argumentHistory(barFn)).toEqual([0])

    // expect(argumentHistory(fooBazFn)).toMatchInlineSnapshot(`
    //   Array [
    //     Object {
    //       "baz": 0,
    //       "foo": 0,
    //     },
    //     Object {
    //       "baz": 30,
    //       "foo": 0,
    //     },
    //   ]
    // `)
    expect(argumentHistory(barBazFn)).toMatchInlineSnapshot(`
      Array [
        Object {
          "bar": 0,
          "baz": 0,
        },
        Object {
          "bar": 0,
          "baz": 30,
        },
      ]
    `)
  })
})

test('throw inside store.fail handler', () => {
  let calls = 0
  const fn = jest.fn()
  const trigger = createEvent()
  const store = createStore(0).on(trigger, () => {
    throw new Error('trigger')
  })
  store.fail.watch(fn)
  store.on(store.fail, () => {
    calls++
    if (calls < 10) throw new Error(`Throw: ${calls}`)
  })
  trigger()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: trigger],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 1],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 2],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 3],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 4],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 5],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 6],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 7],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 8],
            "state": 0,
          },
          Object {
            "error": [Error: Throw: 9],
            "state": 0,
          },
        ]
    `)
})
