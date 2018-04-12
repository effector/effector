// @flow

import invariant from 'invariant'

import type {RawAction, Reducer, Handlers, OnOff, Meta} from './index.h'

import {type Atomic, atom} from '@effector/atom'

function normalizeType(typeOrActionCreator) {
 if (typeOrActionCreator && typeOrActionCreator.getType) {
  return typeOrActionCreator.toString()
 }
 return typeOrActionCreator
}
export function createReducer<S>(
 defaultState: S,
 handlers: Handlers<S> | OnOff<S> = {},
 thisType?: Reducer<S>,
): Reducer<S> {
 const lastState = atom(defaultState)
 return ReducerConstructor(lastState, handlers, thisType)
}

function ReducerConstructor<S>(
 lastState: Atomic<S>,
 handlers: Handlers<S> | OnOff<S>,
 thisType?: Reducer<S>,
): Reducer<S> {
 const opts: {
  defaultState: S,
  fallback: null | ((state: S, payload: any, meta: Meta) => S),
 } = {
  fallback: null,
  defaultState: lastState.get(),
 }

 const reducer = Object.assign(reduce, {
  has,
  map,
  watch,
  get,
  set,
  on,
  off,
  options,
  reset,
  lastState,
  subscribe,
 })
 const returnType = thisType ? thisType : reducer
 function watch(fn: S => any): () => void {
  return lastState.watch(fn)
 }
 function subscribe(subscriber) {
  invariant(typeof subscriber.next === 'function', 'wrong subscriber')
  return {
   unsubscribe: lastState.watch(_ => subscriber.next(_)),
  }
 }
 function map<T>(fn: S => T): Reducer<T> {
  ReducerConstructor
  const state = lastState.map(fn)
  return ReducerConstructor(state, {})
 }
 function get(): S {
  return lastState.get()
 }
 function set(value: S): Reducer<S> {
  lastState.update(lastState => {
   if (value == null) return
   if (lastState === value) return
   return value
  })
  return reducer
 }
 function has(typeOrActionCreator) {
  return !!handlers[normalizeType(typeOrActionCreator)]
 }

 function reset(typeOrActionCreator) {
  on(
   typeOrActionCreator,
   (state: S, payload: any, meta: Meta) => opts.defaultState,
  )
  lastState.reset()
  return returnType
 }

 function on(typeOrActionCreator, handler) {
  if (Array.isArray(typeOrActionCreator)) {
   typeOrActionCreator.forEach(action => {
    on(action, handler)
   })
  } else {
   handlers[normalizeType(typeOrActionCreator)] = handler
  }

  return returnType
 }

 function off(typeOrActionCreator) {
  if (Array.isArray(typeOrActionCreator)) {
   typeOrActionCreator.forEach(off)
  } else {
   delete handlers[normalizeType(typeOrActionCreator)]
  }
  return returnType
 }

 function options(newOpts) {
  // $off
  Object.keys(newOpts).forEach(name => (opts[name] = newOpts[name]))
  return returnType
 }

 if (typeof handlers === 'function') {
  const factory = handlers
  // $off
  handlers = {}
  factory(on, off)
 }

 function reduce<P>(stateRaw: S, action: RawAction<P>): S {
  const state: S = stateRaw === undefined ? opts.defaultState : stateRaw
  if (!action || typeof action.type !== 'string') {
   set(state)
   return state
  }
  if (action.type.startsWith('@@redux/')) {
   set(state)
   return state
  }

  const handler = handlers[String(action.type)] || opts.fallback
  if (handler) {
   const result = handler(state, action.payload, action.meta)
   if (result == null) {
    return get()
   }
   set(result)
   return result
  }
  set(state)
  return state
 }

 return reducer
}
