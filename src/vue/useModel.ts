import {Store, Subscription} from 'effector'
import {onMounted, onUnmounted, ref, watch} from 'vue-next'
import {unwrapProxy} from './lib/unwrapProxy'
import {deepCopy} from './lib/deepCopy'

export function useModel<T>(store: Store<T>) {
  const _ = ref(deepCopy(store.getState()))

  let isSelfUpdate = false
  let fromEvent = false
  let unwatch: Subscription

  onMounted(() => {
    unwatch = store.updates.watch(payload => {
      if (isSelfUpdate) {
        return
      }

      fromEvent = true
      _.value = ref(deepCopy(payload)).value
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
        const raw = ref(unwrapProxy(value)).value
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
