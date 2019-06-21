//@flow
import {type Graphite, type Cmd, getGraph, createNode} from '../stdlib'
import type {Subscription} from '../index.h'
import {createWatcher} from '../watcher'

export const createLink = (
  from: Graphite,
  opts: {|
    +node: Array<Cmd>,
    +child?: Array<Graphite>,
    scope?: {[name: string]: any, ...},
    meta?: {[name: string]: any, ...},
    family: {
      type: 'regular' | 'crosslink',
      links?: Graphite[],
      owners?: Graphite[],
    },
  |},
) =>
  forward({
    from,
    to: createNode(opts),
  })

export const forward = (opts: {|
  from: Graphite,
  to: Graphite,
|}): Subscription => {
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
