//@flow
import {getPriority} from './getPriority'
import {type Layer} from './layer'

const layerComparatorNum = (a: Layer, b: Layer) => {
  if (a.type === b.type) return a.id - b.id
  return getPriority(a.type) - getPriority(b.type)
}

export function push(array: Item[], value: Layer) {
  const item = new Item(value, array.length)
  array.push(item)
  siftUp(array, item)
}

export function pop(array: Item[]): Item | null {
  if (array.length === 0) return null
  const item = array[0]
  const last = array.pop()
  if (last && last !== item) {
    last.index = item.index
    array[item.index] = last
    siftUp(array, last)
    siftDown(array, last)
  }
  return item
}

export class Item {
  /*::
  value: Layer
  index: number
  */
  constructor(value: Layer, index: number) {
    this.value = value
    this.index = index
  }
}

function swap(array: Item[], left: Item, right: Item) {
  const li = left.index
  const ri = right.index
  array[li] = right
  array[ri] = left
  left.index = ri
  right.index = li
}

function siftUp(array: Item[], item: Item) {
  let parent
  while (item.index > 0) {
    // `item.index - 1` is cast to uint32 in by the `>>> 1`, which could make
    // the value wrap around if `item.index` were larger than `2**32`.
    // But `item.index` is initialized from `Array#length` and according to
    // ECMA-262, 7ᵗʰ Edition / June 2016:
    //   "Every Array object has a length property whose value is always a
    //    nonnegative integer less than 2**32."
    parent = array[(item.index - 1) >>> 1]
    if (layerComparatorNum(parent.value, item.value) <= 0) return
    swap(array, parent, item)
  }
}

function siftDown(array: Item[], item: Item) {
  let left
  let right
  let child
  for (;;) {
    left = item.index * 2 + 1
    if (left >= array.length) return
    right = left + 1
    child =
      right < array.length &&
      layerComparatorNum(array[right].value, array[left].value) < 0
        ? array[right]
        : array[left]
    if (layerComparatorNum(child.value, item.value) > 0) return
    swap(array, child, item)
  }
}
