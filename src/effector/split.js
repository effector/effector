//@flow
import type {Event} from './unit.h'
import {bind, is} from './stdlib'

//eslint-disable-next-line no-unused-vars
declare export function split<
  S,
  Obj: {-[name: string]: (payload: S) => boolean, ...},
>(
  source: Event<S>,
  cases: Obj,
): $ObjMap<Obj, (h: (payload: S) => boolean) => Event<S>>

const invertCondition = (fn, data) => !fn(data)

export function split<S>(
  unit: Event<S>,
  cases: {[key: string]: (s: S) => boolean, ...},
): {[key: string]: Event<S>, ...} {
  const result = {}
  let current: Event<S> = is.store(unit) ? (unit: any).updates : unit
  for (const key in cases) {
    result[key] = current.filter({fn: cases[key]})
    current = current.filter({
      fn: bind(invertCondition, cases[key]),
    })
  }
  result.__ = current
  return result
}
