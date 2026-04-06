import {is, createWatch, Store} from 'effector'
import {onUnmounted, readonly, shallowRef} from 'vue-next'

import {stateReader} from './lib/state-reader'
import {getScope} from './lib/get-scope'
import {throwError} from './lib/throw'
import {useDeprecate} from './lib/useDeprecate'

export function useStore<T>(store: Store<T>) {
  useDeprecate(true, 'useStore', 'useUnit')
  if (!is.store(store)) throwError('expect useStore argument to be a store')
  let {scope} = getScope()

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
