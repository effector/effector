import {Store, is, clearNode, createStore, Scope} from 'effector'
import React from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {throwError} from './throw'
import {createWatch} from './createWatch'

export const stateReader = <T>(store: Store<T>, scope?: Scope) =>
  scope ? scope.getState(store) : store.getState()
const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue
const createNotifier = () =>
  React.useReducer((n: any, action: void) => n + 1, 0)[1]
export function useStoreBase<State>(store: Store<State>, scope?: Scope) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  const currentValue = stateReader(store, scope)
  const inc = createNotifier()
  const currentStore = React.useRef({
    store,
    value: currentValue,
    pending: false,
  })
  useIsomorphicLayoutEffect(() => {
    const stop = createWatch(
      store,
      upd => {
        const ref = currentStore.current
        if (!ref.pending) {
          ref.value = upd
          ref.pending = true
          inc()
          ref.pending = false
        }
      },
      scope,
    )
    const newValue = stateReader(store, scope)
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

export function useStore<State>(store: Store<State>): State {
  return useStoreBase(store)
}

export function useStoreMapBase<State, Result, Keys extends ReadonlyArray<any>>(
  [configOrStore, separateFn]: [
    configOrStore:
      | {
          store: Store<State>
          keys: Keys
          fn(state: State, keys: Keys): Result
          updateFilter?: (update: Result, current: Result) => boolean
        }
      | Store<State>,
    separateFn?: (state: State, keys: Keys) => Result,
  ],
  scope?: Scope,
): Result {
  let fn: (state: State, keys: Keys) => Result
  let updateFilter: (update: Result, current: Result) => boolean =
    basicUpdateFilter
  let store: Store<State>
  let keys: Keys
  if (separateFn) {
    fn = separateFn
    store = configOrStore as Store<State>
    keys = [] as unknown as Keys
  } else {
    fn = (configOrStore as any).fn
    store = (configOrStore as any).store
    keys = (configOrStore as any).keys
    updateFilter = (configOrStore as any).updateFilter || basicUpdateFilter
  }
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (!Array.isArray(keys)) throwError('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')
  const result = React.useRef<{
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
    store: Store<State>
  }>({} as any)
  const refState = result.current
  refState.fn = fn
  refState.upd = updateFilter
  refState.init = refState.store === store
  refState.store = store
  if (!refState.init) {
    refState.val = fn(stateReader(store, scope), keys)
    refState.init = true
  }
  const inc = createNotifier()
  const stop = React.useMemo(() => {
    return createWatch(
      store,
      val => {
        const refState = result.current
        const newValue = refState.fn(val, keys)
        if (newValue !== undefined && refState.upd(newValue, refState.val)) {
          refState.val = newValue
          inc()
        }
      },
      scope,
    )
  }, keys)
  useIsomorphicLayoutEffect(() => () => stop(), keys)
  return refState.val
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
  return useStoreMapBase([configOrStore, separateFn])
}
