import {Event, Store} from 'effector'
import {
  useStoreBase,
  useStoreMapBase,
  useListBase,
  useUnitBase,
  useEventBase,
  useGateBase,
} from './apiBase'
import {getScope} from './scope'
import type {Gate} from './index.h'

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent<T>(
  event: Event<T>,
  opts?: {forceScope?: boolean},
): (payload: T) => T {
  const scope = getScope(opts?.forceScope)

  return useEventBase(event, scope)
}

export function useStore<State>(
  store: Store<State>,
  opts?: {forceScope?: boolean},
): State {
  return useStoreBase(store, getScope(opts?.forceScope))
}

export function useUnit(shape, opts?: {forceScope?: boolean}) {
  return useUnitBase(shape, getScope(opts?.forceScope))
}

export function useStoreMap<State, Result, Keys extends ReadonlyArray<any>>(
  configOrStore:
    | {
        store: Store<State>
        keys: Keys
        fn(state: State, keys: Keys): Result
        updateFilter?: (update: Result, current: Result) => boolean
        defaultValue?: Result
        forceScope?: boolean
      }
    | Store<State>,
  separateFn?: (state: State, keys: Keys) => Result,
): Result {
  return useStoreMapBase(
    [configOrStore, separateFn],
    getScope(configOrStore?.forceScope),
  )
}

export function useList<T>(
  list: Store<T[]>,
  renderItem:
    | {
        keys?: any[]
        fn(item: T, index: number): React.ReactNode
        getKey?: (item: T) => string
        placeholder?: React.ReactNode
      }
    | ((item: T, index: number) => React.ReactNode),
  opts?: {forceScope?: boolean},
): React.ReactNode {
  return useListBase(list, renderItem, getScope(opts?.forceScope))
}

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
  opts?: {forceScope?: boolean},
) {
  return useGateBase(GateComponent, props, getScope(opts?.forceScope))
}
