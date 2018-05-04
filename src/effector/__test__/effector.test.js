//@flow

import { from, periodic } from 'most'

import {
 createStore,
 createDomain,
 createEffect,
 createEvent,
 combine,
 createStoreObject,
 type Store,
 type Event,
 type Domain,
} from '..'

import {readKind} from '../../kind'

import warning from '../../warning'

test('kind typechecks', () => {
 expect(readKind(createStore(0))).toBe('store')
 expect(readKind(createEvent('foo'))).toBe('event')
 expect(readKind(createEffect('foo'))).toBe('effect')
 expect(readKind()).toBe('none')
 expect(readKind(null)).toBe('none')
 expect(readKind('foo')).toBe('none')
})

test('store.reset(event)', () => {
 const fn = jest.fn()
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

 const fullStore = createStoreObject({listSize, currentList, selected})

 const unsub = currentList.subscribe((state) => fn(state))
 inc()
 reset()
 unsub()

 expect(fn.mock.calls).toEqual([[[0, 1, 2]], [[0, 1, 2, 3]], [[0, 1, 2]]])
 expect(fn).toHaveBeenCalledTimes(3)
})

test('combine', () => {
 const fn = jest.fn()
 const inc = createEvent('inc')
 const dec = createEvent('dec')
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
 console.log(result.getState(), fn.mock.calls)
 //TODO call only twice
 expect(fn).not.toHaveBeenCalledTimes(2)
 expect(fn).toHaveBeenCalledTimes(4)
})

test('smoke', async() => {
 const fn = jest.fn()
 const used = jest.fn(x => Promise.resolve(x))
 const usedDone = jest.fn(x => Promise.resolve(x))
 const domain = createDomain('smoke')
 const store = domain.store({foo: 'bar'})

 const effect = domain.effect('eff')
 effect.use(used)
 effect.done.watch(usedDone)
 const event = domain.event('event1')
 console.log(effect)
 console.log(event)
 expect(effect).toBeDefined()
 expect(event).toBeDefined()
 event('bar')
 await effect('foo').done()
 expect(used).toHaveBeenCalledTimes(1)
 expect(usedDone).toHaveBeenCalledTimes(1)
})

describe('epic', () => {
 test('epic.done() should work', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const domain = createDomain()
  const store = domain.store({foo: 'bar'})
  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event = domain.event('event1')
  event.epic(data$ => data$.map(effect))
  await event('ev')
  // expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
 })

 test('epic.fail() should work', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.reject(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const usedFail = jest.fn(x => Promise.resolve(x))
  const domain = createDomain()
  const store = domain.store({foo: 'bar'})

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  effect.fail.watch(usedFail)
  const event = domain.event('event1')
  event.epic(data$ => data$.tap(e => console.count('eee')).map(effect))
  event('ev')
  expect(used).toHaveBeenCalledTimes(1)
  //expect(usedFail).toHaveBeenCalledTimes(1)
  expect(usedDone).not.toHaveBeenCalled()
 })
 test('sync effect.use', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => Promise.resolve(x))
  const usedDone = jest.fn(x => Promise.resolve(x))
  const domain = createDomain()
  const store = domain.store({foo: 'bar'})

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event = domain.event('event1')
  event.epic(data$ => data$.map(effect))
  await event('ev')
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedDone).toHaveBeenCalledTimes(1)
 })
 //  test('epic.trigger should work', async() => {
 //   const fn = jest.fn()
 //   const fnTrig = jest.fn(x => 'ev trigger')
 //   const used = jest.fn(x => Promise.resolve(x))
 //   const usedDone = jest.fn(x => Promise.resolve(x))
 //   const domain = createDomain()
 //   const store = domain.store({foo: 'bar'})

 //   const effect = domain.effect('eff')
 //   effect.use(used)
 //   effect.done.watch(usedDone)
 //   const event = effect.trigger(fnTrig)
 //   await event()
 //   expect(used).toHaveBeenCalledTimes(1)
 //   expect(usedDone).toHaveBeenCalledTimes(1)
 //  })
})

//TODO Add port throws handling
describe('port', () => {
 test('port should work correctly', async() => {
  const fn = jest.fn()
  const used = jest.fn(state => console.log(state))
  const usedEff = jest.fn(state => console.log(state))
  const domain = createDomain()
  const store = domain.store({foo: 'bar'})
  const event = domain.event('port-event')
  const eff = domain.event('port-effect')
  event.watch(used)
  eff.watch(usedEff)
  const str$ = periodic(100)
   .scan((a, b) => a + 1, 0)
   .take(10)

  // .map(event)

  str$.map(event).drain()
  await new Promise(rs => setTimeout(rs, 1500))
  expect(used).toHaveBeenCalledTimes(10)

  str$.map(eff).drain()
  await new Promise(rs => setTimeout(rs, 1500))
  expect(usedEff).toHaveBeenCalledTimes(10)
 })
})

test('should handle return value', async() => {
 const fn = jest.fn()
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})
 const timeout = domain.effect('timeout')
 timeout.watch(fn)
 //  domain.port(
 await periodic(300)
  .take(5)
  .observe(() => timeout())

 expect(fn).toHaveBeenCalledTimes(5)
})

