import React from 'react'
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
  //@ts-ignore
  const status = createStore(Boolean(false), {named: 'status'})
  //@ts-ignore
  const state: Store<Props> = createStore(defaultState, {named: 'state'})
  const {set} = createApi(state, {
    set: (_, state) => state,
  })

  const {open, close} = createApi(status, {
    open: () => Boolean(true),
    close: () => Boolean(false),
  })
  function GateComponent(props: Props) {
    useGate(GateComponent as any, props)
    return null
  }
  GateComponent.open = open
  GateComponent.close = close
  GateComponent.status = status
  GateComponent.state = state
  GateComponent.set = set
  state.reset(close)

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
