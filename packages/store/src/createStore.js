//@flow

import invariant from 'invariant'
import $$observable from 'symbol-observable'

import {INIT, REPLACE} from './actionTypes'

import {applyMiddleware} from './applyMiddleware'

export type Store<T> = {
 subscribe(listner: () => void): () => void,
 replaceReducer(
  transform: (input: (_: T, p: any) => T) => (_: T, p: any) => T,
 ): void,
 getState(): T,
 dispatch(action: any): any,
}

function storeConstructor(props) {
 let currentListeners = []
 let isDispatching = false
 let {currentReducer, currentState} = props
 let nextListeners = currentListeners
 function ensureCanMutateNextListeners() {
  if (nextListeners === currentListeners) {
   nextListeners = currentListeners.slice()
  }
 }

 function getState() {
  invariant(
   !isDispatching,
   'You may not call store.getState() while the reducer is executing. ' +
    'The reducer has already received the state as an argument. ' +
    'Pass it down from the top reducer instead of reading it from the store.',
  )

  return currentState
 }

 function subscribe(listener) {
  invariant(
   typeof listener === 'function',
   'Expected the listener to be a function.',
  )
  invariant(
   !isDispatching,
   'You may not call store.subscribe() while the reducer is executing. ' +
    'If you would like to be notified after the store has been updated, subscribe from a ' +
    'component and invoke store.getState() in the callback to access the latest state',
  )

  let isSubscribed = true

  ensureCanMutateNextListeners()
  nextListeners.push(listener)

  return function unsubscribe() {
   if (!isSubscribed) {
    return
   }
   invariant(
    !isDispatching,
    'You may not unsubscribe from a store listener while the reducer is executing',
   )

   isSubscribed = false

   ensureCanMutateNextListeners()
   const index = nextListeners.indexOf(listener)
   nextListeners.splice(index, 1)
  }
 }

 function dispatch(action) {
  invariant(
   typeof action.type !== 'undefined',
   'Actions may not have an undefined "type" property.',
  )

  invariant(!isDispatching, 'Reducers may not dispatch actions.')

  try {
   isDispatching = true
   currentState = currentReducer(currentState, action)
  } finally {
   isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
   const listener = listeners[i]
   listener()
  }

  return action
 }

 function replaceReducer(nextReducer) {
  invariant(
   typeof nextReducer === 'function',
   'Expected the nextReducer to be a function.',
  )

  currentReducer = nextReducer
  dispatch({type: REPLACE})
 }

 function observable() {
  const outerSubscribe = subscribe
  return {
   subscribe(observer) {
    invariant(
     typeof observer === 'object' && observer != null,
     'Expected the observer to be an object.',
    )

    function observeState() {
     if (observer.next) {
      observer.next(getState())
     }
    }

    observeState()
    const unsubscribe = outerSubscribe(observeState)
    return {unsubscribe}
   },
   //$off
   [$$observable]() {
    return this
   },
  }
 }

 dispatch({type: INIT})

 return {
  dispatch,
  subscribe,
  getState,
  replaceReducer,
  //$off
  [$$observable]: observable,
 }
}

export function createStore<T>(
 reducer: Function,
 preloadedStateRaw?: T,
 enhancerRaw: Function | Function[],
) {
 let enhancer = enhancerRaw
 let preloadedState = preloadedStateRaw
 if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  enhancer = preloadedState
  preloadedState = undefined
 }

 if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
   invariant(Array.isArray(enhancer), 'Expected the enhancer to be a function')
   enhancer = applyMiddleware(...enhancer)
  }

  return enhancer(createStore)(reducer, preloadedState)
 }
 invariant(
  typeof reducer === 'function',
  'Expected the reducer to be a function',
 )

 return storeConstructor({
  currentReducer: reducer,
  currentState: preloadedState,
 })
}
