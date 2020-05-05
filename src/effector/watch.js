//@flow

import {step} from './typedef'
import {callStack} from './caller'
import {createNode} from './createNode'
import {Subscription, Unit} from './index.h'
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
