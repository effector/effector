import {combine} from './combine'
import {mov, compute, read, calc} from './step'
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
import {assert} from './throw'
import {forEach} from './collection'
import {SAMPLE, STACK, VALUE} from './tag'
import {merge} from './merge'
import {applyTemplate} from './template'
import {Cmd, NodeUnit, StateRef} from './index.h'
import {own} from './own'
import {createLinkNode} from './forward'

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

export function sample(...args: any): any {
  let target
  let name
  let [[source, clock, fn], metadata] = processArgsToConfig(args)
  let sid
  let batched = true
  let filter
  /** config case */
  if (
    isVoid(clock) &&
    isObject(source) &&
    validateSampleConfig(source, SAMPLE)
  ) {
    clock = source.clock
    fn = source.fn
    batched = !source.greedy
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
    batched,
    true,
    false,
    sid,
  )
}

export const createSampling = (
  method: string,
  clock: any,
  source: any,
  filter: any,
  target: any,
  fn: any,
  name: any,
  metadata: any,
  batched: boolean,
  targetMayBeStore: boolean,
  filterRequired: boolean,
  sid?: any,
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
      clock = merge(clock)
    }
  }
  if (sourceIsClock) {
    source = clock
  }
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
      filter as NodeUnit,
      target,
      clock,
      clockState,
      method,
    )
    filterNodes = [...readAndFilter(hasFilter), ...readAndFilter(filterRef)]
  }
  const [sourceRef, hasSource] = syncSourceState(
    source,
    target,
    clock,
    clockState,
    method,
  )
  own(source, [
    createLinkNode(
      clock,
      target,
      [
        applyTemplate('sampleSourceLoader'),
        mov({from: STACK, target: clockState}),
        ...readAndFilter(hasSource),
        read(sourceRef, true, batched),
        ...filterNodes,
        read(clockState),
        filterType === 'fn' &&
          compute({fn: (src, _, {a}) => filter(src, a), filter: true}),
        fn && compute({fn: callStackAReg}),
        applyTemplate('sampleSourceUpward', isUpward),
      ],
      method,
      fn,
    ),
  ])
  return target
}

const readAndFilter = (state: StateRef) => [
  read(state),
  calc((upd, scope, {a}) => a, true),
]

const syncSourceState = (
  source: NodeUnit,
  target: NodeUnit | NodeUnit[],
  clock: NodeUnit,
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
