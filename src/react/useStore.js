//@flow

import {type Store, is, invariant} from 'effector'
import {useReducer, useLayoutEffect} from 'react'

const stateReducer = (_: any, payload: any) => payload

export function useStore<State>(store: Store<State>): State {
  invariant(
    is.store(store),
    'useStore: The argument must be Store, but you passed %s',
    store,
  )
  const dispatch = useReducer(stateReducer, undefined, store.getState)[1]
  useLayoutEffect(() => store.watch(dispatch), [store])
  return store.getState()
}
