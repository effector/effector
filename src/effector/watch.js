//@flow

import {type Unit, step, callStack} from './stdlib'
import {createNode} from './createNode'
import type {Subscription} from './index.h'
import {createSubscription} from './subscription'
import {addToRegion} from './region'

export const watchUnit = (
  unit: Unit,
  handler: (payload: any) => any,
): Subscription =>
  createSubscription(
    addToRegion(
      createNode({
        scope: {fn: handler},
        node: [step.run({fn: callStack})],
        parent: unit,
        meta: {op: 'watch'},
        family: {
          owners: unit,
        },
      }),
    ),
  )
