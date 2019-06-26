//@flow

import type {Graph, Graphite, Cmd, Family} from './index.h'

export function createNode({
  node,
  child = [],
  from = [],
  scope = {},
  meta = {},
  family: familyRaw = {},
}: {
  +node: Array<Cmd>,
  +child?: Array<Graphite>,
  +from?: Array<Graphite>,
  scope?: {[name: string]: any, ...},
  meta?: {[name: string]: any, ...},
  family?: {
    type?: 'regular' | 'crosslink',
    links?: Graphite[],
    owners?: Graphite[],
  },
  ...
}): Graph {
  const family: Family = {
    type: familyRaw.type || 'regular',
    links: (familyRaw.links || []).map(getGraph),
    owners: (familyRaw.owners || []).map(getGraph),
  }
  const result: Graph = {
    from: from.map(getGraph),
    seq: node,
    next: child.map(getGraph),
    meta,
    scope,
    family,
  }
  for (let i = 0; i < family.links.length; i++) {
    family.links[i].family.owners.push(result)
  }
  for (let i = 0; i < family.owners.length; i++) {
    family.owners[i].family.links.push(result)
  }
  return result
}
// const upwardClearing = (graph: Graph, deep: boolean, )
const removeItem = (list, item) => {
  const pos = list.indexOf(item)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}
const clearFam = (node: Graph, deep: boolean) => {
  const links = node.family.links
  const owners = node.family.owners
  while (links.length) {
    const child = links.pop()
    removeItem(child.family.owners, node)
    if (child.family.type === 'crosslink') {
      clearFam(child, deep)
    }
  }
  while (owners.length) {
    const owner = owners.pop()
    removeItem(owner.family.links, node)
    if (owner.family.type === 'crosslink') {
      clearFam(owner, deep)
    }
  }
}
export const clearNode = (
  graphite: Graphite,
  {
    deep,
  }: {
    deep?: boolean,
    ...
  } = {},
) => {
  const graph = getGraph(graphite)
  clearFam(graph, !!deep)

  if (deep) {
    graph.next.forEach(node => clearNode(node, {deep}))
  }
  graph.from.forEach(node => {
    const index = node.next.indexOf(graph)
    if (index === -1) return
    node.next.splice(index, 1)
  })
  graph.from.length = 0
  graph.next.length = 0
  graph.seq.length = 0
  //$off
  graph.scope = null
}

export const getGraph = (graph: Graphite): Graph =>
  (graph: any).graphite || graph

export const traverse = (
  graphite: Graphite,
  {
    ctx = {},
    pre = (step, ctx, stack, layer) => {},
    post = (step, ctx, stack, layer) => {},
  }: {ctx: any, pre: Function, post: Function, ...},
) => {
  const visited = new Set()
  const stack = []
  const walk = (step, layer) => {
    if (visited.has(step)) return
    stack.push(step)
    visited.add(step)
    pre(step, ctx, stack, layer)
    const steps = step.next
    for (let i = 0; i < steps.length; i++) {
      walk(steps[i], steps)
    }
    stack.pop()
    post(step, ctx, stack, layer)
  }
  const graph = getGraph(graphite)
  walk(graph, [graph])
  visited.clear()
  return ctx
}
