//@flow
import {type Graphite, type Cmd, createNode} from './stdlib'
import type {Subscription} from './index.h'
import {createSubscription} from './subscription'

export const createLinkNode = (
  parent: Graphite,
  child: Graphite,
  {
    node,
    scope,
    meta,
  }: {|
    +node?: Array<Cmd | false | void | null>,
    scope?: {[name: string]: any, ...},
    meta?: {[name: string]: any, ...},
  |},
) =>
  createNode({
    node,
    parent,
    child,
    scope,
    meta,
    family: {
      type: 'crosslink',
      owners: [parent, child],
      links: [child],
    },
  })
export const forward = ({
  from,
  to,
  meta = {op: 'forward'},
}: {|
  from: Graphite | Graphite[],
  to: Graphite | Graphite[],
  meta?: Object,
|}): Subscription =>
  createSubscription(
    createNode({
      parent: from,
      child: to,
      meta,
      family: {
        type: 'crosslink',
      },
    }),
  )
