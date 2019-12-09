//@flow

import * as React from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {
  createDomain,
  createApi,
  type Store,
  type Event,
  type Domain,
} from 'effector'

const {store: createStore} = createDomain('Gate')

export type Gate<Props = {||}> = Class<React.Component<Props>> &
  interface {
    isOpen: boolean,
    isTerminated: boolean,
    open: Event<Props>,
    close: Event<Props>,
    status: Store<boolean>,
    destructor: Event<void>,
    current: Props,
    state: Store<Props>,
    set: Event<Props>,
    childGate<Next>(childName?: string): Gate<Next>,
  }

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props?: Props = ({}: any),
) {
  useIsomorphicLayoutEffect(() => {
    GateComponent.open()
    return () => GateComponent.close()
  }, [GateComponent])
  GateComponent.set(props)
}

export function createGate<Props>(
  name: string = 'gate',
  defaultState: Props = ({}: any),
): Gate<Props> {
  const status = createStore(Boolean(false))
  const state: Store<Props> = createStore(defaultState)
  const {set} = createApi(state, {
    set: (_, state) => state,
  })

  const {open, close, destructor} = createApi(status, {
    open: () => GateComponent.predicate() && Boolean(true),
    close: () => Boolean(false),
    destructor: () => Boolean(false),
  })

  class GateComponent extends React.PureComponent<Props> {
    static predicate = () => Boolean(true)

    static displayName = `Gate:${name}`
    static isOpen = Boolean(false)
    static current = state.getState()
    static open = open
    static close = close
    static status = status
    static state = state
    static set = set
    static destructor = destructor
    static isTerminated = Boolean(false)
    static childGate<Next>(childName: string = 'Subgate'): Gate<Next> {
      const gate = createGate(`${name}/${childName}`)
      ;(gate: any).predicate = () => GateComponent.status.getState()
      let isOpen = false
      let isFeedback = false
      gate.open.watch(() => {
        if (!isFeedback) isOpen = true
      })
      gate.close.watch(() => {
        if (!isFeedback) isOpen = false
      })

      GateComponent.status.watch(status => {
        isFeedback = true
        if (isOpen && status && !gate.status.getState()) {
          gate.open()
        }
        isFeedback = false
      })
      GateComponent.close.watch(() => {
        isFeedback = true
        gate.close()
        isFeedback = false
      })
      GateComponent.destructor.watch(() => gate.destructor())
      return gate
    }
    componentDidMount() {
      GateComponent.open(this.props)
    }
    componentWillUnmount() {
      GateComponent.close(this.props)
    }
    render() {
      GateComponent.set(this.props)
      return null
    }
  }
  const unwatch = status.watch(status => (GateComponent.isOpen = status))
  const unwatch2 = state.watch(current => (GateComponent.current = current))
  const unwatch3 = status.map(status => {
    if (!status) GateComponent.current = defaultState
  })
  state.reset(close)

  const setTerminated = destructor.watch(() => {
    GateComponent.isTerminated = Boolean(true)
  })
  const unstate = () => {
    GateComponent.status.off(GateComponent.open)
    GateComponent.status.off(GateComponent.close)
    GateComponent.status.off(GateComponent.destructor)
  }

  const undestruct = destructor.watch(() => {
    undestruct()
    unwatch()
    unwatch2()
    setTerminated()
    unstate()
    GateComponent.state.off(GateComponent.set)
  })
  return GateComponent
}
