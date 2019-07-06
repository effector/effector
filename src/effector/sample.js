//@flow
/* eslint-disable no-nested-ternary */
import {eventFabric, createLinkNode} from './event'
import {storeFabric, createStoreObject} from './store'
import {noop} from './blocks'
import {
  step,
  type Graphite,
  createStateRef,
  readRef,
  writeRef,
  nextBarrierID,
  is,
  addLinkToOwner,
} from './stdlib'

const storeBy = (source, clock, fn, greedy, target) => {
  addLinkToOwner(
    source,
    createLinkNode(clock, target, {
      scope: {
        state: source.stateRef,
        fn,
      },
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
    }),
  )
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
  target =
    target
    || eventFabric({
      name: source.shortName,
      parent: source.domainName,
    })
  const hasSource = createStateRef(false)
  const sourceState = createStateRef()
  const clockState = createStateRef()

  addLinkToOwner(
    clock,
    createLinkNode(source, target, {
      scope: {hasSource},
      node: [
        step.update({store: sourceState}),
        step.compute({
          fn(upd, {hasSource}) {
            writeRef(hasSource, true)
          },
        }),
        step.filter({fn: () => false}),
      ],
    }),
  )
  addLinkToOwner(
    source,
    createLinkNode(clock, target, {
      scope: {sourceState, clockState, hasSource, fn},
      node: [
        step.update({store: clockState}),
        step.filter({
          fn: (upd, {hasSource}) => readRef(hasSource),
        }),
        //$off
        !greedy
          && step.barrier({
            barrierID: nextBarrierID(),
            priority: 'sampler',
          }),
        step.compute({
          fn: fn
            ? (upd, {sourceState, clockState, fn}) =>
              fn(readRef(sourceState), readRef(clockState))
            : (upd, {sourceState}) => readRef(sourceState),
        }),
      ].filter(Boolean),
    }),
  )
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
  return combinator(sourceNorm, clockNorm, fn, greedy, target)
}

//prettier-ignore
const unitOrCombine = (obj: any) => is.unit(obj)
  ? obj
  : createStoreObject(obj)
