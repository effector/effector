//@flow
/* eslint-disable no-nested-ternary */
import {createStoreObject} from '../store'
import {type Graphite, is} from '../stdlib'

import {storeByStore, storeByEvent, eventByUnit} from './sampler'

export function sample(
  source: any,
  clock: Graphite,
  fn?: boolean | ((source: any, clock: any) => any),
  greedy: boolean = false,
): any {
  let target
  //config case
  if (clock === undefined && 'source' in source) {
    clock = source.clock || source.sampler
    fn = source.fn
    greedy = source.greedy
    //optional target accepted only from config
    target = source.target
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
  return combinator(sourceNorm, clockNorm, (fn: any), greedy, target)
}

//prettier-ignore
const unitOrCombine = (obj: any) => is.unit(obj)
  ? obj
  : createStoreObject(obj)
