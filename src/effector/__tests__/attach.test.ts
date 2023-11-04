import {
  attach,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'
import {argumentHistory} from 'effector/fixtures'

it('map params and results by provided functions', async () => {
  const fn = jest.fn()
  const requestFX = createEffect({
    handler(x: number) {
      fn({tag: 'effect handler', data: x})
      return {x}
    },
  })
  const attached = attach({
    effect: requestFX,
    mapParams: (word: string) => word.length,
  })
  requestFX.watch(data => {
    fn({tag: 'request.watch', data})
  })
  requestFX.finally.watch(data => {
    fn({tag: 'request.finally.watch', data})
  })
  attached.watch(data => {
    fn({tag: 'attached.watch', data})
  })
  attached.finally.watch(data => {
    fn({tag: 'attached.finally.watch', data})
  })
  await attached('foo').then(data => {
    fn({tag: 'promise resolver', data})
  })
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": "foo",
        "tag": "attached.watch",
      },
      Object {
        "data": 3,
        "tag": "request.watch",
      },
      Object {
        "data": 3,
        "tag": "effect handler",
      },
      Object {
        "data": Object {
          "params": 3,
          "result": Object {
            "x": 3,
          },
          "status": "done",
        },
        "tag": "request.finally.watch",
      },
      Object {
        "data": Object {
          "params": "foo",
          "result": Object {
            "x": 3,
          },
          "status": "done",
        },
        "tag": "attached.finally.watch",
      },
      Object {
        "data": Object {
          "x": 3,
        },
        "tag": "promise resolver",
      },
    ]
  `)
})

it('support source store', async () => {
  const fn = jest.fn()
  const requestFX = createEffect({
    handler(data: {url: string; token: string}) {
      fn({tag: 'effect handler', data})
      return 'result'
    },
  })
  const token = createStore('foo')
  const attached = attach({
    source: token,
    effect: requestFX,
    mapParams: (url: string, token) => ({url, token}),
  })
  requestFX.watch(data => {
    fn({tag: 'request.watch', data})
  })
  requestFX.finally.watch(data => {
    fn({tag: 'request.finally.watch', data})
  })
  attached.watch(data => {
    fn({tag: 'attached.watch', data})
  })
  attached.finally.watch(data => {
    fn({tag: 'attached.finally.watch', data})
  })
  await attached('/user').then(data => {
    fn({tag: 'promise resolver', data})
  })
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": "/user",
        "tag": "attached.watch",
      },
      Object {
        "data": Object {
          "token": "foo",
          "url": "/user",
        },
        "tag": "request.watch",
      },
      Object {
        "data": Object {
          "token": "foo",
          "url": "/user",
        },
        "tag": "effect handler",
      },
      Object {
        "data": Object {
          "params": Object {
            "token": "foo",
            "url": "/user",
          },
          "result": "result",
          "status": "done",
        },
        "tag": "request.finally.watch",
      },
      Object {
        "data": Object {
          "params": "/user",
          "result": "result",
          "status": "done",
        },
        "tag": "attached.finally.watch",
      },
      Object {
        "data": "result",
        "tag": "promise resolver",
      },
    ]
  `)
})
it('support source shape', async () => {
  const fn = jest.fn()
  const requestFX = createEffect({
    handler(data: {url: string; token: string}) {
      fn({tag: 'effect handler', data})
      return 'result'
    },
  })
  const token = createStore('foo')
  const callCounter = createStore(0).on(requestFX.finally, x => x + 1)
  const attached = attach({
    source: {token, count: callCounter},
    effect: requestFX,
    mapParams: (url: string, {token}) => ({url, token}),
  })
  requestFX.watch(data => {
    fn({tag: 'request.watch', data})
  })
  requestFX.finally.watch(data => {
    fn({tag: 'request.finally.watch', data})
  })
  attached.watch(data => {
    fn({tag: 'attached.watch', data})
  })
  attached.finally.watch(data => {
    fn({tag: 'attached.finally.watch', data})
  })
  await attached('/user').then(data => {
    fn({tag: 'promise resolver', data})
  })
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "data": "/user",
        "tag": "attached.watch",
      },
      Object {
        "data": Object {
          "token": "foo",
          "url": "/user",
        },
        "tag": "request.watch",
      },
      Object {
        "data": Object {
          "token": "foo",
          "url": "/user",
        },
        "tag": "effect handler",
      },
      Object {
        "data": Object {
          "params": Object {
            "token": "foo",
            "url": "/user",
          },
          "result": "result",
          "status": "done",
        },
        "tag": "request.finally.watch",
      },
      Object {
        "data": Object {
          "params": "/user",
          "result": "result",
          "status": "done",
        },
        "tag": "attached.finally.watch",
      },
      Object {
        "data": "result",
        "tag": "promise resolver",
      },
    ]
  `)
})

it('pass source to inner effect if no mapParams provided', async () => {
  const fn = jest.fn()

  const request = createEffect((token: string) => {
    fn(token)
    return 'ok'
  })
  const token = createStore('foo')

  const fx = attach({
    source: token,
    effect: request,
  })
  await expect(fx()).resolves.toBe('ok')
})

it('if no source nor mapParams provided just create new derived effect', async () => {
  const fn = jest.fn()
  const $counter = createStore(0)
  const originalFx = createEffect((params: number) => params * 10)
  const derivedFx = attach({effect: originalFx})

  $counter.on(originalFx.doneData, (counter, value) => counter + value)
  $counter.on(derivedFx.doneData, (counter, value) => counter - value)

  derivedFx.watch(params => {
    fn({effect: 'derivedFx', params})
  })
  derivedFx.doneData.watch(data => {
    fn({effect: 'derivedFx.doneData', data})
  })
  originalFx.watch(params => {
    fn({effect: 'originalFx', params})
  })
  originalFx.doneData.watch(data => {
    fn({effect: 'originalFx.doneData', data})
  })

  await derivedFx(3)
  expect($counter.getState()).toBe(0)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "effect": "derivedFx",
        "params": 3,
      },
      Object {
        "effect": "originalFx",
        "params": 3,
      },
      Object {
        "data": 30,
        "effect": "originalFx.doneData",
      },
      Object {
        "data": 30,
        "effect": "derivedFx.doneData",
      },
    ]
  `)
})

