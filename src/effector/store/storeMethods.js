//@flow
import $$observable from 'symbol-observable'

import invariant from 'invariant'
import {step, readRef, writeRef} from '../stdlib'
import {filterChanged, noop} from '../blocks'
import {startPhaseTimer, stopPhaseTimer} from '../perf'
import {getDisplayName} from '../naming'
import {createLink, type Event} from '../event'
import type {Store, ThisStore} from './index.h'
import type {Subscriber} from '../index.h'

export function reset(storeInstance: ThisStore, ...events: Array<Event<any>>) {
  for (const event of events)
    on.call(this, storeInstance, event, () => storeInstance.defaultState)
  return this
}
export function getState(storeInstance: ThisStore) {
  return readRef(storeInstance.plainState)
}
export function off(storeInstance: ThisStore, event: Event<any>) {
  const currentSubscription = storeInstance.subscribers.get(event)
  if (currentSubscription === undefined) return
  currentSubscription()
  storeInstance.subscribers.delete(event)
}

export function on(storeInstance: ThisStore, event: any, handler: Function) {
  const from: Event<any> = event
  const oldLink = storeInstance.subscribers.get(from)
  if (oldLink) oldLink()
  storeInstance.subscribers.set(
    from,
    createLink(from, {
      scope: {handler, state: storeInstance.plainState, trigger: from},
      child: [storeInstance],
      //prettier-ignore
      node: [
        step.compute({
          fn(newValue, {handler, state, trigger}) {
            const result = handler(
              readRef(state),
              newValue,
              getDisplayName(trigger),
            )
            if (result === undefined) return
            return writeRef(state, result)
          },
        }),
      ]
    }),
  )
  return this
}
export function observable(storeInstance: ThisStore) {
  const result = {
    subscribe(observer: Subscriber<any>) {
      invariant(
        typeof observer === 'object' && observer !== null,
        'Expected the observer to be an object.',
      )

      function observeState(state) {
        if (observer.next) {
          observer.next(state)
        }
      }
      return subscribe(storeInstance, observeState)
    },
  }
  //$off
  result[$$observable] = function() {
    return this
  }
  return result
}
export function watch(
  storeInstance: ThisStore,
  eventOrFn: Event<*> | Function,
  fn?: Function,
) {
  const message = 'watch requires function handler'
  switch (eventOrFn?.kind) {
    case 'store':
    case 'event':
    case 'effect':
      invariant(typeof fn === 'function', message)
      return eventOrFn.watch(payload =>
        //$todo
        fn(getState(storeInstance), payload, getDisplayName(eventOrFn)),
      )
    default:
      invariant(typeof eventOrFn === 'function', message)
      return subscribe(storeInstance, eventOrFn)
  }
}
export function subscribe(storeInstance: ThisStore, listener: Function) {
  invariant(
    typeof listener === 'function',
    'Expected the listener to be a function',
  )
  let stopPhaseTimerMessage = 'Got initial error'
  let lastCall = getState(storeInstance)

  startPhaseTimer(storeInstance, 'subscribe')
  try {
    listener(lastCall)
    stopPhaseTimerMessage = 'Initial'
  } catch (err) {
    console.error(err)
  }
  stopPhaseTimer(stopPhaseTimerMessage)
  return createLink(storeInstance, {
    node: [
      noop,
      step.run({
        fn(args) {
          let stopPhaseTimerMessage = null
          startPhaseTimer(storeInstance, 'subscribe')
          if (args === lastCall) {
            stopPhaseTimer(stopPhaseTimerMessage)
            return
          }
          lastCall = args
          try {
            listener(args)
          } catch (err) {
            console.error(err)
            stopPhaseTimerMessage = 'Got error'
          }
          stopPhaseTimer(stopPhaseTimerMessage)
        },
      }),
    ],
  })
}
export function thru(fn: Function) {
  return fn(this)
}
export function dispatch(action: any) {
  return action
}

export function mapStore<A, B>(
  store: Store<A>,
  fn: (state: A, lastState?: B) => B,
  firstState?: B,
): Store<B> {
  startPhaseTimer(store, 'map')
  let lastResult
  let stopPhaseTimerMessage = 'Got initial error'
  try {
    const storeState = store.getState()
    if (storeState !== undefined) {
      lastResult = fn(storeState, firstState)
    }
    stopPhaseTimerMessage = 'Initial'
  } catch (err) {
    console.error(err)
  }
  stopPhaseTimer(stopPhaseTimerMessage)
  const innerStore: Store<any> = this({
    config: {name: '' + store.shortName + ' → *'},
    currentState: lastResult,
    parent: store.domainName,
  })
  createLink(store, {
    child: [innerStore],
    scope: {store, handler: fn, state: innerStore.stateRef},
    node: [
      step.compute({
        fn(newValue, {state, store, handler}) {
          startPhaseTimer(store, 'map')
          let stopPhaseTimerMessage = 'Got error'
          let result
          try {
            result = handler(newValue, readRef(state))
            stopPhaseTimerMessage = null
          } catch (err) {
            console.error(err)
          }
          stopPhaseTimer(stopPhaseTimerMessage)
          return result
        },
      }),
      filterChanged,
    ],
  })
  return innerStore
}
