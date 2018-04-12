//@flow

import type {Key} from './key'
export type {Key} from './key'
export type {Emission} from './instance'

export type Private<T> = WeakMap<Key, T>
export type PrivateRef<T> = Private<Private<T>>
export type PrivateSet<T> = Private<Set<T>>
export type PrivateSetRef<T> = Private<PrivateSet<T>>
