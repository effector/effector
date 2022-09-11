import {Accessor, createEffect, createMemo} from 'solid-js'
import {Domain} from 'effector'

import type {Gate} from './index.h'

import {useGate as commonUseGate, createGateImplementation} from './lib/gate'
import {useStoreMapBase, useUnitBase} from './lib/base'
import {getScope, ScopeContext} from './lib/get-scope'

export const {Provider} = ScopeContext

export function createGate<Props>(
  config: {
    domain?: Domain
    defaultState?: Props
    name?: string
  } = {},
) {
  return createGateImplementation({
    domain: config.domain,
    name: config.name,
    defaultState: 'defaultState' in config ? config.defaultState : {},
    hook: useGate,
  })
}

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Accessor<Props> = () => ({} as any),
) {
  const events = useUnit([
    GateComponent.open,
    GateComponent.close,
    GateComponent.set,
  ])

  const ForkedGate = createMemo(() => {
    const [open, close, set] = events

    return {
      open,
      close,
      set,
    } as Gate<Props>
  })

  createEffect(() => commonUseGate(ForkedGate(), props))
}
export function useUnit(shape) {
  const scope = getScope()
  return useUnitBase(shape, scope)
}
/** useStoreMap wrapper for scopes */
export function useStoreMap(configOrStore: any, separateFn: any) {
  const scope = getScope()
  if (separateFn) return useStoreMapBase([configOrStore, separateFn], scope)
  return useStoreMapBase(
    [
      {
        store: configOrStore.store,
        keys: configOrStore.keys,
        fn: configOrStore.fn,
        updateFilter: configOrStore.updateFilter,
      },
    ],
    scope,
  )
}
