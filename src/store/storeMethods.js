//@flow
//@jsx fx
import $$observable from 'symbol-observable'
//eslint-disable-next-line no-unused-vars
import fx from 'effector/stdlib/fx'

import invariant from 'invariant'
import {startPhaseTimer, stopPhaseTimer} from 'effector/perf'

import {forward, type Event} from 'effector/event'
import type {Store, ThisStore} from './index.h'
import type {Subscriber} from '../effector/index.h'
import type {CompositeName} from '../compositeName'

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
export function on(storeInstance: ThisStore, event: any, handler: Function) {
  const e: Event<any> = event
  storeInstance.subscribers.set(
    e,
    forward({
      from: e,
      to: {
        graphite: {
          seq: (
            <seq>
              <compute
                fn={newValue => {
                  const lastState = getState(storeInstance)
                  return handler(lastState, newValue, e.getType())
                }}
              />
              <filter
                filter={data => {
                  const lastState = getState(storeInstance)
                  return data !== lastState && data !== undefined
                }}
              />
              {storeInstance.graphite.seq}
            </seq>
          ),
        },
      },
    }),
  )
  return this
}
export function observable(storeInstance: ThisStore) {
  return {
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
    //$off
    [$$observable]() {
      return this
    },
  }
}
export function watch(
  storeInstance: ThisStore,
  eventOrFn: Event<*> | Function,
  fn?: Function,
) {
  const kind = String(eventOrFn?.kind || '__')
  switch (kind) {
    case 'event':
    case 'effect':
      invariant(typeof fn === 'function', 'watch requires function handler')
      return eventOrFn.watch(payload =>
        //$todo
        fn(getState(storeInstance), payload, eventOrFn.getType()),
      )
    case '__':
    default:
      invariant(
        typeof eventOrFn === 'function',
        'watch requires function handler',
      )
      return subscribe(storeInstance, eventOrFn)
  }
}
export function subscribe(storeInstance: ThisStore, listener: Function) {
  invariant(
    typeof listener === 'function',
    'Expected the listener to be a function.',
  )
  let stopPhaseTimerMessage = null
  let lastCall = getState(storeInstance)

  startPhaseTimer(storeInstance, 'subscribe')
  try {
    listener(lastCall)
    stopPhaseTimerMessage = 'Initial'
  } catch (err) {
    console.error(err)
    stopPhaseTimerMessage = 'Got initial error'
  }
  stopPhaseTimer(stopPhaseTimerMessage)

  return forward({
    from: storeInstance,
    to: {
      graphite: {
        seq: (
          //$todo
          <run
            runner={args => {
              let stopPhaseTimerMessage = null
              startPhaseTimer(storeInstance, 'subscribe')
              if (args === lastCall) return
              lastCall = args
              try {
                listener(args)
              } catch (err) {
                console.error(err)
                stopPhaseTimerMessage = 'Got error'
              }
              stopPhaseTimer(stopPhaseTimerMessage)
            }}
          />
        ),
      },
    },
  })
}
export function thru(fn: Function) {
  return fn(this)
}
export function dispatch(action: any) {
  return action
}

export function getDisplayName(store: {
  compositeName?: CompositeName,
  domainName?: CompositeName,
  /*::+*/ id: string,
  /*::...*/
}) {
  if (store.compositeName) {
    return store.compositeName.fullName
  }
  if (store.domainName) {
    return store.domainName.fullName
  }
  return store.id
}

export function mapStore<A, B>(
  store: Store<A>,
  fn: (state: A, lastState?: B) => B,
  firstState?: B,
): Store<B> {
  startPhaseTimer(store, 'map')
  let lastValue = store.getState()
  let lastResult
  let stopPhaseTimerMessage = null
  try {
    lastResult = fn(lastValue, firstState)
    stopPhaseTimerMessage = 'Initial'
  } catch (err) {
    console.error(err)
    stopPhaseTimerMessage = 'Got initial error'
  }
  stopPhaseTimer(stopPhaseTimerMessage)
  const innerStore: Store<any> = this({
    name: '' + store.shortName + ' → *',
    currentState: lastResult,
    parent: store.domainName,
  })
  forward({
    from: store,
    to: {
      graphite: {
        seq: (
          <seq>
            <compute
              fn={newValue => {
                startPhaseTimer(store, 'map')
                lastValue = newValue
                let stopPhaseTimerMessage = null
                const lastState = innerStore.getState()
                let result
                try {
                  result = fn(newValue, lastState)
                } catch (err) {
                  console.error(err)
                  stopPhaseTimerMessage = 'Got error'
                }
                stopPhaseTimer(stopPhaseTimerMessage)
                return result
              }}
            />
            <filter
              filter={result => {
                const lastState = innerStore.getState()
                const isChanged = result !== lastState && result !== undefined
                if (isChanged) {
                  lastResult = result
                }
                stopPhaseTimer(null)
                return isChanged
              }}
            />
            {innerStore.graphite.seq}
          </seq>
        ),
      },
    },
  })
  return innerStore
}
