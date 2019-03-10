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
  const next = step('multi', child)
  const items = node.concat([next])
  return {
    seq: step('seq', items),
    next,
  }
}
