//@flow

import {from, Stream} from 'most'
import {Act, Message} from '..'
import {fooStore, fooMessage, getSend} from './fixtures'


test('should subscribe', () => {
  const fn = jest.fn()
  const store = fooStore()
  expect(store).toBeDefined()
  const message = {type: 'FOO', payload: {} }
  const probe = {...message}
  store.subscribe(fn)
  store.dispatch(probe)
  store.dispatch(probe)
  expect(fn).toHaveBeenCalledTimes(2)
  expect(message).toEqual(probe)
  expect(store.dispatch(probe)).toBe(probe)
})

test('messages', () => {
  const fn = jest.fn()
  const store = fooStore()
  const message = fooMessage()
  expect(message({foo: 'bar'})).toBeDefined()
  expect(message({foo: 'bar'}) instanceof Act).toBe(true)
})
test(`most.from(message)`, () => {
  const action2 = fooMessage()
  const action$2 = from(action2)
  expect(action$2 instanceof Stream).toBe(true)
})
test(`no autodispatch`, () => {
  const message = fooMessage()
  const fn = jest.fn()
  const action$2 = from(message)
  action$2.observe(fn)
  message({foo: 'bar'})
  message({foo: 'bar'})
  expect(fn).not.toHaveBeenCalled()
})
test(
  `observable emits after dispatch
    from(message)`,
  () => {
    const message = fooMessage()
    const fn = jest.fn()
    const store = fooStore()
    const action$2 = from(message)
    action$2.observe(fn)
    store.dispatch(message({foo: 'bar'}))
    store.dispatch(message({foo: 'bar'}))
    message({foo: 'bar'})
    expect(fn).toHaveBeenCalledTimes(2)
  }
)

test('compatible with plain actions', () => {
  const message = new Message(
    'CONST_ACTION',
    (typeId, type, payload) => ({
      typeId, type, payload
    }),
    e => e.payload
  )
  const store = fooStore()
  const send = getSend(store)
  const act = send(message({foo: 'bar'}))
  expect(act.type).toBe('CONST_ACTION')
})

describe('can be subscribed', () => {
  test('from(message)', () => {
    const message = fooMessage()
    const fn = jest.fn()
    const store = fooStore()
    const send = getSend(store)
    const action$ = from(message)
    action$.observe(fn)
    send(message({foo: 'bar'}))
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('message.raw$()', () => {
    const message = fooMessage()
    const fn = jest.fn()
    const store = fooStore()
    const send = getSend(store)
    const action$ = message.raw$()
    action$.observe(fn)
    const act = send(message({foo: 'bar'}))
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(act)
  })
})

test('no double dispatch', () => {
  const message = fooMessage()
  const fn = jest.fn()
  const fn1 = jest.fn()
  const store = fooStore()
  const send = getSend(store)
  const action$2 = from(message)
  action$2.observe(fn)
  store.subscribe(fn1)
  const act = message({foo: 'bar'})
  send(act)
  send(act)
  send(act)
  expect(fn).toHaveBeenCalledTimes(1)
  expect(fn1).toHaveBeenCalledTimes(1)
})
