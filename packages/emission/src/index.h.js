//@flow

import type {Emittery} from './instance'
export type {Emittery} from './instance'

export type SideEffect = () => void
export type LongCb = (_: any, eventName: Emittery) => any

export type SetMap<K, V> = {
 get(key: K): V | void,
 set(key: K, value: V): SetMap<K, V>,
}
