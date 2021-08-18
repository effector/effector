import {observableSymbol} from './observable'

import {is, isObject, isFunction, assertObject, assertNodeSet} from './is'
import type {Store, Event} from './unit.h'

import {step} from './typedef'
import {createStateRef, readRef, addRefOp} from './stateRef'
import {nextUnitID} from './id'
import {callStackAReg, callARegStack, callStack} from './caller'
import {bind} from './bind'
import {own} from './own'
import {createNode} from './createNode'
import {
  launch,
  currentPage,
  forkPage,
  setCurrentPage,
  initRefInScope,
} from './kernel'

import {Subscriber, Config} from './index.h'
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
} from './getter'
import {throwError} from './throw'
import {DOMAIN, STORE, EVENT, MAP, FILTER, REG_A, OPEN_O} from './tag'
import {eventTempl, storeTempl} from './template'

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
    if (part.named) config.named = part.named
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
  const config = normalizeConfig(
    {
      name: rawConfigB,
      config: rawConfigA,
    },
    {},
  )
  const isDomain = kind === DOMAIN
  const id = nextUnitID()
  let {parent = null, sid = null, strict = true, named = null} = config
  const name = named ? named : config.name || (isDomain ? '' : id)
  const compositeName = createName(name, parent)

  const meta: Record<string, any> = {
    unit: (unit.kind = kind),
    name: (unit.shortName = name),
    sid: (unit.sid = readSidRoot(sid)),
    named,
    unitId: (unit.id = id),
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
          : (upd: any) => {
              if (observer.next) {
                observer.next(upd)
              }
            },
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
  const mapped = createEvent({name: `${event.shortName} → *`, [OPEN_O]: config})
  createLinkNode(event, mapped, {
    scope: {fn},
    node,
    meta: {op},
  })
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
    if (currentPage) {
      return callCreate(event, template, payload, args)
    }
    return event.create(payload, args)
  }
  event.graphite = createNode({
    meta: initUnit(EVENT, event, maybeConfig, nameOrConfig),
    regional: true,
  })
  //eslint-disable-next-line no-unused-vars
  event.create = (params: any, _: any) => {
    launch({target: event, params, forkPage: forkPage!})
    return params
  }
  event.watch = bind(watchUnit, event)
  event.map = (fn: any) =>
    deriveEvent(event, MAP, fn, [step.compute({fn: callStack})])
  event.filter = (fn: any) =>
    deriveEvent(event, FILTER, fn.fn ? fn : fn.fn, [
      step.filter({fn: callStack}),
    ])
  event.filterMap = (fn: any) =>
    deriveEvent(event, 'filterMap', fn, [
      step.compute({fn: callStack}),
      step.check.defined(),
    ])
  event.prepend = (fn: any) => {
    const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
      parent: getParent(event),
    })
    eventTempl.initPrepend(getGraph(contramapped))
    createLinkNode(contramapped, event, {
      scope: {fn},
      node: [step.compute({fn: callStack})],
      meta: {op: 'prepend'},
    })
    applyParentHook(event, contramapped)
    return contramapped
  }
  const template = readTemplate()
  return event
}

export function createStore<State>(
  defaultState: State,
  props?: Config,
): Store<State> {
  const plainState = createStateRef(defaultState)
  const oldState = createStateRef(defaultState)
  const updates = createNamedEvent('updates')
  storeTempl.initStore(plainState, oldState)
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
    setState(state: any) {
      launch({
        target: store,
        params: state,
        defer: true,
        forkPage: forkPage!,
      })
    },
    reset(...units: any[]) {
      for (const unit of units) store.on(unit, () => store.defaultState)
      return store
    },
    on(nodeSet: any, fn: Function) {
      assertNodeSet(nodeSet, '.on', 'first argument')
      if (Array.isArray(nodeSet)) {
        for (const event of nodeSet) {
          onEvent(event, fn)
        }
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
      if (firstState !== undefined) {
        console.error(
          'second argument of store.map is deprecated, use updateFilter instead',
        )
      }
      let lastResult
      const storeState = store.getState()
      const template = readTemplate()
      if (template) {
        lastResult = null
      } else if (storeState !== undefined) {
        lastResult = fn(storeState, firstState)
      }

      const innerStore: Store<any> = createStore(lastResult, {
        name: `${store.shortName} → *`,
        [OPEN_O]: config,
        strict: false,
      })
      const linkNode = updateStore(store, innerStore, MAP, false, fn)
      addRefOp(getStoreState(innerStore), {
        type: MAP,
        fn,
        from: plainState,
      })
      getStoreState(innerStore).noInit = true
      storeTempl.initMap(plainState, linkNode)
      return innerStore
    },
    watch(eventOrFn: any, fn?: Function) {
      if (!fn || !is.unit(eventOrFn)) {
        const subscription = watchUnit(store, eventOrFn)
        if (!storeTempl.initWatch(plainState, eventOrFn)) {
          eventOrFn(store.getState())
        }
        return subscription
      }
      if (!isFunction(fn)) throwError('second argument should be a function')
      return eventOrFn.watch((payload: any) => fn(store.getState(), payload))
    },
  }
  function onEvent(event: any, fn: Function) {
    store.off(event)
    getSubscribers(store).set(
      event,
      createSubscription(
        updateStore(event, store, 'on', true, fn, updateFilter),
      ),
    )
  }
  const meta = initUnit(STORE, store, props)
  const updateFilter = store.defaultConfig.updateFilter
  store.graphite = createNode({
    scope: {state: plainState},
    node: [
      step.check.defined(),
      step.check.changed({
        store: oldState,
      }),
      updateFilter && step.mov({store: oldState, to: REG_A}),
      updateFilter &&
        step.filter({
          fn: (update, _, {a}) => updateFilter(update, a),
        }),
      step.update({
        store: plainState,
      }),
      step.update({
        store: oldState,
      }),
    ],
    child: updates,
    meta,
    regional: true,
  })
  if (meta.sid) {
    meta.storeChange = true
    plainState.sid = meta.sid
  }
  if (isStrict && defaultState === undefined)
    throwError("current state can't be undefined, use null instead")
  own(store, [updates])
  return store
}

const updateStore = (
  from: any,
  store: Store<any>,
  op: string,
  stateFirst: boolean,
  fn: Function,
  updateFilter?: Function,
) => {
  const storeRef = getStoreState(store)
  const node = [
    step.mov({store: storeRef, to: REG_A}),
    step.compute({
      fn: stateFirst ? callARegStack : callStackAReg,
    }),
    step.check.defined(),
    step.check.changed({store: storeRef}),
    updateFilter &&
      step.filter({
        fn: (update, _, {a}) => updateFilter(update, a),
      }),
    step.update({store: storeRef}),
  ]
  storeTempl.initOnMap(storeRef, node, is.store(from) && getStoreState(from))
  return createLinkNode(from, store, {
    scope: {fn},
    node,
    meta: {op},
  })
}
