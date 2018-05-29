//@flow

import type {Cmd} from '../cmd'
import {intRefcount} from '../../refcount'
export type TreeType = 41
export const TREE: TreeType = 41

const nextId = intRefcount()

export class Tree {
 /*::
 type: TreeType
 +id: number
 +node: Cmd;
 +childs: Set<Tree>;
 */
 constructor(id: number, node: Cmd, childs: Set<Tree>) {
  this.id = id
  this.node = node
  this.childs = childs
 }
}

Tree.prototype.type = (41: TreeType)

export function createTree(node: Cmd, childs?: Set<Tree> | Array<Tree>): Tree {
 let resultChilds
 if (!childs) {
  resultChilds = new Set()
 } else if (Array.isArray(childs)) {
  resultChilds = new Set(childs)
 } else {
  resultChilds = childs
 }
 return new Tree(nextId(), node, resultChilds)
}
