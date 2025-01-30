import {observableSymbol} from './observable'
import type {Event} from './unit.h'
import {createEvent} from './createUnit'
import {assertObject} from './is'
import {assert} from './throw'
import {createSubscription} from './subscription'
import {getGraph} from './getter'

export function fromObservable<T>(observable: any): Event<T> {
  assertObject(observable)
  const observableItem =
    observableSymbol in observable ? observable[observableSymbol]() : observable
  assert(observableItem.subscribe, 'expect observable to have .subscribe')
  const event = createEvent<T>()
  const disposer = createSubscription(getGraph(event))
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
