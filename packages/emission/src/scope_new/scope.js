//@flow

import type {Key, PrivateSet, PrivateSetRef} from './index.h'

export class Scope {
 dispatchRef: PrivateSetRef<(_: any) => any> = new WeakMap()
 dispatchSet: PrivateSet<Key> = new WeakMap()
}
