import type {Subscription, NodeUnit} from './index.h'
import {clearNode} from './clearNode'

export const createSubscription = (node: NodeUnit): Subscription => {
  const result = () => clearNode(node)
  result.unsubscribe = result
  return result
}
