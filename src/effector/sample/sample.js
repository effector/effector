//@flow
/* eslint-disable no-nested-ternary */
import {combine} from '../combine'
import {type Graphite, is} from '../stdlib'

import {storeByStore, storeByEvent, eventByUnit} from './sampler'

export function sample(
  source: any,
  clock: Graphite,
  fn?: boolean | ((source: any, clock: any) => any),
  greedy: boolean = false,
): any {
  let target
  let name = null
  //config case
  if (clock === undefined && 'source' in source) {
    if ('clock' in source && source.clock == null)
      throw Error('config.clock should be defined')
    clock = source.clock
    fn = source.fn
    greedy = source.greedy
    //optional target & name accepted only from config
    target = source.target
    name = source.name
    source = source.source
  }
  if (clock === undefined) {
    //still undefined!
    clock = source
  }
  const sourceNorm = unitOrCombine(source)
  const clockNorm = unitOrCombine(clock)
  if (typeof fn === 'boolean') {
    greedy = fn
    fn = undefined
  }
  //prettier-ignore
  const combinator =
    is.store(sourceNorm)
      ? is.store(clockNorm)
        ? storeByStore
        : storeByEvent
      : eventByUnit
  return combinator(sourceNorm, clockNorm, (fn: any), greedy, target, name)
}

//prettier-ignore
const unitOrCombine = (obj: any) => is.unit(obj)
  ? obj
  : combine(obj)
