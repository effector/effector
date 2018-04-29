//@flow

import * as React from 'react'

import type {Store} from 'effector'

export function createReactState<State>(
 store: Store<State>,
): {
 Provider: React.ComponentType<{children: React.Node}>,
 Consumer: React.ComponentType<{
  children: (current: {
   value: State,
   ref: Store<State>,
  }) => React.Node,
 }>,
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
   },
  },
 > {
  state = {
   current: {
    value: store.getState(),
    ref: store,
   },
  }
  componentDidMount() {
   store.watch(value => this.setState({current: {value, ref: store}}))
  }
  render() {
   return <Provider value={this.state.current}>{this.props.children}</Provider>
  }
 }

 return {
  Provider: StoreProvider,
  Consumer,
 }
}

export function createStoreComponent<
 State: Object,
 Com: React.ComponentType<*>,
>(
 store: Store<State>,
 Component: Com,
): React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
 const {Provider, Consumer} = createReactState(store)
 const ConnectedComponent = props => (
  <Provider>
   <Consumer>{({value}) => <Component {...props} {...value} />}</Consumer>
  </Provider>
 )
 ConnectedComponent.displayName = `Connect(${Component.displayName
  || 'Unknown'})`
 return ConnectedComponent
}

export function connect<State: Object, Com: React.ComponentType<*>>(
 Component: Com,
): (
 store: Store<State>,
) => React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
 return store => createStoreComponent(store, Component)
}
