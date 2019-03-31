//@flow

import type {Graph, Cmd} from './index.h'

export const createNode = (...node: Array<Cmd>): Graph<> => createGraph({node})

//eslint-disable-next-line no-unused-vars
declare export function createGraph(opts: {|
  +node: Array<Cmd>,
  +child?: Array<Graph<any>>,
  +from?: Array<Graph<any>>,
|}): Graph<>
declare export function createGraph<Val: {[name: string]: any}>(opts: {|
  +node: Array<Cmd>,
  +child?: Array<Graph<any>>,
  +from?: Array<Graph<any>>,
  +val: Val,
|}): Graph<Val>
export function createGraph({
  node,
  child = [],
  from = [],
  val = {},
}: {
  +node: Array<Cmd>,
  +child?: Array<Graph<any>>,
  +from?: Array<Graph<any>>,
  val?: {[name: string]: any},
}): Graph<any> {
  return {
    from,
    seq: node,
    next: child,
    val,
  }
}
