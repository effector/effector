//@flow

import type {Graph, Graphite, Cmd} from './index.h'

import {getGraph, getOwners, getLinks} from './getter'

export function createNode({
  node,
  parent = [],
  child = [],
  scope = {},
  meta = {},
  family: familyRaw = {},
}: {
  +node: Array<Cmd>,
  +child?: Array<Graphite>,
  +parent?: Array<Graphite>,
  scope?: {[name: string]: any, ...},
  meta?: {[name: string]: any, ...},
  family?: {
    type?: 'regular' | 'crosslink' | 'domain',
    links?: Graphite[],
    owners?: Graphite[],
    ...
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
  for (let i = 0; i < parent.length; i++) {
    getGraph(parent[i]).next.push(result)
  }
  return result
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
