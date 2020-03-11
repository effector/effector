//@flow
import type {Event} from './unit.h'
import {is} from './is'
import {forIn} from './forIn'

export function split<S>(
  unit: Event<S>,
  cases: {[key: string]: (s: S) => boolean, ...},
): {[key: string]: Event<S>, ...} {
  const result = {}
  let current: Event<S> = is.store(unit) ? (unit: any).updates : unit
  forIn(cases, (fn, key) => {
    result[key] = current.filter({fn})
    current = current.filter({
      fn: data => !fn(data),
    })
  })
  result.__ = current
  return result
}
