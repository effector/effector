import {Store} from 'effector'
import {ref} from '@vue/reactivity'

export function useStore<T>(store: Store<T>): T {
  const _ = ref(store.getState())
  return store.getState()
}
