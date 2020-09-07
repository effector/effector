import {Event} from './unit.h'
import {is} from './is'
import {forIn} from './collection'
import {forward} from './forward'
import {processArgsToConfig} from './config'

export function split(...args: any[]): any {
  let cases: any
  let [[unit, match], metadata] = processArgsToConfig(args)
  const knownCases = !match
  if (knownCases) {
    cases = unit.cases
    match = unit.match
    unit = unit.source
  }
  const result = {} as Record<string, Event<any>>
  let current: Event<any> = is.store(unit) ? unit.updates : unit
  forIn(match, (fn, key) => {
    //@ts-ignore
    result[key] = current.filter({fn, config: metadata})
    //@ts-ignore
    current = current.filter({
      fn: data => !fn(data),
      config: metadata,
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
