//@flow

import {from, periodic} from 'most'
import {
 createStore,
 createDomain,
 type Store,
 type Event,
 type Domain,
} from '..'

import warning from '@effector/warning'

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
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
  event.epic(data$ => data$.map(effect))
  await event('ev')
  expect(used).toHaveBeenCalledTimes(1)
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
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
  event.epic(data$ => data$.tap(e => console.count('eee')).map(effect))
  event('ev')
  expect(used).toHaveBeenCalledTimes(1)
  expect(usedFail).toHaveBeenCalledTimes(1)
  expect(usedDone).not.toHaveBeenCalled()
 })
 test('sync effect.use', async() => {
  const fn = jest.fn()
  const used = jest.fn(x => x)
  const usedDone = jest.fn(x => Promise.resolve(x))
  const domain = createDomain()
  const store = domain.store({foo: 'bar'})

  const effect = domain.effect('eff')
  effect.use(used)
  effect.done.watch(usedDone)
  const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
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
  const used = jest.fn((state, x) => console.log(x, state))
  const usedEff = jest.fn((state, x) => console.log(x, state))
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
 test('port errors should been catched', async() => {
  const fn = jest.fn()
  const used = jest.fn((state, x) => console.log(x, state))
  const domain = createDomain()
  const store = domain.store({foo: 'bar'})
  const event = domain.event('port-event')
  event.watch(used)
  expect(
   (async function() {
    const str$ = periodic(100)
     .scan((a, b) => a + 1, 0)
     .take(2)
     .map(n => {
      throw new Error(`port failure ${n}`)
     })
    // .map(event)
    warning(`TODO domain.port not implemented`)
    // await domain.port(str$)
    // await new Promise(rs => setTimeout(rs, 1500))
   })(),
  ).rejects.toThrowErrorMatchingSnapshot()

  expect(used).not.toHaveBeenCalled()
 })
})

test('should handle return value', async() => {
 const fn = jest.fn()
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})
 const timeout = domain.effect('timeout')
 timeout.watch(fn)
 //  domain.port(
 //   periodic(300)
 //    .take(5)
 //    .map(() => timeout()),
 //  )
 warning(`TODO domain.port not implemented`)
 await delay(2e3)
 expect(fn).toHaveBeenCalledTimes(5)
})

test('effect.fail()', async() => {
 const fn = jest.fn(() => delay(500).then(() => Promise.reject('fail!')))
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})
 const timeout = domain.effect('timeout')
 timeout.use(fn)
 expect(timeout('params').fail()).resolves.toMatchObject({
  params: 'params',
  error: 'fail!',
 })
})

test('effect.promise()', async() => {
 const fn = jest.fn(() => delay(500).then(() => Promise.reject('fail!')))
 const fn1 = jest.fn(() => delay(500).then(() => Promise.resolve('done!')))
 const domain = createDomain()
 const store = domain.store({foo: 'bar'})
 const timeout = domain.effect('timeout')
 timeout.use(fn)
 await expect(timeout('params').promise()).rejects.toMatchObject({
  params: 'params',
  error: 'fail!',
 })
 timeout.use(fn1)
 await expect(timeout('params').promise()).resolves.toMatchObject({
  params: 'params',
  result: 'done!',
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
 const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
 event.epic(data$ => data$.map(e => effect(e)))
 await event('ev')
 expect(used).toHaveBeenCalledTimes(1)
 expect(usedDone).toHaveBeenCalledTimes(1)
})

test('hot reload support', async() => {
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
 const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
 event.epic(data$ => data$.map(e => effect(e)))
 await event('ev')
 expect(used).toHaveBeenCalledTimes(1)
 expect(usedDone).toHaveBeenCalledTimes(1)

 const storeB = domain.store({foo: 'bar'})
 storeB.watch((s, x) => (fnB(x), console.log(x), s))

 //  domain.register(storeB)
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
 const event: Event<'ev', {foo: 'bar'}> = domain.event('event1')
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
 const used = jest.fn(x => console.log(x))
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
