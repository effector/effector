//@flow

import type {TypeDef, Graph} from './index.h'
import {step} from './typedef'

export function createGraph({
  node,
  child = [],
}: {
  node: Array<TypeDef<*, *>>,
  child?: Array<TypeDef<*, *>>,
}): Graph {
  const next = step('multi', normalizeNodes(child))
  const items = normalizeNodes(node).concat([next])
  return {
    seq: step('seq', items),
    next,
  }
}

const normalizeNodes = (
  nodes: Array<TypeDef<*, *>>,
): Array<TypeDef<*, 'step'>> =>
  nodes.map(node => (node.group === 'cmd' ? step('single', node) : node))
