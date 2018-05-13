//@flow

import * as React from 'react'

import type {Store} from 'effector'

import type {StoreConsumer} from './index.h'

export function createStoreConsumer<State>(
 store: Store<State>,
): StoreConsumer<State> {
 return class StoreConsumer extends React.Component<
  {
   children: State => React.Node,
  },
  {currentState: State},
 > {
  static displayName = `${store.displayName || 'Store'}.Consumer`

  state = {currentState: store.getState()}

  unsub: *
  componentDidMount() {
   const unsub = store.subscribe(state => {
    if (state !== this.state.currentState)
     this.setState(() => ({currentState: state}))
   })
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
