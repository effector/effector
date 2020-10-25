import {DeepReadonly, Ref, UnwrapRef} from '@vue/reactivity'
import {Store} from 'effector'

type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>

export function useStore<T>(store: Store<T>): DeepReadonly<UnwrapNestedRefs<T>>
export function useModel<T>(store: Store<T>): Ref<UnwrapRef<T>>
