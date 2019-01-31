//@flow

import type {Store} from 'effector'
import {useState, useEffect} from 'react'

export function useStore<State>(store: Store<State>): State {
  const [state, setState] = useState(store.getState)
  useEffect(() => store.watch(setState), [store])
  return state
}
