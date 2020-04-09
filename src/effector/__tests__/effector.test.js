//@flow

import {from, periodic} from 'most'

import {combine, createDomain, createEvent, createStore} from 'effector'

import {argumentHistory} from 'effector/fixtures'

test('will run in expected order', () => {
  const fn = jest.fn()
  const reset = createEvent()
  const add = createEvent()
  const mult = createEvent()
  const listSize = createStore(3)
    .on(add, (n, nn) => n + nn)
    .on(mult, (n, q) => n * q)
    .reset(reset)

  const currentList = createStore([])
    .on(add, (list, pl) => [...list, {add: pl}])
    .on(mult, (list, pl) => [...list, {mult: pl}])
    .reset(reset)
  const selected = createStore([])

  combine({listSize, currentList, selected})

  const unsub = currentList.subscribe(state => fn(state))
  add(5)
  mult(4)
  unsub()
  // halt()

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Array [],
      Array [
        Object {
          "add": 5,
        },
      ],
      Array [
        Object {
          "add": 5,
        },
        Object {
          "mult": 4,
        },
      ],
    ]
  `)
  expect(fn).toHaveBeenCalledTimes(3)
})
it('safe with nested triggers', () => {
  const a = createEvent()
  const b = createEvent()
  const c = createEvent()
  const target = createStore(0)
    .on(a, n => n + 1)
    .on(c, n => n + 1)
  let result
  a.watch(() => {
    b()
    result = target.getState()
  })
  b.watch(() => {
    c()
  })
  a()
  expect(result).toBe(2)
})

test('reducer defaults', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const fn3 = jest.fn()
  const add = createEvent()
  const sub = createEvent()
  const state1 = createStore(3)
    .on(add, (state, payload) => {
      fn1({state, payload})
    })
    .on(sub, (state, payload) => {
      fn2({state, payload})
      return state - payload
    })
  state1.watch(fn3)
  sub(1)
  add(10)
  add(2)
  expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": 10,
        "state": 2,
      },
      Object {
        "payload": 2,
        "state": 2,
      },
    ]
  `)
  expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
    Array [
      Object {
        "payload": 1,
        "state": 3,
      },
    ]
  `)
  expect(argumentHistory(fn3)).toMatchInlineSnapshot(`
    Array [
      3,
      2,
    ]
  `)
  expect(state1.getState()).toMatchInlineSnapshot(`2`)
})

test('store.reset(event)', () => {
  const fn = jest.fn()
  const reset = createEvent()
  const inc = createEvent()
  const listSize = createStore(3)
    .on(inc, n => n + 1)
    .reset(reset)
  const currentList = createStore(
    Array.from({length: listSize.getState()}, (_, n) => n),
  )
    .on(inc, list => [...list, list.length])
    .reset(reset)
  const selected = createStore([])

  combine({listSize, currentList, selected})

  const unsub = currentList.subscribe(state => fn(state))
  inc()
  reset()
  unsub()

  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Array [
        0,
        1,
        2,
      ],
      Array [
        0,
        1,
        2,
        3,
      ],
      Array [
        0,
        1,
        2,
      ],
    ]
  `)
  expect(fn).toHaveBeenCalledTimes(3)
})

test('combine', () => {
  const fn = jest.fn()
  const inc = createEvent()
  const dec = createEvent()
  const s1 = createStore(0)
  const s2 = createStore(0)
  const s3 = createStore(0)
  const s4 = createStore(0)
  const result = combine(s1, s2, s3, s4, (a, b, c, d) => ({a, b, c, d}))
  result.watch(fn)
  s1.on(inc, _ => _ + 1).on(dec, _ => _ - 10)
  s2.on(inc, _ => _ + 10).on(dec, _ => _ - 1)

  expect(result.getState()).toMatchObject({a: 0, b: 0, c: 0, d: 0})

  inc()
  dec()
  expect(result.getState()).toMatchObject({a: -9, b: 9, c: 0, d: 0})

  expect(fn).toHaveBeenCalledTimes(3)
  // expect(fn).toHaveBeenCalledTimes(5)
})

test('no dull updates', () => {
  const store = createStore(false)
  const e1 = createEvent()
  const e2 = createEvent()
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const fn3 = jest.fn()
  store.watch(fn1)
  store.on(e1, (_, payload): boolean => payload)
  store.on(e2, (_, p) => _ === p)
  const nextStore = store.map(x => (fn2(x), x))
  nextStore.watch(fn3)
  store.watch(() => {})
  e1(false)
  e1(true)
  e1(false)
  e2(false)
  e2(false)
  expect(argumentHistory(fn1)).toMatchInlineSnapshot(`
    Array [
      false,
      true,
      false,
      true,
      false,
    ]
  `)
  expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
    Array [
      false,
      true,
      false,
      true,
      false,
    ]
  `)
  expect(argumentHistory(fn3)).toMatchInlineSnapshot(`
    Array [
      false,
      true,
      false,
      true,
      false,
    ]
  `)
  expect(fn1).toHaveBeenCalledTimes(5)
  expect(fn2).toHaveBeenCalledTimes(5)
  expect(fn3).toHaveBeenCalledTimes(5)
})

test('smoke', async() => {
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const domain = createDomain()

  const effect = domain.createEffect()
  effect.use(used)
  effect.done.watch(usedDone)
  const event = domain.createEvent()
  expect(effect).toBeDefined()
  expect(event).toBeDefined()
  event('bar')
  await effect('foo')
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
})

describe('port', () => {
  test('port should work correctly', async() => {
    const used = jest.fn()
    const usedEff = jest.fn()
    const domain = createDomain()
    const event = domain.createEvent()
    const eff = domain.createEvent()
    event.watch(used)
    eff.watch(usedEff)
    const str$ = periodic(100)
      .scan(a => a + 1, 0)
      .take(10)

    str$.map(event).drain()
    await new Promise(rs => setTimeout(rs, 1500))
    expect(used).toHaveBeenCalledTimes(10)

    str$.map(eff).drain()
    await new Promise(rs => setTimeout(rs, 1500))
    expect(usedEff).toHaveBeenCalledTimes(10)
  })
})

it('works with most use cases', async() => {
  const fn = jest.fn()
  const timeout = createEvent()
  timeout.watch(fn)

  await periodic(300)
    .take(5)
    .observe(() => timeout())

  expect(fn).toHaveBeenCalledTimes(5)
})

test('subscription', async() => {
  const fn = jest.fn()

  const domain = createDomain()

  const eff = domain.createEffect()
  eff.use(() => {})
  expect(() => {
    from(eff).observe(fn)
  }).not.toThrow()
  const event = domain.createEvent()
  expect(() => {
    from(event).observe(fn)
  }).not.toThrow()
  await event('')
  await eff('')
  expect(fn).toHaveBeenCalledTimes(2)
})
