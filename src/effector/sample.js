//@flow

import {isStore, isEvent, isEffect} from 'effector/stdlib'
import {type Event, eventFabric} from 'effector/event'
import {type Store, storeFabric} from 'effector/store'
import type {Effect} from 'effector/effect'

import invariant from 'invariant'

function sampleStore(source: Store<any>, sampler: Event<any> | Store<any>) {
  let current = undefined
  let hasValue = false

  const unit = storeFabric({
    currentState: source.defaultState,
    //TODO: add location
    config: {name: source.shortName},
    parent: source.domainName,
  })

  //TODO: unsubscribe from this
  const unsub = source.watch(value => {
    current = value
    hasValue = true
  })

  sampler.watch(() => {
    if (hasValue) unit.setState(current)
  })

  return unit
}

function sampleEvent(
  source: Event<any> | Effect<any, any, any>,
  sampler: Event<any> | Store<any>,
) {
  let current = undefined
  let hasValue = false

  const unit = eventFabric({name: source.shortName, parent: source.domainName})

  //TODO: unsubscribe from this
  const unsub = source.watch(value => {
    current = value
    hasValue = true
  })

  sampler.watch(() => {
    if (hasValue) unit(current)
  })

  return unit
}

export function sample(
  source: Event<any> | Store<any> | Effect<any, any, any>,
  sampler: Event<any> | Store<any>,
): any {
  if (isStore(source)) {
    //$off
    return sampleStore(source, sampler)
  }
  if (isEvent(source) || isEffect(source)) {
    //$off
    return sampleEvent(source, sampler)
  }
  invariant(
    false,
    'sample: First argument should be Event, Store or Effect, but you passed %s.',
    source,
  )
}
