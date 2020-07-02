import * as React from 'react'
import {is, launch} from 'effector'
import {
  useStore as commonUseStore,
  useStoreMap as commonUseStoreMap,
} from './useStore'
import {useList as commonUseList} from './useList'
import {withDisplayName} from './withDisplayName'
import {useGate as commonUseGate} from './createGate'
import {Gate} from './index.h'

function createDefer() {
  const result = {} as any
  result.req = new Promise((rs, rj) => {
    result.rs = rs
    result.rj = rj
  })
  return result
}

const Scope = React.createContext(null)
export const {Provider} = Scope

function useScopeStore(store: any) {
  const scope = React.useContext(Scope) as any
  if (!scope)
    throw Error('No scope found, consider adding <Provider> to app root')
  return scope.find(store).meta.wrapped
}

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
) {
  const open = useEvent(GateComponent.open)
  const close = useEvent(GateComponent.close)
  const set = useEvent(GateComponent.set)
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
  throw new Error('not implemented')
}

export function createReactState(store: any, Component: any) {
  const wrappedComponentName =
    Component.displayName || Component.name || 'Unknown'
  return withDisplayName(`Connect(${wrappedComponentName})`, (props: any) =>
    React.createElement(Component, Object.assign({}, props, useStore(store))),
  )
}

export function connect(Component: any) {
  return (store: any) => createReactState(store, Component)
}

/** useStore wrapper for scopes */
export function useStore(store: any) {
  return commonUseStore(useScopeStore(store))
}
/** useList wrapper for scopes */
export function useList(store: any, opts: any) {
  return commonUseList(useScopeStore(store), opts)
}
/** useStoreMap wrapper for scopes */
export function useStoreMap({store, keys, fn}: any) {
  return commonUseStoreMap({
    store: useScopeStore(store),
    keys,
    fn,
  })
}

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent(event: any) {
  const scope = React.useContext(Scope) as any
  const unit = scope.find(event)
  const result = is.effect(event)
    ? (params: any) => {
        const req = createDefer()
        launch(unit, {params, req})
        return req.req
      }
    : (payload: any) => {
        launch(unit, payload)
        return payload
      }
  return React.useCallback(result, [scope, event])
}
