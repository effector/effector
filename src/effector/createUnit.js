//@flow
/*PAGE*/
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
import {launch, upsertLaunch} from './kernel'

import type {Subscription, Subscriber} from './index.h'
import {
  normalizeConfig,
  type EventConfigPart,
  type StoreConfigPart as ConfigPart,
  type Config,
} from './config'
import {type CompositeName, createName, mapName, joinName} from './naming'
import {thru} from './thru'
import {createLinkNode} from './forward'
import {watchUnit} from './watch'
import {createSubscription} from './subscription'

let isStrict
const initUnit = (kind, unit, rawConfig) => {
  const config = normalizeConfig(rawConfig)
  const id = nextUnitID()
  const {parent, sid = null, strict = true, named = null} = config
  const name = named ? named : config.name || id
  unit.kind = kind
  unit.id = id
  unit.sid = sid
  unit.shortName = name
  unit.domainName = parent
  unit.compositeName = createName(name, parent)
  unit.defaultConfig = config
  unit.thru = bind(thru, unit)
  isStrict = strict
  return {unit: kind, name, sid, named}
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
    event.create(payload, fullName, args)
  event.graphite = createNode({
    meta: initUnit('event', event, {
      name: nameOrConfig,
      config: maybeConfig,
    }),
  })
  event.getType = () => fullName
  //eslint-disable-next-line no-unused-vars
  event.create = (payload, fullName, args) => {
    launch(event, payload)
    return payload
  }
  event.watch = bind(watchUnit, event)
  event.map = bind(mapEvent, event)
  event.filter = bind(filterEvent, event)
  event.filterMap = bind(filterMapEvent, event)
  event.prepend = bind(prepend, event)
  event.subscribe = bind(subscribe, event)
  event[$$observable] = () => event
  const fullName = event.compositeName.fullName

  return event
}

const subscribe = (event, observer): Subscription =>
  watchUnit(event, payload => observer.next(payload))

function prepend(event, fn: (_: any) => *) {
  const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
    parent: event.domainName,
  })

  createLinkNode(contramapped, event, {
    scope: {fn},
    node: [step.compute({fn: callStack})],
    meta: {op: 'prepend'},
  })
  return contramapped
}

declare function mapEvent<A, B>(event: Event<A>, fn: (_: A) => B): Event<B>
declare function mapEvent<A, B>(
  effect: Effect<A, any, any>,
  fn: (_: A) => B,
): Event<B>
function mapEvent<A, B>(event: Event<A> | Effect<A, any, any>, fn: A => B) {
  let config
  let name
  if (typeof fn === 'object') {
    config = fn
    name = fn.name
    fn = fn.fn
  }
  const mapped = createEvent(mapName(event, name), {
    parent: event.domainName,
    config,
  })
  createLinkNode(event, mapped, {
    scope: {fn},
    node: [step.compute({fn: callStack})],
    meta: {op: 'map'},
  })
  return mapped
}

function filterEvent(
  event: Event<any> | Effect<any, any, any>,
  fn:
    | {|
        fn(_: any): boolean,
      |}
    | (any => any | void),
): any {
  if (typeof fn === 'function') {
    console.error('.filter(fn) is deprecated, use .filterMap instead')
    return filterMapEvent(event, fn)
  }
  const mapped = createEvent(joinName(event, ' →? *'), {
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {fn: fn.fn},
    node: [step.filter({fn: callStack})],
    meta: {op: 'filter'},
  })
  return mapped
}

function filterMapEvent(
  event: Event<any> | Effect<any, any, any>,
  fn: any => any | void,
): any {
  const mapped = createEvent(joinName(event, ' →? *'), {
    parent: event.domainName,
  })
  createLinkNode(event, mapped, {
    scope: {fn},
    node: [step.compute({fn: callStack}), step.check.defined()],
    meta: {op: 'filterMap'},
  })
  return mapped
}

/*PAGE*/

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
  const updates = createEvent({named: 'updates'})
  const store: any = {
    subscribers: new Map(),
    updates,
    defaultState: currentState,
    stateRef: plainState,
    getState: bind(readRef, plainState),
    setState(state) {
      if (readRef(plainState) !== state) upsertLaunch([store], [state])
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
  store.reset = bind(reset, store)
  store.on = bind(on, store)
  store.off = bind(off, store)
  store.map = bind(mapStore, store)
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

function on(store: Store<any>, event: any, fn: Function) {
  store.off(event)
  store.subscribers.set(
    event,
    createSubscription(updateStore(event, store, 'on', true, fn)),
  )
  return store
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
  updateStore(store, innerStore, 'map', false, fn)
  return innerStore
}

/*PAGE*/
