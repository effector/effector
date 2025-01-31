import type {Cmd, StateRef} from './index.h'
import type {CommonUnit, DataCarrier, Store} from './unit.h'
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
import {STACK, VALUE} from './tag'
import {applyTemplate} from './template'
import {own} from './own'
import {createLinkNode} from './forward'
import {generateErrorTitle} from './naming'

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
      clock = createLinkNode(clock as CommonUnit[], [], [], method)
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
  if (filterType === 'unit') {
    const [filterRef, hasFilter, isFilterStore] = syncSourceState(
      filter as DataCarrier,
      target,
      // @ts-expect-error
      clock,
      clockState,
      method,
    )
    if (!isFilterStore) {
      filterNodes.push(...readAndFilter(hasFilter))
    }
    filterNodes.push(...readAndFilter(filterRef))
  }
  const jointNodeSeq: Cmd[] = []
  if (sourceIsClock) {
    if (batch) {
      jointNodeSeq.push(read(clockState, true, true))
    }
  } else {
    const [sourceRef, hasSource, isSourceStore] = syncSourceState(
      // @ts-expect-error
      source,
      target,
      clock,
      clockState,
      method,
    )
    if (!isSourceStore) {
      jointNodeSeq.push(...readAndFilter(hasSource))
    }
    jointNodeSeq.push(read(sourceRef, true, batch))
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
  )
  // @ts-expect-error
  own(source, [jointNode])
  Object.assign(jointNode.meta, metadata, {joint: true})
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
  return [sourceRef, hasSource, isSourceStore] as const
}
