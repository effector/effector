//@flow

import type {Graph, Graphite, Cmd, Family} from './index.h'

import {getGraph, getOwners, getLinks} from './getter'

export function createNode({
  node,
  child = [],
  scope = {},
  meta = {},
  family: familyRaw = {},
}: {
  +node: Array<Cmd>,
  +child?: Array<Graphite>,
  scope?: {[name: string]: any, ...},
  meta?: {[name: string]: any, ...},
  family?: {
    type?: 'regular' | 'crosslink',
    links?: Graphite[],
    owners?: Graphite[],
  },
  ...
}): Graph {
  const links = (familyRaw.links || []).map(getGraph)
  const owners = (familyRaw.owners || []).map(getGraph)
  const result: Graph = {
    seq: node,
    next: child.map(getGraph),
    meta,
    scope,
    family: {
      type: familyRaw.type || 'regular',
      links,
      owners,
    },
  }
  for (let i = 0; i < links.length; i++) {
    getOwners(links[i]).push(result)
  }
  for (let i = 0; i < owners.length; i++) {
    getLinks(owners[i]).push(result)
  }
  return result
}

const removeItem = (list, item) => {
  const pos = list.indexOf(item)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}
const clearFam = (targetNode: Graph, deep: boolean) => {
  let currentNode
  while ((currentNode = getLinks(targetNode).pop())) {
    removeItem(getOwners(currentNode), targetNode)
    if (deep || currentNode.family.type === 'crosslink') {
      clearFam(currentNode, deep)
    }
  }
  while ((currentNode = getOwners(targetNode).pop())) {
    removeItem(getLinks(currentNode), targetNode)
    if (currentNode.family.type === 'crosslink') {
      clearFam(currentNode, deep)
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
  graph.next.length = 0
  graph.seq.length = 0
  //$off
  graph.scope = null
}

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
