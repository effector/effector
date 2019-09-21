//@flow

import $$observable from 'symbol-observable'

import {upsertLaunch} from '../kernel'
import {
  addLinkToOwner,
  step,
  createNode,
  Kind,
  createStateRef,
  readRef,
  bind,
  writeRef,
  is,
} from '../stdlib'
import {
  createEvent,
  forward,
  createLink,
  createLinkNode,
  type Event,
} from '../event'
import {createName, type CompositeName} from '../compositeName'
import {thru} from '../thru'
import type {Subscriber} from '../index.h'
import {watchUnit} from '../watcher'
import type {Store} from './index.h'
import {
  type Config,
  type StoreConfigPart as ConfigPart,
  normalizeConfig,
} from '../config'

export function createStore<State>(
  currentState: State,
  config?: Config<ConfigPart>,
): Store<State> {
  if (currentState === undefined)
    throw Error("current state can't be undefined, use null instead")
  return storeFabric({
    currentState,
    config: normalizeConfig(config),
  })
}

export function storeFabric<State>(props: {
  +currentState: State,
  +config: ConfigPart,
  +parent?: CompositeName,
  ...
}): Store<State> {
  const {currentState, config, parent} = props
  const {name, sid = null} = config
  const plainState = createStateRef(currentState)
  const oldState = createStateRef(currentState)
  const currentId = name || plainState.id
  const compositeName = createName(currentId, parent)

  const updates = createEvent('update ' + currentId)

  const store: $Shape<Store<State>> = ({
    subscribers: new Map(),
    compositeName,
    graphite: createNode({
      node: [
        step.check.defined(),
        step.update({
          store: plainState,
        }),
        step.check.changed({
          store: oldState,
        }),
        step.update({
          store: oldState,
        }),
      ],
      meta: {unit: 'store'},
    }),
    kind: Kind.store,
    id: plainState.id,
    shortName: currentId,
    domainName: parent,
    updates,
    defaultConfig: config,
    defaultState: currentState,
    getState: bind(readRef, plainState),
    stateRef: plainState,
    sid,
  }: any)
  ;(store: any).subscribe = bind(subscribe, store)
  ;(store: any).watch = bind(watch, store)
  ;(store: any).reset = bind(reset, store)
  ;(store: any).on = bind(on, store)
  ;(store: any).off = bind(off, store)
  ;(store: any).map = bind(mapStore, store)
  ;(store: any).thru = bind(thru, store)
  ;(store: any).setState = bind(upsertLaunch, store)
  //$off
  store[$$observable] = bind(observable, store)
  forward({
    from: store,
    to: updates,
  })
  addLinkToOwner(store, updates)
  return store
}

function reset(storeInstance: Store<any>, ...events: Array<Event<any>>) {
  for (const event of events)
    storeInstance.on(event, () => storeInstance.defaultState)
  return storeInstance
}

function off(storeInstance: Store<any>, event: Event<any>) {
  const currentSubscription = storeInstance.subscribers.get(event)
  if (currentSubscription !== undefined) {
    currentSubscription()
    storeInstance.subscribers.delete(event)
  }
  return storeInstance
}

function on(storeInstance: Store<any>, event: any, handler: Function) {
  storeInstance.off(event)
  storeInstance.subscribers.set(
    event,
    createLink(event, storeInstance, {
      scope: {
        handler,
        state: storeInstance.stateRef,
      },
      node: [
        step.compute({
          fn(newValue, {handler, state}) {
            const result = handler(readRef(state), newValue)
            if (result === undefined) return
            return writeRef(state, result)
          },
        }),
      ],
      meta: {op: 'on'},
    }),
  )
  return storeInstance
}
function observable(storeInstance: Store<any>) {
  const result = {
    subscribe(observer: Subscriber<any>) {
      if (observer !== Object(observer))
        throw Error('expect observer to be an object') // or function
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
function watch(
  storeInstance: Store<any>,
  eventOrFn: Event<*> | Function,
  fn?: Function,
) {
  if (!fn || !is.unit(eventOrFn)) {
    if (typeof eventOrFn !== 'function')
      throw Error('watch requires function handler')
    return subscribe(storeInstance, eventOrFn)
  }
  if (typeof fn !== 'function')
    throw Error('second argument should be a function')
  return eventOrFn.watch(payload => fn(storeInstance.getState(), payload))
}
function subscribe(storeInstance: Store<any>, handler: Function) {
  if (typeof handler !== 'function')
    throw Error('expect listener to be a function')
  handler(storeInstance.getState())
  return watchUnit(storeInstance, handler)
}

function mapStore<A, B>(
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
  createLinkNode(store, innerStore, {
    scope: {
      handler: fn,
      state: innerStore.stateRef,
    },
    node: [
      step.compute({
        fn: (upd, {state, handler}) => handler(upd, readRef(state)),
      }),
      step.check.defined(),
      step.check.changed({
        store: innerStore.stateRef,
      }),
    ],
    meta: {op: 'map'},
  })
  return innerStore
}
