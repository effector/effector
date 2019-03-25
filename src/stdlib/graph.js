//@flow

import type {Graph, Step} from './index.h'
import {step} from './typedef'

export const createNode = (...node: Array<Step>): Graph<> => createGraph({node})

//eslint-disable-next-line no-unused-vars
declare export function createGraph(opts: {|
  +node: Array<Step>,
  +child?: Array<Step>,
  +from?: Array<Step>,
|}): Graph<>
declare export function createGraph<Val: {[name: string]: any}>(opts: {|
  +node: Array<Step>,
  +child?: Array<Step>,
  +from?: Array<Step>,
  +val: Val,
|}): Graph<Val>
export function createGraph({
  node,
  child = [],
  from = [],
  val = {},
}: {
  +node: Array<Step>,
  +child?: Array<Step>,
  +from?: Array<Step>,
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
