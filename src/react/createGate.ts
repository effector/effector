import React from 'react'
import {createStore, launch, Store, Domain, createEvent} from 'effector'
import {Gate} from './index.h'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {withDisplayName} from './withDisplayName'
import {flattenConfig, processArgsToConfig} from '../effector/config'
import {isObject} from '../effector/is'

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
) {
  const propsRef = React.useRef<{value: any; count: number}>({
    value: null,
    count: 0,
  })
  useIsomorphicLayoutEffect(() => {
    GateComponent.open(propsRef.current.value)
    return () => GateComponent.close(propsRef.current.value) as any
  }, [GateComponent])
  if (!shallowCompare(propsRef.current.value, props)) {
    propsRef.current.value = props
    propsRef.current.count += 1
  }
  useIsomorphicLayoutEffect(() => {
    GateComponent.set(propsRef.current.value)
  }, [propsRef.current.count])
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
export function createGateImplementation<State>({
  domain,
  defaultState,
  hook: useGateHook,
  mainConfig,
  maybeConfig,
}: {
  domain?: Domain
  defaultState: State | {}
  hook: typeof useGate
  mainConfig?: Record<string, any>
  maybeConfig?: Record<string, any> & {sid?: string}
}): Gate<State> {
  const config = flattenConfig({
    or: maybeConfig,
    and: mainConfig,
  }) as {sid: string | undefined; name: string | undefined}
  const name = config.name || 'gate'
  const fullName = `${domain ? `${domain.compositeName.fullName}/` : ''}${name}`
  const set = createEvent<State>({
    name: `${fullName}.set`,
    sid: config.sid ? `${config.sid}|set` : undefined,
  })
  const open = createEvent<State>({
    name: `${fullName}.open`,
    sid: config.sid ? `${config.sid}|open` : undefined,
  })
  const close = createEvent<State>({
    name: `${fullName}.close`,
    sid: config.sid ? `${config.sid}|close` : undefined,
  })
  const status = createStore(Boolean(false), {
    name: `${fullName}.status`,
    // doesn't need to have sid, because it is internal store, should not be serialized
  })
    .on(open, () => Boolean(true))
    .on(close, () => Boolean(false))
  const state = createStore(defaultState as State, {
    name: `${fullName}.state`,
    sid: config.sid,
  })
    .on(set, (_, state) => state)
    .on(open, (_, state) => state)
    .reset(close)
  if (domain) {
    const {hooks} = domain as any
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
  function GateComponent(props: State) {
    useGateHook(GateComponent as any, props)
    return null
  }
  GateComponent.open = open
  GateComponent.close = close
  GateComponent.status = status
  GateComponent.state = state
  GateComponent.set = set
  return withDisplayName(`Gate:${fullName}`, GateComponent)
}

export function isPluginConfig(config: Record<string, any> | string) {
  return typeof config === 'object' && config !== null && 'sid' in config
}
export function isGateConfig(config: Record<string, any> | string) {
  return (
    typeof config === 'object' &&
    config !== null &&
    ('domain' in config || 'defaultState' in config || 'name' in config)
  )
}

export function createGate<Props>(...args: unknown[]): Gate<Props> {
  const [[nameOrConfig, defaultStateOrConfig], metadata] =
    processArgsToConfig(args)

  let domain
  let defaultState = {}
  let mainConfig = {}
  let maybeConfig = metadata

  if (typeof nameOrConfig === 'string') {
    mainConfig = {name: nameOrConfig}
    if (isPluginConfig(defaultStateOrConfig)) {
      // maybeConfig = defaultStateOrConfig
    } else {
      defaultState = defaultStateOrConfig || {}
    }
  } else if (isGateConfig(nameOrConfig)) {
    mainConfig = nameOrConfig
    defaultState = nameOrConfig.defaultState || {}
    domain = nameOrConfig.domain
  }

  return createGateImplementation<Props>({
    hook: useGate,
    domain,
    defaultState,
    mainConfig,
    maybeConfig,
  })
}
