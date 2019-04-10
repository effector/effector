//@flow
import {type Graphite, getGraph} from 'effector/stdlib'
import type {Subscription} from '../index.h'
import {createWatcher} from 'effector/watcher'

export const forward = (opts: {from: Graphite, to: Graphite}): Subscription => {
  const from = getGraph(opts.from)
  const to = getGraph(opts.to)
  from.next.push(to)
  //TODO push parent to .from field
  // to.from.push(from)
  return createWatcher({
    child: to,
    parent: from,
  })
}
