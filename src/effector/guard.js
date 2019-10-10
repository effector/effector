//@flow

import type {Unit} from './stdlib'
import {forward} from './forward'
import {sample} from './sample'
import {createEvent} from './event'
import {is} from './stdlib'

export function guard({source, when, target, greedy = false}: any) {
  if (!is.unit(when)) {
    forward({
      from: (is.store(source) ? source.updates : source).filter({fn: when}),
      to: target,
    })
    return
  }
  const src = createEvent()
  sample({
    source: when,
    clock: source,
    target: src,
    fn: (guard, data) => ({guard, data}),
    greedy,
  })
  forward({
    from: src.filter({fn: ({guard}) => guard}).map(({data}) => data),
    to: target,
  })
}
