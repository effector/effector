//@noflow

import type {Derivable} from '../derive'
import {isDerivable} from '../derive/types'
import * as Kind from '../kind'
import type {Store} from '../store/index.h'
export type RootValue = -2
export type OpaqueValue = -1
export type NoValue = 0
export type PlainValue = 1
export type DerivedValue = 2
export type StoreValue = 3
export type StoreObjectValue = 4
export type StoreArrayValue = 5

// type RootNode = 1
// type MiddleNode = 2
// type NodeType = RootNode | MiddleNode
export type Segment =
 | [PlainValue, void]
 | [RootValue, () => any]
 | [DerivedValue, void]
 | [NoValue, void]
 | [StoreValue, void]
 | [StoreObjectValue, string]
 | [StoreArrayValue, number]
type ValueElement = Segment | [OpaqueValue, any]

type Path = ValueElement[]
type StateTree = [ValueElement, Path]

function goDeep(
 nextElement: ValueElement,
 [element, path]: StateTree,
): StateTree {
 return [nextElement, [...path, element]]
}
function flatten([element, path]: StateTree): Path {
 return [...path, element] //.filter(e => e.type !== -1)
}

function storeType(thing: any, stateTree: StateTree): StateTree[] {
 const currentTree = stateTree /* goDeep(
  {
   type: (-1: OpaqueValue),
   value: thing,
  },
  stateTree,
 )*/
 if (thing === undefined || thing === null)
  return [goDeep([(0: NoValue) /*::, undefined*/], currentTree)]
 if (isDerivable(thing)) {
  return storeTypeDerive(thing, currentTree)
 }
 if (Kind.isStore(thing)) {
  return storeTypeStore(thing, currentTree)
 }
 if (Array.isArray(thing)) {
  return storeTypeArray(thing, currentTree)
 }
 if (thing.constructor === Object) {
  return storeTypeObject(thing, currentTree)
 }
 return [goDeep([(1: PlainValue) /*::, undefined*/], stateTree)]
}
function storeTypeDerive(thing: Derivable<any>, stateTree: StateTree) {
 return storeType(
  thing.get(),
  goDeep([(2: DerivedValue) /*::, undefined*/], stateTree),
 )
}
function storeTypeStore(thing: Store<any>, stateTree: StateTree) {
 return storeType(
  thing.stateAtom.get(),
  goDeep([(3: StoreValue) /*::, undefined*/], stateTree),
 )
}
function storeTypeObject(thing: Object, stateTree: StateTree) {
 const childrens: StateTree[] = []

 for (const field of Object.keys(thing)) {
  const e = thing[field]
  const nested = storeType(e, goDeep([(4: StoreObjectValue), field], stateTree))
  childrens.push(...nested)
 }

 return childrens
}

function storeTypeArray(thing: Array<any>, stateTree: StateTree) {
 const childrens: StateTree[] = []

 for (let i = 0; i < thing.length; i++) {
  const e = thing[i]
  const nested = storeType(e, goDeep([(5: StoreArrayValue), i], stateTree))
  childrens.push(...nested)
 }

 return childrens
}

// function storeFabric<T>({defaultValue, ...opts}: {defaultValue: T}) {
//  // const isPlainStore =
//  const value: Derivable<T> = derive(() => deepUnpack(arg))
//  const proxyValue = lens({
//   get() {
//    return value.get()
//   },
//  })
//  const store = {
//   kind: Kind.STORE,
//  }
//  return store
// }
function readSegment(current: any, segment: Segment) {
 switch (segment[0]) {
  case (-2: RootValue):
   return segment[1]()
  case (0: NoValue):
   return null
  case (1: PlainValue):
   return current
  case (2: DerivedValue):
   return current.get()
  case (3: StoreValue):
   return current.stateAtom.get()
  case (4: StoreObjectValue):
   return current[segment[1]]
  case (5: StoreArrayValue):
   return current[segment[1]]
  default:
   throw new TypeError(`Wrong segment ${segment.toString()}`)
 }
}

export function readPath(path: Path): any {
 let current = null
 for (const e of path) {
  if (e[0] !== (-1: OpaqueValue)) current = readSegment(current, e)
 }
 return current
}
export function getStorePath(thing: () => any): Path[] {
 return storeType(thing(), [[(-2: RootValue), thing], []]).map(flatten)
}
