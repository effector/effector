import {attach, createEffect, createStore} from 'effector'
import {argumentHistory} from 'effector/fixtures'

it('map params and results by provided functions', async () => {
  const fn = jest.fn()
  const requestFX = createEffect({
    handler(x) {
      fn({tag: 'effect handler', data: x})
      return {x}
    },
  })
  const attached = attach({
    effect: requestFX,
    mapParams: word => word.length,
    mapResult: ({x}) => x,
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
          "result": 3,
          "status": "done",
        },
        "tag": "attached.finally.watch",
      },
      Object {
        "data": 3,
        "tag": "promise resolver",
      },
    ]
  `)
})

it('support source', async () => {
  const fn = jest.fn()
  const requestFX = createEffect({
    handler(data) {
      fn({tag: 'effect handler', data})
      return 'result'
    },
  })
  const token = createStore('foo')
  const callCounter = createStore(0).on(requestFX.finally, x => x + 1)
  const attached = attach({
    source: {token, count: callCounter},
    effect: requestFX,
    mapParams: (url, {token}) => ({url, token}),
    mapResult: (result, {count}) => ({result, count}),
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
      "result": Object {
        "count": 1,
        "result": "result",
      },
      "status": "done",
    },
    "tag": "attached.finally.watch",
  },
  Object {
    "data": Object {
      "count": 1,
      "result": "result",
    },
    "tag": "promise resolver",
  },
]
`)
})
