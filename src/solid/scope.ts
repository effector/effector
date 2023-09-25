import {Accessor, createEffect, createMemo} from 'solid-js'
import {Domain} from 'effector'

import type {Gate} from './index.h'

import {useGate as commonUseGate, createGateImplementation, useGateBase} from './lib/gate'
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
  props: Props = {} as any,
) {
  return useGateBase(GateComponent, props, getScope(true))
}
export function useUnit(shape) {
  const scope = getScope(true)
  return useUnitBase(shape, scope)
}
/** useStoreMap wrapper for scopes */
export function useStoreMap(configOrStore: any, separateFn: any) {
  const scope = getScope(true)
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
