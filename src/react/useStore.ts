import {Store, is, clearNode, createStore} from 'effector'
import React from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {throwError} from './throw'

export function useStore<State>(store: Store<State>): State {
  if (!is.store(store)) throwError('expect useStore argument to be a store')
  const currentStore = React.useRef(store)
  const setState = React.useState(store.getState())[1]
  useIsomorphicLayoutEffect(() => {
    if (currentStore.current === store) {
      setState(store.getState())
    }
    currentStore.current = store
    return store.updates.watch(setState)
  }, [store])
  return store.getState()
}

export function useStoreMap<State, Result, Keys extends ReadonlyArray<any>>({
  store,
  keys,
  fn,
}: {
  store: Store<State>
  keys: Keys
  fn(state: State, keys: Keys): Result
}): Result {
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (!Array.isArray(keys)) throwError('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')
  const result: Store<Result> = React.useMemo(
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
