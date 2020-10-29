import {Store, Subscription} from 'effector'
import {onMounted, onUnmounted, ref, watch} from '@vue/runtime-core'
import {unwrapProxy} from './lib/unwrapProxy'
import {deepCopy} from './lib/deepCopy'

export function useModel<T>(store: Store<T>) {
  const _ = ref(store.getState())

  let isSelfUpdate = false
  let fromEvent = false
  let unwatch: Subscription

  onMounted(() => {
    unwatch = store.updates.watch(payload => {
      if (isSelfUpdate) {
        return
      }

      fromEvent = true
      // @ts-ignore
      _.value = deepCopy(payload)
    })
  })

  onUnmounted(() => {
    unwatch()
  })

  watch(
    () => _.value,
    value => {
      isSelfUpdate = true

      if (!fromEvent) {
        const raw = unwrapProxy(value)
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
