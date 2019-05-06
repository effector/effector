//@flow

import * as React from 'react'
import {
  type Store,
  isStore,
  //$todo add invariant to effector public typings
  invariant,
  createStoreObject,
  createEvent,
} from 'effector'
import type {StoreView} from './index.h'

type Unsubscribe = () => void

export function createComponent<Props: {}, State>(
  shape: Store<State> | {+[key: string]: Store<any> | any},
  renderProp: (props: Props, state: State) => React.Node,
): StoreView<State, Props> {
  let store: Store<any>
  if (isStore(shape)) {
    store = shape
  } else {
    invariant(
      typeof shape === 'object' && shape !== null,
      'shape should be store or object with stores',
    )
    store = createStoreObject(shape)
  }
  const mounted = createEvent(`${store.shortName}.View mounted`)
  const unmounted = createEvent(`${store.shortName}.View unmounted`)
  return class RenderComponent extends React.Component<
    Props,
    {currentState: State},
  > {
    static displayName = `${store.shortName}.View`
    static mounted = mounted
    static unmounted = unmounted
    _unsubscribe: Unsubscribe | null = null
    _hasUnmounted: boolean = false
    state = {currentState: store.getState()}
    componentDidMount() {
      mounted({props: this.props, state: store.getState()})
      this.subscribe()
    }
    componentWillUnmount() {
      unmounted({props: this.props, state: store.getState()})
      this.unsubscribe()
      this._hasUnmounted = true
    }
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
