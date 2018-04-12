//@flow

import type {Emittery} from './instance'
export type {Emittery} from './instance'

export type SideEffect = () => void
export type LongCb = (_: any, eventName: Emittery) => any

export type SetMap<K, V> = {
 get(key: K): V | void,
 set(key: K, value: V): SetMap<K, V>,
}

export type Private<T> = WeakMap<Emittery, T>
export type PrivateRef<T> = Private<Private<T>>
export type PrivateSet<T> = Private<Set<T>>
export type PrivateSetRef<T> = Private<PrivateSet<T>>
