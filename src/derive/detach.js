//@flow

import {removeFromArray} from './util'
import {DISCONNECTED} from './states'

export function detach(parent: *, child: *) {
 removeFromArray(parent._activeChildren, child)
 if (parent._activeChildren.length === 0 && parent._parents != null) {
  const len = parent._parents.length
  for (let i = 0; i < len; i++) {
   detach(parent._parents[i], parent)
  }
  parent._parents = null
  parent._state = DISCONNECTED
 }
}
