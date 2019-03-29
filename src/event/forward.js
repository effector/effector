//@flow
import type {Graph} from 'effector/stdlib'
import type {Subscription} from '../effector/index.h'
import {createWatcher} from 'effector/watcher'

export function forward(opts: {
  from: {+graphite: Graph<any>, ...},
  to: {+graphite: Graph<any>, ...},
}): Subscription {
  return linkGraphs({
    from: opts.from.graphite,
    to: opts.to.graphite,
  })
}
export const linkGraphs = ({
  from,
  to,
}: {
  from: Graph<any>,
  to: Graph<any>,
}): Subscription => {
  from.next.push(to)
  //TODO push parent to .from field
  // to.from.push(from)
  return createWatcher({
    child: to,
    parent: from,
  })
}
