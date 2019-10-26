//@flow
import {type Graphite, type Cmd, getGraph, createNode} from './stdlib'
import type {Subscription} from './index.h'
import {createWatcher} from './watcher'

export const createLinkNode = (
  source: Graphite,
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
) => {
  const to = createNode({
    node,
    child: [child],
    scope,
    meta,
    family: {
      type: 'crosslink',
      owners: [source, child],
      links: [child],
    },
  })
  getGraph(source).next.push(to)
  return to
}
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
