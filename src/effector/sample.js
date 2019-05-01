//@flow

import {is} from 'effector/validate'
import {type Event, eventFabric, forward} from 'effector/event'
import {type Store, storeFabric} from 'effector/store'
import type {Effect} from 'effector/effect'
import {
  createGraph,
  step,
  type Graphite,
  createStateRef,
  readRef,
  nextBarrierID,
} from 'effector/stdlib'
import {noop} from './blocks'

import invariant from 'invariant'

const samplerFabric = ({
  source,
  clock,
  initial,
}: {
  source: Graphite,
  clock: Graphite,
  initial?: any,
}) => {
  const state = createStateRef(initial)
  const sampler = createGraph({
    scope: {state},
    node: [
      noop,
      step.barrier({
        barrierID: nextBarrierID(),
        priority: 'sampler',
      }),
      step.compute({
        fn: (upd, {state}) => readRef(state),
      }),
    ],
  })

  forward({
    from: source,
    to: createGraph({
      node: [step.update({store: state})],
    }),
  })
  forward({
    from: clock,
    to: sampler,
  })
  return sampler
}

function sampleStore(source: Store<any>, clock: Graphite) {
  const initial = source.getState()
  const sampler = samplerFabric({source, clock, initial})

  const unit = storeFabric({
    currentState: initial,
    //TODO: add location
    config: {name: source.shortName},
    parent: source.domainName,
  })
  forward({
    from: sampler,
    to: unit,
  })
  return unit
}

function sampleEvent(
  source: Event<any> | Effect<any, any, any>,
  clock: Graphite,
) {
  const sampler = samplerFabric({source, clock})
  const unit = eventFabric({name: source.shortName, parent: source.domainName})
  forward({
    from: sampler,
    to: unit,
  })

  return unit
}

export function sample(
  source: Event<any> | Store<any> | Effect<any, any, any>,
  sampler: Graphite,
): any {
  invariant(
    is.unit(source),
    'sample: First argument should be Event, ' +
      'Store or Effect, but you passed %s',
    source,
  )
  if (is.store(source)) {
    return sampleStore(source, sampler)
  }
  return sampleEvent(source, sampler)
}
