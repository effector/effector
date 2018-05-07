//@flow

import type {Derivation} from './derivation'
import type {Atom} from './atom'
import type {Lens} from './lens'
export type Box<A> = Lens<A> | Atom<A> | Derivation<A>

export type Readable<T> = {
 get(): T,
}

export type LensDescriptor<T> = {
 get(): T,

 set(value: T): void,
}

export type Lifecycle<T> = {
 +from?: ((d: Derivation<T>) => boolean) | Atom<boolean> | Derivation<boolean>,

 +when?: ((d: Derivation<T>) => boolean) | Atom<boolean> | Derivation<boolean>,

 +until?: ((d: Derivation<T>) => boolean) | Atom<boolean> | Derivation<boolean>,

 +skipFirst?: boolean,

 +once?: boolean,
}
