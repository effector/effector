//@flow
import {type Graphite, type Cmd, getGraph, createNode} from '../stdlib'
import type {Subscription} from '../index.h'
import {createWatcher} from '../watcher'

export const createLink = (
  from: Graphite,
  child: Graphite,
  {
    node,
    scope,
    meta,
  }: {|
    +node: Array<Cmd>,
    scope?: {[name: string]: any, ...},
    meta?: {[name: string]: any, ...},
  |},
) =>
  forward({
    from,
    to: createNode({
      node,
      child: [child],
      scope,
      meta,
      family: {
        type: 'crosslink',
        owners: [from, child],
        links: [child],
      },
    }),
  })

export const forward = (opts: {|
  from: Graphite,
  to: Graphite,
|}): Subscription => {
  const from = getGraph(opts.from)
  const to = getGraph(opts.to)
  from.next.push(to)
  return createWatcher({
    child: to,
    parent: from,
  })
}
