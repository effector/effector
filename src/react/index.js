//@flow

import * as React from 'react'

import type {Store} from '@effector/effector'

export function createReactState<State>(store: Store<State>): {
  Provider: React$ComponentType<any>,
  Consumer: React$ComponentType<{children: (current: {
    value: State,
    ref: Store<State>,
  }) => React$Node}>
} {
 const {Provider, Consumer} = React.createContext({
  value: store.getState(),
  ref: store,
 })

 class StoreProvider extends React.Component<
  {
   children: React.Node,
  },
  { 
    current: {
      value: State,
      ref: Store<State>,
    }
  },
 > {
  componentDidMount() {
   //store.watch(value => this.setState({current: {value}}))
  }
  render() {
   return (
    <Provider value={this.state.current}>
     {this.props.children}
    </Provider>
   )
  }
 }

 return {
  Provider: StoreProvider, 
  Consumer,
 }
}
