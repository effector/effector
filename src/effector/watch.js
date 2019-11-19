//@flow

import {type Unit, step} from './stdlib'
import {createNode} from './createNode'
import type {Subscription} from './index.h'
import {createSubscription} from './subscription'

export const watchUnit = (
  unit: Unit,
  handler: (payload: any) => any,
): Subscription =>
  createSubscription(
    createNode({
      scope: {handler},
      node: [
        step.run({
          fn(upd, {handler}) {
            handler(upd)
          },
        }),
      ],
      parent: [unit],
      meta: {op: 'watch'},
      family: {
        type: 'crosslink',
        owners: [unit],
      },
    }),
  )
