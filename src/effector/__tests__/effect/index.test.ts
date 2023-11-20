import {
  createEffect,
  createEvent,
  createStore,
  combine,
  forward,
  restore,
  Node,
  step,
  fork,
  allSettled,
  attach,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('forward')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

describe('createEffect(handler) support', () => {
  test('with babel plugin', async () => {
    const fx = createEffect(async (str: string) => str.length)
    await expect(fx('ok')).resolves.toBe(2)
    expect(fx.shortName).toBe('fx')
  })
  test('without babel plugin', async () => {
    const fx = {_: createEffect}._(async (str: string) => str.length)
    await expect(fx('ok')).resolves.toBe(2)
  })
})
describe('effect({...})', () => {
  test(`if used function will resolve`, async () => {
    const fn = jest.fn()
    const effect = createEffect()
    effect.use(async params => {
      fn(params)
      return 'done!'
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })

  test('if used function will throw', async () => {
    const fn = jest.fn()
    const effect = createEffect()
    effect.use(async params => {
      fn(params)
      throw 'fail!'
    })
    //eslint-disable-next-line max-len
    await expect(effect('will throw')).rejects.toBe('fail!')
  })
})

describe('future', () => {
  test(`if used function will resolve`, async () => {
    const fn = jest.fn()
    const effect = createEffect()
    effect.use(async params => {
      fn(params)
      return 'done!'
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })

  test('if used function will throw', async () => {
    const fn = jest.fn()
    const effect = createEffect()
    effect.use(async params => {
      fn(params)
      throw 'fail!'
    })
    await expect(effect('will throw')).rejects.toBe('fail!')
  })
})

describe('effect.finally', () => {
  test(`if used function will resolve`, async () => {
    const fn = jest.fn()
    const effect = createEffect({
      async handler({fail}) {
        if (fail) throw Error('[expected error]')
        return 'done!'
      },
    })
    effect.finally.watch(e => fn(e))
    await effect({fail: false})
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
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

  test('if used function will throw', async () => {
    const fn = jest.fn()
    const effect = createEffect({
      async handler({fail}) {
        if (fail) throw Error('[expected error]')
        return 'done!'
      },
    })
    effect.finally.watch(e => fn(e))
    await effect({fail: true}).catch(() => {})
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
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
test('effect without handler should throw an error during a call', async () => {
  const effect = createEffect()
  await expect(effect('ok')).rejects.toThrowErrorMatchingInlineSnapshot(
    `"no handler used in effect"`,
  )
})
describe('createEffect with config', () => {
  it('supports empty config as second argument', async () => {
    const effect = createEffect('fx without handler', {})
    await expect(effect('ok')).rejects.toThrowErrorMatchingInlineSnapshot(
      `"no handler used in fx without handler"`,
    )
  })
  it('supports default handler with config', async () => {
    const fn = jest.fn()
    const effect = createEffect('long request', {
      async handler(params) {
        fn(params)
        return 'done!'
      },
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
  it('supports default handler without name', async () => {
    const fn = jest.fn()
    const effect = createEffect({
      async handler(params) {
        fn(params)
        return 'done!'
      },
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
})

it('should return itself at .use call', () => {
  const effect = createEffect()
  expect(effect.use(() => 'done!')).toBe(effect)
})

it('should handle both done and error in .finally', async () => {
  const fn = jest.fn()
  const effect = createEffect({
    async handler(params) {
      if (params === 'bar') throw Error('error')
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

test('effect.doneData', async () => {
  const fn = jest.fn()
  const fx = createEffect({
    handler: () => 'result',
  })
  fx.doneData.watch(fn)
  await fx()
  expect(argumentHistory(fn)).toEqual(['result'])
})
test('effect.failData', async () => {
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

test('effect.pending is a boolean store', async () => {
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

it('should support forward', async () => {
  const fnHandler = jest.fn()
  const fnWatcher = jest.fn()
  const fetchData = createEffect({
    async handler() {
      return 'fetchData result'
    },
  })

  const logRequest = createEffect({
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
  expect(argumentHistory(fnHandler)).toEqual([{url: 'xxx'}])
  expect(argumentHistory(fnWatcher)).toEqual([
    {params: {url: 'xxx'}, result: 'logRequest result'},
  ])
})

describe('execution order', () => {
  it('should run watchers and promise resolvers in order', async () => {
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
        "doneData",
        "inFlight 0",
        "pending false",
        "promise resolver",
      ]
    `)
  })
  it('should run watchers and promise resolvers in order (async)', async () => {
    const fn = jest.fn()
    const fx = createEffect({
      async handler() {
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
        "doneData",
        "inFlight 0",
        "pending false",
        "promise resolver",
      ]
    `)
  })
  it('should run both .done and .finally at the same tick', async () => {
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

  it('handle sync effect watchers in correct order', async () => {
    const fn = jest.fn()
    const eff = createEffect({
      handler: () => [1, 2, 3],
    })

    eff.watch(e => fn(e))
    eff.done.watch(e => fn(e))
    await eff('run')
    expect(argumentHistory(fn)).toEqual([
      'run',
      {params: 'run', result: [1, 2, 3]},
    ])
  })

  it('should not override sync event updates', async () => {
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

  test('effect.pending becomes false only after all concurrent requests will be settled', async () => {
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

it('should validate .use argument', () => {
  expect(() => {
    const fooFx = createEffect().use(null)
  }).toThrowErrorMatchingInlineSnapshot(
    `"[effect] unit 'fooFx': .use argument should be a function"`,
  )
})

describe('@farfetched/core agreement', () => {
  /**
   * Tests agreement on non-breaking of internals between core effector and @farfetched/core,
   * to implement features like:
   * - Abortable handlers
   *
   * This is a temporary solution, until we will figure out the better way to implement these features into the core package
   * For now there is a escape hatch to implement these features in the @farfetched/core package and this experience will be used during the development of the core package API
   */
  test('should allow patching of effect handler', async () => {
    const fx = createEffect(() => 'default')
    const $result = createStore('').on(fx.done, (_, {result}) => result)

    const runnerNode = (
      (fx as any as {graphite: Node}).graphite.scope as {runner: Node}
    ).runner
    runnerNode.seq.splice(
      1,
      0,
      step.compute({
        fn: p => {
          p.handler = () => 'patched'

          return p
        },
      }),
    )

    const scope = fork()

    await allSettled(fx, {scope})

    expect(scope.getState($result)).toBe('patched')
  })

  test('should allow patching of attached effect handler', async () => {
    const baseFx = createEffect(() => 'default')
    const fx = attach({
      effect: baseFx,
    })

    const $result = createStore('').on(fx.done, (_, {result}) => result)

    const runnerNode = (
      (fx as any as {graphite: Node}).graphite.scope as {runner: Node}
    ).runner
    runnerNode.seq.splice(
      1,
      0,
      step.compute({
        fn: p => {
          p.handler = () => 'patched'

          return p
        },
      }),
    )

    const scope = fork()

    await allSettled(fx, {scope})

    expect(scope.getState($result)).toBe('patched')
  })

  test('should allow patching of attach-effect as a function', async () => {
    const fx = attach({
      source: {a: createStore(42)},
      effect() {
        return 'default'
      },
    })
    const $result = createStore('').on(fx.done, (_, {result}) => result)

    const runnerNode = (
      (fx as any as {graphite: Node}).graphite.scope as {runner: Node}
    ).runner
    runnerNode.seq.splice(
      1,
      0,
      step.compute({
        fn: p => {
          p.handler = () => 'patched'

          return p
        },
      }),
    )

    const scope = fork()

    await allSettled(fx, {scope})

    expect(scope.getState($result)).toBe('patched')
  })
})
