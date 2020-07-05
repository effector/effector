import {onConfigNesting} from './config'
import {createNode} from './createNode'
import {Subscription, Graphite, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {throwError} from './throw'
import {addToRegion} from './region'

export const createLinkNode = (
  parent: Graphite,
  child: Graphite,
  {
    node,
    scope,
    meta,
  }: {
    node?: Array<Cmd | false | void | null>,
    scope?: {[name: string]: any},
    meta?: {[name: string]: any},
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
  from: Graphite | Graphite[],
  to: Graphite | Graphite[],
  meta?: Object,
}): Subscription => {
  let config
  onConfigNesting(opts, (injectedData, userConfig) => {
    config = injectedData
    opts = userConfig
  })
  const {from, to, meta = {op: 'forward'}} = opts
  if (!from || !to) throwError('from and to fields should be defined')
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
