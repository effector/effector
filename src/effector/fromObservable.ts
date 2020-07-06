import {observableSymbol} from './observable'
import {Event} from './unit.h'
import {clearNode} from './clearNode'
import {createEvent} from './createUnit'
import {bind2} from './bind'
import {assertObject} from './is'
import {throwError} from './throw'

export function fromObservable<T>(observable: any): Event<T> {
  assertObject(observable)
  const observableItem =
    observableSymbol in observable ? observable[observableSymbol]() : observable
  if (!observableItem.subscribe)
    throwError('expect observable to have .subscribe')
  const event = createEvent<T>()
  const disposer = bind2(clearNode, event, undefined)
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
