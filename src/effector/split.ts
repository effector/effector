import {Event} from './unit.h'
import {is} from './is'
import {forIn} from './forIn'
import {forward} from './forward'

export function split(
  unit: any,
  match: {[key: string]: (s: any) => boolean},
): any {
  const result = {} as Record<string, Event<any>>
  let cases: any
  const knownCases = !match
  if (knownCases) {
    cases = unit.cases
    match = unit.match
    unit = unit.source
  }
  let current: Event<any> = is.store(unit) ? unit.updates : unit
  forIn(match, (fn, key) => {
    result[key] = current.filter({fn})
    current = current.filter({
      fn: data => !fn(data),
    })
  })
  result.__ = current
  if (knownCases) {
    forIn(result, (event, key) => {
      if (cases[key]) {
        forward({
          from: event,
          to: cases[key],
        })
      }
    })
  } else return result
}
