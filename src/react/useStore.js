//@flow

import type {Store} from 'effector'
import {useState, useReducer, useEffect} from 'react'

export function useStore<State>(store: Store<State>): State {
  const [state, setState] = useState(store.getState)
  useEffect(() => store.watch(newState => setState(() => newState)), [store])
  return state
}

export function useStoreFast<State>(store: Store<State>): State {
  const [state, dispatch] = useReducer(
    (_, payload) => payload,
    undefined,
    store.getState,
  )
  useEffect(() => store.watch(dispatch), [store])
  return state
}
