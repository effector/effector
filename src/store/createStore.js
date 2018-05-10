//@flow

import invariant from 'invariant'
// import type {ComponentType, Node} from 'react'
import {from} from 'most'
import raf from 'raf'
import $$observable from 'symbol-observable'
import {
 atom,
 struct,
 lens,
 derive,
 atomically,
 type Atom,
 type Derivable,
} from '../derive'
import {deepUnpack} from '../derive/unpack'
import {INIT, REPLACE} from './actionTypes'
import {applyMiddleware} from './applyMiddleware'
import type {Event} from '..'

import * as Kind from '../kind'
import warning from 'warning'
import {setProperty} from '../setProperty'

export type Nest = {
 get(): any,
 set(state: any, action: any): any,
}
let id = 0
export function createStore<State>(state: State) {
 return storeConstructor({
  currentReducer: _ => _,
  currentState: state,
  isObject: false,
 })
}

export function createStoreObject<State>(obj: State) {
 const isArray = Array.isArray(obj)
 const state = isArray ? [...obj] : {...obj}
 const store = storeConstructor({
  currentReducer: _ => _,
  currentState: state,
  isObject: true,
 })
 let temp = store.getState()
 let pending = false
 let lastCall = -1
 let delta = Infinity
 function update(key, value) {
  const time = Date.now()
  delta = time - lastCall
  lastCall = time
  if (isArray) {
   const newList = [...temp]
   newList[key] = value
   temp = newList
  } else {
   temp = {...temp, [key]: value}
  }
  if (pending) return
  if (delta > 60) {
   store.setState(temp)
   return
  }
  pending = true
  raf(() => {
   pending = false
   store.setState(temp)
  })
 }
 const iter = isArray ? state.map((e, i) => [i, e]) : Object.entries(state)
 for (const [key, child] of iter) {
  if (Kind.isStore(child)) {
   child.watch(e => {
    update(key, e)
   })
  }
 }
 return store
}

function storeConstructor<State>(props) {
 const currentId = (++id).toString(36)
 let {currentReducer, currentState, isObject} = props
 const privateStruct: Derivable<State> | Atom<State> = isObject
  ? (derive(() => deepUnpack(currentState)): any)
  : atom(currentState)
 const defaultState = privateStruct.get()
 let storeSeq = 0
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
 if (isObject) {
  privateStruct.react(state => {
   //  if (state === oldPrivateStruct) {
   //   oldPrivateStruct = state
   //   return
   //  }
   oldPrivateStruct = state
   privateLens.set(state)
  })
 }
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
  let active = true
  const unsub = getAtom().react((...args) => {
   if (!active) return
   listener(...args)
  })

  function unsubscribe() {
   if (!active) return
   active = false
   unsub()
  }
  unsubscribe.unsubscribe = unsubscribe
  return unsubscribe
 }

 function dispatch(action) {
  if (action === undefined || action === null) return action
  if (typeof action.type !== 'string' && typeof action.type !== 'number')
   return action
  atomically(() => {
   const state = getState()
   const newResult = currentReducer(state, action.payload, action.type)
   setter(state, newResult)
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

    return subscribe(observeState)
   },
   //$off
   [$$observable]() {
    return this
   },
  }
 }

 function reset(event) {
  const off = watch(event, (state, payload, type) => {
   setter(state, defaultState)
  })
  return store
 }

 function on(event: any, handler: Function) {
  const off = watch(event, (state, payload, type) => {
   const newResult = handler(state, payload, type)
   setter(state, newResult)
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
    if (typeof fn === 'function') {
     return eventOrFn.watch(payload =>
      fn(store.getState(), payload, eventOrFn.getType()),
     )
    } else throw new TypeError('watch requires function handler')

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
  const newResult = currentReducer(state, value)
  setter(state, newResult)
 }
 function setter(oldState, newState) {
  if (newState === undefined || newState === null || newState === oldState)
   return
  getAtom().set(newState)
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
 preloadedStateRaw?: T,
 enhancerRaw?: Function | Function[],
) {
 invariant(
  typeof reducer === 'function',
  'Expected reducer to be a function, got %s',
  typeof reducer,
 )
 let enhancer = enhancerRaw
 let preloadedState = preloadedStateRaw
 if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  enhancer = preloadedState
  preloadedState = undefined
 }
 if (Array.isArray(enhancer)) {
  enhancer = applyMiddleware(...enhancer)
 }
 if (enhancer !== undefined)
  return enhancer(createReduxStore)(reducer, preloadedState)
 return storeConstructor({
  currentReducer: reducer,
  currentState: preloadedState,
 })
}
