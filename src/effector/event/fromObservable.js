//@flow

import invariant from 'invariant'
import $$observable from 'symbol-observable'
import {clearNode} from 'effector/stdlib'
import {createEvent} from './createEvent'
import type {Event} from './index.h'

export function fromObservable<T>(observable: mixed): Event<T> {
  invariant(
    typeof observable === 'function'
      || (typeof observable === 'object' && observable !== null),
    'expect observable to be object or function',
  )
  invariant(
    //$off
    ($$observable: '@@observable') in observable,
    'expect observable to have property Symbol.observable',
  )
  //$off
  const observableItem = observable[(($$observable: any): '@@observable')]()
  const event: Event<T> = createEvent()
  const disposer = clearNode.bind(null, event, {})
  observableItem.subscribe({
    next: event,
    error: disposer,
    complete: disposer,
  })
  return event
}
