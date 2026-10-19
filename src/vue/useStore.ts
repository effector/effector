import {is, Store} from 'effector'
import {DeepReadonly, Ref} from 'vue-next'

import {ScopeOptions} from './lib/get-scope'
import {throwError} from './lib/throw'
import {useUnitBase} from './useUnit'

export function useStore<T>(store: Store<T>, opts?: ScopeOptions) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  return useUnitBase('useStore', store as any, opts) as DeepReadonly<Ref<T>>
}
