import {run} from './step'
import {callStack} from './caller'
import {createNode} from './createNode'
import {Subscription, NodeUnit} from './index.h'
import {createSubscription} from './subscription'
import {assert} from './throw'
import {isFunction, is} from './is'
import {traverseIncrementActivations} from './lazy'

export const watchUnit = (
  unit: NodeUnit,
  handler: (payload: any) => any,
): Subscription => {
  assert(isFunction(handler), '.watch argument should be a function')
  const node = createNode({
    scope: {fn: handler},
    node: [run({fn: callStack})],
    parent: unit,
    meta: {op: 'watch'},
    family: {owners: unit},
    regional: true,
  })
  if (is.store(unit)) {
    traverseIncrementActivations(unit.graphite)
    node.lazy = {
      alwaysActive: true,
      active: true,
      usedBy: 0,
      activate: [unit.graphite],
    }
  }
  return createSubscription(node)
}
