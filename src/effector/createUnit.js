//@flow

import $$observable from 'symbol-observable'

import {is, isObject, isFunction, assertObject} from './is'
import type {Store, Event, Effect} from './unit.h'

import {step} from './typedef'
import {createStateRef, readRef} from './stateRef'
import {nextUnitID} from './id'
import {callStackAReg, callARegStack, callStack} from './caller'
import {bind} from './bind'
import {own} from './own'
import {createNode} from './createNode'
import {launch} from './kernel'

import type {Subscriber, Config} from './index.h'
import {createName, mapName, joinName} from './naming'
import {createLinkNode} from './forward'
import {watchUnit} from './watch'
import {createSubscription} from './subscription'
import {addToRegion, isTemplateRegion} from './region'
import {getSubscribers, getConfig, getNestedConfig} from './getter'
import {throwError} from './throw'

const normalizeConfig = (part, config) => {
  if (isObject(part)) {
    normalizeConfig(getConfig(part), config)
    if (part.name != null) {
      if (isObject(part.name)) normalizeConfig(part.name, config)
      else config.name = part.name
    }
    if (part.loc) config.loc = part.loc
    if (part.sid) config.sid = part.sid
    if (part.handler) config.handler = part.handler
    if (part.parent) config.parent = part.parent
    if ('strict' in part) config.strict = part.strict
    if (part.named) config.named = part.named
    normalizeConfig(getNestedConfig(part), config)
  }
  return config
}

export const applyParentEventHook = ({parent}, target) => {
  if (parent) parent.hooks.event(target)
}

let isStrict
export const initUnit = (kind, unit, rawConfigA, rawConfigB) => {
  const config = normalizeConfig(
    {
      name: rawConfigB,
      config: rawConfigA,
    },
    {},
  )
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
  unit.thru = fn => fn(unit)
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
  if (isObject(fn)) {
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
    if (isObject(fn)) {
      config = fn
      name = fn.name
      fn = fn.fn
    }
    const mapped = createEvent(mapName(event, name), config)
    createComputation(event, mapped, 'map', fn)
    return mapped
  }
  event.filter = fn => {
    if (isFunction(fn)) {
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
  addObservableApi(event, event)
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
  defaultState: State,
  props?: Config,
): Store<State> {
  const plainState = createStateRef(defaultState)
  const oldState = createStateRef(defaultState)
  const updates = createNamedEvent('updates')
  const store: any = {
    subscribers: new Map(),
    updates,
    defaultState,
    stateRef: plainState,
    getState: bind(readRef, plainState),
    setState(state) {
      launch({
        target: store,
        params: state,
        defer: true,
      })
    },
    reset(...units) {
      for (const unit of units) store.on(unit, () => store.defaultState)
      return store
    },
    on(event, fn) {
      store.off(event)
      getSubscribers(store).set(
        event,
        createSubscription(updateStore(event, store, 'on', true, fn)),
      )
      return store
    },
    off(unit) {
      const currentSubscription = getSubscribers(store).get(unit)
      if (currentSubscription) {
        currentSubscription()
        getSubscribers(store).delete(unit)
      }
      return store
    },
    map(fn, firstState?: any) {
      let config
      let name
      if (isObject(fn)) {
        config = fn
        name = fn.name
        firstState = fn.firstState
        fn = fn.fn
      }
      let lastResult
      const storeState = store.getState()
      if (isTemplateRegion()) {
        lastResult = null
      } else if (storeState !== undefined) {
        lastResult = fn(storeState, firstState)
      }

      const innerStore: Store<any> = createStore(lastResult, {
        name: mapName(store, name),
        config,
        strict: false,
      })
      updateStore(store, innerStore, 'map', false, fn)
      return innerStore
    },
    [$$observable]: () => addObservableApi(store, {}),
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
  if (isStrict && defaultState === undefined)
    throwError("current state can't be undefined, use null instead")

  store.watch = store.subscribe = (
    eventOrFn: Event<any> | Function,
    fn?: Function,
  ) => {
    if (!fn || !is.unit(eventOrFn)) {
      if (!isFunction(eventOrFn)) throwError('watch requires function handler')
      if (!isTemplateRegion()) eventOrFn(store.getState())
      return watchUnit(store, eventOrFn)
    }
    if (!isFunction(fn)) throwError('second argument should be a function')
    return eventOrFn.watch(payload => fn(store.getState(), payload))
  }
  own(store, [updates])
  return addToRegion(store)
}

const addObservableApi = (unit, target) => {
  target.subscribe = (observer: Subscriber<any>) => {
    assertObject(observer)
    return unit.watch(upd => {
      if (observer.next) {
        observer.next(upd)
      }
    })
  }
  target[$$observable] = () => target
  return target
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
