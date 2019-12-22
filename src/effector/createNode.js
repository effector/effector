//@flow

import type {Graph, Graphite, Cmd, StateRef} from './stdlib/index.h'

import {getGraph, getOwners, getLinks} from './stdlib/getter'
const arrifyNodes = (list: Graphite | Graphite[] = []): Graph[] => {
  const result = []
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) result.push(...list[i])
      else result.push(list[i])
    }
  } else {
    result.push(list)
  }
  return result.map(getGraph)
}
export function createNode({
  node = [],
  from,
  source,
  parent = from || source,
  to,
  target,
  child = to || target,
  scope = {},
  meta = {},
  family: familyRaw = {type: 'regular'},
}: {
  +node?: Array<Cmd | false | void | null>,
  +from?: Graphite | Graphite[],
  +source?: Graphite | Graphite[],
  +parent?: Graphite | Graphite[],
  +to?: Graphite | Graphite[],
  +target?: Graphite | Graphite[],
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
      type: familyRaw.type || 'crosslink',
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
