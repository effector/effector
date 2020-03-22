//@flow

import $$observable from 'symbol-observable'
import type {Event} from './unit.h'
import {clearNode} from './clearNode'
import {createEvent} from './createUnit'
import {assertObject} from './is'
import {throwError} from './throw'

export function fromObservable<T>(observable: mixed): Event<T> {
  assertObject(observable)
  const observableItem =
    $$observable in observable ? observable[$$observable]() : observable
  if (!observableItem.subscribe)
    throwError('expect observable to have .subscribe')
  const event: Event<T> = createEvent()
  const disposer = () => clearNode(event)
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
