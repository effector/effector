// @noflow
import * as React from 'react'
import {is, launch} from 'effector'
import {
  useStore as commonUseStore,
  useStoreMap as commonUseStoreMap,
} from './useStore'
import {useList as commonUseList} from './useList'

class Defer {
  constructor() {
    this.req = new Promise((rs, rj) => {
      this.rs = rs
      this.rj = rj
    })
  }
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
  const Consumer = createStoreConsumer(store)
  return class RenderComponent extends React.Component {
    static contextType = context
    renderProp = state => renderProp(this.props, state, this.context)
    render() {
      return <Consumer>{this.renderProp}</Consumer>
    }
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
  ConnectedComponent.displayName = `Connect(${wrappedComponentName})`
  return ConnectedComponent
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
      const req = new Defer()
      launch(unit, {params, req})
      return req.req
    }
    : payload => {
      launch(unit, payload)
      return payload
    }
  return React.useCallback(result, [scope, event])
}
