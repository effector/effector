//@flow
import {either} from 'fp-ts'

// import {from, Stream} from 'most'
import {Effect} from '..'
import {delay, fooStore, fooAsyncAction, getSend} from './fixtures'

test('Effect smoke', () => {
  const store = fooStore()
  const send = getSend(store)
  const asyncAct = fooAsyncAction()
  expect(asyncAct).toBeDefined()
  expect(asyncAct({foo: 'bar'})).toBeDefined()
  expect(send(asyncAct({foo: 'bar'}))).toBeDefined()
  logs: {
    console.log(asyncAct)
    console.log(asyncAct({foo: 'bar'}))
    console.log(send(asyncAct({foo: 'bar'})))
  }
})
function cleanActionLog([unused, ...actionLog]) {
  return actionLog.map(([x]) => x)
}
test('execution correctness', async() => {
  const fn = jest.fn()
  const store = fooStore(fn)
  const send = getSend(store)
  const message = fooAsyncAction()
  expect(fn.mock.calls).toHaveLength(1)
  send(message({foo: 'bar', meta: 'first'}))
  send(message({foo: 'bar', meta: 'second'}))
  send(message({foo: 'bar', meta: 'third'}))
  await delay({}, 2e3)
  const actionLog = cleanActionLog(fn.mock.calls)
  expect(actionLog).toHaveLength(6)
  logs: {
    console.log(actionLog)
  }
})
test('dispatch only to one store', async() => {
  const fn = jest.fn()
  const fnB = jest.fn()
  const store = fooStore(fn)
  const storeB = fooStore(fnB)
  const send = getSend(store)
  const sendB = getSend(storeB)
  const message = fooAsyncAction()
  const act = message({foo: 'bar'})
  const actPure = send(act)
  console.log(await send(message({foo: 'bar'})).done())
  expect(act).not.toBe(actPure)
  expect(actPure).toHaveProperty('storeId')
  const {storeId} = actPure
  const actResended = sendB(actPure)
  expect(actResended).toBe(actPure)
  expect(actResended).toHaveProperty('storeId', storeId)
  message({foo: 'bar'}).done()
  await delay({}, 1e3)
  console.log(cleanActionLog(fnB.mock.calls))
  expect(fn).toHaveBeenCalledTimes(5)
  expect(fnB).toHaveBeenCalledTimes(1)
  logs: {
    console.log(actPure, Object.getPrototypeOf(actPure))
  }
})
test('await action().fail()', async() => {
  const fn = jest.fn()
  const store = fooStore(fn)
  const send = getSend(store)
  const action: Effect<{foo: 'fail'}, void, 'fail'> =
    new Effect('will reject')
  action.serve(
    e => delay(e.foo, 500).then(
      foo => Promise.reject(foo)
    )
  )
  const failed = await send(action({foo: 'fail'})).fail()
  expect(failed).toMatchObject({
    params: {foo: 'fail'},
    error : 'fail',
  })
  await expect(send(action({foo: 'fail'})).promise())
    .rejects.toMatchObject({
      params: {foo: 'fail'},
      error : 'fail',
    })
})
test('await action().done()', async() => {
  const fn = jest.fn()
  const store = fooStore(fn)
  const send = getSend(store)
  const message = fooAsyncAction()
  await expect(send(message({foo: 'bar', meta: 'first'})).done())
    .resolves.toMatchObject({
      params: {foo: 'bar', meta: 'first'},
      result: 'bar',
    })
})
test('await action().either()', async() => {
  const fn = jest.fn()
  const store = fooStore(fn)
  const send = getSend(store)
  const message = fooAsyncAction()
  const actionFail: Effect<{foo: 'fail'}, void, 'fail'> =
    new Effect('will reject')
  actionFail.serve(
    e => delay(e.foo, 500).then(
      foo => Promise.reject(foo)
    )
  )
  await expect(send(message({foo: 'bar', meta: 'first'})).either())
    .resolves.toMatchObject(either.right({
      params: {foo: 'bar', meta: 'first'},
      result: 'bar',
    }))
  await expect(send(actionFail({foo: 'fail'})).either())
    .resolves.toMatchObject(either.left({
      params: {foo: 'fail'},
      error : 'fail',
    }))
})
test('await action().promise()', async() => {
  const fn = jest.fn()
  const store = fooStore(fn)
  const send = getSend(store)
  const message = fooAsyncAction()
  const actionFail: Effect<{foo: 'fail'}, void, 'fail'> =
    new Effect('will reject')
  actionFail.serve(
    e => delay(e.foo, 500).then(
      foo => Promise.reject(foo)
    )
  )
  await expect(send(message({foo: 'bar'})).promise())
    .resolves.toMatchObject({
      params: {foo: 'bar'},
      result: 'bar',
    })
  await expect(send(actionFail({foo: 'fail'})).promise())
    .rejects.toMatchObject({
      params: {foo: 'fail'},
      error : 'fail',
    })
})
