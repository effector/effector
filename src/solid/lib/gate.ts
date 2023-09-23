import {Gate} from '../index.h'
import {createEvent, createStore, Domain, launch} from 'effector'
import {onCleanup, onMount, createEffect} from 'solid-js'
import {flattenConfig, processArgsToConfig} from '../../effector/config'
import {isObject} from '../../effector/is'
import {useUnitBase} from './base'
import {getScope} from './get-scope'

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
) {
  const {open, close, set} = useUnitBase(
    {
      open: GateComponent.open,
      close: GateComponent.close,
      set: GateComponent.set,
    },
    getScope(false),
  )

  onMount(() => {
    open(props)

    onCleanup(() => close(props))
  })

  createEffect(() => {
    // read every getter in props to subscribe
    for (const _ of Object.values(props)) {
    }
    set(props)
  })
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
    serialize: 'ignore',
    // doesn't need to have sid, because it is internal store, should not be serialized
  })
    .on(open, () => Boolean(true))
    .on(close, () => Boolean(false))
  const state = createStore(defaultState as State, {
    name: `${fullName}.state`,
    sid: config.sid,
  })
    .on(set, (_, state) =>
      Object.create(
        Object.getPrototypeOf(state),
        Object.getOwnPropertyDescriptors(state),
      ),
    )
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
  GateComponent.displayName = `Gate:${fullName}`

  return GateComponent
}

export function isPluginConfig(config: Record<string, any> | string) {
  return isObject(config) && 'sid' in config
}

export function isGateConfig(config: Record<string, any> | string) {
  return (
    isObject(config) &&
    ('domain' in config || 'defaultState' in config || 'name' in config)
  )
}

export function isStructuredConfig(args: unknown) {
  return isObject(args) && (args.and || args.or)
}

export function createGate<Props>(...args: unknown[]): Gate<Props> {
  const universalConfig =
    args && isStructuredConfig(args[0]) ? args : [{and: args}]
  const [[nameOrConfig, defaultStateOrConfig], metadata] =
    processArgsToConfig(universalConfig)

  let domain
  let defaultState: Props = {} as any
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

  return createGateImplementation({
    hook: useGate,
    domain,
    defaultState,
    mainConfig,
    maybeConfig,
  })
}
