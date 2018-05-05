//@flow
// import invariant from 'invariant'

import {UNKNOWN} from './status'
import type {Reactor} from './reactors'
import type {Derivation} from './derivation'
import type {Lens} from './lens'
import type {Atom} from './atom'

export function mark<T>(
 node: Atom<T> | Lens<T> | Derivation<T>,
 reactors: Array<Reactor>,
) {
 for (let i = 0, len = node._activeChildren.length; i < len; i++) {
  const child = node._activeChildren[i]
  switch (child._type) {
   case 'DERIVATION':
   case 'LENS':
    if (child._state !== UNKNOWN) {
     ((child: any): Lens<T> | Derivation<T>)._state = UNKNOWN
     mark(((child: any): Lens<T> | Derivation<T>), reactors)
    }
    break
   case 'REACTOR':
    reactors.push(((child: any): Reactor))
    break
  }
 }
}
