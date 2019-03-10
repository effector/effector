//@flow

import {isStore, isEvent, isEffect} from 'effector/stdlib'
import {type Event, forward, eventFabric} from 'effector/event'
import {type Store, storeFabric} from 'effector/store'
import type {Effect} from 'effector/effect'
import warning from 'warning'

function sampleStore(source: Store<any>, sampler: Event<any> | Store<any>) {
  // [current, hasValue]
  const hold = [undefined, false]

  const unit = storeFabric({
    currentState: source.defaultState,
    name: source.shortName,
    parent: source.domainName,
  })

  //TODO: unsubscribe from this
  const unsub = source.watch(value => {
    hold[0] = value
    hold[1] = true
  })

  sampler.watch(() => {
    if (hold[1]) unit.setState(hold[0])    
  })

  return unit
}

function sampleEvent(
  source: Event<any> | Effect<any, any, any>,
  sampler: Event<any> | Store<any>,
) {
  // [current, hasValue]
  const hold = [undefined, false]

  const unit = eventFabric({name: source.shortName, parent: source.domainName})

  //TODO: unsubscribe from this
  const unsub = source.watch(value => {
    hold[0] = value
    hold[1] = true
  })

  sampler.watch(() => {
    if (hold[1]) unit(hold[0])
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
  if (isEvent(source)) {
    //$off
    return sampleEvent(source, sampler)
  }
  if (isEffect(source)) {
    //$off
    return sampleEvent(source, sampler)
  }
  warning(
    false,
    'sample: First argument should be Event, Store or Effect, but you passed %s.',
    source,
  )
}
