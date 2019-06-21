//@flow
import $$observable from 'symbol-observable'

import invariant from 'invariant'

import {upsertLaunch, launch} from '../kernel'
import {step, readRef, writeRef} from '../stdlib'
import {filterChanged, noop} from '../blocks'
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
              launch(fail, {error, state: readRef(state)})
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
export function dispatch(action: any) {
  return action
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

  const innerStore: Store<any> = this({
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
            fail({error, state: readRef(state)})
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
