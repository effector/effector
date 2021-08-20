import {attach, createEffect, createStore} from 'effector'
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
  const fn = jest.fn()
  const effect = createEffect((n: number) => {
    fn(n)
  })
  const fx = attach({
    effect,
    mapParams: (params: string) => params.length,
  })
  //@ts-ignore
  await expect(fx(null)).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Cannot read property 'length' of null"`,
  )
})

test('async effect', async () => {
  const fn = jest.fn()
  const $calls = createStore(0)
  const fx = attach({
    source: $calls,
    async effect(params: string, calls: number) {
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
