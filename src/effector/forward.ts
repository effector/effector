import {processArgsToConfig} from './config'
import {createNode} from './createNode'
import type {Subscription, NodeUnit, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {assertNodeSet, assertTarget} from './is'
import {deprecate} from './throw'
import {addActivator} from './lazy'
import {getGraph} from './getter'

export const createLinkNode = (
  parent: NodeUnit | NodeUnit[],
  child: NodeUnit | NodeUnit[],
  node?: Array<Cmd | false | void | null>,
  op?: string,
  scopeFn?: Function,
) =>
  createNode({
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
  deprecate(false, 'forward', 'sample')
  const method = 'forward'
  const [{from, to}, config] = processArgsToConfig(opts, true)
  assertNodeSet(from, method, '"from"')
  assertNodeSet(to, method, '"to"')
  assertTarget(method, to, 'to')
  const fromNormalized = Array.isArray(from) ? from : [from]
  const toNormalized = Array.isArray(to) ? to : [to]
  const node = createNode({
    parent: from,
    child: to,
    meta: {op: method, config},
    family: {},
    regional: true,
  })
  node.lazy = {
    alwaysActive: false,
    usedBy: [],
    activate: [],
  }
  /**
   * WARN! Memory leaks in clearNode here
   * need to implement bidirectional activators links
   * before release
   * */
  addActivator(node, fromNormalized, true)
  addActivator(toNormalized, [node], true)

  return createSubscription(node)
}
