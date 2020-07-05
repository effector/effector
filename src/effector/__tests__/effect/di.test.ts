import {createEffect} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('effect.create single argument', async () => {
  const effect = createEffect()
  effect.use(async () => {
    await 1
    return 'done!'
  })
  //@ts-ignore
  const oldCreate = effect.create
  //@ts-ignore
  effect.create = jest.fn((payload, args) => oldCreate(payload, args))
  const baz = jest.fn()
  effect.done.watch(baz)

  await effect(100)
  await effect(200)
  await effect(300)

  //@ts-ignore
  expect(effect.create.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        100,
        Array [],
      ],
      Array [
        200,
        Array [],
      ],
      Array [
        300,
        Array [],
      ],
    ]
  `)
  expect(argumentHistory(baz)).toMatchInlineSnapshot(`
    Array [
      Object {
        "params": 100,
        "result": "done!",
      },
      Object {
        "params": 200,
        "result": "done!",
      },
      Object {
        "params": 300,
        "result": "done!",
      },
    ]
  `)
})

function variadicEffect(name?: string) {
  const effect = createEffect<any, any>(name)
  //@ts-ignore
  const oldCreate = effect.create
  //@ts-ignore
  effect.create = jest.fn((payload, args) => oldCreate([payload, ...args], []))
  const oldUse = effect.use
  //@ts-ignore
  effect.use = handler => oldUse(payload => handler(...payload))

  return effect as any
}

test('effect.create multiple arguments', async () => {
  const useSpy = jest.fn()
  const baz = jest.fn()
  const effect = variadicEffect('long request')

  //@ts-ignore
  effect.use(async (a, b) => {
    useSpy({a, b})
    await 1
    return 'done!'
  })
  effect.done.watch(baz)

  await effect(100, 200)
  await effect(200, 300)
  await effect(300, 400)

  expect(effect.create.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        100,
        Array [
          200,
        ],
      ],
      Array [
        200,
        Array [
          300,
        ],
      ],
      Array [
        300,
        Array [
          400,
        ],
      ],
    ]
  `)
  expect(argumentHistory(useSpy)).toMatchInlineSnapshot(`
    Array [
      Object {
        "a": 100,
        "b": 200,
      },
      Object {
        "a": 200,
        "b": 300,
      },
      Object {
        "a": 300,
        "b": 400,
      },
    ]
  `)
  expect(argumentHistory(baz)).toMatchInlineSnapshot(`
    Array [
      Object {
        "params": Array [
          100,
          200,
        ],
        "result": "done!",
      },
      Object {
        "params": Array [
          200,
          300,
        ],
        "result": "done!",
      },
      Object {
        "params": Array [
          300,
          400,
        ],
        "result": "done!",
      },
    ]
  `)
})
