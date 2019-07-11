//@flow

import {type Store, is, clearNode, createStore} from 'effector'
import {useReducer, useMemo} from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'

const stateReducer = (_: any, payload: any) => payload

export function useStore<State>(store: Store<State>): State {
  if (!is.store(store)) throw Error('expect useStore argument to be a store')
  const dispatch = useReducer(stateReducer, undefined, store.getState)[1]
  const subscription = useMemo(() => store.updates.watch(dispatch), [store])
  useIsomorphicLayoutEffect(() => subscription, [subscription])
  return store.getState()
}

export function useStoreMap<State, Result, Keys: $ReadOnlyArray<any>>({
  store,
  keys,
  fn,
}: {|
  +store: Store<State>,
  +keys: Keys,
  fn(state: State, keys: Keys): Result,
|}): Result {
  if (!is.store(store)) throw Error('useStoreMap expects a store')
  if (!Array.isArray(keys)) throw Error('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throw Error('useStoreMap expects a function')
  const result: Store<Result> = useMemo(
    () =>
      createStore(fn(store.getState(), keys)).on(store, (_, state) =>
        fn(state, keys),
      ),
    keys,
  )
  const state = useStore(result)
  useIsomorphicLayoutEffect(
    () => () => {
      result.off(store)
      clearNode(result, {deep: true})
    },
    keys,
  )
  return state
}
