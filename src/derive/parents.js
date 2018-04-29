//@flow

import {addToArray} from './util'
import type {Derivation} from './derivation'
import type {Atom} from './atom'
const parentsStack = []
let child = null

export function startCapturingParents(
 _child: Derivation<any> | void,
 parents: Array<Derivation<any> | Atom<any>>,
) {
 parentsStack.push({parents, offset: 0, child: _child})
 child = _child
}
export function retrieveParentsFrame() {
 return parentsStack[parentsStack.length - 1]
}
export function stopCapturingParents() {
 parentsStack.pop()
 child =
  parentsStack.length === 0 ? null : parentsStack[parentsStack.length - 1].child
}

export function maybeCaptureParent(p: Derivation<any> | Atom<any>) {
 if (child === null) return
 const frame = parentsStack[parentsStack.length - 1]
 if (frame.parents[frame.offset] === p) {
  // nothing to do, just skip over
  frame.offset++
  return
 }
 // look for this parent elsewhere
 const index = frame.parents.indexOf(p)
 if (index !== -1) {
  // else seen this parent at previous point and so don't increment offset
  if (index <= frame.offset) return
  // seen this parent after current point in array, so swap positions
  // with current point's parent
  const tmp = frame.parents[index]
  frame.parents[index] = frame.parents[frame.offset]
  frame.parents[frame.offset] = tmp
  frame.offset++
  return
 }

 // not seen this parent yet, add it in the correct place
 // and push the one currently there to the end (likely that we'll be
 // getting rid of it)
 // sneaky hack for doing captureDereferences
 if (child !== undefined) {
  addToArray(p._activeChildren, child)
 }
 if (frame.offset === frame.parents.length) {
  frame.parents.push(p)
 } else {
  frame.parents.push(frame.parents[frame.offset])
  frame.parents[frame.offset] = p
 }
 frame.offset++
}

export function captureDereferences(
 f: () => any,
): Array<Derivation<any> | Atom<any>> {
 const captured = []
 startCapturingParents(undefined, captured)
 try {
  f()
 } finally {
  stopCapturingParents()
 }
 return captured
}
