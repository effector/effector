import {Store, is, clearNode, createStore} from 'effector'
import React from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {throwError} from './throw'

export function useStore<State>(store: Store<State>): State {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  const currentValue = store.getState()
  const inc = React.useReducer((n: any, action: void) => n + 1, 0)[1]
  const currentStore = React.useRef({
    store,
    value: currentValue,
    pending: false,
  })
  useIsomorphicLayoutEffect(() => {
    const stop = store.updates.watch(upd => {
      const ref = currentStore.current
      if (!ref.pending) {
        ref.value = upd
        ref.pending = true
        inc()
        ref.pending = false
      }
    })
    const newValue = store.getState()
    const ref = currentStore.current
    if (ref.store === store && ref.value !== newValue) {
      ref.value = newValue
      ref.pending = true
      inc()
      ref.pending = false
    }
    ref.store = store
    return stop
  }, [store])
  return currentValue
}

export function useStoreMap<State, Result, Keys extends ReadonlyArray<any>>(
  configOrStore:
    | {
        store: Store<State>
        keys: Keys
        fn(state: State, keys: Keys): Result
        updateFilter?: (update: Result, current: Result) => boolean
      }
    | Store<State>,
  separateFn?: (state: State, keys: Keys) => Result,
): Result {
  let fn: (state: State, keys: Keys) => Result
  let updateFilter: (update: Result, current: Result) => boolean
  let store: Store<State>
  let keys: Keys
  if (separateFn) {
    fn = separateFn
    store = configOrStore as Store<State>
    keys = ([] as unknown) as Keys
  } else {
    fn = (configOrStore as any).fn
    store = (configOrStore as any).store
    keys = (configOrStore as any).keys
    updateFilter = (configOrStore as any).updateFilter
  }
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (!Array.isArray(keys)) throwError('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')
  const result: Store<Result> = React.useMemo(
    () =>
      createStore(fn(store.getState(), keys), {updateFilter}).on(
        store,
        (_, state) => fn(state, keys),
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
