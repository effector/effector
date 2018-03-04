//@noflow

import type {Reducer} from './index.h'
import {createReducer} from './reducer'

export function combine<A, B, C, D, E, F, R>(
  combine: (A, B, C, D, E, F) => R,
  ...reducers: Array<Reducer<*>>
): Reducer<R> {
  const values = reducers.map(reducer =>
    reducer(undefined, {type: '@@effector/void'}),
  )
  const defaultValues = [...values]
  const defaultState: R = combine(...values)
  let lastState: R = defaultState
  const combined = createReducer(defaultState, {}, combinedReducer)
  function combinedReducer(state, action): R {
    const changed: Set<number> = new Set()
    for (let i = 0; i < reducers.length; i++) {
      const prevValue = values[i]
      const value = reducers[i](prevValue, action)
      if (value !== prevValue) {
        changed.add(i)
        values[i] = value === undefined ? defaultValues[i] : value
      }
    }
    const notChanged = changed.size === 0
    let rawResult
    if (notChanged) rawResult = lastState
    else {
      lastState = rawResult = combine(...values)
    }
    if (rawResult === undefined) lastState = rawResult = defaultState
    const result = combined(rawResult, action)
    if (result === undefined) return (lastState = defaultState)
    return result
  }
  Object.assign(combinedReducer, combined)
  return combinedReducer
}

export {combine as joint}
