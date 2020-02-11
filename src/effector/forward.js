//@flow
import {createNode} from './createNode'
import type {Subscription, Graphite, Cmd} from './index.h'
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
      owners: [parent, child],
      links: child,
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
|}): Subscription => {
  if (!from || !to) throw Error('from and to fields should be defined')
  return createSubscription(
    createNode({
      parent: from,
      child: to,
      meta,
      family: {},
    }),
  )
}
