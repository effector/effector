//@flow
// import invariant from 'invariant'

import {UNKNOWN} from './status'
import * as Kind from '../kind'
import type {Reactor} from './reactors'
import type {Derivation} from './derivation'
import type {Lens} from './lens'
import type {Atom} from './atom'

export function mark<T>(
 node: Atom<T> | Lens<T> | Derivation<T>,
 reactors: Array<Reactor>,
) {
 for (let i = 0, len = node.activeChildren.length; i < len; i++) {
  const child = node.activeChildren[i]
  switch (
   Kind.readKind(child) //TODO Where is Atom?
  ) {
   case Kind.DERIVATION:
   case Kind.LENS:
    if (child.status !== UNKNOWN) {
     ((child: any): Lens<T> | Derivation<T>).status = UNKNOWN
     mark(((child: any): Lens<T> | Derivation<T>), reactors)
    }
    break
   case Kind.REACTOR:
    reactors.push(((child: any): Reactor))
    break
  }
 }
}
