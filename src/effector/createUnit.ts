import type {Template} from '../forest/index.h'
import type {Store, Event, CommonUnit, Effect} from './unit.h'
import type {Subscriber, Config, Cmd, Kind} from './index.h'

import {observableSymbol} from './observable'

import {
  is,
  isObject,
  isFunction,
  assertObject,
  assertNodeSet,
  isVoid,
  assert,
  deprecate,
} from './validate'
import {calc, mov, read, userFnCall} from './step'
import {createStateRef, readRef, addRefOp} from './stateRef'
import {nextUnitID} from './id'
import {callStackAReg, callARegStack, callStack} from './caller'
import {own} from './own'
import {createNode, createLinkNode} from './createNode'
import {
  launch,
  currentPage,
  forkPage,
  setCurrentPage,
  initRefInScope,
  isPure,
} from './kernel'

import {createName, generateErrorTitle} from './naming'
import {watchUnit} from './createWatch'
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
import {DOMAIN, STORE, EVENT, MAP, STACK, REG_A} from './tag'
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
  unit.targetable = !config.derived
  unit.parent = parent
  unit.compositeName = compositeName
  unit.defaultConfig = config
  unit.getType = () => {
    deprecate(false, 'getType', 'compositeName.fullName')
    return compositeName.fullName
  }
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
  const errorTitle = generateErrorTitle('event', config)
  const event = ((payload: Payload, ...args: unknown[]) => {
    assert(
      !getMeta(event, 'derived'),
      'call of derived event is not supported, use createEvent instead',
      errorTitle,
    )
    assert(
      !isPure,
      'unit call from pure function is not supported, use operators like sample instead',
      errorTitle,
    )
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
      deriveEvent(event, 'filter', fn.fn ? fn : fn.fn, [
        userFnCall(callStack, true),
      ]),
    filterMap: (fn: Function) =>
      deriveEvent(event, 'filterMap', fn, [
        userFnCall(),
        calc(value => !isVoid(value), true),
      ]),
    prepend(fn: Function) {
      assert(
        // @ts-expect-error
        event.targetable,
        '.prepend of derived event is not supported, call source event instead',
        errorTitle,
      )
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
  errorTitle: string,
) {
  assertNodeSet(nodeSet, `${errorTitle} ${methodName}`, 'first argument')
  assert(isFunction(fn), 'second argument should be a function', errorTitle)
  deprecate(
    !getMeta(store, 'derived'),
    `${methodName} in derived store`,
    `${methodName} in store created via createStore`,
    errorTitle,
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

export const requireExplicitSkipVoidMessage =
  'undefined is used to skip updates. To allow undefined as a value provide explicit { skipVoid: false } option'

export function createStore<State>(
  defaultState: State,
  props?: Config,
): Store<State> {
  const config = flattenConfig(props)
  const plainState = createStateRef(defaultState)
  const errorTitle = generateErrorTitle('store', config)
  const updates = createEvent({named: 'updates', derived: true})
  applyTemplate('storeBase', plainState)
  const plainStateId = plainState.id

  // skipVoid deprecation rules
  const explicitSkipVoid = 'skipVoid' in config
  const voidValueAllowed = explicitSkipVoid && !config.skipVoid
  const skipVoidTrueSet = explicitSkipVoid && config.skipVoid

  deprecate(!skipVoidTrueSet, '{skipVoid: true}', 'updateFilter', errorTitle)

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
      assert(
        // @ts-expect-error
        store.targetable,
        '.reset of derived store is not supported',
        errorTitle,
      )
      forEach(units, unit =>
        on(store, '.reset', unit, () => store.defaultState, errorTitle),
      )
      return store
    },
    on(nodeSet: CommonUnit | CommonUnit[], fn: Function) {
      assert(
        // @ts-expect-error
        store.targetable,
        '.on of derived store is not supported',
        errorTitle,
      )
      return on(store, '.on', nodeSet, fn, errorTitle)
    },
    off(unit: CommonUnit) {
      const currentSubscription = getSubscribers(store).get(unit)
      if (currentSubscription) {
        currentSubscription()
        getSubscribers(store).delete(unit)
      }
      return store
    },
    map(fn: (value: any) => any, outerConfig: Config) {
      let mapConfig: Config | undefined
      if (isObject(fn)) {
        mapConfig = fn as any
        fn = (fn as unknown as {fn: (value: any) => any}).fn
      }
      let lastResult
      const storeState = store.getState()
      const parentStateVoid = isVoid(storeState)
      const template = readTemplate()
      if (template) {
        lastResult = null
      } else if (!parentStateVoid || (parentStateVoid && voidValueAllowed)) {
        lastResult = fn(storeState)
      }

      const innerStore: Store<any> = createStore(lastResult, {
        name: `${store.shortName} → *`,
        derived: true,
        ...outerConfig,
        and: mapConfig,
      })
      const linkNode = updateStore(store, innerStore, MAP, callStack, fn)
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
      deprecate(!fn, 'watch second argument', 'sample', errorTitle)
      if (!fn || !is.unit(eventOrFn)) {
        const subscription = watchUnit(store, eventOrFn)
        if (!applyTemplate('storeWatch', plainState, eventOrFn)) {
          eventOrFn(store.getState())
        }
        return subscription
      }
      assert(isFunction(fn), 'second argument should be a function', errorTitle)
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
      calc((upd, _, {a, b}) => {
        const isVoidUpdate = isVoid(upd)

        if (isVoidUpdate && !explicitSkipVoid) {
          console.error(`${errorTitle}: ${requireExplicitSkipVoidMessage}`)
        }

        return (
          ((isVoidUpdate && voidValueAllowed) || !isVoidUpdate) &&
          (upd !== a || b)
        )
      }, true),
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
  const isVoidDefaultState = isVoid(defaultState)
  const canVoid = isVoidDefaultState && voidValueAllowed
  assert(
    derived || !isVoidDefaultState || canVoid,
    requireExplicitSkipVoidMessage,
    errorTitle,
  )
  if (derived && isVoidDefaultState && !explicitSkipVoid) {
    console.error(`${errorTitle}: ${requireExplicitSkipVoidMessage}`)
  }
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
  /**
   * Store reading is not needed for store.map anymore
   * but there is a fine tuning of "wire lengths"
   * lack of which leads to a lot of reordering and retriggering issues
   **/
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
