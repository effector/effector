//@flow

import {createStore, is} from 'effector'

test('store.updates is event', () => {
  const store = createStore(0)
  expect(is.event(store.updates)).toBe(true)
})

it('triggers after each store update', () => {
  const fn = jest.fn()
  const store = createStore(0)
  store.updates.watch(e => fn(e))

  /*
    unlike store.watch, store.updates.watch will not been called immediately
  */
  expect(fn).not.toBeCalled()
  store.setState(1)
  expect(fn).toBeCalledTimes(1)
  store.setState(1) // state will not change, as store.getState() === 1
  expect(fn).toBeCalledTimes(1)
})
