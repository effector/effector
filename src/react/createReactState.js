//@flow

import * as React from 'react'
import type {Store} from 'effector'

import {createStoreConsumer} from './createStoreConsumer'
import {withDisplayName} from './withDisplayName'

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
  return withDisplayName(`Connect(${wrappedComponentName})`, ConnectedComponent)
}
