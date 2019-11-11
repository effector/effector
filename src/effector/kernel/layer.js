//@flow

import type {Graph} from '../stdlib'

import {type PriorityTag, getPriority} from './getPriority'
import type {Stack} from './stack'

/**
 * Position in the current branch,
 * including call stack, priority type
 * and index of next step in the executed Graph
 */
export type Layer = {|
  +firstIndex: number,
  +stack: Stack,
  +resetStop: boolean,
  +type: PriorityTag,
  +id: number,
|}

export const layerComparator = (a: Layer, b: Layer) => {
  if (a.type === b.type) return a.id > b.id
  return getPriority(a.type) > getPriority(b.type)
}
