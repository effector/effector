import {Store, is, createWatch} from 'effector'
import {type EffectScope, reactive, ref, watch, effectScope, onScopeDispose, toRaw, Reactive} from 'vue-next'

import {deepCopy} from './lib/deepCopy'
import {stateReader} from './lib/state-reader'
import {getScope} from './lib/get-scope'
import {UseVModel} from 'effector-vue/composition'

function createVModel<T>(
  store: Store<T>,
  key?: string,
  shape?: Record<string, unknown>,
) {
  if (!is.store(store)) throw Error('expect useVModel argument to be a store')

  const {scope} = getScope()

  const _ = ref(deepCopy(stateReader(store, scope)))

  let isSelfUpdate = false
  let fromEvent = false

  const stop = createWatch({
    unit: store,
    fn: payload => {
      if (isSelfUpdate) {
        return
      }

      fromEvent = true
      _.value = deepCopy(payload)
    },
    scope,
  })

  onScopeDispose(() => {
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
    value => {
      isSelfUpdate = true

      if (!fromEvent) {
        // @ts-ignore
        store.setState(deepCopy(toRaw(value)))
      }

      fromEvent = false
      isSelfUpdate = false
    },
    {deep: true}
  )

  return _
}

// @ts-expect-error
export const useVModel: UseVModel = <
  T,
  K extends string = keyof Store<unknown>,
>(
  vm: Store<T> | Record<K, Store<T>>,
  scope?: EffectScope
) => {
  const vueScope = scope || effectScope()

  return vueScope.run(() => {
    const _ = reactive({}) as Reactive<Record<string, unknown>>

    if (is.store(vm)) {
      return createVModel(vm)
    }

    const shape = Object.fromEntries(
      Object.entries<Store<T>>(vm).map(([key, value]) => [
        key,
        createVModel(value, key, _)
      ]),
    )

    for (const key in shape) {
      _[key] = shape[key]
    }

    return _
  })
}
