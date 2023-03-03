import {createStore, launch, Domain, createEvent} from 'effector'
import {Gate} from './index.h'
import {withDisplayName} from './withDisplayName'
import {useGateBase} from './apiBase'
import {flattenConfig, processArgsToConfig} from '../effector/config'
import {isObject} from '../effector/is'

export function createGateImplementation<State>({
  domain,
  defaultState,
  hook: useGateHook,
  mainConfig,
  maybeConfig,
}: {
  domain?: Domain
  defaultState: State | {}
  hook: typeof useGateBase
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

const isPluginConfig = (config: Record<string, any> | string) =>
  isObject(config) && 'sid' in config

const isGateConfig = (config: Record<string, any> | string) =>
  isObject(config) &&
  ('domain' in config || 'defaultState' in config || 'name' in config)

const isStructuredConfig = (arg: unknown) =>
  isObject(arg) && (arg.and || arg.or)

export function processCreateGateConfig<State>(
  hook: typeof useGateBase,
  args: unknown[],
): {
  domain?: Domain
  defaultState: State | {}
  hook: typeof useGateBase
  mainConfig?: Record<string, any>
  maybeConfig?: Record<string, any> & {sid?: string}
} {
  const universalConfig =
    args && isStructuredConfig(args[0]) ? args : [{and: args}]
  const [[nameOrConfig, defaultStateOrConfig], metadata] =
    processArgsToConfig(universalConfig)

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
  return {
    hook,
    domain,
    defaultState,
    mainConfig,
    maybeConfig,
  }
}

export function createGate<Props>(...args: unknown[]): Gate<Props> {
  return createGateImplementation<Props>(
    processCreateGateConfig(useGateBase, args),
  )
}
