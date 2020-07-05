import $$observable from 'symbol-observable'
import {Event} from './unit.h'
import {clearNode} from './clearNode'
import {createEvent} from './createUnit'
import {bind2} from './bind'
import {assertObject} from './is'
import {throwError} from './throw'

export function fromObservable<T>(observable: any): Event<T> {
  assertObject(observable)
  const observableItem =
    $$observable in observable ? observable[$$observable]() : observable
  if (!observableItem.subscribe)
    throwError('expect observable to have .subscribe')
  const event: Event<T> = createEvent()
  const disposer = bind2(clearNode, event, undefined)
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
