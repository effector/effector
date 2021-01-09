import {Node, NodeUnit, Cmd, StateRef} from './index.h'
import {getGraph, getOwners, getLinks, getValue} from './getter'
import {nextNodeID} from './id'
import {CROSSLINK, STORE} from './tag'
import {regionStack} from './region'
import {own} from './own'

const arrifyNodes = (
  list: NodeUnit | Array<NodeUnit | NodeUnit[]> = [],
): Node[] => {
  const result = []
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      if (Array.isArray(list[i])) result.push(...(list[i] as any))
      else result.push(list[i])
    }
  } else {
    result.push(list)
  }
  return result.map(getGraph)
}
export const addToReg = (
  {hasRef, type, data}: any,
  reg: Record<string, StateRef>,
) => {
  let store
  if (hasRef) {
    store = data.store
    reg[store.id] = store
  }
  if (type === 'mov' && data.to === STORE) {
    store = data.target
    reg[store.id] = store
  }
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
  regional,
}: {
  node?: Array<Cmd | false | void | null>
  from?: NodeUnit | NodeUnit[]
  source?: NodeUnit | NodeUnit[]
  parent?: NodeUnit | NodeUnit[]
  to?: NodeUnit | NodeUnit[]
  target?: NodeUnit | NodeUnit[]
  child?: NodeUnit | NodeUnit[]
  scope?: {[name: string]: any}
  meta?: {[name: string]: any}
  family?: {
    type?: 'regular' | 'crosslink' | 'domain'
    links?: NodeUnit | NodeUnit[]
    owners?: NodeUnit | Array<NodeUnit | NodeUnit[]>
  }
  regional?: boolean
} = {}): Node {
  const sources = arrifyNodes(parent)
  const links = arrifyNodes(familyRaw.links)
  const owners = arrifyNodes(familyRaw.owners)
  const seq: Cmd[] = []
  const reg: {[id: string]: StateRef} = {}
  for (let i = 0; i < node.length; i++) {
    const item = node[i]
    if (!item) continue
    seq.push(item)
    addToReg(item, reg)
  }
  const result: Node = {
    id: nextNodeID(),
    seq,
    next: arrifyNodes(child),
    meta,
    scope,
    family: {
      type: familyRaw.type || CROSSLINK,
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
  if (regional && regionStack) {
    own(getValue(regionStack), [result])
  }
  return result
}
