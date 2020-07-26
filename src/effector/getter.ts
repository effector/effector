import {Graph} from './index.h'

export const getGraph = (graph: any): Graph => graph.graphite || graph
export const getOwners = (node: Graph) => node.family.owners
export const getLinks = (node: Graph) => node.family.links
export const getStoreState = (store: any) => store.stateRef
export const getConfig = (opts: any) => opts.config
export const getNestedConfig = (opts: any) => opts.ɔ
export const getValue = (stack: any) => stack.value
export const getSubscribers = (store: any) => store.subscribers
export const getParent = (unit: any) => unit.parent
