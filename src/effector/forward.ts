import {processArgsToConfig} from './config'
import {createNode} from './createNode'
import type {Subscription, NodeUnit, Cmd} from './index.h'
import {createSubscription} from './subscription'
import {assertNodeSet, assertTarget} from './is'
import {deprecate} from './throw'
import {generateErrorTitle} from './naming'

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
