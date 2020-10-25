import {Store, Subscription} from 'effector'
import {isReactive, readonly, shallowRef, toRaw, unref} from '@vue/reactivity'
import {onMounted, onUnmounted, ref, watch} from '@vue/runtime-core'

export function useStore<T>(store: Store<T>) {
  let unwatch: Subscription
  const _ = shallowRef(store.getState())

  onMounted(() => {
    unwatch = store.watch((value) => {
      _.value = value
    })
  })

  onUnmounted(() => {
    unwatch()
  })

  return readonly(_)
}

export function useModel<T>(store: Store<T>) {
  const _ = ref(store.getState())

  let isSelfUpdate = false
  let fromEvent = false
  let unwatch: Subscription

  onMounted(() => {
    unwatch = store.updates.watch((payload) => {
      if (isSelfUpdate) {
        return
      }

      fromEvent = true
      _.value = ref(payload).value
    })
  })

  onUnmounted(() => {
    unwatch()
  })

  watch(
    () => _.value,
    (value) => {
      isSelfUpdate = true

      if (!fromEvent) {
        const unrefValue = unref(value)
        const pureValue = isReactive(unrefValue) ? toRaw(unrefValue) : unrefValue

        if (Array.isArray(pureValue)) {
          // @ts-ignore
          store.setState([...pureValue])
        } else if (typeof pureValue === 'object' && pureValue !== null) {
          // @ts-ignore
          store.setState({...pureValue})
        } else {
          // @ts-ignore
          store.setState(pureValue)
        }
      }

      fromEvent = false
      isSelfUpdate = false
    },
    {deep: true, immediate: false}
  )

  return _
}
