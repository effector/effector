import React from 'react'

import {Store, is} from 'effector'
import {createReactState} from './createReactState'

export const connect = <State>(Component: React.ComponentType<any>) => (
  store: Store<State>,
) => {
  let View: any = Component
  if (is.store(Component) || Object.values(Component).every(is.store)) {
    View = store
    store = Component as any
  }
  return createReactState(store, View)
}
