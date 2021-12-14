import type {Node, StateRef} from './index.h'
import type {Scope} from './unit.h'

export const getGraph = (graph): Node => graph.graphite || graph
export const getOwners = (node: Node) => node.family.owners
export const getLinks = (node: Node) => node.family.links
export const getStoreState = (store): StateRef => store.stateRef
export const getValue = stack => stack.value
export const getSubscribers = store => store.subscribers
export const getParent = unit => unit.parent
export const getForkPage = (val): Scope | void => val.scope
export const getMeta = (unit, field: string) => getGraph(unit).meta[field]
export const setMeta = (unit, field: string, value) =>
  (getGraph(unit).meta[field] = value)
