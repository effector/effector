//@flow

import {type Store, is, invariant} from 'effector'
import {useReducer, useEffect} from 'react'

export function useStore<State>(store: Store<State>): State {
  invariant(
    is.store(store),
    'useStore: The argument must be Store, but you passed %s',
    store,
  )
  const [, dispatch] = useReducer(
    (_, payload) => payload,
    undefined,
    store.getState,
  )
  useEffect(() => store.watch(dispatch), [store])
  return store.getState()
}
