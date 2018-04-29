//@flow

import {removeFromArray} from './util'
import {DISCONNECTED} from './states'
import type {Derivation} from './derivation'
import type {Reactor} from './reactors'

export function detach(
 parent: Derivation<*>,
 child: Derivation<any> | Reactor,
) {
 removeFromArray(parent._activeChildren, child)
 if (parent._activeChildren.length !== 0 || parent._parents == null) return
 for (let i = 0; i < parent._parents.length; i++) {
  detach(parent._parents[i], parent)
 }
 parent._parents = null
 parent._state = DISCONNECTED
}
