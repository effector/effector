import {
  MaybeRefOrGetter,
  getCurrentInstance,
  onMounted,
  toValue,
  watch,
} from 'vue-next'
import {launch, createStore, createEvent, sample} from 'effector'
import {Gate, GateConfig} from './composition.h'
import {deepCopy} from './lib/deepCopy'
import {unwrapProxy} from './lib/unwrapProxy'
import {tryOnScopeDispose} from './lib/dispose'
import {ScopeOptions} from './lib/get-scope'
import {isServerRender} from './lib/ssr'
import {useUnitBase} from './useUnit'
import {flattenConfig, processArgsToConfig} from '../effector/config'
import {isObject} from '../effector/is'

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props?: MaybeRefOrGetter<Props>,
  opts?: ScopeOptions,
) {
  const gate = useUnitBase(
    'useGate',
    {
      open: GateComponent.open,
      close: GateComponent.close,
      set: GateComponent.set,
    } as any,
    opts,
  ) as Record<string, (payload?: any) => any>

  /**
   * A server render has no unmount to close the gate in, so a gate opened
   * there stays open and its state reaches the client through `serialize`.
   * effector-react opens its gate in a layout effect, and the server does
   * not run it, so its gate stays closed too.
   */
  if (isServerRender()) return

  const withProps = (fn: (payload?: any) => any) => () => {
    if (props === undefined) return fn()
    fn(deepCopy(unwrapProxy(toValue(props))))
  }

  let opened = false
  const openGate = () => {
    opened = true
    withProps(gate.open)()
  }

  const watchProps = () => {
    if (props === undefined) return
    /**
     * Not `immediate`: `open` carries the props already and the gate samples
     * them into `set` on its own. The watcher reports what changes after
     * that, so a mount runs one `set` and never writes the state of a gate
     * that is still closed.
     */
    watch(
      () => toValue(props),
      value => gate.set(deepCopy(unwrapProxy(value))),
      /**
       * `Boolean(true)` survives the build. A bare `true` ships as `1`, and
       * Vue 3.5 reads a numeric `deep` as the depth to traverse.
       */
      {deep: Boolean(true)},
    )
  }

  /**
   * Inside a component the gate opens on mount, the way effector-react and
   * effector-solid do, and the watcher starts there too: a props change
   * while an async setup waits for its data would otherwise reach `set`
   * before the mount opens the gate. Without a component instance there is
   * no mount to wait for, so the gate opens during the call.
   */
  if (getCurrentInstance()) {
    onMounted(() => {
      openGate()
      watchProps()
    })
  } else {
    openGate()
    watchProps()
  }

  /**
   * A component can be dropped before it mounts, an abandoned `<Suspense>`
   * branch for one, and its effect scope is disposed all the same. Closing a
   * gate that never opened would reset the state of whoever holds it open.
   */
  tryOnScopeDispose('useGate', () => {
    if (!opened) return
    withProps(gate.close)()
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

  sample({clock: open, target: set})

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
