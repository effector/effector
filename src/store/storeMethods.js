//@flow
import $$observable from 'symbol-observable'

import {step, Kind, createNode, createGraph} from 'effector/stdlib'
import {filterChanged, noop} from 'effector/blocks'

import invariant from 'invariant'
import {startPhaseTimer, stopPhaseTimer} from 'effector/perf'

import {forward, type Event} from 'effector/event'
import type {Store, ThisStore} from './index.h'
import type {Subscriber} from '../effector/index.h'

export function reset(storeInstance: ThisStore, event: Event<any>) {
  return on.call(this, storeInstance, event, () => storeInstance.defaultState)
}
export function getState(storeInstance: ThisStore) {
  return storeInstance.plainState.current
}
export function off(storeInstance: ThisStore, event: Event<any>) {
  const currentSubscription = storeInstance.subscribers.get(event)
  if (currentSubscription === undefined) return
  currentSubscription()
  storeInstance.subscribers.delete(event)
}
const readName = (e: *): string => {
  switch (e.kind) {
    case Kind.store:
      return e.shortName
    default:
      return e.getType()
  }
}
export function on(storeInstance: ThisStore, event: any, handler: Function) {
  const from: Event<any> = event
  const meta = {
    fullName: storeInstance.compositeName?.fullName,
    section: storeInstance.id,
  }
  storeInstance.subscribers.set(
    from,
    forward({
      from,
      to: createGraph({
        scope: {handler, state: storeInstance.plainState, trigger: from},
        child: [storeInstance],
        //prettier-ignore
        node: [
          step.compute({
            fn: (newValue, {handler, state, trigger}) => handler(
              state.current,
              newValue,
              readName(trigger),
            ),
            meta,
          }),
          filterChanged,
        ]
      }),
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
        fn(getState(storeInstance), payload, readName(eventOrFn)),
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
  const meta = {
    fullName: storeInstance.compositeName?.fullName,
    section: storeInstance.id,
  }
  return forward({
    from: storeInstance.graphite,
    to: createNode(
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
        meta,
      }),
    ),
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
    lastResult = fn(store.getState(), firstState)
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
  const meta = {
    fullName: innerStore.compositeName?.fullName,
    section: store.id,
  }
  forward({
    from: store,
    to: createGraph({
      child: [innerStore],
      scope: {store, handler: fn, state: innerStore.stateRef},
      node: [
        step.compute({
          fn(newValue, {state, store, handler}) {
            startPhaseTimer(store, 'map')
            let stopPhaseTimerMessage = 'Got error'
            let result
            try {
              result = handler(newValue, state.current)
              stopPhaseTimerMessage = null
            } catch (err) {
              console.error(err)
            }
            stopPhaseTimer(stopPhaseTimerMessage)
            return result
          },
          meta,
        }),
        filterChanged,
      ],
    }),
  })
  return innerStore
}
