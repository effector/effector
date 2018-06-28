//@flow

import * as React from 'react'
import {createStoreConsumer} from './createStoreConsumer'
import {unstable_createStoreProvider} from './createStoreProvider'

import type {Store} from 'effector'

export function createReactState<State: Object, Com: React.ComponentType<*>>(
 store: Store<State>,
 Component: Com,
): React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
 const Store = createStoreConsumer(store)
 const ConnectedComponent = props => (
  <Store>{state => <Component {...props} {...state} />}</Store>
 )
 const wrappedComponentName =
  Component.displayName || Component.name || 'Unknown'
 ConnectedComponent.displayName = `Connect(${wrappedComponentName})`
 return ConnectedComponent
}
