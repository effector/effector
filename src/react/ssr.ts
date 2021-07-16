import React from 'react'
import {Domain, is, Scope, Store, scopeBind} from 'effector'
import {useStoreBase, useStoreMapBase, useListBase} from './apiBase'
import {withDisplayName} from './withDisplayName'
import {useGate as commonUseGate, createGateImplementation} from './createGate'
import {Gate} from './index.h'
import {throwError} from './throw'

const ScopeContext = React.createContext(null as Scope | null)
export const {Provider} = ScopeContext
function getScope() {
  const scope = React.useContext(ScopeContext)
  if (!scope)
    throwError('No scope found, consider adding <Provider> to app root')
  return scope as Scope
}

export function createGate<Props>(config: {
  domain: Domain
  defaultState: Props
  name?: string
}) {
  if (!config || !is.domain(config.domain))
    throwError('config.domain should exists')

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
  const [open, close, set] = useEvent([
    GateComponent.open,
    GateComponent.close,
    GateComponent.set,
  ])
  const ForkedGate = React.useMemo(
    () =>
      ({
        open,
        close,
        set,
      } as Gate<Props>),
    [GateComponent, open],
  )
  commonUseGate(ForkedGate, props)
}

export function createStoreConsumer(store: any) {
  return (props: any) => {
    const state = useStore(store)
    return props.children(state)
  }
}

export function createContextComponent(
  store: any,
  context: any,
  renderProp: any,
) {
  return (props: any) => {
    const ctx = React.useContext(context)
    const state = useStore(store)
    return renderProp(props, state, ctx)
  }
}

export function createComponent(shape: any) {
  throwError('not implemented')
}

export function createReactState(store: any, Component: any) {
  const wrappedComponentName =
    Component.displayName || Component.name || 'Unknown'
  return withDisplayName(`Connect(${wrappedComponentName})`, (props: any) =>
    React.createElement(Component, {...props, ...(useStore(store) as any)}),
  )
}

export function connect(Component: any) {
  return (store: any) => createReactState(store, Component)
}

/** useStore wrapper for scopes */
export function useStore<T>(store: Store<T>): T {
  return useStoreBase(store, getScope())
}
/** useList wrapper for scopes */
export function useList(store: any, opts: any) {
  return useListBase(store, opts, getScope())
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

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent(eventObject: any) {
  const scope = getScope()
  const isShape = !is.unit(eventObject) && typeof eventObject === 'object'
  const events = isShape ? eventObject : {event: eventObject}

  return React.useMemo(() => {
    if (is.unit(eventObject)) {
      //@ts-expect-error
      return scopeBind(eventObject, {scope})
    }
    const shape = Array.isArray(eventObject) ? [] : ({} as any)
    for (const key in eventObject) {
      //@ts-expect-error
      shape[key] = scopeBind(eventObject[key], {scope})
    }
    return shape
  }, [scope, ...Object.keys(events), ...Object.values(events)])
}
