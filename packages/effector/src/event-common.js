//@flow

// import {safeDispatch, port} from './port'
import $$observable from 'symbol-observable'
import type {Stream} from 'most'
import invariant from 'invariant'
import {nextEventID, toTag, counter, type Tag} from './id'
// import type {Event, Effect} from './index.h'

export function basicCommon(domainName: string, name: string) {
 const type: Tag = toTag(domainName, name)
 return {
  eventID: nextEventID(),
  nextSeq: counter(),
  getType: (): Tag => type,
 }
}

export function observable<E, S>(event: any, action$: Stream<E>) {
 function observableState() {
  return {
   /**
    * The minimal observable subscription method.
    * @param {Object} observer Any object that can be used as an observer.
    * The observer object should have a `next` method.
    * @returns {subscription} An object with an `unsubscribe` method that can
    * be used to unsubscribe the observable from the store, and prevent further
    * emission of values from the observable.
    */
   subscribe(observer) {
    invariant(
     typeof observer === 'object',
     'Expected the observer to be an object',
    )
    return action$.subscribe(observer)
   },
   [O]() {
    return event
   },
  }
 }
 const O: any = $$observable
 event[O] = observableState
}
