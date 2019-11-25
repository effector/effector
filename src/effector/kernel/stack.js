//@flow
import type {Graph} from '../stdlib'

/**
 * Call stack
 */

export class Stack {
  /*::
  value: any
  a: any
  b: any
  parent: Stack | null
  node: Graph
  */
  constructor(node: Graph, parent: Stack | null, value: any) {
    this.a = null
    this.b = null
    this.node = node
    this.parent = parent
    this.value = value
  }
}
