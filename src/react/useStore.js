//@flow

import {type Store, is, clearNode, sample} from 'effector'
import {useEffect, useLayoutEffect, useMemo, useState} from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useStore<State>(store: Store<State>): State {
  if (!is.store(store)) throw Error('expect useStore argument to be a store')
  const hitUpdate = useState({})[1]
  const sampled = useMemo(() => {
    const sampled = sample(store)
    sampled.updates.watch(() => hitUpdate({}))
    return sampled
  }, [store])
  useIsomorphicLayoutEffect(
    () => () => {
      clearNode(sampled, {deep: true})
    },
    [store],
  )
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
    () => store.map(state => fn(state, keys)),
    keys,
  )
  const state = useStore(result)
  useIsomorphicLayoutEffect(() => () => clearNode(result, {deep: true}), keys)
  return state
}
