//@flow

import {type Store, is} from 'effector'
import {useReducer, useEffect, useLayoutEffect} from 'react'

const stateReducer = (_: any, payload: any) => payload

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useStore<State>(store: Store<State>): State {
  if (!is.store(store)) throw Error('expect useStore argument to be a store')
  const dispatch = useReducer(stateReducer, undefined, store.getState)[1]
  useIsomorphicLayoutEffect(() => store.watch(dispatch), [store])
  return store.getState()
}
