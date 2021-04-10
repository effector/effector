import {Store} from 'effector'
import {onUnmounted, readonly, shallowRef} from 'vue-next'

export function useStore<T>(store: Store<T>) {
  const _ = shallowRef(store.getState())

  const unwatch = store.updates.watch(value => {
    _.value = shallowRef(value).value
  })

  onUnmounted(() => {
    unwatch()
  })

  return readonly(_)
}
