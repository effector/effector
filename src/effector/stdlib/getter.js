//@flow

import type {Graphite, Graph} from './index.h'

export const getGraph = (graph: Graphite): Graph =>
  (graph: any).graphite || graph
export const getOwners = (node: Graph) => node.family.owners
export const getLinks = (node: Graph) => node.family.links
export const getStoreState = store => store.stateRef
