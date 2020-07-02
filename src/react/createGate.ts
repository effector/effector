import * as React from 'react'
import {createStore, createApi, launch, Store} from 'effector'
import {Gate} from './index.h'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {withDisplayName} from './withDisplayName'

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
) {
  const propsRef = React.useRef<any>(null)
  useIsomorphicLayoutEffect(() => {
    GateComponent.open(propsRef.current)
    return () => GateComponent.close(propsRef.current) as any
  }, [GateComponent])
  if (!shallowCompare(propsRef.current, props)) {
    propsRef.current = props
    GateComponent.set(props)
  }
}

function shallowCompare(a: any, b: any) {
  if (a === b) return true
  if (
    typeof a === 'object' &&
    a !== null &&
    typeof b === 'object' &&
    b !== null
  ) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false
    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i]
      if (a[key] !== b[key]) return false
    }
    return true
  }
  return false
}

export function createGate<Props>(
  name: string = 'gate',
  defaultState: Props = {} as any,
): Gate<Props> {
  let domain
  if (typeof name === 'object' && name !== null) {
    if ('defaultState' in name) {
      //@ts-ignore
      defaultState = name.defaultState
    }
    //@ts-ignore
    if (name.domain) domain = name.domain
    //@ts-ignore
    name = name.name || 'gate'
  }
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
  function GateComponent(props: Props) {
    useGate(GateComponent as any, props)
    return null
  }
  GateComponent.predicate = () => Boolean(true)
  GateComponent.isOpen = Boolean(false)
  GateComponent.current = state.getState()
  GateComponent.open = open
  GateComponent.close = close
  GateComponent.status = status
  GateComponent.state = state
  GateComponent.set = set
  GateComponent.destructor = destructor
  GateComponent.isTerminated = Boolean(false)
  GateComponent.childGate = (childName: string = 'Subgate') => {
    console.error('childGate is deprecated')
    const gate = createGate(`${name}/${childName}`)
    ;(gate as any).predicate = () => GateComponent.status.getState()
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
  const unwatch = status.watch(status => (GateComponent.isOpen = status))
  const unwatch2 = state.watch(current => (GateComponent.current = current))
  const unwatch3 = status.map(status => {
    if (!status) GateComponent.current = defaultState
    return null
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
  if (domain) {
    const {hooks} = domain
    launch({
      target: [
        hooks.store,
        hooks.store,
        hooks.event,
        hooks.event,
        hooks.event,
      ] as any,
      params: [status, state, open, close, set],
    })
  }
  return withDisplayName(`Gate:${name}`, GateComponent)
}
