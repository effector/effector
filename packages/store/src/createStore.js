//@flow

import invariant from 'invariant'
import type {ComponentType, Node} from 'react'
import $$observable from 'symbol-observable'

import warning from '@effector/warning'
import {INIT, REPLACE} from './actionTypes'

import {applyMiddleware} from './applyMiddleware'

function isAction(value: mixed): boolean %checks {
 return (
  typeof value === 'object' && value !== null && typeof value.type === 'string'
 )
}

export type Nest = {
 get(): any,
 set(state: any, action: any): any,
}
let id = 0
function storeConstructor(props) {
 const currentId = (++id).toString(36)
 let currentListeners = []
 let isDispatching = false
 let {currentReducer, currentState} = props
 let nextListeners = currentListeners
 const nests = getNested(currentState)
 nests
  .add({
   get() {
    return getState()
   },
   set(state, action) {
    return currentReducer(state, action)
   },
  })
  .add({
   get() {
    return getState()
   },
   set(state, action) {
    if (!isAction(action)) return state
    if (action.type === `set state ${currentId}`) {
     return action.payload
    }
    return state
   },
  })
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
  console.log(currentState, typeof currentState)
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
   console.count('dispatch')
   console.log(action)
   currentState = setNested(currentState, action, nests)
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
     typeof observer === 'object' && observer !== null,
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
 //TODO Implement reset
 function reset() {
  warning('store.reset is not implemented yet')
 }
 //TODO Implement on
 function on(event: any, handler: Function) {
  event.to(store, handler)
  return store
 }

 function withProps(fn: Function) {
  return props => fn(getState(), props)
 }
 //TODO Implement map
 function map(fn: Function) {
  warning('store.map is not implemented yet')
  return store
 }
 //TODO Implement to
 function to(fn: Function) {
  warning('store.to is not implemented yet')
  // return store
 }
 //TODO Implement epic
 function epic(fn: Function) {
  warning('store.epic is not implemented yet')
  return store
 }
 function setState(value) {
  if (value === currentState) return
  dispatch({type: `set state ${currentId}`, payload: value})
 }

 dispatch({type: INIT})

 const store = {
  /*::kind(){return 'store'},*/
  id: currentId,
  withProps,
  setState,
  dispatch,
  map,
  on,
  to,
  epic,
  subscribe,
  getState,
  replaceReducer,
  reset,
  //$off
  [$$observable]: observable,
 }
 Object.defineProperty(store, 'kind', {
  writable: true,
  configurable: true,
  value() {
   return 'store'
  },
 })

 return store
}

function duckTypeStore(value: mixed): boolean %checks {
 return (
  typeof value === 'object'
  && value !== null
  && typeof value.getState === 'function'
 )
}

function mergeNested(preloadedState) {
 if (typeof preloadedState !== 'object' || preloadedState === null) return
 for (const [key, value] of Object.entries(preloadedState)) {
  if (duckTypeStore(value)) {
   console.log(`derived state`, key, value)
  }
 }
}

export function createStore<T>(
 preloadedStateRaw?: T,
 reducer: Function = _ => _,
 enhancerRaw: Function | Function[],
) {
 let enhancer = enhancerRaw
 let preloadedState = preloadedStateRaw
 mergeNested(preloadedState)
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

function setNested(initialState, action: any, nests: Set<Nest>) {
 let currentState = initialState
 for (const nest of nests) {
  currentState = nest.set(currentState, action)
 }
 return currentState
}
function nest(value: any, key): Nest {
 return {
  get() {
   return value.getState()
  },
  set(state, action) {
   value.dispatch(action)
   state[key] = value.getState()
   return state
  },
 }
}
function getNested(initialState) {
 const nests: Set<Nest> = new Set()
 if (typeof initialState !== 'object' || initialState === null) return nests
 for (const [key, value] of Object.entries({...initialState})) {
  if (duckTypeStore(value)) {
   nests.add(nest(value, key))
   //$todo
   initialState[key] = value.getState()
  }
 }
 return nests
}
