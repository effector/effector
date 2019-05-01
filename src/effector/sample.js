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
  nextBarrierID,
} from 'effector/stdlib'
import {noop} from './blocks'

import invariant from 'invariant'

export function sample(source: any, sampler: Graphite): any {
  invariant(
    is.unit(source),
    'sample: First argument should be Event, ' +
      'Store or Effect, but you passed %s',
    source,
  )
  let initial
  let target
  const name = source.shortName
  const parent = source.domainName
  if (is.store(source)) {
    initial = source.getState()
    target = storeFabric({
      currentState: initial,
      config: {name},
      parent,
    })
  } else {
    target = eventFabric({name, parent})
  }
  const state = createStateRef(initial)
  const link = createGraph({
    scope: {state},
    child: [target],
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
    from: sampler,
    to: link,
  })
  return link
}
