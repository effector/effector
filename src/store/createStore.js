//@flow

import invariant from 'invariant'
// import type {ComponentType, Node} from 'react'
import {from} from 'most'
import $$observable from 'symbol-observable'

import {createEvent} from '../effector/derived/api'
import {INIT} from './actionTypes'
import * as Cmd from '../effector/derived/datatype/cmd'
import * as Step from '../effector/derived/datatype/step'
import {applyMiddleware} from './applyMiddleware'
import type {Event, Store} from '../effector/index.h'
import * as Kind from '../kind'
// import warning from 'warning'

export type Nest = {
 get(): any,
 set(state: any, action: any): any,
}
let id = 0
export function createStore<State>(state: State): Store<State> {
 return storeConstructor({
  currentReducer: _ => _,
  currentState: state,
  isObject: false,
 })
}

export function storeConstructor<State>(props: {
 currentReducer: Function,
 currentState: State,
 isObject: boolean,
}): Store<State> {
 const currentId = (++id).toString(36)
 let {currentReducer, currentState, isObject} = props
 const defaultState = currentState

 const plainState = (defaultState => {
  let state = defaultState
  return {
   get: () => state,
   set(newState: typeof state) {
    state = newState
   },
  }
 })(defaultState)
 const cmd: Cmd.Compute = Cmd.compute({
  reduce(_, newVal, ctx) {
   ctx.isChanged = newVal !== plainState.get()
   plainState.set(newVal)
   return newVal
  },
 })
 cmd.data.shouldChange = true
 const singleStep: Step.Single = Step.single(cmd)
 const nextSteps: Step.Multi = Step.multi()
 const fullSeq: Step.Seq = Step.seq([singleStep, nextSteps])

 const updater: any = createEvent(`update ${currentId}`)

 const store = {
  graphite: {
   cmd,
   step: singleStep,
   next: nextSteps,
   seq: fullSeq,
  },
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
 on(updater, (_, payload) => payload)
 function getState(): State {
  return plainState.get()
 }

 function subscribe(listener) {
  invariant(
   typeof listener === 'function',
   'Expected the listener to be a function.',
  )
  const runCmd = Step.single(
   Cmd.run({
    runner: listener,
   }),
  )
  store.graphite.next.data.add(runCmd)
  listener(getState())
  function unsubscribe() {
   store.graphite.next.data.delete(runCmd)
  }
  unsubscribe.unsubscribe = unsubscribe
  return unsubscribe
 }

 function dispatch(action) {
  if (action === undefined || action === null) return action
  if (typeof action.type !== 'string' && typeof action.type !== 'number')
   return action

  return action
 }

 function replaceReducer(nextReducer) {
  invariant(
   typeof nextReducer === 'function',
   'Expected the nextReducer to be a function.',
  )

  currentReducer = nextReducer
  updater(getState())
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
  return on(event, () => defaultState)
 }

 function on(event: any, handler: Function) {
  const e: Event<any> = event
  const computeCmd = Cmd.compute({
   reduce(_, newValue, ctx) {
    const lastState = getState()
    const result = handler(lastState, newValue, e.getType())
    if (result === undefined || result === null) {
     ctx.isChanged = false
     return lastState
    }
    ctx.isChanged = result !== lastState
    return result
   },
  })
  computeCmd.data.shouldChange = true
  const step = Step.single(computeCmd)
  const nextSeq = Step.seq([step, ...store.graphite.seq.data])
  e.graphite.next.data.add(nextSeq)
  const unsub = () => {
   e.graphite.next.data.delete(nextSeq)
  }
  return store
 }

 function withProps(fn: Function) {
  return props => fn(getState(), props)
 }

 function map(fn: Function) {
  const innerStore: Store<any> = (createStore: any)(fn(getState()))

  const computeCmd = Step.single(
   Cmd.compute({
    reduce(_, newValue, ctx) {
     const result = fn(newValue)
     return result
    },
   }),
  )
  const nextSeq = Step.seq([computeCmd, ...innerStore.graphite.seq.data])
  store.graphite.next.data.add(nextSeq)
  const off = () => {
   store.graphite.next.data.delete(nextSeq)
  }
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
  const state = getState()
  const newResult = currentReducer(state, value)

  setter(state, newResult)
 }
 function setter(oldState, newState) {
  if (newState === undefined || newState === null || newState === oldState)
   return
  updater(newState)
 }

 dispatch({type: INIT})

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
