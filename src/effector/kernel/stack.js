//@flow
import type {Graph} from '../stdlib'

/**
 * Call stack
 */

export class Stack {
  /*::
  value: any
  reg: {a: any, b: any}
  parent: Stack | null
  node: Graph
  */
  constructor(node: Graph, parent: Stack | null, value: any) {
    this.reg = {a: null, b: null}
    this.node = node
    this.parent = parent
    this.value = value
  }
}
