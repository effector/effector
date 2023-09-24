import {Accessor} from 'solid-js'
import {Store} from 'effector'

import {useStoreMapBase, useUnitBase} from './lib/base'
import {getScope} from './lib/get-scope'

export function useStoreMap<State, Result, Keys extends ReadonlyArray<any>>(
  configOrStore:
    | {
        store: Store<State>
        keys: Keys
        fn(state: State, keys: Keys): Result
        updateFilter?: (update: Result, current: Result) => boolean
        forceScope?: boolean
      }
    | Store<State>,
  separateFn?: (state: State, keys: Keys) => Result,
): Accessor<Result> {
  const scope = getScope((configOrStore as any)?.forceScope ?? false)
  return useStoreMapBase([configOrStore, separateFn], scope)
}
export function useUnit(shape, opts?: {forceScope?: boolean}) {
  const scope = getScope(opts?.forceScope ?? false)
  return useUnitBase(shape, scope)
}
