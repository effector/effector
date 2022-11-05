import type {Node, StateRef, NodeUnit} from './index.h'
import type {Scope, Store, CommonUnit, Domain} from './unit.h'

export const getGraph = (graph: NodeUnit): Node =>
  (graph as {graphite: Node}).graphite || graph
export const getOwners = (node: Node) => node.family.owners
export const getLinks = (node: Node) => node.family.links
export const getStoreState = (store: Store<any>): StateRef => store.stateRef
export const getValue = (stack: any) => stack.value
export const getSubscribers = (store: Store<any>) => store.subscribers
export const getParent = (unit: any) => unit.parent
export const getForkPage = (val: any): Scope | void => val.scope
export const getMeta = (unit: NodeUnit, field: string) =>
  getGraph(unit).meta[field]
export const setMeta = (unit: NodeUnit, field: string, value: unknown) =>
  (getGraph(unit).meta[field] = value)
export const getCompositeName = (unit: CommonUnit | Domain) =>
  unit.compositeName
