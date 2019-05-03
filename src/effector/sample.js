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

export function sample(source: any, sampler: Graphite): any {
  invariant(
    is.unit(source),
    'sample: First argument should be Event, ' +
      'Store or Effect, but you passed %s',
    source,
  )
  const name = source.shortName
  const parent = source.domainName
  const state = createStateRef()
  let target
  const readerNode = [step.update({store: state})]
  const readerScope = {}
  const linkNode = [
    noop,
    step.barrier({
      barrierID: nextBarrierID(),
      priority: 'sampler',
    }),
    step.compute({
      fn: (upd, {state}) => readRef(state),
    }),
  ]
  const linkScope = {}
  linkScope.state = state
  //TODO better split cases back
  if (is.store(source)) {
    target = storeFabric({
      currentState: writeRef(state, source.getState()),
      config: {name},
      parent,
    })
  } else {
    target = eventFabric({name, parent})
    const hasValue = createStateRef(false)
    linkScope.hasValue = hasValue
    readerScope.hasValue = hasValue
    linkNode[0] = step.filter({
      fn: (upd, {hasValue}) => readRef(hasValue),
    })
    readerNode.push(
      step.tap({
        fn(upd, {hasValue}) {
          writeRef(hasValue, true)
        },
      }),
    )
  }
  const link = createGraph({
    scope: linkScope,
    child: [target],
    node: linkNode,
  })

  forward({
    from: source,
    to: createGraph({
      scope: readerScope,
      node: readerNode,
    }),
  })
  forward({
    from: sampler,
    to: link,
  })
  return target
}
