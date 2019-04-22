//@flow

import * as React from 'react'
import {type Store, is, invariant, createStoreObject} from 'effector'

type Unsubscribe = () => void

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
  return class RenderComponent extends React.Component<
    Props,
    {currentState: State},
  > {
    static displayName = `${store.shortName}.View`
    _unsubscribe: Unsubscribe | null = null
    _hasUnmounted: boolean = false
    state = {currentState: store.getState()}
    componentDidMount() {
      this.subscribe()
    }
    componentWillUnmount() {
      this.unsubscribe()
      this._hasUnmounted = true
    }
    renderProp = (state: State) => renderProp(this.props, state)
    render() {
      return renderProp(this.props, this.state.currentState)
    }
    subscribe() {
      this._unsubscribe = store.watch((state: State) => {
        if (this._hasUnmounted) {
          return
        }

        this.setState(prevState => {
          if (state === prevState.currentState) {
            return null
          }
          return {currentState: state}
        })
      })
    }
    unsubscribe() {
      if (typeof this._unsubscribe === 'function') {
        this._unsubscribe()
      }

      this._unsubscribe = null
    }
  }
}
