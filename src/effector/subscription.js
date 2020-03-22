//@flow

import type {Subscription, Graphite} from './index.h'
import {clearNode} from './clearNode'

export const createSubscription = (node: Graphite): Subscription => {
  const result = () => clearNode(node)
  result.unsubscribe = result
  return result
}
