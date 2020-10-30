import {computed, ComputedRef} from '@vue/reactivity'
import {onMounted, onUnmounted, watch, WatchStopHandle} from '@vue/runtime-core'
import {createApi, launch, createStore} from 'effector'
import {Gate, GateConfig} from './composition.h'
import {deepCopy} from './lib/deepCopy'
import {unwrapProxy} from './lib/unwrapProxy'

export function useGate<Props>(GateComponent: Gate<Props>, cb?: () => Props) {
  let unwatch: WatchStopHandle
  let _: ComputedRef<Props>

  if (cb) {
    _ = computed(cb)

    unwatch = watch(
      _,
      (value) => {
        const raw = unwrapProxy(value)
        GateComponent.set(deepCopy(raw))
      },
      {
        deep: true,
        immediate: true,
      }
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

export function createGate<Props>(config?: GateConfig<Props>): Gate<Props> {
  // @ts-ignore
  const state = createStore(config?.defaultState ?? null, {named: 'state'})
  // @ts-ignore
  const status = createStore(Boolean(false), {named: 'status'})

  const {set} = createApi(state, {
    set: (_, state) => state,
  })

  const {open, close} = createApi(status, {
    open: () => Boolean(true),
    close: () => Boolean(false),
  })

  function GateComponent(props: Props) {
    useGate(GateComponent as any, () => props)
  }

  GateComponent.open = open
  GateComponent.close = close
  GateComponent.status = status
  GateComponent.state = state
  GateComponent.set = set

  state.reset(close)

  if (config?.domain) {
    // @ts-ignore
    const {hooks} = config.domain
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
