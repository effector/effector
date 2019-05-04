//@flow
import {type Graphite, type Cmd, getGraph, createGraph} from 'effector/stdlib'
import type {Subscription} from '../index.h'
import {createWatcher} from 'effector/watcher'

export const createLink = (
  from: Graphite,
  opts: {|
    +node: Array<Cmd>,
    +child?: Array<Graphite>,
    scope?: {[name: string]: any},
    meta?: {[name: string]: any},
  |},
) =>
  forward({
    from,
    to: createGraph(opts),
  })

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
