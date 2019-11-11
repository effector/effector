//@flow
import type {Graph} from '../stdlib'

/**
 * Call stack
 */

export class Stack {
  /*::
  value: {current: any, ...}
  parent: Stack | null
  node: Graph
  */
  constructor(value: any, parent: Stack | null, node: Graph) {
    this.value = {current: value}
    this.parent = parent
    this.node = node
  }
}
