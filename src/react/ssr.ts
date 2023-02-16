import React from 'react'
import {Domain, Store} from 'effector'
import {
  useStoreBase,
  useUnitBase,
  useStoreMapBase,
  useListBase,
  useEventBase,
  useGateBase,
} from './apiBase'
import {withDisplayName} from './withDisplayName'
import {createGateImplementation, processCreateGateConfig} from './createGate'
import type {Gate} from './index.h'
import {throwError} from './throw'
import {deprecate} from './deprecate'
import {getScope} from './scope'

export function createGate<Props>(
  ...args: Array<
    | {
        domain?: Domain
        defaultState?: Props
        name?: string
      }
    | {}
  >
) {
  return createGateImplementation(processCreateGateConfig(useGateBase, args))
}

export function createStoreConsumer(store: any) {
  return (props: any) => {
    const state = useStore(store)
    return props.children(state)
  }
}

export const createContextComponent = (
  store: any,
  context: any,
  renderProp: any,
) => {
  deprecate('createContextComponent')
  return (props: any) => {
    const ctx = React.useContext(context)
    const state = useStore(store)
    return renderProp(props, state, ctx)
  }
}

export const createComponent = (shape: any) => throwError('not implemented')

export const createReactState = (store: any, Component: any) => {
  deprecate('createReactState')
  return connect(Component)(store)
}

export const connect = (Component: any) => (store: any) => {
  let View: any = Component
  if (typeof Component !== 'function') {
    View = store
    store = Component as any
  }
  const wrappedComponentName = View.displayName || View.name || 'Unknown'
  return withDisplayName(`Connect(${wrappedComponentName})`, (props: any) =>
    React.createElement(View, {...props, ...(useStore(store) as any)}),
  )
}

/** useStore wrapper for scopes */
export function useStore<T>(store: Store<T>): T {
  return useStoreBase(store, getScope(true))
}
export function useUnit(shape) {
  return useUnitBase(shape, getScope(true))
}
/** useList wrapper for scopes */
export function useList(store: any, opts: any) {
  return useListBase(store, opts, getScope(true))
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

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent(eventObject: any) {
  return useEventBase(eventObject, getScope(true))
}

/** useGate wrapper for scopes */
export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
) {
  return useGateBase(GateComponent, props, getScope(true))
}