test('effect.fail()', async() => {
 const fn = jest.fn(() => delay(500).then(() => Promise.reject('fail!')))
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})
 const timeout = domain.effect('timeout')
 timeout.use(fn)
 expect(timeout('params').fail()).resolves.toMatch('fail!')
})

test('effect.promise()', async() => {
 function delay(time: number) {
  return new Promise(rs => setTimeout(rs, time))
 }
 const fn = () =>
  delay(500).then(() => {
   throw 'fail!'
  })
 const fn1 = () => delay(500).then(() => 'done!')
 const timeout = createEffect('timeout')

 //  timeout.use(fn)
 //  await timeout('params fail')
 //   .promise()
 //   .catch(err => {
 //    console.warn(err)
 //    expect(err).toBe('fail!')
 //   })
 timeout.use(fn1)
 await timeout('params done')
  .promise()
  .then(res => {
   expect(res).toBe('done!')
  })
})

test.skip('should handle watcher`s errors', async() => {
 const fn = jest.fn(e => {
  throw new Error('Oops')
 })
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})
 const timeout = domain.effect('timeout')
 timeout.watch(fn)
 warning(`TODO domain.port not implemented`)
 //  domain.port(
 //   periodic(300)
 //    .take(5)
 //    .map(() => timeout()),
 //  )
 await delay(2e3)
 expect(fn).toHaveBeenCalledTimes(5)
})

test('both return and send', async() => {
 const fn = jest.fn()
 const used = jest.fn(x => Promise.resolve(x))
 const usedDone = jest.fn(x => Promise.resolve(x))
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})

 const effect = domain.effect('eff')
 effect.use(used)
 effect.done.watch(usedDone)
 const event = domain.event('event1')
 event.epic(data$ => data$.map(e => effect(e)))
 await event('ev')
 expect(used).toHaveBeenCalledTimes(1)
 expect(usedDone).toHaveBeenCalledTimes(1)
})

//TODO WTF?
test.skip('hot reload support', async() => {
 // const fn = jest.fn()
 const fnA = jest.fn()
 const fnB = jest.fn()
 const used = jest.fn(x => Promise.resolve(x))
 const usedDone = jest.fn(x => Promise.resolve(x))
 const domain = createDomain()
 const storeA = domain.store({foo: 'bar'})
 storeA.watch((s, x) => (fnA(x), console.log(x), s))

 const effect = domain.effect('eff')
 effect.use(used)
 effect.done.watch(usedDone)
 const event = domain.event('event1')
 event.epic(data$ => data$.map(e => effect(e)))
 await event('ev')
 expect(used).toHaveBeenCalledTimes(1)
 expect(usedDone).toHaveBeenCalledTimes(1)

 const storeB = domain.store({foo: 'bar'})
 storeB.watch((s, x) => (fnB(x), console.log(x), s))

 await event('ev')
 expect(used).toHaveBeenCalledTimes(2)
 expect(usedDone).toHaveBeenCalledTimes(2)
 expect(fnA).toHaveBeenCalledTimes(5)
 expect(fnB).toHaveBeenCalledTimes(4)
})

test('only return', async() => {
 const fn = jest.fn()
 const used = jest.fn(x => Promise.resolve(x))
 const usedDone = jest.fn(x => Promise.resolve(x))
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})

 const effect = domain.effect('eff')
 effect.use(used)
 effect.done.watch(usedDone)
 const event = domain.event('event1')
 event.epic(data$ => data$.map(e => effect(e)))
 await event('ev')
 expect(used).toHaveBeenCalledTimes(1)
 expect(usedDone).toHaveBeenCalledTimes(1)
})
/*
test('typeConstant', async() => {
 const fn = jest.fn()
 const used = jest.fn((x: string) => console.log(x))
 const respFn = jest.fn(x => console.log(x))
 const domain = createDomain('with-prefix')
 const store = domain.store({foo: 'bar'})
 const event = domain.typeConstant('TYPE_CONST')
 const eventResp = domain.typeConstant('RESP')
 eventResp.watch(respFn)
 expect(event.getType()).toBe('TYPE_CONST')
 event.epic(data$ =>
  data$.map(e => {
   used(e)
   return eventResp(e)
  }),
 )

 log`type constant's event`(event)
 store.dispatch({type: 'TYPE_CONST', payload: 'raw'})
 expect(event('test')).toMatchObject({type: 'TYPE_CONST', payload: 'test'})
 expect(event).toBeDefined()
 await event('run')
 await delay(500)
 expect(respFn).toHaveBeenCalledTimes(2)
 expect(used).toHaveBeenCalledTimes(2)
 expect(used.mock.calls).toMatchObject(
  //$ off
  [['raw'], ['run']],
 )
})
*/
test('subscription', async() => {
 const fn = jest.fn()
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})

 const eff = domain.effect('TYPE_CONST')
 expect(() => {
  from(eff).observe(fn)
 }).not.toThrow()
 const event = domain.event('ev')
 expect(() => {
  from(event).observe(fn)
 }).not.toThrow()
 await event('')
 await eff('')
 expect(fn).toHaveBeenCalledTimes(2)
})

function delay(time: number) {
 return new Promise(rs => setTimeout(rs, time))
}

const log = (tags = ['']) => (e, ...data) => {
 const tagList: string[] = Array.isArray(tags) ? tags : [tags]
 console.log(...tagList, e, ...data)
 return e
}
