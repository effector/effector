//@flow

import * as React from 'react'

import type {Store} from 'effector'

import type {StoreProvider} from './index.h'

export function unstable_createStoreProvider<State>(
  store: Store<State>,
): StoreProvider<State> {
  return class StoreProvider extends React.Component<
    {
      value: State,
      children: React.Node,
    },
    {
      currentValue: React.Node,
    },
  > {
    static displayName = `${store.shortName}.Provider`
    static defaultProps = {
      children: null,
    }
    state = {
      currentValue: null,
    }
    static getDerivedStateFromProps(props) {
      //$off
      store.setState(props.value)
      return {
        currentValue: props.value,
      }
    }
    render() {
      return this.props.children
    }
  }
}