it('handle fatal errors in mapParams', async () => {
  const effect = createEffect(() => {})
  const fx = attach({
    effect,
    mapParams() {
      throw Error('fatal error')
    },
  })
  await expect(fx()).rejects.toThrowErrorMatchingInlineSnapshot(`"fatal error"`)
})

test('async effect', async () => {
  const fn = jest.fn()
  const $calls = createStore(0)
  const fx = attach({
    source: $calls,
    async effect(calls: number, params: string) {
      await new Promise(rs => setTimeout(rs, 30))
      fn([params, calls])
    },
  })
  $calls.on(fx.doneData, x => x + 1)
  await fx('a')
  await fx('b')
  await fx('c')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Array [
        "a",
        0,
      ],
      Array [
        "b",
        1,
      ],
      Array [
        "c",
        2,
      ],
    ]
  `)
})

test('interaction with watch and parallel updates', async () => {
  const fn = jest.fn()

  const trigger = createEvent<string>()
  const inc = createEvent()
  const source = createStore(0)
  const fxTarget = createEffect((params: {n: number; tag: string}) => {
    fn(params)
  })

  source.on(inc, n => n + 10)
  source.on(fxTarget, n => n + 1)

  const fx = attach({
    source,
    effect: fxTarget,
    mapParams: (tag: string, n) => ({tag, n}),
  })

  sample({
    clock: trigger,
    target: [fx, fx],
  })

  trigger.watch(() => {
    inc()
  })

  trigger('a')
  trigger('b')

  expect(argumentHistory(fn)).toEqual([
    {n: 10, tag: 'a'},
    {n: 11, tag: 'a'},
    {n: 22, tag: 'b'},
    {n: 23, tag: 'b'},
  ])
})

test('attached effect should got its name from parent domain', () => {
  const app = createDomain()
  const fx = app.createEffect(() => {})
  const attached = attach({effect: fx})
  expect(attached.compositeName.fullName).toBe('app/attached')
})

it('uses passed domain for function', () => {
  const domain = createDomain()
  const source = createStore(null)

  const attached = attach({
    source,
    domain,
    effect() {},
  })

  expect(attached.compositeName.fullName).toBe('domain/attached')
})

it('should not allow domain for effects', () => {
  const domain = createDomain()
  const source = createStore(null)
  const fx = createEffect(() => {})

  expect(() => {
    attach({
      source,
      // @ts-expect-error
      domain,
      effect: fx,
    })
  }).toThrowErrorMatchingInlineSnapshot(
    `"\`domain\` can only be used with a plain function"`,
  )
})

it('should read actual store value', () => {
  const fn = jest.fn()

  const set = createEvent()
  const $store = createStore(0).on(set, () => 1)

  const fx = attach({
    source: $store,
    effect(value) {
      fn([value, $store.getState()])
      set()
    },
  })

  const trigger = createEvent()
  const t1 = createEvent()
  const t2 = createEvent()

  sample({
    clock: trigger,
    target: [t1, t2],
  })

  sample({
    clock: t1,
    target: t2,
  })

  sample({
    clock: t2,
    target: fx,
    batch: false,
  })

  trigger()

  expect(argumentHistory(fn)).toEqual([
    [0, 0],
    [1, 1],
  ])
})
