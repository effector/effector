import {is, createWatch, Store} from 'effector'
import {onUnmounted, readonly, shallowRef} from 'vue-next'

import {stateReader} from './lib/state-reader'
import {ScopeOptions, resolveScope} from './lib/get-scope'
import {throwError} from './lib/throw'

export function useStore<T>(store: Store<T>, opts?: ScopeOptions) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')
  let scope = resolveScope('useStore', opts) ?? undefined

  let state = stateReader(store, scope)
  let _ = shallowRef(state)

  let stop = createWatch({
    unit: store,
    fn: value => {
      _.value = shallowRef(value).value
    },
    scope,
  })

  onUnmounted(() => {
    stop()
  })

  return readonly(_)
}
