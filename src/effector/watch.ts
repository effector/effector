import {run} from './step'
import {callStack} from './caller'
import {createNode} from './createNode'
import {Subscription, NodeUnit} from './index.h'
import {createSubscription} from './subscription'
import {assert} from './throw'
import {isFunction, is} from './is'
import {traverseIncrementActivations} from './lazy'
import {getGraph} from './getter'

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
  traverseIncrementActivations(getGraph(unit))
  node.lazy = {
    alwaysActive: true,
    usedBy: 0,
    activate: [getGraph(unit)],
  }
  return createSubscription(node)
}
