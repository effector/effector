//@flow

import {is} from 'effector/validate'
import {eventFabric, forward} from 'effector/event'
import {storeFabric} from 'effector/store'
import {
  createGraph,
  step,
  type Graphite,
  createStateRef,
  readRef,
  writeRef,
  nextBarrierID,
} from 'effector/stdlib'
import {noop} from './blocks'

import invariant from 'invariant'

const sampleStore = (source, sampler, fn) => {
  const state = source.stateRef
  const target = storeFabric({
    currentState: readRef(state),
    config: {name: source.shortName},
    parent: source.domainName,
  })

  createLink(sampler, {
    scope: {state, fn},
    child: [target],
    node: [
      noop,
      step.barrier({
        barrierID: nextBarrierID(),
        priority: 'sampler',
      }),
      step.compute({
        fn: fn
          ? (upd, {state, fn}) => readRef(fn)(readRef(state), upd)
          : (upd, {state}) => readRef(state),
      }),
    ],
  })
  return target
}

const sampleEvent = (source, sampler, fn) => {
  const state = createStateRef()
  const target = eventFabric({
    name: source.shortName,
    parent: source.domainName,
  })
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
  createLink(sampler, {
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
          ? (upd, {state, fn}) => readRef(fn)(readRef(state), upd)
          : (upd, {state}) => readRef(state),
      }),
    ],
  })
  return target
}

export function sample(
  source: any,
  sampler: Graphite,
  fn?: (source: any, sampler: any) => any,
): any {
  invariant(
    is.unit(source),
    'sample: First argument should be Event, ' +
      'Store or Effect, but you passed %s',
    source,
  )
  return is.store(source)
    ? sampleStore(source, sampler, fn)
    : sampleEvent(source, sampler, fn)
}

const createLink = (from, config) => {
  const to = createGraph(config)
  return forward({from, to})
}
