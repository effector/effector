//@flow

import $$observable from 'symbol-observable'
import {clearNode} from '../stdlib'
import {createEvent} from './createEvent'
import type {Event} from './index.h'

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
  const disposer = clearNode.bind(null, event, {})
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
