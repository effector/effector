//@flow

import type {Graph, Graphite, Cmd} from './index.h'

export function createGraph({
  node,
  child = [],
  from = [],
  scope = {},
  meta = {},
}: {
  +node: Array<Cmd>,
  +child?: Array<Graphite>,
  +from?: Array<Graphite>,
  scope?: {[name: string]: any, ...},
  meta?: {[name: string]: any, ...},
  ...
}): Graph {
  return {
    from: from.map(getGraph),
    seq: node,
    next: child.map(getGraph),
    meta,
    scope,
  }
}
export const clearNode = (
  graphite: Graphite,
  {deep}: {
    deep?: boolean,
    ...
  } = {},
) => {
  const graph = getGraph(graphite)
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
  {ctx, pre, post}: {ctx: any, pre: Function, post: Function, ...},
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
