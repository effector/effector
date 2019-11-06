//@flow

import type {Subscription} from './index.h'
import type {Graphite} from './stdlib'
import {clearNode} from './clearNode'

export const createSubscription = (node: Graphite): Subscription => {
  const result = clearNode.bind(null, node, undefined)
  result.unsubscribe = result
  return result
}
