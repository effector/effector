//@flow
/* eslint-disable no-nested-ternary */
import {is} from './validate'
import {eventFabric, createLink} from './event'
import {storeFabric, createStoreObject} from './store'
import {noop} from './blocks'
import {
  step,
  type Graphite,
  createStateRef,
  readRef,
  writeRef,
  nextBarrierID,
} from './stdlib'

const storeBy = (source, clock, fn, greedy, target) => {
  createLink(clock, {
    scope: {
      state: source.stateRef,
      fn,
    },
    child: [target],
    node: [
      //$off
      !greedy && noop,
      //$off
      !greedy
        && step.barrier({
          barrierID: nextBarrierID(),
          priority: 'sampler',
        }),
      step.compute({
        fn: fn
          ? (upd, {state, fn}) => fn(readRef(state), upd)
          : (upd, {state}) => readRef(state),
      }),
    ].filter(Boolean),
  })
  return target
}

const storeByEvent = (source: any, clock: any, fn: any, greedy, target) =>
  storeBy(
    source,
    clock,
    fn,
    greedy,
    target
      || eventFabric({
        name: source.shortName,
        parent: source.domainName,
      }),
  )

const storeByStore = (source: any, clock: any, fn: any, greedy, target) => {
  const sourceState = readRef(source.stateRef)
  return storeBy(
    source,
    clock,
    fn,
    greedy,
    target
      || storeFabric({
        currentState: fn
          ? fn(sourceState, readRef(clock.stateRef))
          : sourceState,
        config: {name: source.shortName},
        parent: source.domainName,
      }),
  )
}

const eventByUnit = (source: any, clock: any, fn: any, greedy, target) => {
  const state = createStateRef()
  const hasValue = createStateRef(false)
  createLink(source, {
    scope: {
      hasValue,
    },
    node: [
      step.update({store: state}),
      step.tap({
        fn(upd, {hasValue}) {
          writeRef(hasValue, true)
        },
      }),
    ],
  })
  target =
    target
    || eventFabric({
      name: source.shortName,
      parent: source.domainName,
    })
  createLink(clock, {
    scope: {
      state,
      hasValue,
      fn,
    },
    child: [target],
    node: [
      step.filter({
        fn: (upd, {hasValue}) => readRef(hasValue),
      }),
      step.compute({
        fn: fn
          ? (upd, {state, fn}) => fn(readRef(state), upd)
          : (upd, {state}) => readRef(state),
      }),
      //$off
      !greedy
        && step.barrier({
          barrierID: nextBarrierID(),
          priority: 'sampler',
        }),
    ].filter(Boolean),
  })
  return target
}

export function sample(
  source: any,
  clock: Graphite,
  fn?: boolean | ((source: any, clock: any) => any),
  greedy: boolean = false,
): any {
  let target
  //config case
  if (clock === undefined) {
    clock = source.clock || source.sampler
    fn = source.fn
    greedy = source.greedy
    //optional target accepted only from config
    target = source.target
    source = source.source
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
  return combinator(sourceNorm, clockNorm, fn, greedy, target)
}

//prettier-ignore
const unitOrCombine = (obj: any) => is.unit(obj)
  ? obj
  : createStoreObject(obj)
