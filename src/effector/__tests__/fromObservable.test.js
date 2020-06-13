//@flow
//$off
import * as redux from 'redux'
import {fromObservable, createEvent, createStore, createEffect} from 'effector'

it('works with typical Symbol.observable library: redux', () => {
  const fn = jest.fn()
  const reduxStore = redux.createStore((state = 1, action) => {
    switch (action.type) {
      case 'inc':
        return state + 1
      default:
        return state
    }
  })
  const effectorEvent = fromObservable(reduxStore)
  effectorEvent.watch(e => {
    fn(e)
  })
  reduxStore.dispatch({type: 'inc'})
  expect(fn.mock.calls).toEqual([[2]])
})

describe('works with itself', () => {
  test('event support', () => {
    const fn = jest.fn()
    const trigger = createEvent()
    const target = fromObservable(trigger)
    target.watch(fn)
    trigger()
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('effect support', async () => {
    const fn = jest.fn()
    const trigger = createEffect({
      handler() {},
    })
    const target = fromObservable(trigger)
    target.watch(fn)
    await trigger()
    expect(fn).toHaveBeenCalledTimes(1)
  })
  test('store support', () => {
    const fn = jest.fn()
    const trigger = createEvent()
    const store = createStore(0).on(trigger, x => x + 1)
    const target = fromObservable(store)
    target.watch(fn)
    trigger()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
