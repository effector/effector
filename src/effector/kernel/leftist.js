//@flow

import {type Layer, layerComparator} from './layer'

/**
 * Lestist heap tree
 *
 * See http://www.dgp.toronto.edu/people/JamesStewart/378notes/10leftist/
 */
export class Leftist {
  /*::
  left: leftist
  right: leftist
  value: Layer
  rank: number
  */
  constructor(value: Layer, rank: number, left: leftist, right: leftist) {
    this.value = value
    this.rank = rank
    this.left = left
    this.right = right
  }
}
/**
 * Although Leftist is a class, in most cases it acts as nullable value,
 * therefore, it seems reasonable to express this explicitly
 */
export type leftist = null | Leftist
export const insert = (x: Layer, t: leftist): leftist =>
  merge(new Leftist(x, 1, null, null), t)

export const deleteMin = (param: leftist): leftist => {
  if (param) {
    return merge(param.left, param.right)
  }
  return null
}
/**
 * Used to maintain priority queue being sorted
 */
const merge = (_t1: leftist, _t2: leftist): leftist => {
  let t2
  let t1
  let k1
  let l
  let merged
  let rank_left
  let rank_right
  while (true) {
    t2 = _t2
    t1 = _t1
    if (!t1) return t2
    if (!t2) return t1
    k1 = t1.value
    l = t1.left
    if (layerComparator(k1, t2.value)) {
      _t2 = t1
      _t1 = t2
      continue
    }
    merged = merge(t1.right, t2)
    rank_left = l?.rank || 0
    rank_right = merged?.rank || 0
    if (rank_left >= rank_right) {
      return new Leftist(k1, rank_right + 1, l, merged)
    }
    return new Leftist(k1, rank_left + 1, merged, l)
  }
  /*::return _t1*/
}
