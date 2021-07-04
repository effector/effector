import {observableSymbol} from './observable'
import {Event} from './unit.h'
import {createEvent} from './createUnit'
import {assertObject} from './is'
import {throwError} from './throw'
import {createSubscription} from './subscription'

export function fromObservable<T>(observable: any): Event<T> {
  assertObject(observable)
  const observableItem =
    observableSymbol in observable ? observable[observableSymbol]() : observable
  if (!observableItem.subscribe)
    throwError('expect observable to have .subscribe')
  const event = createEvent<T>()
  const disposer = createSubscription(event)
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
