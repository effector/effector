//@flow

import * as React from 'react'

import type {Store} from 'effector'

import type {StoreComponent} from './index.h'

export function createStoreComponent<State>(
 store: Store<State>,
): StoreComponent<State> {
 return class StoreProvider extends React.Component<
  {
   children: State => React.Node,
  },
  {currentState: State},
 > {
  state = {currentState: store.getState()}

  unsub: *
  componentDidMount() {
   const unsub = store.subscribe(state =>
    this.setState(() => ({currentState: state})),
   )
   this.unsub = unsub
  }
  componentWillUnmount() {
   this.unsub()
  }
  render() {
   return this.props.children(this.state.currentState)
  }
 }
}
