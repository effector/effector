//@flow

/**
 * Call stack
 */

export class Stack {
  /*::
  value: {current: any}
  parent: Stack | null
  */
  constructor(value: any, parent: Stack | null) {
    this.value = {current: value}
    this.parent = parent
  }
}
