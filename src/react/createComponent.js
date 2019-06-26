//@flow

import * as React from 'react'
import {type Store, is, createStoreObject, createEvent} from 'effector'
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
  if (is.store(shape)) {
    store = (shape: any)
  } else if (typeof shape === 'function') {
    storeFn = shape
  } else {
    if (typeof shape === 'object' && shape !== null) {
      store = createStoreObject(shape)
    } else throw Error('shape should be a store or object with stores')
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
