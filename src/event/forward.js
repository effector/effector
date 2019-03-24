//@flow

import type {Graphiter, GraphiterSmall} from './index.h'
import type {Subscription} from '../effector/index.h'
import {createWatcher} from 'effector/watcher'

export function forward(opts: {
  from: Graphiter,
  to: GraphiterSmall,
}): Subscription {
  const toSeq = opts.to.graphite.seq
  const fromGraphite = opts.from.graphite
  fromGraphite.next.data.push(toSeq)
  return createWatcher({
    child: toSeq,
    parent: fromGraphite,
  })
}
