//@flow
import $$observable from 'symbol-observable'

import invariant from 'invariant'

import {upsertLaunch} from '../kernel'
import {step, readRef, writeRef} from '../stdlib'
import {filterChanged, noop} from '../blocks'
import {startPhaseTimer, stopPhaseTimer} from '../perf'
import {getDisplayName} from '../naming'
import {effectFabric} from '../effect'
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
  return this
}

export function on(storeInstance: ThisStore, event: any, handler: Function) {
  const from: Event<any> = event
  const oldLink = storeInstance.subscribers.get(from)
  if (oldLink) oldLink()
  storeInstance.subscribers.set(
    from,
    createLink(from, {
      scope: {
        handler,
        state: storeInstance.plainState,
        trigger: from,
        fail: this.fail,
      },
      child: [storeInstance],
      //prettier-ignore
      node: [
        step.compute({
          fn(newValue, {handler, state, trigger, fail}) {
            try {
              const result = handler(
                readRef(state),
                newValue,
                getDisplayName(trigger),
              )
              if (result === undefined) return
              return writeRef(state, result)
            } catch (error) {
              upsertLaunch(fail, {error, state: readRef(state)})
              throw error
            }
          },
        }),
      ],
      meta: {
        subtype: 'crosslink',
        crosslink: 'on',
        on: {
          from: event.id,
          to: storeInstance.id,
        },
      },
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
  switch (fn && eventOrFn?.kind) {
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
  const watcherEffect = effectFabric({
    name: storeInstance.shortName + ' watcher',
    domainName: '',
    parent: storeInstance.domainName,
    config: {
      handler: listener,
    },
  })
  watcherEffect(getState(storeInstance))
  const subscription = createLink(storeInstance, {
    //prettier-ignore
    node: [
      noop,
      step.run({fn: x => x})
    ],
    child: [watcherEffect],
    meta: {
      subtype: 'crosslink',
      crosslink: 'subscribe',
      subscribe: {
        store: storeInstance.id,
      },
    },
  })
  //$todo
  subscription.fail = watcherEffect.fail
  //$todo
  subscription.done = watcherEffect.done
  return subscription
}
export function dispatch(action: any) {
  return action
}

export function mapStore<A, B>(
  store: Store<A>,
  fn: (state: A, lastState?: B) => B,
  firstState?: B,
): Store<B> {
  let lastResult
  startPhaseTimer(store, 'map')
  try {
    const storeState = store.getState()
    if (storeState !== undefined) {
      lastResult = fn(storeState, firstState)
    }
    stopPhaseTimer('Initial')
  } catch (err) {
    stopPhaseTimer('Got initial error')
    throw err
  }

  const innerStore: Store<any> = this({
    config: {name: '' + store.shortName + ' → *'},
    currentState: lastResult,
    parent: store.domainName,
  })
  innerStore.graphite.meta.bound = {
    type: 'map',
    store: store.id,
  }
  createLink(store, {
    child: [innerStore],
    scope: {
      store,
      handler: fn,
      state: innerStore.stateRef,
      fail: innerStore.fail,
    },
    node: [
      step.compute({
        fn(newValue, {state, store, handler, fail}) {
          startPhaseTimer(store, 'map')
          let stopPhaseTimerMessage = 'Got error'
          let result
          try {
            result = handler(newValue, readRef(state))
            stopPhaseTimerMessage = null
          } catch (error) {
            fail({error, state: readRef(state)})
            console.error(error)
          }
          stopPhaseTimer(stopPhaseTimerMessage)
          return result
        },
      }),
      filterChanged,
    ],
    meta: {
      subtype: 'crosslink',
      crosslink: 'store_map',
      store_map: {
        from: store.id,
        to: innerStore.id,
      },
    },
  })
  return innerStore
}
