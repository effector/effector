//@flow

import {eventFabric, createLinkNode} from '../event'
import {storeFabric} from '../store'
import {
  step,
  createStateRef,
  readRef,
  writeRef,
  nextBarrierID,
  addLinkToOwner,
} from '../stdlib'

export const storeBy = (
  source: any,
  clock: any,
  fn: null | ((a: any, b: any) => any),
  greedy: boolean,
  target: any,
) => {
  addLinkToOwner(
    source,
    createLinkNode(clock, target, {
      scope: {
        state: source.stateRef,
        fn,
      },
      node: [
        //$off
        !greedy &&
          step.barrier({
            barrierID: nextBarrierID(),
            priority: 'sampler',
          }),
        step.compute({
          fn: fn
            ? (upd, {state, fn}) => fn(readRef(state), upd)
            : (upd, {state}) => readRef(state),
        }),
      ].filter(Boolean),
      meta: {op: 'sample', sample: 'store'},
    }),
  )
  return target
}

export const storeByEvent = (
  source: any,
  clock: any,
  fn: null | ((a: any, b: any) => any),
  greedy: boolean,
  target: any,
) =>
  storeBy(
    source,
    clock,
    fn,
    greedy,
    target ||
      eventFabric({
        name: source.shortName,
        parent: source.domainName,
      }),
  )

export const storeByStore = (
  source: any,
  clock: any,
  fn: null | ((a: any, b: any) => any),
  greedy: boolean,
  target: any,
) => {
  const sourceState = readRef(source.stateRef)
  return storeBy(
    source,
    clock,
    fn,
    greedy,
    target ||
      storeFabric({
        currentState: fn
          ? fn(sourceState, readRef(clock.stateRef))
          : sourceState,
        config: {name: source.shortName},
        parent: source.domainName,
      }),
  )
}

export const eventByUnit = (
  source: any,
  clock: any,
  fn: null | ((a: any, b: any) => any),
  greedy: boolean,
  target: any,
) => {
  target =
    target ||
    eventFabric({
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
      meta: {op: 'sample', sample: 'source'},
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
        !greedy &&
          step.barrier({
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
      meta: {op: 'sample', sample: 'clock'},
    }),
  )
  return target
}
