//@flow

import type {Graph, Graphite, Cmd} from './index.h'

import {getGraph, getOwners, getLinks} from './getter'
import {store as isStore, domain as isDomain} from './is'

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
  return result
}

const removeItem = (list, item) => {
  const pos = list.indexOf(item)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}

const clearNodeNormalized = (targetNode: Graph, deep: boolean) => {
  targetNode.next.length = 0
  targetNode.seq.length = 0
  //$off
  targetNode.scope = null
  let currentNode
  let list = getLinks(targetNode)
  while ((currentNode = list.pop())) {
    removeItem(getOwners(currentNode), targetNode)
    if (deep || currentNode.family.type === 'crosslink') {
      clearNodeNormalized(currentNode, deep)
    }
  }
  list = getOwners(targetNode)
  while ((currentNode = list.pop())) {
    removeItem(currentNode.next, targetNode)
    removeItem(getLinks(currentNode), targetNode)
    if (currentNode.family.type === 'crosslink') {
      clearNodeNormalized(currentNode, deep)
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
  if (isStore(graphite)) {
    ;(graphite: any).subscribers.clear()
  }
  if (isDomain(graphite)) {
    const {scope} = getGraph(graphite)
    const {history, hooks} = scope
    if (history) {
      history.events.clear()
      history.effects.clear()
      history.storages.clear()
      history.domains.clear()
    }
    if (hooks) {
      clearNode(hooks.event)
      clearNode(hooks.effect)
      clearNode(hooks.store)
      clearNode(hooks.domain)
    }
    scope.history = null
    scope.hooks = null
  }
  clearNodeNormalized(getGraph(graphite), !!deep)
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
