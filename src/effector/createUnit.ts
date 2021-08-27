import {observableSymbol} from './observable'

import {
  is,
  isObject,
  isFunction,
  assertObject,
  assertNodeSet,
  isVoid,
} from './is'
import type {Store, Event} from './unit.h'

import {step} from './typedef'
import {createStateRef, readRef, addRefOp} from './stateRef'
import {nextUnitID} from './id'
import {callStackAReg, callARegStack, callStack} from './caller'
import {own} from './own'
import {createNode} from './createNode'
import {
  launch,
  currentPage,
  forkPage,
  setCurrentPage,
  initRefInScope,
} from './kernel'

import type {Subscriber, Config} from './index.h'
import {createName} from './naming'
import {createLinkNode} from './forward'
import {watchUnit} from './watch'
import {createSubscription} from './subscription'
import {readTemplate, readSidRoot} from './region'
import {
  getSubscribers,
  getConfig,
  getNestedConfig,
  getStoreState,
  getGraph,
  getParent,
  setMeta,
  getMeta,
} from './getter'
import {assert, deprecate} from './throw'
import {DOMAIN, STORE, EVENT, MAP, FILTER, REG_A, OPEN_O} from './tag'
import {applyTemplate} from './template'
import {forEach} from './collection'

const normalizeConfig = (part: any, config: any) => {
  if (isObject(part)) {
    normalizeConfig(getConfig(part), config)
    if (part.name != null) {
      if (isObject(part.name)) normalizeConfig(part.name, config)
      else if (isFunction(part.name)) config.handler = part.name
      else config.name = part.name
    }
    if (part.loc) config.loc = part.loc
    if (part.sid || part.sid === null) config.sid = part.sid
    if (part.handler) config.handler = part.handler
    if (part.updateFilter) config.updateFilter = part.updateFilter
    if (getParent(part)) config.parent = getParent(part)
    if ('strict' in part) config.strict = part.strict
    if (part.serialize) config.serialize = part.serialize
    if (part.named) config.named = part.named
    if (part.derived) config.derived = part.derived
    normalizeConfig(getNestedConfig(part), config)
  }
  return config
}

export const applyParentHook = (
  source: any,
  target: any,
  hookType: 'event' | 'effect' = EVENT,
) => {
  if (getParent(source)) getParent(source).hooks[hookType](target)
}

let isStrict: boolean
export const initUnit = (
  kind: any,
  unit: any,
  rawConfigA: any,
  rawConfigB?: any,
) => {
  const config = normalizeConfig({name: rawConfigB, config: rawConfigA}, {})
  const isDomain = kind === DOMAIN
  const id = nextUnitID()
  let {parent = null, sid = null, strict = true, named = null} = config
  const name = named ? named : config.name || (isDomain ? '' : id)
  const compositeName = createName(name, parent)
  const meta: Record<string, any> = {
    op: (unit.kind = kind),
    name: (unit.shortName = name),
    sid: (unit.sid = readSidRoot(sid)),
    named,
    unitId: (unit.id = id),
    serialize: config.serialize,
    derived: config.derived,
  }
  unit.parent = parent
  unit.compositeName = compositeName
  unit.defaultConfig = config
  unit.thru = (fn: Function) => fn(unit)
  unit.getType = () => compositeName.fullName
  if (!isDomain) {
    unit.subscribe = (observer: Subscriber<any>) => {
      assertObject(observer)
      return unit.watch(
        isFunction(observer)
          ? observer
          : (upd: any) => observer.next && observer.next(upd),
      )
    }
    unit[observableSymbol] = () => unit
    const template = readTemplate()
    if (template) meta.nativeTemplate = template
  }
  isStrict = strict
  return meta
}
export const createNamedEvent = (named: string) => createEvent({named})

const deriveEvent = (event: any, op: string, fn: any, node: any) => {
  let config
  if (isObject(fn)) {
    config = fn
    fn = fn.fn
  }
  const mapped = createEvent({
    name: `${event.shortName} → *`,
    [OPEN_O]: config,
    derived: true,
  })
  createLinkNode(event, mapped, {scope: {fn}, node, meta: {op}})
  return mapped
}

function callCreate(unit: any, template: any, payload: any, args: any[]): any {
  const oldPage = currentPage
  let page = null
  if (template) {
    page = currentPage
    while (page && page.template !== template) {
      page = getParent(page)
    }
  }
  setCurrentPage(page)
  const result = unit.create(payload, args)
  setCurrentPage(oldPage)
  return result
}

export function createEvent<Payload = any>(
  nameOrConfig?: any,
  maybeConfig?: any,
): Event<Payload> {
  const event: any = (payload: Payload, ...args: any[]) => {
    deprecate(
      !getMeta(event, 'derived'),
      'call of derived event',
      'createEvent',
    )
    if (currentPage) {
      return callCreate(event, template, payload, args)
    }
    return event.create(payload, args)
  }
  const template = readTemplate()
  return Object.assign(event, {
    graphite: createNode({
      meta: initUnit(EVENT, event, maybeConfig, nameOrConfig),
      regional: true,
    }),
    create(params: any, _: any) {
      launch({target: event, params, scope: forkPage!})
      return params
    },
    watch: (fn: (payload: Payload) => any) => watchUnit(event, fn),
    map: (fn: any) =>
      deriveEvent(event, MAP, fn, [step.compute({fn: callStack})]),
    filter: (fn: any) =>
      deriveEvent(event, FILTER, fn.fn ? fn : fn.fn, [
        step.filter({fn: callStack}),
      ]),
    filterMap: (fn: any) =>
      deriveEvent(event, 'filterMap', fn, [
        step.compute({fn: callStack}),
        step.compute({fn: value => !isVoid(value), filter: true, safe: true}),
      ]),
    prepend(fn: any) {
      const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
        parent: getParent(event),
      })
      applyTemplate('eventPrepend', getGraph(contramapped))
      createLinkNode(contramapped, event, {
        scope: {fn},
        node: [step.compute({fn: callStack})],
        meta: {op: 'prepend'},
      })
      applyParentHook(event, contramapped)
      return contramapped
    },
  })
}

