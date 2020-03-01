//@flow
import {getConfig, getNestedConfig} from './getter'
import {createNode} from './createNode'
import type {Subscription, Graphite, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {throwError} from './throw'

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
export const forward = (opts: {
  from: Graphite | Graphite[],
  to: Graphite | Graphite[],
  meta?: Object,
}): Subscription => {
  let config
  if (getNestedConfig(opts)) {
    config = getConfig(opts)
    opts = getNestedConfig(opts)
  }
  const {from, to, meta = {op: 'forward'}} = opts
  if (!from || !to) throwError('from and to fields should be defined')
  if (config) meta.config = config
  return createSubscription(
    createNode({
      parent: from,
      child: to,
      meta,
      family: {},
    }),
  )
}
