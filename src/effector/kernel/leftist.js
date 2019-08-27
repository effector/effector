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
export const initialize = (list: Layer[]): leftist => {
  const temp: leftist[] = [null]
  for (let i = 0; i < list.length; i++) {
    temp[i + 1] = new Leftist(list[i], 1, null, null)
  }
  for (let i = 1; i < temp.length; i += 2) {
    temp.push(mergeMutable(temp[i - 1], temp[i]))
  }
  return temp[temp.length - 1]
}
export const insert = (x: Layer, t: leftist): leftist =>
  mergeNoLoop(new Leftist(x, 1, null, null), t)

export const deleteMin = (param: leftist): leftist => {
  if (param) {
    return mergeNoLoop(param.left, param.right)
  }
  return null
}
const mergeNoLoop = (x: leftist, y: leftist): leftist => {
  if (x === null) return y
  if (y === null) return x
  let temp: leftist
  if (layerComparator(x.value, y.value)) {
    temp = x
    x = y
    y = temp
  }
  // there was x.right = mergeWiki(x.right, y)
  let right = mergeNoLoop(x.right, y)
  let left = x.left
  let rank = x.rank
  if (left === null) {
    // left child doesn't exist, so move right child to the left side
    left = right
    right = null
    // rank was, and remains, 1
  } else {
    // left child does exist, so compare ranks
    // $off
    if (left.rank < right.rank) {
      temp = left
      left = right
      right = temp
    }
    // since we know the right child has the lower rank, we can just
    // add one to its rank
    // $off
    rank = right.rank + 1
  }
  return new Leftist(x.value, rank, left, right)
}

const mergeMutable = (x: leftist, y: leftist): leftist => {
  if (x === null) return y
  if (y === null) return x
  let temp: leftist = null
  if (layerComparator(x.value, y.value)) {
    temp = x
    x = y
    y = temp
    temp = null
  }
  // there was x.right = mergeMutable(x.right, y)
  let right = mergeMutable(x.right, y)
  let left = x.left
  let rank = x.rank
  if (left === null) {
    // left child doesn't exist, so move right child to the left side
    left = right
    right = null
    // rank was, and remains, 1
  } else {
    // left child does exist, so compare ranks
    // $off
    if (left.rank < right.rank) {
      temp = left
      left = right
      right = temp
      temp = null
    }
    // since we know the right child has the lower rank, we can just
    // add one to its rank
    // $off
    rank = right.rank + 1
  }
  x.rank = rank
  x.left = left
  x.right = right
  return x
}
/**
 * Used to maintain priority queue being sorted
 */
const mergeOriginal = (_t1: leftist, _t2: leftist): leftist => {
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
    merged = mergeOriginal(t1.right, t2)
    rank_left = l?.rank || 0
    rank_right = merged?.rank || 0
    if (rank_left >= rank_right) {
      return new Leftist(k1, rank_right + 1, l, merged)
    }
    return new Leftist(k1, rank_left + 1, merged, l)
  }
  /*::return _t1*/
}
