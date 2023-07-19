import type {Template} from '../forest/index.h'
import type {Store, Event, CommonUnit, Effect, Domain} from './unit.h'
import type {Subscriber, Config, Cmd, Kind} from './index.h'

import {observableSymbol} from './observable'

import {
  is,
  isObject,
  isFunction,
  assertObject,
  assertNodeSet,
  isVoid,
} from './is'
import {calc, mov, read, userFnCall} from './step'
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
  isPure,
} from './kernel'

import {createName} from './naming'
import {createLinkNode} from './forward'
import {watchUnit} from './watch'
import {createSubscription} from './subscription'
import {readTemplate, readSidRoot, reportDeclaration} from './region'
import {
  getSubscribers,
  getStoreState,
  getGraph,
  getParent,
  setMeta,
  getMeta,
} from './getter'
import {assert, deprecate} from './throw'
import {DOMAIN, STORE, EVENT, MAP, FILTER, STACK, REG_A} from './tag'
import {applyTemplate} from './template'
import {forEach} from './collection'
import {flattenConfig} from './config'

export const applyParentHook = (
  source: CommonUnit,
  target: CommonUnit,
  hookType: 'event' | 'effect' = EVENT,
) => {
  if (getParent(source)) getParent(source).hooks[hookType](target)
}

export const initUnit = (kind: Kind, unit: any, rawConfig: any) => {
  const config = flattenConfig(rawConfig)
  const isDomain = kind === DOMAIN
  const id = nextUnitID()
  const {sid = null, named = null, domain = null, parent = domain} = config
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
    config,
  }
  unit.parent = parent
  unit.compositeName = compositeName
  unit.defaultConfig = config
  unit.thru = (fn: Function) => {
    deprecate(false, 'thru', 'js pipe')
    return fn(unit)
  }
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
  return meta
}
export const createNamedEvent = (named: string) => createEvent({named})

const deriveEvent = (
  event: Event<any>,
  op: 'map' | 'filterMap' | 'filter',
  fn: Function,
  node: Cmd[],
) => {
  let config
  if (isObject(fn)) {
    config = fn
    fn = (fn as unknown as {fn: Function}).fn
  }
  const mapped = createEvent({
    name: `${event.shortName} → *`,
    derived: true,
    and: config,
  })
  createLinkNode(event, mapped, node, op, fn)
  return mapped
}

