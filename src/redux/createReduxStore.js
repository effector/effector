//@noflow

import invariant from 'invariant'
import type {Store} from './index.h'
import {storeConstructor} from './createStore'
import {applyMiddleware} from './applyMiddleware'

export function createReduxStore<T>(
  reducer: (state: T, event: any) => T,
  preloadedStateRaw?: T,
  enhancerRaw?: Function | Function[],
): Store<T> {
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
