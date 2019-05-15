//@flow

import {is} from './validate'
import {eventFabric, createLink} from './event'
import {storeFabric, createStoreObject} from './store'
import {
  step,
  type Graphite,
  createStateRef,
  readRef,
  writeRef,
  nextBarrierID,
} from './stdlib'

import invariant from 'invariant'

const sampleFabric = ({
  source,
  sampler,
  fn,
  target,
}: {
  source: Graphite,
  sampler: Graphite,
  fn?: (source: any, sampler: any) => any,
  target: Graphite,
}) => {
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
  return createLink(sampler, {
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
}
const handleFirstState = (source, clock, fn) => {
  //assume that source is store
  const sourceState = readRef(source.stateRef)
  let firstState
  if (fn) {
    if (is.store(clock)) {
      firstState = fn(sourceState, readRef((clock: any).stateRef))
    } else {
      //TODO it must be result of calling fn(source, clockEvent)
      firstState = sourceState
    }
  } else {
    firstState = sourceState
  }
  return firstState
}
export function sample(
  source: any,
  sampler: Graphite,
  fn?: (source: any, sampler: any) => any,
): any {
  if (!sampler) {
    return sampleFabric(source)
  }

  let target
  if (is.store(source)) {
    target = storeFabric({
      currentState: handleFirstState(source, sampler, fn),
      config: {name: source.shortName},
      parent: source.domainName,
    })
  } else {
    target = eventFabric({
      name: source.shortName,
      parent: source.domainName,
    })
  }
  if (is.unit(source)) {
    sampleFabric({source, sampler, fn, target})
    return target
  }
  if (
    Array.isArray(source)
    || (typeof source === 'object' && source !== null)
  ) {
    const store = createStoreObject(source)
    target = storeFabric({
      currentState: handleFirstState(source, sampler, fn),
      config: {name: store.shortName},
      parent: store.domainName,
    })
    sampleFabric({source: store, sampler, fn, target})
    return target
  }
  invariant(
    false,
    'sample: First argument should be Event, ' +
      'Store, Effect [store, store, ...], or ' +
      '{foo: store, bar: store}',
  )
}
