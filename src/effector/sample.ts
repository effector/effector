import type {Cmd, Node, StateRef} from './index.h'
import type {CommonUnit, DataCarrier, Scope, Store} from './unit.h'
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
import {createStore, getUnitTrace, setUnitTrace} from './createUnit'
import {createEvent} from './createUnit'
import {createNode} from './createNode'
import {assert, deprecate} from './throw'
import {add, forEach, removeItem} from './collection'
import {STACK, VALUE} from './tag'
import {applyTemplate} from './template'
import {own} from './own'
import {createLinkNode} from './forward'
import {generateErrorTitle} from './naming'
import {
  addActivator,
  traverseDecrementActivations,
  traverseIncrementActivations,
} from './lazy'

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
  const errorTitle = generateErrorTitle('sample', metadata)
  /** config case */
  if (
    isVoid(clock) &&
    isObject(source) &&
    validateSampleConfig(source, errorTitle)
  ) {
    clock = source.clock
    fn = source.fn
    if ('batch' in source) {
      batch = source.batch
    } else {
      deprecate(!('greedy' in source), 'greedy in sample', 'batch', errorTitle)
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
    'sample',
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
  const errorTitle = generateErrorTitle(method, metadata)
  const isUpward = !!target
  assert(
    !isVoid(source) || !isVoid(clock),
    fieldErrorMessage(errorTitle, 'either source or clock'),
  )
  let sourceIsClock = false
  let clockItems: DataCarrier[] | undefined
  if (isVoid(source)) {
    sourceIsClock = true
  } else if (!is.unit(source)) {
    source = combine(source)
  }
  if (isVoid(clock)) {
    /** still undefined! */
    clock = source
  } else {
    assertNodeSet(clock, errorTitle, 'clock')
    if (Array.isArray(clock)) {
      clockItems = clock as DataCarrier[]
      clock = createLinkNode(clock as CommonUnit[], [], [], method)
    }
  }
  if (sourceIsClock) {
    source = clock
  }
  if (!metadata && !name) {
    /**
     * When there is no metadata and name, assign source name as a fallback.
     * This is very misleading behavior (sample unit is not a source unit)
     * introduced a long time ago, so we keep it only for backward compatibility
     * for cases which were covered at the time.
     *
     * Therefore, this name will not be used as a fallback for newer (23.4.0) cases
     * (a.k.a. sample support for patronum debug traces)
     * and metadata will not be created
     */
    name = (source as any).shortName
  } else if (metadata && name) {
    /** name field from sample config (from user) has highest priority */
    ;(metadata as any).name = name
  } else if (!metadata && name) {
    /**
     * metadata comes from plugin, so when name is present and metadata is missing,
     * we need to create fresh metadata with name
     */
    metadata = {name}
  }
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
    assertNodeSet(target, errorTitle, 'target')
    assertTarget(errorTitle, target)
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
  const syncNodes: Node[] = []
  let activateSources = (scope?: Scope) => {}
  let deactivateSources = (scope?: Scope) => {}
  if (filterType === 'unit') {
    const toActivate = [source, ...(clockItems || [clock])]
      .filter(Boolean)
      .map(unit => getGraph(unit!))
    activateSources = (scope?: Scope) => {
      toActivate.forEach(node => {
        jointNode.lazy!.activate.push(node)
        traverseIncrementActivations(node, jointNode, scope)
      })
    }
    deactivateSources = (scope?: Scope) => {
      toActivate.forEach(node => {
        removeItem(jointNode.lazy!.activate, node)
        traverseDecrementActivations(node, jointNode, scope!)
      })
    }
    createNode({
      alwaysActive: true,
      meta: {op: 'sample', joint: false},
      parent: filter as DataCarrier,
      node: [
        calc((data, _, stack) => {
          if (data) {
            activateSources(stack.scope!)
          } else {
            deactivateSources(stack.scope!)
          }
        }),
      ],
    })
    const [filterRef, hasFilter, isFilterStore, filterSyncNode] =
      syncSourceState(
        filter as DataCarrier,
        target,
        // @ts-expect-error
        clock,
        clockState,
        method,
      )
    filterSyncNode && add(syncNodes, filterSyncNode)
    if (!isFilterStore) {
      filterNodes.push(...readAndFilter(hasFilter))
    }
    filterNodes.push(...readAndFilter(filterRef))
  }
  const jointNodeSeq: Cmd[] = []
  if (sourceIsClock) {
    if (batch) {
      add(jointNodeSeq, read(clockState, true, true))
    }
  } else {
    const [sourceRef, hasSource, isSourceStore, sourceSyncNode] =
      syncSourceState(
        // @ts-expect-error
        source,
        target,
        clock,
        clockState,
        method,
      )
    sourceSyncNode && add(syncNodes, sourceSyncNode)
    if (!isSourceStore) {
      jointNodeSeq.push(...readAndFilter(hasSource))
    }
    add(jointNodeSeq, read(sourceRef, true, batch))
  }
  const jointNode = createLinkNode(
    // @ts-expect-error
    clock,
    target,
    [
      applyTemplate('sampleSourceLoader'),
      mov({from: STACK, target: clockState}),
      ...jointNodeSeq,
      ...filterNodes,
      read(clockState),
      filterType === 'fn' && userFnCall((src, _, {a}) => filter(src, a), true),
      fn && userFnCall(callStackAReg),
      applyTemplate('sampleSourceUpward', isUpward),
    ],
    method,
    fn,
    false,
  )
  // @ts-expect-error
  own(source, [jointNode])
  own(jointNode, syncNodes)
  Object.assign(jointNode.meta, metadata, {joint: true, stateRef: clockState})
  setUnitTrace(jointNode, getUnitTrace(sample))
  addActivator(target, [jointNode], true)
  let needToAddUsedBy = true
  if (is.store(filter) && filter.getState()) {
    activateSources()
    needToAddUsedBy = false
  }
  const clockActivators = clockItems || [clock]
  if (filterType === 'unit') {
    addActivator(jointNode, [filter], needToAddUsedBy)
  } else {
    addActivator(jointNode, [source, ...clockActivators, filter], true)
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
  let syncNode: Node | undefined
  if (!isSourceStore) {
    syncNode = createNode({
      parent: source,
      node: [
        mov({from: STACK, target: sourceRef}),
        mov({from: VALUE, store: true, target: hasSource}),
      ],
      family: {
        owners: [...new Set([source, target, clock].flat())],
        links: target,
      },
      meta: {op: method},
      regional: true,
    })
  }
  applyTemplate('sampleSource', hasSource, sourceRef, clockState)
  return [sourceRef, hasSource, isSourceStore, syncNode] as const
}
