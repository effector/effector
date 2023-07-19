import React from 'react'

import type {Store} from 'effector'
import {useStore} from './nossr'
import {withDisplayName} from './withDisplayName'
import {deprecate} from './deprecate'

export const connect = <State>(Component: React.ComponentType<any>) => {
  deprecate('connect', 'useUnit')
  return (store: Store<State>) => {
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
}
