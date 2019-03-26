//@flow
import type {Graph} from 'effector/stdlib'
import type {Subscription} from '../effector/index.h'
import {createWatcher} from 'effector/watcher'

export function forward(opts: {
  from: {+graphite: Graph<any>, ...},
  to: {+graphite: Graph<any>, ...},
}): Subscription {
  const toSeq = opts.to.graphite.seq
  const fromGraphite = opts.from.graphite
  fromGraphite.next.data.push(toSeq)
  return createWatcher({
    child: toSeq,
    parent: fromGraphite,
  })
}
