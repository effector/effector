//@flow

import $$observable from 'symbol-observable'
import type {Event} from './unit.h'
import {clearNode} from './clearNode'
import {createEvent} from './createUnit'
import {bind2} from './stdlib'

export function fromObservable<T>(observable: mixed): Event<T> {
  if (observable !== Object(observable))
    throw Error('expect observable to be an object') // or function
  const observableItem: any =
    //$off
    ($$observable: '@@observable') in observable
      ? //$off
      observable[(($$observable: any): '@@observable')]()
      : observable
  if (!observableItem.subscribe)
    throw Error('expect observable to have .subscribe')
  const event: Event<T> = createEvent()
  const disposer = bind2(clearNode, event, undefined)
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
