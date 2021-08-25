import {processArgsToConfig} from './config'
import {createNode} from './createNode'
import type {Subscription, NodeUnit, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {assertNodeSet} from './is'

export const createLinkNode = (
  parent: NodeUnit | NodeUnit[],
  child: NodeUnit | NodeUnit[],
  {
    node,
    scope,
    meta,
  }: {
    node?: Array<Cmd | false | void | null>
    scope?: {[name: string]: any}
    meta?: {[name: string]: any}
  } = {},
) =>
  createNode({
    node,
    parent,
    child,
    scope,
    meta,
    family: {owners: [parent, child], links: child},
    regional: true,
  })
export const forward = (opts: {
  from: NodeUnit | NodeUnit[]
  to: NodeUnit | NodeUnit[]
  meta?: Record<string, any>
}): Subscription => {
  const [{from, to}, config] = processArgsToConfig(opts, true)
  assertNodeSet(from, 'forward', '"from"')
  assertNodeSet(to, 'forward', '"to"')
  return createSubscription(
    createNode({
      parent: from,
      child: to,
      meta: {op: 'forward', config},
      family: {},
      regional: true,
    }),
  )
}
