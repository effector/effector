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

declare export function createEvent<Payload>(
  name?: string | EventConfigPart,
  config?: Config<EventConfigPart>,
): Event<Payload>
export function createEvent<Payload>(
  nameOrConfig: any,
  maybeConfig: any,
): Event<Payload> {
  const config = normalizeConfig({name: nameOrConfig, config: maybeConfig})
  const {parent, sid = null, named = null} = config
  const id = nextUnitID()
  const name = named ? named : config.name || id
  const compositeName = createName(name, parent)
  const fullName = compositeName.fullName
  const graphite = createNode({
    meta: {unit: 'event', name, sid, named},
  })

  //$off
  const instance: Event<Payload> = (
    payload: Payload,
    ...args: any[]
  ): Payload => instance.create(payload, fullName, args)
  ;(instance: any).getType = () => fullName
  //eslint-disable-next-line no-unused-vars
  ;(instance: any).create = (payload, fullName, args) => {
    launch(instance, payload)
    return payload
  }
  instance.sid = sid
  instance.graphite = graphite
  instance.shortName = name
  instance.domainName = parent
  instance.compositeName = compositeName
  instance.defaultConfig = config
  ;(instance: any).kind = 'event'
  ;(instance: any)[$$observable] = () => instance
  ;(instance: any).id = id
  ;(instance: any).watch = bind(watchUnit, instance)
  ;(instance: any).map = bind(mapEvent, instance)
  ;(instance: any).filter = bind(filterEvent, instance)
  ;(instance: any).filterMap = bind(filterMapEvent, instance)
  ;(instance: any).prepend = bind(prepend, instance)
  ;(instance: any).subscribe = bind(subscribe, instance)
  ;(instance: any).thru = bind(thru, instance)

  return instance
}

const subscribe = (event, observer): Subscription =>
  watchUnit(event, payload => observer.next(payload))

function prepend(event, fn: (_: any) => *) {
  const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
    parent: event.domainName,
  })

  createLinkNode(contramapped, event, {
    scope: {fn},
    node: [step.compute({fn: callStackAReg})],
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
    node: [step.compute({fn: callStackAReg})],
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
    node: [step.filter({fn: callStackAReg})],
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
    node: [step.compute({fn: callStackAReg}), step.check.defined()],
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
      child: updates,
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
