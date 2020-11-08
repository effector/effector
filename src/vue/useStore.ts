import {Store, Subscription} from 'effector'
import {onMounted, onUnmounted, readonly, shallowRef} from 'vue-next'

export function useStore<T>(store: Store<T>) {
  let unwatch: Subscription
  const _ = shallowRef(store.getState())

  onMounted(() => {
    unwatch = store.updates.watch(value => {
      _.value = shallowRef(value).value
    })
  })

  onUnmounted(() => {
    unwatch()
  })

  return readonly(_)
}
