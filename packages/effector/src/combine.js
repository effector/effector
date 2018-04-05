//@noflow

import {atom, type Atomic} from '@effector/atom'

import type {Reducer} from './index.h'
import {createReducer} from './reducer'

export function combine<A, B, C, D, E, F, R>(
 combine: (A, B, C, D, E, F) => R,
 ...reducers: Array<Reducer<*>>
): Reducer<R> {
 const values = reducers.map(reducer =>
  reducer(undefined, {type: '@@effector/void'}),
 )
 const stateAtom: Atomic<R> = atom(combine(...values))
 const resultStates = values.map(v => atom(v))
 //  const unsub = []
 for (let i = 0; i < resultStates.length; i++) {
  const off = resultStates[i].watch(update => {
   const prevState = stateAtom.get()
   const updated = combine(...resultStates.map(s => s.get()))
   if (updated !== prevState) stateAtom.set(updated)
  })
 }
 //  state.watch(values => {
 //  resultState.set(combine(...values))
 //  })
 const defaultState: R = combine(...values)
 const combined = createReducer(stateAtom.get(), {}, combinedReducer)
 function combinedReducer(state, action): R {
  // const values
  for (let i = 0; i < reducers.length; i++) {
   const statePart = resultStates[i]
   const reducer = reducers[i]
   const prevValue = statePart.get()
   const value = reducer(prevValue, action)
   if (value !== prevValue) {
    statePart.set(value)
   }
  }
  return stateAtom.get()
 }
 Object.assign(combinedReducer, combined)
 return combinedReducer
}

export {combine as joint}
