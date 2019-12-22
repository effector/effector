//@flow

import * as React from 'react'
import type {Store} from 'effector'
import {createStoreConsumer} from './createStoreConsumer'

export function createContextComponent<Props: {...}, State, Context>(
  store: Store<State>,
  context: React.Context<Context>,
  renderProp: (props: Props, state: State, context: Context) => React.Node,
): React.ComponentType<Props> {
  const Consumer = createStoreConsumer(store)
  return class RenderComponent extends React.Component<Props> {
    static contextType = context
    renderProp = (state: State) => renderProp(this.props, state, this.context)
    render() {
      return <Consumer>{this.renderProp}</Consumer>
    }
  }
}
