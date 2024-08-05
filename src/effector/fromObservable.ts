import type {Event} from './unit.h'
import {createEvent} from './createUnit'
import {assertObject, assert} from './validate'
import {createSubscription} from './createWatch'

export const observableSymbol =
  (typeof Symbol !== 'undefined' && Symbol.observable) || '@@observable'

export function fromObservable<T>(observable: any): Event<T> {
  assertObject(observable)
  const observableItem =
    observableSymbol in observable ? observable[observableSymbol]() : observable
  assert(observableItem.subscribe, 'expect observable to have .subscribe')
  const event = createEvent<T>()
  const disposer = createSubscription(event)
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
