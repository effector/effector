import {Accessor} from 'solid-js'
import {Store} from 'effector'

import {useStoreMapBase, useUnitBase} from './lib/base'
import {getScope} from './lib/get-scope'
import { Gate } from './index.h'
import {useGateBase} from "./lib/gate";

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
  return useStoreMapBase(
    [configOrStore, separateFn],
    getScope(configOrStore?.forceScope),
  )
}
export function useUnit(shape, opts?: {forceScope?: boolean}) {
  const scope = getScope(opts?.forceScope)
  return useUnitBase(shape, scope)
}

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
  opts?: {forceScope?: boolean},
) {
  return useGateBase(GateComponent, props, getScope(opts?.forceScope))
}