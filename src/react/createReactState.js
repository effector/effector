//@flow

import * as React from 'react'
import type {Store} from 'effector'

import {useStore} from './useStore'
import {withDisplayName} from './withDisplayName'

export function createReactState<State: Object, Com: React.ComponentType<*>>(
  store: Store<State>,
  Component: Com,
): React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
  const wrappedComponentName =
    Component.displayName || Component.name || 'Unknown'
  return withDisplayName(`Connect(${wrappedComponentName})`, props => (
    <Component {...props} {...useStore(store)} />
  ))
}
