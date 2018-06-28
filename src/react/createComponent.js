//@flow

import * as React from 'react'
import type {Store} from 'effector'
import {createStoreConsumer} from './createStoreConsumer'

export function createComponent<Props, State>(
 store: Store<State>,
 renderProp: (props: Props, state: State) => React.Node,
): React.ComponentType<Props> {
 const Consumer = createStoreConsumer(store)
 return class RenderComponent extends React.Component<Props> {
  renderProp = (state: State) => renderProp(this.props, state)
  render() {
   return <Consumer>{this.renderProp}</Consumer>
  }
 }
}
