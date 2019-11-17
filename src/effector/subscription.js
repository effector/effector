//@flow

import type {Subscription} from './index.h'
import {type Graphite, bind2} from './stdlib'
import {clearNode} from './clearNode'

export const createSubscription = (node: Graphite): Subscription => {
  const result = bind2(clearNode, node, undefined)
  result.unsubscribe = result
  return result
}
