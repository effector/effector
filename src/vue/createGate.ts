import {
  computed,
  ComputedRef,
  onMounted,
  onUnmounted,
  watch,
  WatchStopHandle,
} from 'vue-next'
import {
  createApi,
  launch,
  createStore,
  createEvent,
  sample,
  scopeBind,
  Scope,
  EventCallable,
} from 'effector'
import {Gate, GateConfig} from './composition.h'
import {deepCopy} from './lib/deepCopy'
import {unwrapProxy} from './lib/unwrapProxy'
import {ScopeOptions, resolveScope} from './lib/get-scope'
import {flattenConfig, processArgsToConfig} from '../effector/config'
import {isObject} from '../effector/is'

const bindToScope = (
  event: EventCallable<any>,
  scope: Scope | undefined,
): ((payload?: any) => any) => (scope ? scopeBind(event, {scope}) : event)

export function useGate<Props>(
  GateComponent: Gate<Props>,
  cb?: () => Props,
  opts?: ScopeOptions,
) {
  let unwatch: WatchStopHandle
  let _: ComputedRef<Props>

  const scope = resolveScope('useGate', opts)
  const open = bindToScope(GateComponent.open as EventCallable<any>, scope)
  const close = bindToScope(GateComponent.close as EventCallable<any>, scope)
  const set = bindToScope(GateComponent.set as EventCallable<any>, scope)

  if (cb) {
    _ = computed(cb)

    unwatch = watch(
      _,
      value => {
        const raw = unwrapProxy(value)
        set(deepCopy(raw))
      },
      {
        /**
         * `Boolean(true)` survives the build. A bare `true` ships as `1`, and Vue
         * 3.5 reads a numeric `deep` as the depth to traverse.
         */
        deep: Boolean(true),
        immediate: true,
      },
    )
  }

  onMounted(() => {
    if (typeof _ !== "undefined") {
      const raw = unwrapProxy(_.value)
      open(deepCopy(raw))
    } else {
      open()
    }
  })

  onUnmounted(() => {
    if (typeof _ !== "undefined") {
      const raw = unwrapProxy(_.value)
      close(deepCopy(raw))
    } else {
      close()
    }

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

  sample({ clock: open, target: set })

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
