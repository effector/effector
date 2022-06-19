import {computed, ComputedRef, onMounted, onUnmounted, watch, WatchStopHandle} from 'vue-next'
import {createApi, launch, createStore, sample} from 'effector'
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
    if (typeof _ !== "undefined") {
      const raw = unwrapProxy(_.value)
      GateComponent.open(deepCopy(raw))
    } else {
      GateComponent.open()
    }
  })

  onUnmounted(() => {
    if (typeof _ !== "undefined") {
      const raw = unwrapProxy(_.value)
      GateComponent.close(deepCopy(raw))
    } else {
      GateComponent.close()
    }

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

  sample({ clock: open, target: set })

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
