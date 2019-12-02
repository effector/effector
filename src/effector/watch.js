//@flow

import {type Unit, step, callStackAReg} from './stdlib'
import {createNode} from './createNode'
import type {Subscription} from './index.h'
import {createSubscription} from './subscription'

export const watchUnit = (
  unit: Unit,
  handler: (payload: any) => any,
): Subscription =>
  createSubscription(
    createNode({
      scope: {fn: handler},
      node: [step.run({fn: callStackAReg})],
      parent: unit,
      meta: {op: 'watch'},
      family: {
        owners: unit,
      },
    }),
  )
