import {observableSymbol} from './observable'

import {is, isObject, isFunction, assertObject} from './is'
import {Store, Event} from './unit.h'

import {step} from './typedef'
import {createStateRef, readRef} from './stateRef'
import {nextUnitID} from './id'
import {callStackAReg, callARegStack, callStack} from './caller'
import {bind} from './bind'
import {own} from './own'
import {createNode} from './createNode'
import {launch, currentPage, forkPage, setCurrentPage} from './kernel'

import {Subscriber, Config} from './index.h'
import {createName, mapName, joinName} from './naming'
import {createLinkNode} from './forward'
import {watchUnit} from './watch'
import {createSubscription} from './subscription'
import {addToRegion, readTemplate} from './region'
import {
  getSubscribers,
  getConfig,
  getNestedConfig,
  getStoreState,
  getGraph,
  getParent,
} from './getter'
import {includes} from './collection'
import {throwError} from './throw'

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
  hookType: 'event' | 'effect' = 'event',
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
  unit.thru = (fn: Function) => fn(unit)
  unit.getType = () => compositeName.fullName
  if (kind !== 'domain') {
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
  }
  isStrict = strict
  return {unit: kind, name, sid, named}
}
export const createNamedEvent = (named: string) => createEvent({named})

const createComputation = (from: any, to: any, op: any, fn: Function) =>
  createLinkNode(from, to, {
    scope: {fn},
    node: [step.compute({fn: callStack})],
    meta: {op},
  })

const createEventFiltration = (event: any, op: string, fn: any, node: any) => {
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
    meta: initUnit('event', event, maybeConfig, nameOrConfig),
  })
  //eslint-disable-next-line no-unused-vars
  event.create = (payload: any, _: any) => {
    const target = forkPage ? forkPage.find(event) : event
    launch(target, payload)
    return payload
  }
  event.watch = bind(watchUnit, event)
  event.map = (fn: any) => {
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
  event.filter = (fn: any) =>
    createEventFiltration(event, 'filter', fn.fn, [
      step.filter({fn: callStack}),
    ])
  event.filterMap = (fn: any) =>
    createEventFiltration(event, 'filterMap', fn, [
      step.compute({fn: callStack}),
      step.check.defined(),
    ])
  event.prepend = (fn: any) => {
    const contramapped: Event<any> = createEvent('* → ' + event.shortName, {
      parent: getParent(event),
    })
    const template = readTemplate()
    if (template) {
      getGraph(contramapped).seq.push(template.upward)
    }
    createComputation(contramapped, event, 'prepend', fn)
    applyParentHook(event, contramapped)
    return contramapped
  }
  const template = readTemplate()
  if (template) {
    getGraph(event).meta.nativeTemplate = template
  }
  return addToRegion(event)
}

export function createStore<State>(
  defaultState: State,
  props?: Config,
): Store<State> {
  const plainState = createStateRef(defaultState)
  const oldState = createStateRef(defaultState)
  const updates = createNamedEvent('updates')
  const template = readTemplate()
  plainState.after = [{type: 'copy', to: oldState}]
  if (template) {
    template.plain.push(plainState, oldState)
  }
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
      if (!reachedPage && forkPage && forkPage.reg[plainStateId]) {
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
      })
    },
    reset(...units: any[]) {
      for (const unit of units) store.on(unit, () => store.defaultState)
      return store
    },
    on(events: any, fn: Function) {
      if (Array.isArray(events)) {
        for (const event of events) {
          onEvent(event, fn)
        }
      } else {
        onEvent(events, fn)
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
      let name
      if (isObject(fn)) {
        config = fn
        name = fn.name
        firstState = fn.firstState
        fn = fn.fn
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
        name: mapName(store, name),
        config,
        strict: false,
      })
      const linkNode = updateStore(store, innerStore, 'map', false, fn)

      getStoreState(innerStore).before = [
        {
          type: 'map',
          fn,
          from: plainState,
        },
      ]
      if (template) {
        if (!includes(template.plain, plainState)) {
          if (!includes(linkNode.seq, template.loader)) {
            linkNode.seq.unshift(template.loader)
          }
        }
      }
      return innerStore
    },
    watch(eventOrFn: any, fn?: Function) {
      if (!fn || !is.unit(eventOrFn)) {
        const subscription = watchUnit(store, eventOrFn)
        const template = readTemplate()
        if (template) {
          template.watch.push({
            of: plainState,
            fn: eventOrFn,
          })
        } else {
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
      createSubscription(updateStore(event, store, 'on', true, fn)),
    )
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
  if (template) {
    getGraph(store).meta.nativeTemplate = template
  }
  own(store, [updates])
  return addToRegion(store)
}

const updateStore = (
  from: any,
  store: Store<any>,
  op: string,
  stateFirst: boolean,
  fn: Function,
) => {
  const storeRef = getStoreState(store)
  const node = [
    step.mov({store: storeRef, to: 'a'}),
    step.compute({
      fn: stateFirst ? callARegStack : callStackAReg,
    }),
    step.check.defined(),
    step.check.changed({store: storeRef}),
    step.update({store: storeRef}),
  ]
  const template = readTemplate()
  if (template) {
    node.unshift(template.loader)
    node.push(template.upward)
    if (is.store(from)) {
      const ref = getStoreState(from)
      if (!includes(template.plain, ref)) {
        //if (!includes(node, template.loader)) {
        //  node.unshift(template.loader)
        //}
        if (!includes(template.closure, ref)) {
          template.closure.push(ref)
        }
        if (!storeRef.before) storeRef.before = []
        storeRef.before.push({
          type: 'closure',
          of: ref,
        })
      }
    } else {
      //if (!includes(node, template.loader)) {
      //  node.unshift(template.loader)
      //}
    }
  }
  return createLinkNode(from, store, {
    scope: {fn},
    node,
    meta: {op},
  })
}
