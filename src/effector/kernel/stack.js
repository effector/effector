//@flow
import type {Graph} from '../stdlib'

/**
 * Call stack
 */
export type Stack = {
  value: any,
  a: any,
  b: any,
  parent: Stack | null,
  node: Graph,
}
export const createStack = (node: Graph, parent: Stack | null, value: any) => ({
  a: null,
  b: null,
  node,
  parent,
  value,
})
