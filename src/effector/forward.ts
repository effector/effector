import {processArgsToConfig} from './config'
import {createNode} from './createNode'
import type {Subscription, NodeUnit, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {assertNodeSet, assertTarget} from './is'
import {deprecate} from './throw'
import {addActivator} from './lazy'
import {generateErrorTitle} from './naming'

export const createLinkNode = (
  parent: NodeUnit | NodeUnit[],
  child: NodeUnit | NodeUnit[],
  node?: Array<Cmd | false | void | null>,
  op?: string,
  scopeFn?: Function,
  alwaysActive?: boolean,
) =>
  createNode({
    alwaysActive,
    node,
    parent,
    child,
    scope: {fn: scopeFn},
    meta: {op},
    family: {owners: [parent, child], links: child},
    regional: true,
  })
export const forward = (opts: {
  from: NodeUnit | NodeUnit[]
  to: NodeUnit | NodeUnit[]
  meta?: Record<string, any>
}): Subscription => {
  const METHOD = 'forward'
  const [{from, to}, config] = processArgsToConfig(opts, true)
  const errorTitle = generateErrorTitle(METHOD, config)
  deprecate(false, METHOD, 'sample', errorTitle)
  assertNodeSet(from, errorTitle, '"from"')
  assertNodeSet(to, errorTitle, '"to"')
  assertTarget(errorTitle, to, 'to')

  const fromNormalized = Array.isArray(from) ? from : [from]
  const toNormalized = Array.isArray(to) ? to : [to]

  const node = createNode({
    alwaysActive: false,
    parent: from,
    child: to,
    meta: {op: METHOD, config},
    family: {},
    regional: true,
  })

  /**
   * WARN! Memory leaks in clearNode here
   * need to implement bidirectional activators links
   * before release
   * */
  addActivator(node, fromNormalized, true)
  addActivator(toNormalized, [node], true)

  return createSubscription(node)
}
