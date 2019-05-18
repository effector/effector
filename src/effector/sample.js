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

const storeBy = (source, clock, fn, target) => {
  createLink(clock, {
    scope: {
      state: source.stateRef,
      fn,
    },
    child: [target],
    node: [
      noop,
      step.barrier({
        barrierID: nextBarrierID(),
        priority: 'sampler',
      }),
      step.compute({
        fn: fn
          ? (upd, {state, fn}) => fn(readRef(state), upd)
          : (upd, {state}) => readRef(state),
      }),
    ],
  })
  return target
}

const storeByEvent = (source: any, clock: any, fn) =>
  storeBy(
    source,
    clock,
    fn,
    eventFabric({
      name: source.shortName,
      parent: source.domainName,
    }),
  )

const storeByStore = (source: any, clock: any, fn) => {
  const sourceState = readRef(source.stateRef)
  return storeBy(
    source,
    clock,
    fn,
    storeFabric({
      currentState: fn ? fn(sourceState, readRef(clock.stateRef)) : sourceState,
      config: {name: source.shortName},
      parent: source.domainName,
    }),
  )
}

const eventBy = (source: any, clock: any, fn) => {
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
  const target = eventFabric({
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
      noop,
      step.barrier({
        barrierID: nextBarrierID(),
        priority: 'sampler',
      }),
      step.filter({
        fn: (upd, {hasValue}) => readRef(hasValue),
      }),
      step.compute({
        fn: fn
          ? (upd, {state, fn}) => fn(readRef(state), upd)
          : (upd, {state}) => readRef(state),
      }),
    ],
  })
  return target
}

export function sample(
  source: any,
  clock: Graphite,
  fn?: (source: any, clock: any) => any,
): any {
  const sourceNorm = unitOrCombine(source)
  const clockNorm = unitOrCombine(clock)
  //prettier-ignore
  const combinator =
    is.store(sourceNorm)
      ? is.store(clockNorm)
        ? storeByStore
        : storeByEvent
      : eventBy
  return combinator(sourceNorm, clockNorm, fn)
}

//prettier-ignore
const unitOrCombine = (obj: any) => is.unit(obj)
  ? obj
  : createStoreObject(obj)
