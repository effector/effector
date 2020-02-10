//@flow

import $$observable from 'symbol-observable'

import {is} from './is'
import type {Store, Event, Effect} from './unit.h'

import {
  own,
  step,
  createStateRef,
  readRef,
  bind,
  getGraph,
  nextUnitID,
  callStackAReg,
  callARegStack,
  callStack,
} from './stdlib'
import {createNode} from './createNode'
import {launch} from './kernel'

import type {Subscription, Subscriber} from './index.h'
import {
  normalizeConfig,
  type EventConfigPart,
  type StoreConfigPart as ConfigPart,
  type Config,
} from './config'
import {type CompositeName, createName, mapName, joinName} from './naming'
import {createLinkNode} from './forward'
import {watchUnit} from './watch'
import {createSubscription} from './subscription'
import {addToRegion} from './region'

export const applyParentEventHook = ({parent}, target) => {
  if (parent) parent.hooks.event(target)
}

let isStrict
export const initUnit = (kind, unit, rawConfigA, rawConfigB) => {
  const config = normalizeConfig({
    name: rawConfigB,
    config: rawConfigA,
  })
  const id = nextUnitID()
  const {parent = null, sid = null, strict = true, named = null} = config
  const name = named ? named : config.name || (kind === 'domain' ? '' : id)
  const compositeName = createName(name, parent)
  unit.kind = kind
  unit.id = id
  unit.sid = sid
  unit.shortName = name
  unit.parent = parent
  unit.compositeName = compositeName
  unit.defaultConfig = config
  unit.thru = bind(thru, unit)
  unit.getType = () => compositeName.fullName
  isStrict = strict
  return {unit: kind, name, sid, named}
}
export const createNamedEvent = (named: string) => createEvent({named})

const createComputation = (from, to, op, fn) =>
  createLinkNode(from, to, {
    scope: {fn},
    node: [step.compute({fn: callStack})],
    meta: {op},
  })

const createEventFiltration = (event, op, fn, node) => {
  let config
  if (typeof fn === 'object') {
    config = fn
    fn = fn.fn
  }
  const mapped = createEvent(joinName(event, ' →? *'), config)
  createLinkNode(event, mapped, {
    scope: {fn},
    node,
    meta: {op},
  })
  return mapped
}

declare export function createEvent<Payload>(
  name?: string | EventConfigPart,
  config?: Config<EventConfigPart>,
): Event<Payload>
export function createEvent<Payload>(
  nameOrConfig: any,
  maybeConfig: any,
): Event<Payload> {
  const event: any = (payload: Payload, ...args: any[]) =>
    event.create(payload, args, args)
  event.graphite = createNode({
    meta: initUnit('event', event, maybeConfig, nameOrConfig),
  })
  //eslint-disable-next-line no-unused-vars
  event.create = (payload, _, args) => {
    launch(event, payload)
    return payload
  }
  event.watch = bind(watchUnit, event)
  event.map = (fn: Function) => {
    let config
    let name
    if (typeof fn === 'object') {
      config = fn
      name = fn.name
      fn = fn.fn
    }
    const mapped = createEvent(mapName(event, name), config)
    createComputation(event, mapped, 'map', fn)
    return mapped
  }
  event.filter = fn => {
    if (typeof fn === 'function') {
      console.error('.filter(fn) is deprecated, use .filterMap instead')
      return filterMapEvent(event, fn)
    }
    return createEventFiltration(event, 'filter', fn.fn, [
      step.filter({fn: callStack}),
    ])
  }
  event.filterMap = bind(filterMapEvent, event)
  event.prepend = fn => {
    const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
      parent: event.parent,
    })
    createComputation(contramapped, event, 'prepend', fn)
    applyParentEventHook(event, contramapped)
    return contramapped
  }
  event.subscribe = observer =>
    watchUnit(event, payload => observer.next(payload))
  event[$$observable] = () => event
  return addToRegion(event)
}

export function filterMapEvent(
  event: Event<any> | Effect<any, any, any>,
  fn: any => any | void,
): any {
  return createEventFiltration(event, 'filterMap', fn, [
    step.compute({fn: callStack}),
    step.check.defined(),
  ])
}

export function createStore<State>(
  currentState: State,
  props: {
    +config: ConfigPart,
    +parent?: CompositeName,
    ...
  },
): Store<State> {
  const plainState = createStateRef(currentState)
  const oldState = createStateRef(currentState)
  const updates = createNamedEvent('updates')
  const store: any = {
    subscribers: new Map(),
    updates,
    defaultState: currentState,
    stateRef: plainState,
    getState: bind(readRef, plainState),
    setState(state) {
      launch({
        target: store,
        params: state,
        defer: true,
      })
    },
  }
  store.graphite = createNode({
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
    child: updates,
    meta: initUnit('store', store, props),
  })
  if (isStrict && currentState === undefined)
    throw Error("current state can't be undefined, use null instead")

  store.watch = store.subscribe = bind(watch, store)
  store.reset = (...units) => {
    for (const unit of units) store.on(unit, () => store.defaultState)
    return store
  }
  store.on = (event, fn) => {
    store.off(event)
    store.subscribers.set(
      event,
      createSubscription(updateStore(event, store, 'on', true, fn)),
    )
    return store
  }
  store.off = bind(off, store)
  store.map = (fn, firstState?: any) => {
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
      config,
      strict: false,
    })
    updateStore(store, innerStore, 'map', false, fn)
    return innerStore
  }
  store[$$observable] = () => ({
    subscribe(observer: Subscriber<any>) {
      if (observer !== Object(observer))
        throw Error('expect observer to be an object') // or function
      return watch(store, state => {
        if (observer.next) {
          observer.next(state)
        }
      })
    },
    [$$observable]() {
      return this
    },
  })
  own(store, [updates])
  return addToRegion(store)
}

function off(store: Store<any>, event: Event<any>) {
  const currentSubscription = store.subscribers.get(event)
  if (currentSubscription !== undefined) {
    currentSubscription()
    store.subscribers.delete(event)
  }
  return store
}

const updateStore = (
  from,
  {graphite, stateRef}: Store<any>,
  op,
  stateFirst: boolean,
  fn: Function,
) =>
  createLinkNode(from, graphite, {
    scope: {fn},
    node: [
      step.mov({store: stateRef, to: 'a'}),
      step.compute({
        fn: stateFirst ? callARegStack : callStackAReg,
      }),
      step.check.defined(),
      step.check.changed({store: stateRef}),
      step.update({store: stateRef}),
    ],
    meta: {op},
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

const thru = (instance: any, fn: Function) => fn(instance)
