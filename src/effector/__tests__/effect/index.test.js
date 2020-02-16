//@flow
import {
  createEffect,
  createEvent,
  createStore,
  combine,
  forward,
  restore,
} from 'effector'
import {delay, spy, argumentHistory} from 'effector/fixtures'

const effect = createEffect('long request')

describe('effect({...})', () => {
  test(`if used function will resolve`, async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      return 'done!'
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })

  test('if used function will throw', async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      throw 'fail!'
    })
    //eslint-disable-next-line max-len
    await expect(effect('will throw')).rejects.toBe('fail!')
  })
})

describe('future', () => {
  test(`if used function will resolve`, async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      return 'done!'
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })

  test('if used function will throw', async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      throw 'fail!'
    })
    await expect(effect('will throw')).rejects.toBe('fail!')
  })
})

describe('effect.finally', () => {
  test(`if used function will resolve`, async() => {
    const effect = createEffect('long request', {
      async handler({fail}) {
        await delay(100)
        if (fail) throw Error('[expected error]')
        return 'done!'
      },
    })
    effect.finally.watch(e => spy(e))
    await effect({fail: false})
    expect(argumentHistory(spy)).toMatchInlineSnapshot(`
      Array [
        Object {
          "params": Object {
            "fail": false,
          },
          "result": "done!",
          "status": "done",
        },
      ]
    `)
  })

  test('if used function will throw', async() => {
    const effect = createEffect('long request', {
      async handler({fail}) {
        await delay(100)
        if (fail) throw Error('[expected error]')
        return 'done!'
      },
    })
    effect.finally.watch(e => spy(e))
    await effect({fail: true}).catch(() => {})
    expect(argumentHistory(spy)).toMatchInlineSnapshot(`
      Array [
        Object {
          "error": [Error: [expected error]],
          "params": Object {
            "fail": true,
          },
          "status": "fail",
        },
      ]
    `)
  })
})
describe('createEffect with config', () => {
  it('supports empty config as second argument', async() => {
    const effect = createEffect('long request', {})

    await expect(effect('ok')).resolves.toBe(undefined)
  })
  it('supports default handler with config', async() => {
    const effect = createEffect('long request', {
      async handler(params) {
        await delay(500)
        spy(params)
        return 'done!'
      },
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
  it('supports default handler without name', async() => {
    const effect = createEffect({
      async handler(params) {
        await delay(500)
        spy(params)
        return 'done!'
      },
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
})

it('should return itself at .use call', () => {
  const effect = createEffect('long request')
  expect(effect.use((_: any) => 'done!')).toBe(effect)
})

it('should handle both done and error in .finally', async() => {
  const fn = jest.fn()
  const effect = createEffect('long request', {
    async handler(params) {
      await delay(500)
      if (params === 'bar') throw new Error('error')
      spy(params)
      return 'done!'
    },
  })
  effect.finally.watch(params => fn(params))
  await effect('foo').catch(() => {})
  await effect('bar').catch(() => {})
  expect(fn).toHaveBeenCalledTimes(2)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "params": "foo",
        "result": "done!",
        "status": "done",
      },
      Object {
        "error": [Error: error],
        "params": "bar",
        "status": "fail",
      },
    ]
  `)
})

test('effect.doneData', async() => {
  const fn = jest.fn()
  const fx = createEffect({
    handler: () => 'result',
  })
  fx.doneData.watch(fn)
  await fx()
  expect(argumentHistory(fn)).toEqual(['result'])
})
test('effect.failData', async() => {
  const fn = jest.fn()
  const fx = createEffect({
    handler() {
      throw 'error'
    },
  })
  fx.failData.watch(fn)
  await fx().catch(() => {})
  expect(argumentHistory(fn)).toEqual(['error'])
})

test('effect.pending is a boolean store', async() => {
  const fn = jest.fn()
  const fx = createEffect({
    async handler() {},
  })
  fx.pending.watch(fn)
  await fx()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      false,
      true,
      false,
    ]
  `)
})

it('should support forward', async() => {
  const fnHandler = jest.fn()
  const fnWatcher = jest.fn()
  const fetchData = createEffect('fetch', {
    async handler(payload) {
      return 'fetchData result'
    },
  })

  const logRequest = createEffect('log', {
    async handler(payload) {
      fnHandler(payload)
      return 'logRequest result'
    },
  })

  logRequest.done.watch(d => {
    fnWatcher(d)
  })

  forward({
    from: fetchData,
    to: logRequest,
  })

  await fetchData({url: 'xxx'})
  expect(fnHandler.mock.calls).toEqual([[{url: 'xxx'}]])
  expect(fnWatcher.mock.calls).toEqual([
    [{params: {url: 'xxx'}, result: 'logRequest result'}],
  ])
})

describe('execution order', () => {
  it('should run watchers and promise resolvers in order', async() => {
    const fn = jest.fn()
    const fx = createEffect({
      handler() {
        fn('handler')
      },
    })
    fx.watch(() => {
      fn('start')
    })
    fx.done.watch(() => {
      fn('done')
    })
    fx.doneData.watch(() => {
      fn('doneData')
    })
    fx.finally.watch(() => {
      fn('finally')
    })
    fx.inFlight.updates.watch(n => {
      fn(`inFlight ${n}`)
    })
    fx.pending.updates.watch(pending => {
      fn(`pending ${pending}`)
    })
    await fx().then(() => {
      fn('promise resolver')
    })
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "start",
        "inFlight 1",
        "pending true",
        "handler",
        "finally",
        "done",
        "inFlight 0",
        "doneData",
        "pending false",
        "promise resolver",
      ]
    `)
  })
  it('should run both .done and .finally at the same tick', async() => {
    const fn = jest.fn()
    const fx = createEffect({
      async handler() {
        return 'ok'
      },
    })
    const a = restore(fx.finally, null)
    const b = restore(fx.done, null)
    const sum = combine({a, b})
    sum.watch(fn)
    await fx(null)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": null,
        "b": null,
      },
      Object {
        "a": Object {
          "params": null,
          "result": "ok",
          "status": "done",
        },
        "b": Object {
          "params": null,
          "result": "ok",
        },
      },
    ]
  `)
  })

  it('handle sync effect watchers in correct order', async() => {
    const fn = jest.fn()
    const eff = createEffect('eff sync', {
      handler: () => [1, 2, 3],
    })

    eff.watch(e => fn(e))
    eff.done.watch(e => fn(e))
    await eff('run')
    expect(fn.mock.calls).toEqual([
      ['run'],
      [{params: 'run', result: [1, 2, 3]}],
    ])
  })

  it('should not override sync event updates', async() => {
    const fn = jest.fn()
    const uppercase = createEvent()

    const fx = createEffect({
      handler() {
        uppercase()
      },
    })
    const user = createStore('alice')
      .on(uppercase, user => user.toUpperCase())
      .on(fx, (_, user) => user)
    user.watch(user => fn(user))

    await fx('bob')
    expect(argumentHistory(fn)).toEqual(['alice', 'bob', 'BOB'])
  })

  test('effect.pending becomes false only after all concurrent requests will be settled', async() => {
    const fx = createEffect()

    expect(fx.pending.getState()).toBe(false)

    fx.use(() => new Promise(rs => setTimeout(rs, 50)))
    const req1 = fx()
    expect(fx.pending.getState()).toBe(true)
    fx.use(() => new Promise(rs => setTimeout(rs, 100)))
    const req2 = fx()
    await req1
    expect(fx.pending.getState()).toBe(true)
    await req2
    expect(fx.pending.getState()).toBe(false)
  })
})
