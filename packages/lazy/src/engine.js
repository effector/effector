//@flow strict

import invariant from 'invariant'
import $$observable from 'symbol-observable'
import {type Lazy, fromThunk, fromValue, readWrite} from './instance'
import {combine} from './combine'

const symbolObservable: '@@observable' = ($$observable: any)

export function createEngine<T>(
 reducer: (value: T, action: any) => T,
 defaults?: T,
 enhancer?: (
    createStore: typeof createEngine,
  ) => (reducer: (value: T, action: any) => T, preloadedState: T) => any,
) {
 //$todo
 const defaultValue: T = defaults ? defaults : reducer()
 invariant(defaultValue !== undefined, 'undefined default value')
 if (enhancer !== undefined)
  return enhancer(createEngine)(reducer, defaultValue)
 let reducerVal = reducer
 const reducer$ = fromThunk(() => reducerVal)
 let action$ = {type: '@@effector/none'}
 //  const inbox = readWrite(action$)
 const inbox$ = fromThunk(() => action$)
 let currentValue = defaultValue
 let isDispatch = false
 const subscribers: Set<() => void> = new Set()
 function subscribe(listner: () => void) {
  subscribers.add(listner)
  return {
   unsubscribe() {
    subscribers.delete(listner)
   },
  }
 }
 const state: Lazy<T> = fromThunk(() => currentValue)
 const comb = combine(state, inbox$, reducer$, (state, act, reducer) => {
  const result = reducer(state, act)
  currentValue = result
  for (const sub of subscribers) {
   sub()
  }
  return result
 })
 function replaceReducer(newReducer: typeof reducer) {
  reducerVal = newReducer
  currentValue = comb.read()
 }
 function getState() {
  return currentValue
 }
 function dispatch(value: mixed) {
  console.log('dispatch', value)
  if (value === action$) return value
  if (typeof value === 'object' && value != null) {
   if (typeof value.type === 'string') {
    // if (
    //  typeof value.meta === 'object'
    //       && value.meta != null
    //       && value.meta.passed === true
    // )
    //  return value
    isDispatch = true
    // inbox.write(value)
    action$ = value
    currentValue = comb.read()
    isDispatch = false
   }
  }
  return value
 }
 function observableState() {
  return {
   /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
   subscribe(observer: Object) {
    if (typeof observer !== 'object') {
     throw new TypeError('Expected the observer to be an object.')
    }
    // const {next}: {next(val: T): any} = observer
    // console.log('observer', observer)
    // console.log('next', next)
    const res = subscribe(() => observer.next(currentValue))
    // console.log('res', res)
    return res
   },
   [symbolObservable]() {
    return results
   },
  }
 }
 const results = {
  subscribe,
  getState,
  dispatch,
  replaceReducer,
  [symbolObservable]: observableState,
 }
 return results
}
