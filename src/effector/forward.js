//@flow
import {type Graphite, type Cmd, createNode} from './stdlib'
import type {Subscription} from './index.h'
import {createSubscription} from './subscription'

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
) =>
  createNode({
    node,
    parent: [source],
    child: [child],
    scope,
    meta,
    family: {
      type: 'crosslink',
      owners: [source, child],
      links: [child],
    },
  })
export const forward = ({
  from,
  to,
}: {|
  from: Graphite,
  to: Graphite,
|}): Subscription =>
  createSubscription(
    createLinkNode(from, to, {
      node: [],
      meta: {op: 'forward'},
    }),
  )
