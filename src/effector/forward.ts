import {onConfigNesting} from './config'
import {createNode} from './createNode'
import {Subscription, NodeUnit, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {throwError} from './throw'
import {addToRegion} from './region'
import {assertNodeSet} from './is'

export const createLinkNode = (
  parent: NodeUnit,
  child: NodeUnit | NodeUnit[],
  {
    node,
    scope,
    meta,
  }: {
    node?: Array<Cmd | false | void | null>
    scope?: {[name: string]: any}
    meta?: {[name: string]: any}
  },
) =>
  addToRegion(
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
    }),
  )
export const forward = (opts: {
  from: NodeUnit | NodeUnit[]
  to: NodeUnit | NodeUnit[]
  meta?: Record<string, any>
}): Subscription => {
  let config
  onConfigNesting(opts, (injectedData, userConfig) => {
    config = injectedData
    opts = userConfig
  })
  const {from, to, meta = {op: 'forward'}} = opts
  assertNodeSet(from, 'forward', '"from"')
  assertNodeSet(to, 'forward', '"to"')
  if (config) meta.config = config
  return createSubscription(
    addToRegion(
      createNode({
        parent: from,
        child: to,
        meta,
        family: {},
      }),
    ),
  )
}
