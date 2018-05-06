//@flow

import invariant from 'invariant'
// import type {ComponentType, Node} from 'react'
import {from} from 'most'
import $$observable from 'symbol-observable'
import {
 atom,
 struct,
 lens,
 atomically,
 type Atom,
 type Derivable,
} from '../derive'
import {INIT, REPLACE} from './actionTypes'
import {applyMiddleware} from './applyMiddleware'
import type {Event} from '..'

import * as Kind from '../kind'
import warning from '../warning'
import {setProperty} from '../setProperty'

export type Nest = {
 get(): any,
 set(state: any, action: any): any,
}
let id = 0
export function createLiteStore(state: any) {
 return storeConstructor({currentReducer: _ => _, currentState: state})
}
function storeConstructor<State>(props) {
 const currentId = (++id).toString(36)
 let {currentReducer, currentState} = props
 const privateStruct: Derivable<State> = (struct(currentState): any)
 let storeSeq = 0
 const defaultState = privateStruct.get()
 const privateAtom: Atom<{state: State, seq: number}> = atom({
  state: defaultState,
  seq: storeSeq,
 })
 function forceSet(state: State) {
  privateAtom.set({state, seq: ++storeSeq})
 }
 const privateLens = lens({
  get() {
   return privateAtom.get().state
  },
  set(value) {
   const oldValue = privateAtom.get().state

   if (oldValue !== value) {
    forceSet(value)
   }
  },
 })
 let oldPrivateStruct = defaultState
 privateStruct.react(state => {
  if (state === oldPrivateStruct || privateLens.get() === state) {
   oldPrivateStruct = state
   return
  }
  oldPrivateStruct = state
  privateLens.set(state)
 })

 const stateAtom = privateLens
 const store = {
  kind: Kind.STORE,
  id: currentId,
  withProps,
  setState,
  dispatch,
  map,
  on,
  to,
  watch,
  epic,
  thru,
  subscribe,
  getState,
  replaceReducer,
  reset,
  //$off
  [$$observable]: observable,
 }
 setProperty('stateAtom', stateAtom, store)

 function getState() {
  return getAtom().get()
 }

 function subscribe(listener) {
  invariant(
   typeof listener === 'function',
   'Expected the listener to be a function.',
  )

  let halt = false
  const until = () => halt
  getAtom().react(listener, {until})

  function unsubscribe() {
   halt = true
  }
  unsubscribe.unsubscribe = unsubscribe
  return unsubscribe
 }

 function dispatch(action) {
  if (action === undefined || action === null) return action
  if (typeof action.type !== 'string' && typeof action.type !== 'number')
   return action
  atomically(() => {
   const newValue = currentReducer(getState(), action.payload, action.type)
   getAtom().set(newValue)
  })

  return action
 }

 function replaceReducer(nextReducer) {
  invariant(
   typeof nextReducer === 'function',
   'Expected the nextReducer to be a function.',
  )

  currentReducer = nextReducer
  forceSet(getState())
  // dispatch({type: REPLACE})
 }

 function observable() {
  return {
   subscribe(observer) {
    invariant(
     typeof observer === 'object' && observer !== null,
     'Expected the observer to be an object.',
    )

    function observeState(state) {
     if (observer.next) {
      observer.next(state)
     }
    }

    // observeState(getState())
    const unsubscribe = subscribe(observeState)
    return {unsubscribe}
   },
   //$off
   [$$observable]() {
    return this
   },
  }
 }

 function reset(event) {
  const off = watch(event, (state, payload, type) => {
   getAtom().set(defaultState)
  })
  return store
 }

 function on(event: any, handler: Function) {
  const off = watch(event, (state, payload, type) => {
   const newResult = handler(state, payload, type)
   getAtom().set(newResult)
  })
  return store
 }

 function withProps(fn: Function) {
  return props => fn(getState(), props)
 }

 function map(fn: Function) {
  const innerStore = (createStore: any)(fn(getState()))
  const unsub = watch(update => {
   const mapped = fn(update)
   innerStore.setState(mapped)
  })
  return innerStore
 }

 function to(action: Function, reduce) {
  const needReduce = Kind.isStore(action) && typeof reduce === 'function'
  return watch(data => {
   if (!needReduce) {
    action(data)
   } else {
    const lastState = action.getState()
    const reduced = reduce(lastState, data)
    if (lastState !== reduced) action.setState(reduced)
   }
  })
 }
 function watch<E>(eventOrFn: Event<E> | Function, fn?: Function) {
  switch (Kind.readKind(eventOrFn)) {
   case (2: Kind.Event):
   case (3: Kind.Effect):
    if (typeof fn === 'function')
     return eventOrFn.watch(payload =>
      fn(store.getState(), payload, eventOrFn.getType()),
     )
    else throw new TypeError('watch requires function handler')

   default:
    if (typeof eventOrFn === 'function') {
     return subscribe(eventOrFn)
    } else throw new TypeError('watch requires function handler')
  }
 }

 function epic<E>(event: Event<E>, fn: Function) {
  return epicStore(event, store, fn)
 }
 function stateSetter(_, payload) {
  return payload
 }
 function setState(value, reduce?: Function) {
  const currentReducer = typeof reduce === 'function' ? reduce : stateSetter
  const state = getAtom().get()
  const result = currentReducer(state, value)
  // if (state === result && typeof reduce === 'undefined') return
  getAtom().set(result)
  // dispatch({type: `set state ${currentId}`, payload: value})
 }

 dispatch({type: INIT})

 function getAtom(): typeof stateAtom {
  const _: any = store
  return _.stateAtom
 }
 function thru(fn: Function) {
  return fn(store)
 }

 return store
}

function epicStore(event, store, fn: Function) {
 const store$ = from(store).multicast()
 const event$ = from(event).multicast()
 const mapped$ = fn(event$, store$).multicast()
 const innerStore = (createStore: any)(store.getState())
 const subs = mapped$.subscribe({
  next(value) {
   innerStore.setState(value)
  },
  error(err) {
   if (__DEV__) console.error(err)
  },
  complete() {
   subs()
  },
 })
 return innerStore
}

export function createReduxStore<T>(
 reducer: (state: T, event: any) => T,
 preloadedState?: T,
 enhancer: Function,
) {
 invariant(
  typeof reducer === 'function',
  'Expected reducer to be a function, got %s',
  typeof reducer,
 )
 invariant(
  Array.isArray(enhancer)
   || typeof enhancer === 'undefined'
   || typeof enhancer === 'function',
  'enhancer should be function, array of functions or undefined',
 )
 if (preloadedState === undefined) {
  return createStore(preloadedState, reducer, enhancer)
 }
 function fullReducer(state, event) {
  return reducer(state, event)
 }
 if (enhancer === undefined) return createStore(preloadedState, fullReducer, [])
 return createStore(preloadedState, fullReducer, enhancer)
}

export function createStore<T>(
 preloadedStateRaw?: T,
 reducerRaw: Function,
 enhancerRaw: Function | Function[],
) {
 let reducer = reducerRaw
 let enhancer = enhancerRaw
 let preloadedState = preloadedStateRaw
 if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  enhancer = preloadedState
  preloadedState = undefined
 } else if (typeof reducer === 'undefined') {
  if (typeof enhancer === 'function') {
   reducer = enhancer
   enhancer = undefined
  } else {
   reducer = _ => _
  }
 }

 if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
   invariant(Array.isArray(enhancer), 'Expected the enhancer to be an array')
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

export {createStore as createStoreObject}
