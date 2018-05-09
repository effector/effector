//@flow

import {removeFromArray} from './util'
import {DISCONNECTED} from './status'
import type {Derivation} from './derivation'
import type {Reactor} from './reactors'
import type {Box} from './index.h'

export function detach(
 parent: Derivation<*>,
 child: Derivation<any> | Reactor,
) {
 removeFromArray(parent.activeChildren, child)
 if (parent.parents == null) return
 if (parent.activeChildren.length !== 0) return
 for (let i = 0; i < parent.parents.length; i++) {
  detach(parent.parents[i], parent)
 }
 parent.parents = null
 parent.status = DISCONNECTED
}
