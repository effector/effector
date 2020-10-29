import {Store, Subscription} from 'effector'
import {readonly, shallowRef} from '@vue/reactivity'
import {onMounted, onUnmounted} from '@vue/runtime-core'

export function useStore<T>(store: Store<T>) {
  let unwatch: Subscription
  const _ = shallowRef(store.getState())

  onMounted(() => {
    unwatch = store.watch(value => {
      _.value = value
    })
  })

  onUnmounted(() => {
    unwatch()
  })

  return readonly(_)
}
