//@flow

import type {Stream} from 'most'
import {createStore, applyMiddleware, combineReducers, type Middleware, type Store, type Reducer} from 'redux'

import {actionFabric, type Action} from '../action'

import {getStore} from '..'

test.skip('example', () => {
  type PayloadA = {
    result: 'foo',
    value: string[],
  }
  type PayloadB = {
    result: string,
    value: 'action B',
  }

  type State = {
    fieldA: {
      label: 'A',
      value: string[],
    },
    fieldB: {
      label: string,
      value: 'foo',
    },
  }

  function epic(
    data$: Stream<PayloadA>,
    state$: Stream<State>
  ) {
    return data$.combine(
      (data, state) => ({
        data, state
      }),
      state$
    )
  }

  expect(epic).toBeDefined()
})

test.skip('action should be thennable', async() => {
  //$off
  const actionType: any = actionFabric('type1', 1)
  const action: Action<'foo'> = actionType('foo')
  setTimeout(
    () => action.channel.next(),
    1e3
  )
  const result: 'foo' = await action.push()
  expect(result).toBe('foo')
})

test('create store', () => {
  const store = getStore('ok', (state, pl) => state)
  expect(store).toBeDefined()
  const event1 = store.event('event1')
  expect(event1).toBeDefined()
  const act = event1({foo: 'bar'})
})

describe('getType', () => {
  const store = getStore('getTypeStore', (state, pl) => state)
  console.log(store, store.scope, ...store.scope())
  test('event', () => {
    const event1 = store.event('event1')
    expect(event1.getType()).toBe('getTypeStore/event1')
    const act = event1('foo')
    expect(act.type).toBe(event1.getType())
  })
  test('effect', () => {
    const effect1 = store.effect('effect1')
    expect(effect1.getType()).toBe('getTypeStore/effect1')
  })
})

function cleanActionLog([unused, ...actionLog]) {
  return actionLog.map(([x]) => x)
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
