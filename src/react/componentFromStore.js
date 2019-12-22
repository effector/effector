//@flow

import * as React from 'react'
import {
  createEvent,
  createStore,
  type Event,
  type Store,
  type Subscription,
} from 'effector'

export function componentFromStore<Props: {...}>(
  propsToVdom: (props: Store<Props>) => Store<React.Node>,
) {
  class ComponentFromStore extends React.Component<Props, {vdom: React.Node, ...}> {
    state /*: {vdom: React.Node, ...}*/ = {vdom: null}

    propsEmitter: Event<Props> = createEvent()

    // Stream of props
    props$: Store<Props> = createStore((null: any))
      .on(this.propsEmitter, (_, props) => props)
      .map(props => {
        if (props) return props
        /*::return props*/
      })

    // Stream of vdom
    vdom$ = propsToVdom(this.props$)

    subscription: Subscription

    componentWillMount() {
      // Subscribe to child prop changes so we know when to re-render
      this.subscription = this.vdom$.watch(vdom => {
        this.setState({vdom})
      })
      this.propsEmitter(this.props)
    }

    componentWillReceiveProps(nextProps: Props) {
      // Receive new props from the owner
      this.propsEmitter(nextProps)
    }

    shouldComponentUpdate(
      nextProps: Props,
      nextState /*: {vdom: React.Node, ...}*/,
    ) {
      return nextState.vdom !== this.state.vdom
    }

    componentWillUnmount() {
      this.props$.off(this.propsEmitter)
      this.subscription.unsubscribe()
    }

    render() {
      return this.state.vdom
    }
  }
  return ComponentFromStore
}
