//@flow

import type {TypeDef, Graph} from './index.h'
import {Step} from './typedef'

export function createGraph({
  node,
  child = [],
}: {
  node: Array<TypeDef<*, *>>,
  child?: Array<TypeDef<*, *>>,
}): Graph {
  const next = Step.multi(normalizeNodes(child))
  const items = normalizeNodes(node).concat([next])
  return {
    seq: Step.seq(items),
    next,
  }
}

const normalizeNodes = (
  nodes: Array<TypeDef<*, *>>,
): Array<TypeDef<*, 'step'>> =>
  nodes.map(node => (node.group === 'cmd' ? Step.single(node) : node))
