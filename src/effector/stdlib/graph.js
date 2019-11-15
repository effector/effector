//@flow

import type {Graph, Graphite, Cmd} from './index.h'

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
  const result: Graph = {
    seq: node.filter(Boolean),
    next: arrifyNodes(child),
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
  for (let i = 0; i < sources.length; i++) {
    sources[i].next.push(result)
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
