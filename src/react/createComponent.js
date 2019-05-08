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
  shape:
    | Store<State>
    | {+[key: string]: Store<any> | any}
    | ((props: Props) => Store<State>),
  renderProp: (props: Props, state: State) => React.Node,
): StoreView<State, Props> {
  let storeFn: (props: Props) => Store<any>
  let store: Store<any>
  if (isStore(shape)) {
    store = shape
  } else if (typeof shape === 'function') {
    storeFn = shape
  } else {
    invariant(
      typeof shape === 'object' && shape !== null,
      'shape should be store or object with stores',
    )
    const obj = createStoreObject(shape)
    store = obj
  }
  const storeName = store?.shortName ?? 'Unknown'
  const mounted = createEvent(`${storeName}.View mounted`)
  const unmounted = createEvent(`${storeName}.View unmounted`)
  return class RenderComponent extends React.Component<
    Props,
    {currentState: State},
  > {
    static displayName = `${storeName}.View`
    static mounted = mounted
    static unmounted = unmounted
    _unsubscribe: Unsubscribe | null = null
    _hasUnmounted: boolean = false
    store = typeof shape === 'function' ? storeFn(this.props) : store
    state = {currentState: this.store.getState()}
    componentDidMount() {
      mounted({props: this.props, state: this.store.getState()})
      this.subscribe()
    }
    componentWillUnmount() {
      unmounted({props: this.props, state: this.store.getState()})
      this.unsubscribe()
      this._hasUnmounted = true
    }
    render() {
      return renderProp(this.props, this.state.currentState)
    }
    subscribe() {
      this._unsubscribe = this.store.watch((state: State) => {
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
