import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  watch,
  WatchStopHandle,
} from 'vue-next'
import {createApi, launch, createStore, createEvent} from 'effector'
import {Gate, GateConfig} from './composition.h'
import {deepCopy} from './lib/deepCopy'
import {unwrapProxy} from './lib/unwrapProxy'
import {flattenConfig, processArgsToConfig} from '../effector/config'
import {isObject} from '../effector/is'

export function useGate<Props>(GateComponent: Gate<Props>, cb?: () => Props) {
  let unwatch: WatchStopHandle
  let _: ComputedRef<Props>

  if (cb) {
    _ = computed(cb)

    unwatch = watch(
      _,
      value => {
        const raw = unwrapProxy(value)
        GateComponent.set(deepCopy(raw))
      },
      {
        deep: true,
        immediate: true,
      },
    )
  }

  onMounted(() => {
    const raw = unwrapProxy(_)
    GateComponent.open(deepCopy(raw))
  })

  onUnmounted(() => {
    const raw = unwrapProxy(_)
    GateComponent.close(deepCopy(raw))

    if (unwatch) {
      unwatch()
    }
  })
}

export function isStructuredConfig(args: unknown) {
  return isObject(args) && (args.and || args.or)
}

export function createGate<Props>(...args: [GateConfig<Props>]): Gate<Props> {
  const universalConfig =
    args && isStructuredConfig(args[0]) ? args : [{and: args}]

  const [[rawConfig], metadata] = processArgsToConfig(universalConfig)
  const config = flattenConfig({
    or: metadata,
    and: rawConfig,
  }) as {sid: string | undefined; name: string | undefined}
  const name = config?.name || 'gate'
  const domain = rawConfig?.domain

  const fullName = `${domain ? `${domain.compositeName.fullName}/` : ''}${name}`
  const set = createEvent<Props>({
    name: `${fullName}.set`,
    sid: config.sid ? `${config.sid}|set` : undefined,
  })
  const open = createEvent<Props>({
    name: `${fullName}.open`,
    sid: config.sid ? `${config.sid}|open` : undefined,
  })
  const close = createEvent<Props>({
    name: `${fullName}.close`,
    sid: config.sid ? `${config.sid}|close` : undefined,
  })
  const status = createStore(Boolean(false), {
    name: `${fullName}.status`,
    serialize: 'ignore',
    // doesn't need to have sid, because it is internal store, should not be serialized
  })
  const state = createStore<Props>(rawConfig?.defaultState ?? null, {
    name: `${fullName}.state`,
    sid: config?.sid,
  })

  state.on(set, (_, state) => state)
  status.on(open, () => Boolean(true)).on(close, () => Boolean(false))

  function GateComponent(props: Props) {
    useGate(GateComponent as any, () => props)
  }

  GateComponent.open = open
  GateComponent.close = close
  GateComponent.status = status
  GateComponent.state = state
  GateComponent.set = set

  state.reset(close)

  if (rawConfig?.domain) {
    const {hooks} = rawConfig.domain
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

  // @ts-ignore
  return GateComponent
}
