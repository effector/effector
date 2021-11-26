import type {Node, NodeUnit, Cmd} from './index.h'
import {getGraph, getOwners, getLinks, getValue} from './getter'
import {nextNodeID} from './id'
import {CROSSLINK} from './tag'
import {regionStack} from './region'
import {own} from './own'
import {add, forEach} from './collection'

export const arrifyNodes = (
  list: NodeUnit | Array<NodeUnit | NodeUnit[]> = [],
): Node[] => (Array.isArray(list) ? list : [list]).flat().map(getGraph)

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
  forEach(node, item => item && add(seq, item))
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
  }
  forEach(links, link => add(getOwners(link), result))
  forEach(owners, owner => add(getLinks(owner), result))
  forEach(sources, source => add(source.next, result))
  if (regional && regionStack) {
    own(getValue(regionStack), [result])
  }
  return result
}
