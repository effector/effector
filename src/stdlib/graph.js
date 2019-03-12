//@flow

import type {TypeDef, Graph} from './index.h'
import {step} from './typedef'

//eslint-disable-next-line no-unused-vars
declare export function createGraph(opts: {|
  +node: Array<TypeDef<*, *>>,
  +child?: Array<TypeDef<*, *>>,
  +from?: Array<TypeDef<*, *>>,
|}): Graph<>
declare export function createGraph<Val: {[name: string]: any}>(opts: {|
  +node: Array<TypeDef<*, *>>,
  +child?: Array<TypeDef<*, *>>,
  +from?: Array<TypeDef<*, *>>,
  +val: Val,
|}): Graph<Val>
export function createGraph({
  node,
  child = [],
  from = [],
  val = {},
}: {
  +node: Array<TypeDef<*, *>>,
  +child?: Array<TypeDef<*, *>>,
  +from?: Array<TypeDef<*, *>>,
  val?: {[name: string]: any},
}): Graph<any> {
  const next = step('multi', child)
  const items = node.concat([next])
  return {
    from,
    seq: step('seq', items),
    next,
    val,
  }
}
