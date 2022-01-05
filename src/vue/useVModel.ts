import {Store, is} from "effector"
import {onUnmounted, ref, watch} from "vue-next"

import {unwrapProxy} from "./lib/unwrapProxy"
import {deepCopy} from "./lib/deepCopy"
import {stateReader} from "./lib/state-reader"
import {createWatch} from "./lib/create-watch"
import {getScope} from "./lib/get-scope"

export function useVModel<T>(store: Store<T>) {
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

  watch(
    () => _.value,
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

  return _
}
