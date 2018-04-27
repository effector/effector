//@flow

import * as React from 'react'

import type {Store} from 'effector'

export function createReactState<State>(store: Store<State>) {
 const {Provider, Consumer} = React.createContext(store.getState())

 class StoreProvider extends React.Component<
  {
   children: React.Node,
  },
  State,
 > {
  render() {
   return <Provider value={store.getState()}>{this.props.children}</Provider>
  }
 }

 return {Provider: StoreProvider, Consumer}
}
