//@flow strict

import {type Lazy, fromThunk} from './instance'

export function combine<A, B, C>(
  a: Lazy<A>,
  b: Lazy<B>,
  fn: (a: A, b: B) => C,
): Lazy<C> {
  let aCached /*:: = a.read()*/
  let bCached /*:: = b.read()*/
  let resultVal /*:: = fn(aCached, bCached)*/
  const result = fromThunk(() => {
    const aValue = a.read()
    const bValue = b.read()
    if (aValue !== aCached || bValue !== bCached) {
      aCached = aValue
      bCached = bValue
      resultVal = fn(aValue, bValue)
    }
    return resultVal
  })
  return result
}