export function createStore<State>(
  defaultState: State,
  props?: Config,
): Store<State> {
  const plainState = createStateRef(defaultState)
  const updates = createNamedEvent('updates')
  applyTemplate('storeBase', plainState)
  const plainStateId = plainState.id
  const store: any = {
    subscribers: new Map(),
    updates,
    defaultState,
    stateRef: plainState,
    getState() {
      let targetRef = plainState
      let reachedPage
      if (currentPage) {
        let page = currentPage
        while (page && !page.reg[plainStateId]) {
          page = getParent(page)
        }
        if (page) reachedPage = page
      }
      if (!reachedPage && forkPage) {
        initRefInScope(forkPage, plainState, true)
        reachedPage = forkPage
      }
      if (reachedPage) targetRef = reachedPage.reg[plainStateId]
      return readRef(targetRef)
    },
    setState: (state: any) =>
      launch({
        target: store,
        params: state,
        defer: true,
        scope: forkPage!,
      }),
    reset(...units: any[]) {
      forEach(units, unit => store.on(unit, () => store.defaultState))
      return store
    },
    on(nodeSet: any, fn: Function) {
      assertNodeSet(nodeSet, '.on', 'first argument')
      deprecate(
        !getMeta(store, 'derived'),
        '.on in derived store',
        'createStore',
      )
      if (Array.isArray(nodeSet)) {
        forEach(nodeSet, trigger => onEvent(trigger, fn))
      } else {
        onEvent(nodeSet, fn)
      }
      return store
    },
    off(unit: any) {
      const currentSubscription = getSubscribers(store).get(unit)
      if (currentSubscription) {
        currentSubscription()
        getSubscribers(store).delete(unit)
      }
      return store
    },
    map(fn: any, firstState?: any) {
      let config
      if (isObject(fn)) {
        config = fn
        fn = fn.fn
      }
      deprecate(
        isVoid(firstState),
        'second argument of store.map',
        'updateFilter',
      )
      let lastResult
      const storeState = store.getState()
      const template = readTemplate()
      if (template) {
        lastResult = null
      } else if (!isVoid(storeState)) {
        lastResult = fn(storeState, firstState)
      }

      const innerStore: Store<any> = createStore(lastResult, {
        name: `${store.shortName} → *`,
        [OPEN_O]: config,
        strict: false,
        derived: true,
      })
      const linkNode = updateStore(store, innerStore, MAP, callStackAReg, fn)
      addRefOp(getStoreState(innerStore), {
        type: MAP,
        fn,
        from: plainState,
      })
      getStoreState(innerStore).noInit = true
      applyTemplate('storeMap', plainState, linkNode)
      return innerStore
    },
    watch(eventOrFn: any, fn?: Function) {
      if (!fn || !is.unit(eventOrFn)) {
        const subscription = watchUnit(store, eventOrFn)
        if (!applyTemplate('storeWatch', plainState, eventOrFn)) {
          eventOrFn(store.getState())
        }
        return subscription
      }
      assert(isFunction(fn), 'second argument should be a function')
      return eventOrFn.watch((payload: any) => fn(store.getState(), payload))
    },
  }
  function onEvent(event: any, fn: Function) {
    store.off(event)
    getSubscribers(store).set(
      event,
      createSubscription(updateStore(event, store, 'on', callARegStack, fn)),
    )
  }
  const meta = initUnit(STORE, store, props)
  const updateFilter = store.defaultConfig.updateFilter
  store.graphite = createNode({
    scope: {state: plainState, fn: updateFilter},
    node: [
      step.mov({store: plainState, to: REG_A}),
      step.compute({
        filter: true,
        safe: true,
        fn: (upd, _, {a}) => !isVoid(upd) && upd !== a,
      }),
      updateFilter && step.filter({fn: callStackAReg}),
      step.update({store: plainState}),
    ],
    child: updates,
    meta,
    regional: true,
  })
  const sid: string | null = getMeta(store, 'sid')
  if (sid) {
    if (getMeta(store, 'serialize') !== 'ignore')
      setMeta(store, 'storeChange', true)
    plainState.sid = sid
  }
  assert(
    !isStrict || !isVoid(defaultState),
    "current state can't be undefined, use null instead",
  )
  own(store, [updates])
  return store
}

const updateStore = (
  from: any,
  store: Store<any>,
  op: string,
  caller: typeof callStackAReg,
  fn: Function,
) => {
  const storeRef = getStoreState(store)
  const node = [
    step.mov({store: storeRef, to: REG_A}),
    step.compute({fn: caller}),
  ]
  applyTemplate(
    'storeOnMap',
    storeRef,
    node,
    is.store(from) && getStoreState(from),
  )
  return createLinkNode(from, store, {scope: {fn}, node, meta: {op}})
}
