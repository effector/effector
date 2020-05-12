//@flow

import {Graphite, Graph} from './index.h'

export const getGraph = (graph: Graphite): Graph => graph.graphite || graph
export const getOwners = (node: Graph) => node.family.owners
export const getLinks = (node: Graph) => node.family.links
export const getStoreState = store => store.stateRef
export const getConfig = opts => opts.config
export const getNestedConfig = opts => opts.ɔ
export const getValue = stack => stack.value
export const getSubscribers = store => store.subscribers
export const getParent = unit => unit.parent
