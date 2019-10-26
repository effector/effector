//@flow

import {type Unit, createNode, step, addLinkToOwner} from '../stdlib'
import type {Subscription} from '../index.h'
import {forward} from '../forward'

export function watchUnit(
  unit: Unit,
  handler: (payload: any) => any,
): Subscription {
  const watcherNode = createNode({
    scope: {handler},
    node: [
      step.run({
        fn(upd, {handler}) {
          handler(upd)
        },
      }),
    ],
    meta: {op: 'watch'},
  })
  addLinkToOwner(unit, [watcherNode])
  return forward({
    from: unit,
    to: watcherNode,
  })
}
