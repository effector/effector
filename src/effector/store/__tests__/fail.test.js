//@flow

import {createEvent, createStore, is} from 'effector'

test('store.fail is event', () => {
  const store = createStore(0)
  expect(is.event(store.fail)).toBe(true)
})

it('triggers after failed .on', () => {
  const fn = jest.fn()
  const trigger = createEvent()
  const store = createStore(0)
  store.on(trigger, () => {
    throw new Error('Unknown error')
  })
  store.fail.watch(e => fn(e))

  store.setState(1)
  expect(fn).not.toBeCalled()
  trigger()
  expect(fn).toBeCalledTimes(1)
  expect(fn.mock.calls).toMatchSnapshot()
})

it('triggers after failed .map', () => {
  const fn = jest.fn()
  const store = createStore(0)
  const mappedStore = store.map(state => {
    if (state > 5) throw new Error('Unknown error')
    return state
  })
  mappedStore.fail.watch(e => fn(e))

  store.setState(1)
  expect(fn).not.toBeCalled()
  store.setState(6)
  expect(fn).toBeCalledTimes(1)
  expect(fn.mock.calls).toMatchSnapshot()
})
