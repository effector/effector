import type {Cmd, StateRef} from './index.h'
import type {CommonUnit, DataCarrier, Event, Store} from './unit.h'
import {combine} from './combine'
import {mov, userFnCall, read, calc} from './step'
import {createStateRef, readRef} from './stateRef'
import {callStackAReg} from './caller'
import {processArgsToConfig} from './config'
import {getStoreState, getGraph} from './getter'
import {
  assertNodeSet,
  assertTarget,
  is,
  isObject,
  isVoid,
  isFunction,
} from './is'
import {createStore} from './createUnit'
import {createEvent} from './createUnit'
import {createNode} from './createNode'
import {assert, deprecate} from './throw'
import {forEach} from './collection'
import {SAMPLE, STACK, VALUE} from './tag'
import {merge} from './merge'
import {applyTemplate} from './template'
import {own} from './own'
import {createLinkNode} from './forward'
import {traverseSetAlwaysActive} from './lazy'

const sampleConfigFields = ['source', 'clock', 'target']

const fieldErrorMessage = (method: string, field: string) =>
  method + `: ${field} should be defined`

export function validateSampleConfig(config: any, method: string) {
  let atLeastOneFieldExists = false
  forEach(sampleConfigFields, field => {
    if (field in config) {
      assert(config[field] != null, fieldErrorMessage(method, field))
      atLeastOneFieldExists = true
    }
  })
  return atLeastOneFieldExists
}

export function sample(...args: any[]) {
  let target
  let name
  let [[source, clock, fn], metadata] = processArgsToConfig(args)
  let sid
  let batch = true
  let filter
  /** config case */
  if (
    isVoid(clock) &&
    isObject(source) &&
    validateSampleConfig(source, SAMPLE)
  ) {
    clock = source.clock
    fn = source.fn
    if ('batch' in source) {
      batch = source.batch
    } else {
      deprecate(!('greedy' in source), 'greedy in sample', 'batch')
      batch = !source.greedy
    }
    filter = source.filter
    /** optional target & name accepted only from config */
    target = source.target
    name = source.name
    sid = source.sid
    source = source.source
  }
  return createSampling(
    SAMPLE,
    clock,
    source,
    filter,
    target,
    fn,
    name,
    metadata,
    batch,
    true,
    false,
    sid,
  )
}

export const createSampling = (
  method: string,
  clock: DataCarrier | DataCarrier[] | void,
  source: DataCarrier | Array<Store<any>> | Record<string, Store<any>> | void,
  filter: any,
  target: DataCarrier | DataCarrier[] | void,
  fn: any,
  name: string | undefined,
  metadata: object | void,
  batch: boolean,
  targetMayBeStore: boolean,
  filterRequired: boolean,
  sid?: string | undefined,
) => {
  const isUpward = !!target
  assert(
    !isVoid(source) || !isVoid(clock),
    fieldErrorMessage(method, 'either source or clock'),
  )
  let sourceIsClock = false
  if (isVoid(source)) {
    sourceIsClock = true
  } else if (!is.unit(source)) {
    source = combine(source)
  }
  if (isVoid(clock)) {
    /** still undefined! */
    clock = source
  } else {
    assertNodeSet(clock, method, 'clock')
    if (Array.isArray(clock)) {
      clock = merge(clock as CommonUnit[])
    }
  }
  if (sourceIsClock) {
    source = clock
  }
  // @ts-expect-error
  if (!metadata && !name) name = source.shortName
  let filterType: 'none' | 'unit' | 'fn' = 'none'
  if (filterRequired || filter) {
    if (is.unit(filter)) {
      filterType = 'unit'
    } else {
      assert(isFunction(filter), '`filter` should be function or unit')
      filterType = 'fn'
    }
  }
  if (target) {
    assertNodeSet(target, method, 'target')
    assertTarget(method, target)
  } else {
    if (
      filterType === 'none' &&
      targetMayBeStore &&
      is.store(source) &&
      is.store(clock)
    ) {
      const initialState = fn
        ? fn(readRef(getStoreState(source)), readRef(getStoreState(clock)))
        : readRef(getStoreState(source))
      // @ts-expect-error
      target = createStore(initialState, {name, sid, or: metadata})
    } else {
      target = createEvent({name, derived: true, or: metadata})
      applyTemplate('sampleTarget', getGraph(target))
    }
  }
  // const targetTemplate =
  //   isUpward && is.unit(target) && getGraph(target).meta.nativeTemplate
  const clockState = createStateRef()
  let filterNodes: Cmd[] = []
  if (filterType === 'unit') {
    const [filterRef, hasFilter] = syncSourceState(
      filter as DataCarrier,
      target,
      // @ts-expect-error
      clock,
      clockState,
      method,
    )
    filterNodes = [...readAndFilter(hasFilter), ...readAndFilter(filterRef)]
  }
  const [sourceRef, hasSource] = syncSourceState(
    // @ts-expect-error
    source,
    target,
    clock,
    clockState,
    method,
  )
  const jointNode = createLinkNode(
    // @ts-expect-error
    clock,
    target,
    [
      applyTemplate('sampleSourceLoader'),
      mov({from: STACK, target: clockState}),
      ...readAndFilter(hasSource),
      read(sourceRef, true, batch),
      ...filterNodes,
      read(clockState),
      filterType === 'fn' && userFnCall((src, _, {a}) => filter(src, a), true),
      fn && userFnCall(callStackAReg),
      applyTemplate('sampleSourceUpward', isUpward),
    ],
    method,
    fn,
  )
  // @ts-expect-error
  own(source, [jointNode])
  Object.assign(jointNode.meta, metadata, {joint: true})
  jointNode.lazy = {
    active: false,
    alwaysActive: false,
    usedBy: 0,
    activate: [],
  }
  const jointLazy = jointNode.lazy!
  ;[...new Set([source, clock, filter])]
    .filter(
      (item): item is Store<any> | Event<any> =>
        is.store(item) || is.event(item),
    )
    .forEach(unit => {
      jointLazy.activate.push(unit.graphite)
    })
  const targets = Array.isArray(target) ? target : [target]
  const targetsStores = targets.filter(
    (unit): unit is Store<any> | Event<any> => is.store(unit) || is.event(unit),
  )
  if (targetsStores.some(store => store.graphite.lazy!.alwaysActive)) {
    traverseSetAlwaysActive(jointNode)
  } else {
    targetsStores.forEach(unit => {
      const unitLazy = unit.graphite.lazy!
      /**
       * if some activator appeared in graph twice,
       * it will appear in usedBy twice too
       **/
      jointLazy.usedBy += unitLazy.usedBy
      unitLazy.activate.push(jointNode)
    })
  }
  return target
}

const readAndFilter = (state: StateRef) => [
  read(state),
  calc((upd, scope, {a}) => a, true),
]

const syncSourceState = (
  source: DataCarrier,
  target: DataCarrier | DataCarrier[],
  clock: DataCarrier | DataCarrier[],
  clockState: StateRef,
  method: string,
) => {
  const isSourceStore = is.store(source)
  const sourceRef = isSourceStore ? getStoreState(source) : createStateRef()
  const hasSource = createStateRef(isSourceStore)
  if (!isSourceStore) {
    createNode({
      parent: source,
      node: [
        mov({from: STACK, target: sourceRef}),
        mov({from: VALUE, store: true, target: hasSource}),
      ],
      family: {owners: [source, target, clock], links: target},
      meta: {op: method},
      regional: true,
    })
  }
  applyTemplate('sampleSource', hasSource, sourceRef, clockState)
  return [sourceRef, hasSource] as const
}
