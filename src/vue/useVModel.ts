import {Store, is, createStore} from "effector"
import {onUnmounted, reactive, Ref, ref, watch} from "vue-next"

import {unwrapProxy} from "./lib/unwrapProxy"
import {deepCopy} from "./lib/deepCopy"
import {stateReader} from "./lib/state-reader"
import {createWatch} from "./lib/create-watch"
import {getScope} from "./lib/get-scope"
import { UseVModel } from "effector-vue/composition"

function createVModel<T>(store: Store<T>, key?: string, shape?: Record<string, unknown>) {
  if (!is.store(store)) throw Error("expect useVModel argument to be a store")

  let {scope} = getScope()

  let _ = ref(
    deepCopy(stateReader(store, scope))
  )

  let isSelfUpdate = false
  let fromEvent = false

  let stop = createWatch(
    store,
    (payload) => {
      if (isSelfUpdate) {
        return
      }

      fromEvent = true
      _.value = ref(deepCopy(payload)).value
    },
    scope
  )

  onUnmounted(() => {
    stop()
  })

  const watchFn = () => {
    if (key && shape) {
      return shape[key]
    }
    return _.value
  }

  watch(
    watchFn,
    (value) => {
      isSelfUpdate = true

      if (!fromEvent) {
        let raw = ref(unwrapProxy(value)).value
        // @ts-ignore
        store.setState(deepCopy(raw))
      }

      fromEvent = false
      isSelfUpdate = false
    },
    {deep: true, immediate: false},
  )

  return _ as Ref<T>
}

function isStore<T,>(arg: Store<T> | Record<string, unknown>): arg is Store<T> {
  return is.store(arg)
}

// @ts-expect-error
export const useVModel: UseVModel = <T, K extends string = keyof Store<unknown>>(vm: Store<T> | Record<K, Store<T>>) => {
  if (isStore(vm)) {
    return createVModel(vm)
  }

  const _ = reactive({})

  const shape = Object.fromEntries(
    Object.entries<Store<T>>(vm).map(([key, value]) => [key, createVModel(value, key, _)])
  )

  for (const key in shape) {
    // @ts-ignore
    _[key] = shape[key]
  }

  return _
}
