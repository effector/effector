//@flow

import * as React from 'react'
import {type Store, is, invariant, createStoreObject} from 'effector'
import {createStoreConsumer} from './createStoreConsumer'

export function createComponent<Props: {}, State>(
  shape: Store<State>,
  renderProp: (props: Props, state: State) => React.Node,
): React.ComponentType<Props> {
  let store
  if (is.store(shape)) {
    store = shape
  } else {
    invariant(
      typeof shape === 'object' && shape !== null,
      'shape should be store or object with stores',
    )
    store = createStoreObject(shape)
  }
  const Consumer = createStoreConsumer(store)
  return class RenderComponent extends React.Component<Props> {
    renderProp = (state: State) => renderProp(this.props, state)
    render() {
      return <Consumer>{this.renderProp}</Consumer>
    }
  }
}
