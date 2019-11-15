//@flow

import $$observable from 'symbol-observable'

import type {Store, Event} from './unit.h'
import {upsertLaunch} from './kernel'
import {
  own,
  step,
  createNode,
  createStateRef,
  readRef,
  bind,
  writeRef,
  is,
  getGraph,
  nextUnitID,
} from './stdlib'
import {createEvent} from './createEvent'
import {createLinkNode} from './forward'
import {createName, mapName, type CompositeName} from './naming'
import {thru} from './thru'
import type {Subscriber} from './index.h'
import {watchUnit} from './watch'
import {
  type Config,
  type StoreConfigPart as ConfigPart,
  normalizeConfig,
} from './config'
import {createSubscription} from './subscription'

export function createStore<State>(
  currentState: State,
  props: {
    +config: ConfigPart,
    +parent?: CompositeName,
    ...
  },
): Store<State> {
  const config = normalizeConfig(props)
  const id = nextUnitID()
  const {parent, sid = null, strict = true, named = null} = config
  if (strict && currentState === undefined)
    throw Error("current state can't be undefined, use null instead")
  const name = named ? named : config.name || id
  const plainState = createStateRef(currentState)
  const oldState = createStateRef(currentState)
  const compositeName = createName(name, parent)

  const updates = createEvent({named: 'updates'})

  const store: $Shape<Store<State>> = ({
    subscribers: new Map(),
    compositeName,
    graphite: createNode({
      scope: {state: plainState},
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
      child: [updates],
      meta: {unit: 'store', name: compositeName.shortName, sid, named},
    }),
    kind: 'store',
    id,
    shortName: compositeName.shortName,
    domainName: parent,
    updates,
    defaultConfig: config,
    defaultState: currentState,
    getState: bind(readRef, plainState),
    stateRef: plainState,
    sid,
  }: any)
  ;(store: any).watch = (store: any).subscribe = bind(watch, store)
  ;(store: any).reset = bind(reset, store)
  ;(store: any).on = bind(on, store)
  ;(store: any).off = bind(off, store)
  ;(store: any).map = bind(mapStore, store)
  ;(store: any).thru = bind(thru, store)
  ;(store: any).setState = state => {
    if (readRef(plainState) !== state) upsertLaunch([store], [state])
  }
  //$off
  store[$$observable] = bind(observable, store)
  own(store, [updates])
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
    createSubscription(
      createLinkNode(event, storeInstance, {
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
    ),
  )
  return storeInstance
}
const observable = (storeInstance: Store<any>) => ({
  subscribe(observer: Subscriber<any>) {
    if (observer !== Object(observer))
      throw Error('expect observer to be an object') // or function
    return watch(storeInstance, state => {
      if (observer.next) {
        observer.next(state)
      }
    })
  },
  //$off
  [$$observable]() {
    return this
  },
})
function watch(
  storeInstance: Store<any>,
  eventOrFn: Event<*> | Function,
  fn?: Function,
) {
  if (!fn || !is.unit(eventOrFn)) {
    if (typeof eventOrFn !== 'function')
      throw Error('watch requires function handler')
    eventOrFn(storeInstance.getState())
    return watchUnit(storeInstance, eventOrFn)
  }
  if (typeof fn !== 'function')
    throw Error('second argument should be a function')
  return eventOrFn.watch(payload => fn(storeInstance.getState(), payload))
}

function mapStore<A, B>(
  store: Store<A>,
  fn: (state: A, lastState?: B) => B,
  firstState?: B,
): Store<B> {
  let config
  let name
  if (typeof fn === 'object') {
    config = fn
    name = fn.name
    firstState = fn.firstState
    fn = fn.fn
  }
  let lastResult
  const storeState = store.getState()
  if (storeState !== undefined) {
    lastResult = fn(storeState, firstState)
  }

  const innerStore: Store<any> = createStore(lastResult, {
    name: mapName(store, name),
    parent: store.domainName,
    config,
    strict: false,
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
