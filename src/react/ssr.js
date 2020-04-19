// @noflow
import * as React from 'react'
import {is, launch} from 'effector'
import {
  useStore as commonUseStore,
  useStoreMap as commonUseStoreMap,
} from './useStore'
import {useList as commonUseList} from './useList'
import {withDisplayName} from './withDisplayName'

function createDefer() {
  const result = {}
  result.req = new Promise((rs, rj) => {
    result.rs = rs
    result.rj = rj
  })
  return result
}

const Scope = React.createContext(null)
export const {Provider} = Scope

function useScopeStore(store) {
  const scope = React.useContext(Scope)
  return scope.find(store).meta.wrapped
}

export function createStoreConsumer(store) {
  return props => {
    const state = useStore(store)
    return props.children(state)
  }
}

export function createContextComponent(store, context, renderProp) {
  return props => {
    const ctx = React.useContext(context)
    const state = useStore(store)
    return renderProp(props, state, ctx)
  }
}

export function createComponent(shape) {
  throw new Error('not implemented')
}

export function createReactState(store, Component) {
  const Store = createStoreConsumer(store)
  const ConnectedComponent = props => (
    <Store>{state => <Component {...props} {...state} />}</Store>
  )
  const wrappedComponentName =
    Component.displayName || Component.name || 'Unknown'
  return withDisplayName(`Connect(${wrappedComponentName})`, ConnectedComponent)
}

export function connect(Component) {
  return store => createReactState(store, Component)
}

/** useStore wrapper for scopes */
export function useStore(store) {
  return commonUseStore(useScopeStore(store))
}
/** useList wrapper for scopes */
export function useList(store, opts) {
  return commonUseList(useScopeStore(store), opts)
}
/** useStoreMap wrapper for scopes */
export function useStoreMap({store, keys, fn}) {
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
export function useEvent(event) {
  const scope = React.useContext(Scope)
  const unit = scope.find(event)
  const result = is.effect(event)
    ? params => {
      const req = createDefer()
      launch(unit, {params, req})
      return req.req
    }
    : payload => {
      launch(unit, payload)
      return payload
    }
  return React.useCallback(result, [scope, event])
}
