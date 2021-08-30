import React from 'react'

import type {Store} from 'effector'
import {useStore} from './nossr'
import {withDisplayName} from './withDisplayName'

export const connect =
  <State>(Component: React.ComponentType<any>) =>
  (store: Store<State>) => {
    let View: any = Component
    if (typeof Component !== 'function') {
      View = store
      store = Component as any
    }
    const wrappedComponentName = View.displayName || View.name || 'Unknown'
    return withDisplayName(`Connect(${wrappedComponentName})`, (props: any) =>
      React.createElement(View, {...props, ...useStore(store)}),
    )
  }
