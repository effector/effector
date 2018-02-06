//@flow

// import type {Stream} from 'most'
// import {createStore, applyMiddleware, combineReducers, type Middleware, type Store, type Reducer} from 'redux'

import {getStore} from '..'

test('create store', () => {
  const store = getStore('ok', (state, pl) => state)
  console.log(store)
  expect(store).toBeDefined()
  const event1 = store.event('event1')
  expect(event1).toBeDefined()
  const act = event1({foo: 'bar'})
})

describe('getType', () => {
  test('event', () => {
    const store = getStore('getTypeStore', (state, pl) => state)
    const event1 = store.event('event1')
    expect(event1.getType()).toBe('getTypeStore/event1')
    const act = event1('foo')
    expect(act.type).toBe(event1.getType())
  })
  test('effect', async() => {
    const fn = jest.fn()
    const fnEvent = jest.fn()
    const store = getStore('getTypeStore', (state, pl) => (fn(pl), state))
    store.update$
      .map(({data}) => data)
      .observe(fnEvent)
    const effect1 = store.effect('effect1')
    const fromUse = effect1.use((foo: 'foo') => Promise.resolve(foo))
    expect(fromUse).not.toBe(effect1)
    console.log(fromUse)
    console.log(effect1)
    expect(effect1.getType()).toBe('getTypeStore/effect1')
    effect1('foo')
    await effect1('foo').done()
    effect1.use((foo: 'foo') => Promise.reject(foo))
    await effect1('foo').fail()
    expect(fnEvent.mock.calls).toHaveLength(4)
    const [run1, done, run2, fail] = unwrapActions(fnEvent.mock.calls)
    expect(run1.type).toBe('getTypeStore/effect1')
    expect(run2.type).toBe('getTypeStore/effect1')
    expect(done.type).toBe('getTypeStore/effect1 done')
    expect(fail.type).toBe('getTypeStore/effect1 fail')
  })
})

function unwrapActions<T>(actionLog: $ReadOnlyArray<[T]>): T[] {
  return actionLog.map(([x]) => x)
}

function cleanActionLog([unused, ...actionLog]) {
  return unwrapActions(actionLog)
}

test('execution correctness', async() => {
  const fn = jest.fn()
  const fnEpic = jest.fn()
  const fnEpicDone = jest.fn()
  const store = getStore('ok', (state, pl) => (fn(pl), state))
  const send = store.dispatch
  const message = store.effect('eff1')
  const event = store.event('evn1')
  const act1 = message({foo: 'bar', meta: 'first'})
  expect(cleanActionLog(fn.mock.calls)).toHaveLength(0)
  expect(act1).toBeDefined()
  const prom = act1.done()
  await act1.dispatched()
  expect(cleanActionLog(fn.mock.calls)).toHaveLength(1)
  send(act1)
  expect(prom instanceof Promise).toBeTruthy()
  expect(cleanActionLog(fn.mock.calls)).toHaveLength(1)
  message.epic(
    (data$) => data$.map(
      ({data}) => event({...data, evt: true})
    )
      .tap(fnEpic)
  )
  message.done.epic(
    data$ => data$.map(
      ({data}) => fnEpicDone(data)
    )
  )
  send(message({foo: 'bar', meta: 'first'}))
  send(message({foo: 'bar', meta: 'second'}))
  await send(message({foo: 'bar', meta: 'third'})).dispatched()
  expect(fnEpic.mock.calls).toHaveLength(3)
  // await delay({}, 2e3)
  // const actionLog = cleanActionLog(fn.mock.calls)
  // expect(actionLog).toHaveLength(6)
  // logs: {
  //   console.log(actionLog)
  // }
})
