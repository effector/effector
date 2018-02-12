//@flow

// import {from, Stream} from 'most'
import {Effect} from '..'
// import {delay, fooStore, fooAsyncAction, getSend} from './fixtures'
import {getStore, createReducer, Store} from '..'
const delay = (time) => new Promise(rs => setTimeout(rs, time))
const createStore = (name, fn = jest.fn()) => getStore(
  name, (state: void, pl): void => (fn(pl), state))

test('Effect smoke', () => {
  const store = createStore('Effect smoke')
  const asyncAct = store.effect('some eff')
  expect(asyncAct).toBeDefined()
  expect(asyncAct({foo: 'bar'})).toBeDefined()
})
function cleanActionLog([unused, ...actionLog]) {
  return actionLog.map(([x]) => x)
}
test('execution correctness', async() => {
  const fn = jest.fn()
  const store = createStore('execution correctness', fn)
  const message = store.effect('message')
  message.use(() => Promise.resolve('ok'))
  expect(fn.mock.calls).toHaveLength(1)
  const result = await message({foo: 'bar', meta: 'first'}).done()
  await message({foo: 'bar', meta: 'second'}).send()
  await message({foo: 'bar', meta: 'third'}).send()
  const actionLog = cleanActionLog(fn.mock.calls)
  expect(actionLog).toHaveLength(6)
  expect(result).toMatchObject({
    params: {foo: 'bar', meta: 'first'},
    result: 'ok',
  })
  message.use(() => Promise.reject('not ok'))
  const error = await message({foo: 'bar', meta: 'fourth'}).fail()
  expect(error).toMatchObject({
    params: {foo: 'bar', meta: 'fourth'},
    error: 'not ok',
  })
})
// test('dispatch only to one store', async() => {
//   const fn = jest.fn()
//   const fnB = jest.fn()
//   const store = createStore('dispatch store A', fn)
//   const storeB = createStore('dispatch store B', fnB)
//   const message = fooAsyncAction()
//   const act = message({foo: 'bar'})
//   const actPure = send(act)
//   console.log(await send(message({foo: 'bar'})).done())
//   expect(act).not.toBe(actPure)
//   expect(actPure).toHaveProperty('storeId')
//   const {storeId} = actPure
//   const actResended = sendB(actPure)
//   expect(actResended).toBe(actPure)
//   expect(actResended).toHaveProperty('storeId', storeId)
//   message({foo: 'bar'}).done()
//   await delay(1e3)
//   console.log(cleanActionLog(fnB.mock.calls))
//   expect(fn).toHaveBeenCalledTimes(5)
//   expect(fnB).toHaveBeenCalledTimes(1)
//   logs: {
//     console.log(actPure, Object.getPrototypeOf(actPure))
//   }
// })
test('await action().fail()', async() => {
  const fn = jest.fn()
  const store = createStore('action().fail()', fn)
  const action: Effect<{foo: 'fail'}, void, 'fail'> =
    store.effect('will reject')
  action.use(
    e => delay(500).then(
      () => Promise.reject(e.foo)
    )
  )
  const failed = await action({foo: 'fail'}).fail()
  expect(failed).toMatchObject({
    params: {foo: 'fail'},
    error : 'fail',
  })
  // await expect(action({foo: 'fail'}).promise())
  //   .rejects.toMatchObject({
  //     params: {foo: 'fail'},
  //     error : 'fail',
  //   })
})
// test('await action().done()', async() => {
//   const fn = jest.fn()
//   const store = fooStore(fn)
//   const send = getSend(store)
//   const message = fooAsyncAction()
//   await expect(send(message({foo: 'bar', meta: 'first'})).done())
//     .resolves.toMatchObject({
//       params: {foo: 'bar', meta: 'first'},
//       result: 'bar',
//     })
// })
// test('await action().either()', async() => {
//   const fn = jest.fn()
//   const store = fooStore(fn)
//   const send = getSend(store)
//   const message = fooAsyncAction()
//   const actionFail: Effect<{foo: 'fail'}, void, 'fail'> =
//     new Effect('will reject')
//   actionFail.serve(
//     e => delay(500).then(
//       () => Promise.reject(e.foo)
//     )
//   )
//   await expect(send(message({foo: 'bar', meta: 'first'})).either())
//     .resolves.toMatchObject(either.right({
//       params: {foo: 'bar', meta: 'first'},
//       result: 'bar',
//     }))
//   await expect(send(actionFail({foo: 'fail'})).either())
//     .resolves.toMatchObject(either.left({
//       params: {foo: 'fail'},
//       error : 'fail',
//     }))
// })
// test('await action().promise()', async() => {
//   const fn = jest.fn()
//   const store = fooStore(fn)
//   const send = getSend(store)
//   const message = fooAsyncAction()
//   const actionFail: Effect<{foo: 'fail'}, void, 'fail'> =
//     new Effect('will reject')
//   actionFail.serve(
//     e => delay(500).then(
//       () => Promise.reject(e.foo)
//     )
//   )
//   await expect(send(message({foo: 'bar'})).promise())
//     .resolves.toMatchObject({
//       params: {foo: 'bar'},
//       result: 'bar',
//     })
//   await expect(send(actionFail({foo: 'fail'})).promise())
//     .rejects.toMatchObject({
//       params: {foo: 'fail'},
//       error : 'fail',
//     })
// })