function callCreate<T>(
  unit: Event<T> | Effect<T, any, any>,
  template: Template | null,
  payload: T,
  args: any[],
) {
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
  const config = flattenConfig({
    or: maybeConfig,
    and: typeof nameOrConfig === 'string' ? {name: nameOrConfig} : nameOrConfig,
  }) as any
  const event = ((payload: Payload, ...args: unknown[]) => {
    deprecate(
      !getMeta(event, 'derived'),
      'call of derived event',
      'createEvent',
    )
    deprecate(!isPure, 'unit call from pure function', 'operators like sample')
    if (currentPage) {
      return callCreate(event, template, payload, args)
    }
    return event.create(payload, args)
  }) as Event<Payload>
  const template = readTemplate()
  const finalEvent = Object.assign(event, {
    graphite: createNode({
      meta: initUnit(config.actualOp || EVENT, event, config),
      regional: true,
    }),
    create(params: Payload, _: any[]) {
      launch({target: event, params, scope: forkPage!})
      return params
    },
    watch: (fn: (payload: Payload) => any) => watchUnit(event, fn),
    map: (fn: Function) => deriveEvent(event, MAP, fn, [userFnCall()]),
    filter: (fn: {fn: Function}) =>
      //@ts-expect-error
      deriveEvent(event, FILTER, fn.fn ? fn : fn.fn, [
        userFnCall(callStack, true),
      ]),
    filterMap: (fn: Function) =>
      deriveEvent(event, 'filterMap', fn, [
        userFnCall(),
        calc(value => !isVoid(value), true),
      ]),
    prepend(fn: Function) {
      const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
        parent: getParent(event),
      })
      applyTemplate('eventPrepend', getGraph(contramapped))
      createLinkNode(contramapped, event, [userFnCall()], 'prepend', fn)
      applyParentHook(event, contramapped)
      return contramapped
    },
  })
  if (config?.domain) {
    config.domain.hooks.event(finalEvent)
  }
  setMeta(finalEvent, 'id', finalEvent.graphite.id)
  reportDeclaration(finalEvent.graphite)
  return finalEvent
}
function on<State>(
  store: Store<State>,
  methodName: string,
  nodeSet: CommonUnit | CommonUnit[],
  fn: Function,
) {
  assertNodeSet(nodeSet, methodName, 'first argument')
  assert(isFunction(fn), 'second argument should be a function')
  deprecate(
    !getMeta(store, 'derived'),
    `${methodName} in derived store`,
    `${methodName} in store created via createStore`,
  )
  forEach(Array.isArray(nodeSet) ? nodeSet : [nodeSet], trigger => {
    store.off(trigger)
    getSubscribers(store).set(
      trigger,
      createSubscription(updateStore(trigger, store, 'on', callARegStack, fn)),
    )
  })
  return store
}
export function createStore<State>(
  defaultState: State,
  props?: Config,
): Store<State> {
  const config = flattenConfig(props)
  const plainState = createStateRef(defaultState)
  const updates = createEvent({named: 'updates', derived: true})
  applyTemplate('storeBase', plainState)
  const plainStateId = plainState.id
  const store = {
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
    setState: (state: State) =>
      launch({
        target: store,
        params: state,
        defer: true,
        scope: forkPage!,
      }),
    reset(...units: CommonUnit[]) {
      forEach(units, unit =>
        on(store, '.reset', unit, () => store.defaultState),
      )
      return store
    },
    on(nodeSet: CommonUnit | CommonUnit[], fn: Function) {
      return on(store, '.on', nodeSet, fn)
    },
    off(unit: CommonUnit) {
      const currentSubscription = getSubscribers(store).get(unit)
      if (currentSubscription) {
        currentSubscription()
        getSubscribers(store).delete(unit)
      }
      return store
    },
    map(fn: (value: any, prevArg?: any) => any, firstState?: any) {
      let config
      if (isObject(fn)) {
        config = fn
        fn = (fn as unknown as {fn: (value: any) => any}).fn
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
        derived: true,
        // @ts-expect-error some mismatch in config types
        and: config,
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
      return (eventOrFn as CommonUnit).watch((payload: any) =>
        fn(store.getState(), payload),
      )
    },
  } as unknown as Store<State>
  const meta = initUnit(STORE, store, config)
  const updateFilter = store.defaultConfig.updateFilter
  store.graphite = createNode({
    scope: {state: plainState, fn: updateFilter},
    node: [
      calc((upd, _, stack) => {
        if (stack.scope && !stack.scope.reg[plainState.id]) {
          stack.b = true
        }
        return upd
      }),
      read(plainState),
      calc((upd, _, {a, b}) => !isVoid(upd) && (upd !== a || b), true),
      updateFilter && userFnCall(callStackAReg, true),
      mov({from: STACK, target: plainState}),
    ],
    child: updates,
    meta: {
      ...meta,
      defaultState,
    },
    regional: true,
  })
  setMeta(store, 'id', store.graphite.id)
  setMeta(store, 'rootStateRefId', plainStateId)
  const serializeMeta = getMeta(store, 'serialize')
  const derived = getMeta(store, 'derived')
  const ignored = serializeMeta === 'ignore'
  const sid: string | null = getMeta(store, 'sid')
  if (sid) {
    setMeta(store, 'storeChange', true)
    plainState.sid = sid
  }
  if (!sid && !ignored && !derived) {
    setMeta(store, 'warnSerialize', true)
  }
  assert(
    derived || !isVoid(defaultState),
    "current state can't be undefined, use null instead",
  )
  own(store, [updates])
  if (config?.domain) {
    config.domain.hooks.store(store)
  }

  if (!derived) {
    store.reinit = createEvent<void>({
      named: 'reinit',
    })
    store.reset(store.reinit)
  }

  plainState.meta = store.graphite.meta

  reportDeclaration(store.graphite)

  return store
}

const updateStore = (
  from: CommonUnit,
  store: Store<any>,
  op: string,
  caller: typeof callStackAReg,
  fn: Function,
) => {
  const storeRef = getStoreState(store)
  const reader = mov({
    store: storeRef,
    to: REG_A,
    priority: 'read',
  })
  if (op === MAP) reader.data.softRead = true
  const node = [reader, userFnCall(caller)]
  applyTemplate(
    'storeOnMap',
    storeRef,
    node,
    is.store(from) && getStoreState(from),
  )
  return createLinkNode(from, store, node, op, fn)
}
