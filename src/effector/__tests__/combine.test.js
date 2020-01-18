//@flow

import {combine, createStore, createEffect, sample, createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'

function rgbToHex(r, g, b) {
  return (
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0')
  )
}
describe('combine cases', () => {
  test('combine({R,G,B})', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //$todo
    const store = combine({R, G, B})
    expect(store.getState()).toEqual({R: 233, G: 88, B: 1})
  })
  test('combine([R,G,B])', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //$todo
    const store = combine([R, G, B])
    expect(store.getState()).toEqual([233, 88, 1])
  })
  test('combine({Color})', () => {
    const Color = createStore('#e95801')
    //$todo
    const store = combine({Color})
    expect(store.getState()).toEqual({Color: '#e95801'})
  })
  test('combine([Color])', () => {
    const Color = createStore('#e95801')
    //$todo
    const store = combine([Color])
    expect(store.getState()).toEqual(['#e95801'])
  })
  test(`combine({R,G,B}, ({R,G,B}) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //$todo
    const store = combine({R, G, B}, ({R, G, B}) => rgbToHex(R, G, B))
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine([R,G,B], ([R,G,B]) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //$todo
    const store = combine([R, G, B], ([R, G, B]) => rgbToHex(R, G, B))
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine({Color}, ({Color}) => '~')`, () => {
    const Color = createStore('#e95801')
    //$todo
    const store = combine({Color}, ({Color}) => Color)
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine([Color], ([Color]) => '~')`, () => {
    const Color = createStore('#e95801')
    //$todo
    const store = combine([Color], ([Color]) => Color)
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine(Color, (Color) => '~')`, () => {
    const Color = createStore('#e95801')
    const store = combine(Color, Color => Color)
    expect(store.getState()).toEqual('#e95801')
  })
  test(`combine(R,G,B, (R,G,B) => '~')`, () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    const store = combine(R, G, B, (R, G, B) => rgbToHex(R, G, B))
    expect(store.getState()).toEqual('#e95801')
  })
  test('combine(R,G,B)', () => {
    const R = createStore(233)
    const G = createStore(88)
    const B = createStore(1)
    //$todo
    const store = combine(R, G, B)
    expect(store.getState()).toEqual([233, 88, 1])
  })
  test('combine(Color)', () => {
    const Color = createStore('#e95801')
    //$todo
    const store = combine(Color)
    expect(store.getState()).toEqual(['#e95801'])
  })
})

it('deduplicate outputs', async() => {
  const fn = jest.fn()
  const fetchApi = createEffect({
    async handler() {
      await new Promise(rs => setTimeout(rs, 300))
      return [{name: 'physics', id: 1}]
    },
  })
  const data = createStore([]).on(fetchApi.done, (_, {result}) => result)
  const lessonIndex = createStore(0)
  const lesson = combine(
    data,
    lessonIndex,
    (data, index) => data[index] || null,
  )
  const lessonWithPending = combine(
    lesson,
    fetchApi.pending,
    (lesson, pending) => ({lesson, pending}),
  )
  sample(lessonWithPending).updates.watch(data => fn(data))

  await fetchApi()
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "lesson": null,
        "pending": true,
      },
      Object {
        "lesson": Object {
          "id": 1,
          "name": "physics",
        },
        "pending": false,
      },
    ]
  `)
})

it('skip first duplicated update', async() => {
  const fn = jest.fn()
  const changedToken = createEvent()

  const $token = createStore('').on(changedToken, (_, token) => token)
  const $token2 = createStore('').on(changedToken, (_, token) => token)

  const websocketUrl = combine($token, () => null)
  websocketUrl.watch(fn)
  changedToken('token')
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      null,
    ]
  `)
})
