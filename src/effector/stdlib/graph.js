//@flow

import type {Graph, Graphite, Cmd, StateRef} from './index.h'

import {getGraph, getOwners, getLinks} from './getter'
const arrifyNodes = (list: Graphite | Graphite[] = []): Graph[] =>
  (Array.isArray(list) ? list : [list]).map(getGraph)
export function createNode({
  node = [],
  parent,
  child,
  scope = {},
  meta = {},
  family: familyRaw = {},
}: {
  +node?: Array<Cmd | false | void | null>,
  +parent?: Graphite | Graphite[],
  +child?: Graphite | Graphite[],
  scope?: {[name: string]: any, ...},
  meta?: {[name: string]: any, ...},
  family?: {
    type?: 'regular' | 'crosslink' | 'domain',
    links?: Graphite | Graphite[],
    owners?: Graphite | Graphite[],
    ...
  },
  ...
}): Graph {
  const sources = arrifyNodes(parent)
  const links = arrifyNodes(familyRaw.links)
  const owners = arrifyNodes(familyRaw.owners)
  const seq: Cmd[] = []
  const reg: {[id: string]: StateRef} = {}
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    if (!item) continue
    seq.push(item)
    if (item.hasRef) {
      const store = item.data.store
      reg[store.id] = store
    }
    if (item.type === 'mov' && item.data.to === 'store') {
      const store = item.data.target
      reg[store.id] = store
    }
  }
  const result: Graph = {
    seq,
    next: arrifyNodes(child),
    meta,
    scope,
    family: {
      type: familyRaw.type || 'regular',
      links,
      owners,
    },
    reg,
  }
  for (let i = 0; i < links.length; i++) {
    getOwners(links[i]).push(result)
  }
  for (let i = 0; i < owners.length; i++) {
    getLinks(owners[i]).push(result)
  }
  for (let i = 0; i < sources.length; i++) {
    sources[i].next.push(result)
  }
  return result
}
