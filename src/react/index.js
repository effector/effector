//@flow

import * as React from 'react'
import {createStoreComponent} from './createStoreComponent'

import type {Store} from 'effector'

export function createReactState<
 State: Object,
 Com: React.ComponentType<*>,
>(
 store: Store<State>,
 Component: Com,
): React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
 const Store = createStoreComponent(store)
 const ConnectedComponent = props => (
  <Store>{state => <Component {...props} {...state} />}</Store>
 )
 ConnectedComponent.displayName = `Connect(${Component.displayName
  || 'Unknown'})`
 return ConnectedComponent
}

export function connect<State: Object, Com: React.ComponentType<*>>(
 Component: Com,
): (
 store: Store<State>,
) => React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
 return store => createReactState(store, Component)
}

export {createStoreComponent}
