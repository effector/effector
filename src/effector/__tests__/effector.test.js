//@flow

import {from, periodic} from 'most'

import {
  combine,
  createDomain,
  createEvent,
  fromObservable,
  createStore,
  createStoreObject,
} from 'effector'

import {spy, getSpyCalls} from 'effector/fixtures'

describe('fixtures works correctly', () => {
  test('spy use', () => {
    spy()
    spy()
    expect(spy).toHaveBeenCalledTimes(2)
  })
  test('spy reuse', () => {
    spy()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

test('will run in expected order', () => {
  const reset = createEvent('reset')
  const add = createEvent('add')
  const mult = createEvent('mult')
  const listSize = createStore(3)
    .on(add, (n, nn) => n + nn)
    .on(mult, (n, q) => n * q)
    .reset(reset)

  const currentList = createStore([])
    .on(add, (list, pl) => [...list, {add: pl}])
    .on(mult, (list, pl) => [...list, {mult: pl}])
    .reset(reset)
  const selected = createStore([])

  createStoreObject({listSize, currentList, selected})

  const unsub = currentList.subscribe(state => spy(state))
  add(5)
  mult(4)
  unsub()
  // halt()

  expect(getSpyCalls()).toEqual([[[]], [[{add: 5}]], [[{add: 5}, {mult: 4}]]])
  expect(spy).toHaveBeenCalledTimes(3)
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
  const add = createEvent('add')
  const sub = createEvent('sub')
  const state1 = createStore(3)
    .on(add, (state, payload) => {
      fn1(state, payload)
    })
    .on(sub, (state, payload) => {
      fn2(state, payload)
      return state - payload
    })
  state1.watch(fn3)
  sub(1)
  add(10)
  add(2)
  expect({
    add: fn1.mock.calls,
    sub: fn2.mock.calls,
    watch: fn3.mock.calls,
    state: state1.getState(),
  }).toMatchSnapshot()
})

test('store.reset(event)', () => {
  const reset = createEvent('reset')
  const inc = createEvent('inc')
  const listSize = createStore(3)
    .on(inc, n => n + 1)
    .reset(reset)
  const currentList = createStore(
    Array.from({length: listSize.getState()}, (_, n) => n),
  )
    .on(inc, list => [...list, list.length])
    .reset(reset)
  const selected = createStore([])

  createStoreObject({listSize, currentList, selected})

  const unsub = currentList.subscribe(state => spy(state))
  inc()
  reset()
  unsub()

  expect(getSpyCalls()).toEqual([[[0, 1, 2]], [[0, 1, 2, 3]], [[0, 1, 2]]])
  expect(spy).toHaveBeenCalledTimes(3)
})

test('combine', () => {
  const inc = createEvent('inc')
  const dec = createEvent('dec')
  const s1 = createStore(0)
  const s2 = createStore(0)
  const s3 = createStore(0)
  const s4 = createStore(0)
  const result = combine(s1, s2, s3, s4, (a, b, c, d) => ({a, b, c, d}))
  result.watch(spy)
  s1.on(inc, _ => _ + 1).on(dec, _ => _ - 10)
  s2.on(inc, _ => _ + 10).on(dec, _ => _ - 1)

  expect(result.getState()).toMatchObject({a: 0, b: 0, c: 0, d: 0})

  inc()
  dec()
  expect(result.getState()).toMatchObject({a: -9, b: 9, c: 0, d: 0})

  expect(spy).toHaveBeenCalledTimes(3)
  // expect(fn).toHaveBeenCalledTimes(5)
})

test('no dull updates', () => {
  const store = createStore(false)
  const e1 = createEvent('e1')
  const e2 = createEvent('e2')
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  const fn3 = jest.fn()
  store.watch(fn1)
  store.on(e1, (_, payload): boolean => payload)
  store.on(e2, (_, p) => _ === p)
  const nextStore = store.map(x => (fn2(x), x))
  nextStore.watch(fn3)
  store.watch(e => {})
  e1(false)
  e1(true)
  e1(false)
  e2(false)
  e2(false)
  expect(fn1.mock.calls).toMatchSnapshot()
  expect(fn2.mock.calls).toMatchSnapshot()
  expect(fn3.mock.calls).toMatchSnapshot()
  expect(fn1).toHaveBeenCalledTimes(5)
  expect(fn2).toHaveBeenCalledTimes(5)
  expect(fn3).toHaveBeenCalledTimes(5)
})

test('smoke', async() => {
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const domain = createDomain('smoke')

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event = domain.event('event1')
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
    const event = domain.event('port-event')
    const eff = domain.event('port-effect')
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
  const timeout = createEvent('timeout')
  timeout.watch(spy)

  await periodic(300)
    .take(5)
    .observe(() => timeout())

  expect(spy).toHaveBeenCalledTimes(5)
})

test.skip('fromObservable supports own events as sources', async() => {
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const domain = createDomain()

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event = domain.event('event1')
  fromObservable/*:: <string> */(event).watch(e => effect(e))
  await event('ev')
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
})

test('subscription', async() => {
  const domain = createDomain()

  const eff = domain.effect('TYPE_CONST')
  eff.use(() => {})
  expect(() => {
    from(eff).observe(spy)
  }).not.toThrow()
  const event = domain.event('ev')
  expect(() => {
    from(event).observe(spy)
  }).not.toThrow()
  await event('')
  await eff('')
  expect(spy).toHaveBeenCalledTimes(2)
})
