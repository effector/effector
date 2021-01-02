import {Subscription, NodeUnit} from './index.h'
import {bind2} from './bind'
import {clearNode} from './clearNode'

export const createSubscription = (node: NodeUnit): Subscription => {
  const result = bind2(clearNode, node, undefined)
  result.unsubscribe = result
  return result
}
