import {is, Store} from "effector"
import {onUnmounted, readonly, shallowRef} from "vue-next"

import {createWatch} from "./lib/create-watch"
import {stateReader} from "./lib/state-reader"
import {getScope} from "./lib/get-scope"
import {throwError} from "./lib/throw"

export function useStore<T>(store: Store<T>) {
  if (!is.store(store)) throwError("expect useStore argument to be a store")
  let {scope} = getScope()

  let state = stateReader(store, scope)
  let _ = shallowRef(state)

  let stop = createWatch(
    store,
    (value) => {
      _.value = shallowRef(value).value
    },
    scope
  )

  onUnmounted(() => {
    stop()
  })

  return readonly(_)
}
