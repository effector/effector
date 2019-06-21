//@flow
import $$observable from 'symbol-observable'

import invariant from 'invariant'

import {upsertLaunch, launch} from '../kernel'
import {step, readRef, writeRef} from '../stdlib'
import {filterChanged, noop} from '../blocks'
import {getDisplayName} from '../naming'
import {effectFabric} from '../effect'
import {createLink, type Event} from '../event'
import {storeFabric} from './storeFabric'
import type {Store} from './index.h'
import type {Subscriber} from '../index.h'

export function reset(storeInstance: Store<any>, ...events: Array<Event<any>>) {
  for (const event of events)
    on(storeInstance, event, () => storeInstance.defaultState)
  return storeInstance
}

export function off(storeInstance: Store<any>, event: Event<any>) {
  const currentSubscription = storeInstance.subscribers.get(event)
  if (currentSubscription !== undefined) {
    currentSubscription()
    storeInstance.subscribers.delete(event)
  }
  return storeInstance
}

export function on(storeInstance: Store<any>, event: any, handler: Function) {
  const from: Event<any> = event
  const oldLink = storeInstance.subscribers.get(from)
  if (oldLink) oldLink()
  storeInstance.subscribers.set(
    from,
    createLink(from, {
      scope: {
        handler,
        state: storeInstance.stateRef,
        trigger: from,
        fail: storeInstance.fail,
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
              // throw error
            }
          },
        }),
      ],
      family: {
        type: 'crosslink',
        owners: [from, storeInstance],
      },
    }),
  )
  return storeInstance
}
export function observable(storeInstance: Store<any>) {
  const result = {
    subscribe(observer: Subscriber<any>) {
      invariant(
        typeof observer === 'object' && observer !== null,
        'Expected the observer to be an object',
      )
      return subscribe(storeInstance, state => {
        if (observer.next) {
          observer.next(state)
        }
      })
    },
  }
  //$off
  result[$$observable] = function() {
    return this
  }
  return result
}
export function watch(
  storeInstance: Store<any>,
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
        fn(storeInstance.getState(), payload, getDisplayName(eventOrFn)),
      )
    default:
      invariant(typeof eventOrFn === 'function', message)
      return subscribe(storeInstance, eventOrFn)
  }
}
export function subscribe(storeInstance: Store<any>, listener: Function) {
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
  watcherEffect(storeInstance.getState())
  const subscription = createLink(storeInstance, {
    //prettier-ignore
    node: [
      noop,
      step.run({fn: x => x})
    ],
    child: [watcherEffect],
    family: {
      type: 'crosslink',
      owners: [storeInstance],
    },
  })
  //$todo
  subscription.fail = watcherEffect.fail
  //$todo
  subscription.done = watcherEffect.done
  return subscription
}

export function mapStore<A, B>(
  store: Store<A>,
  fn: (state: A, lastState?: B) => B,
  firstState?: B,
): Store<B> {
  let lastResult
  const storeState = store.getState()
  if (storeState !== undefined) {
    lastResult = fn(storeState, firstState)
  }

  const innerStore: Store<any> = storeFabric({
    config: {name: '' + store.shortName + ' → *'},
    currentState: lastResult,
    parent: store.domainName,
  })
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
          let result
          try {
            result = handler(newValue, readRef(state))
          } catch (error) {
            upsertLaunch(fail, {error, state: readRef(state)})
            console.error(error)
          }
          return result
        },
      }),
      filterChanged,
    ],
    family: {
      type: 'crosslink',
      owners: [store, innerStore],
    },
  })
  return innerStore
}
