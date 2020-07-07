import React from 'react'
import {Store} from 'effector'

import {useStore} from './useStore'
import {withDisplayName} from './withDisplayName'

export function createReactState<State>(
  store: Store<State>,
  Component: React.ComponentType<any>,
) {
  const wrappedComponentName =
    Component.displayName || Component.name || 'Unknown'
  return withDisplayName(`Connect(${wrappedComponentName})`, (props: any) =>
    React.createElement(Component, Object.assign({}, props, useStore(store))),
  )
}
