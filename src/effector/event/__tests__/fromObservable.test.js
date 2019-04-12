//@flow
//$off
import * as redux from 'redux'
import {fromObservable} from '../fromObservable'

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
