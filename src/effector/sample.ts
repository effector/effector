import {combine} from './combine'
import {mov, compute, read, calc} from './step'
import {createStateRef, readRef} from './stateRef'
import {callStackAReg, callARegStack} from './caller'
import {processArgsToConfig} from './config'
import {getStoreState, getGraph} from './getter'
import {own} from './own'
import {assertNodeSet, is, isObject, isVoid} from './is'
import {createStore} from './createUnit'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {createNode} from './createNode'
import {assert} from './throw'
import {forEach} from './collection'
import {SAMPLE, STACK, STORE, VALUE} from './tag'
import {merge} from './merge'
import {applyTemplate} from './template'

const sampleConfigFields = ['source', 'clock', 'target']

function validateSampleConfig(config: any) {
  let atLeastOneFieldExists = false
  forEach(sampleConfigFields, field => {
    if (field in config) {
      assert(config[field] != null, `sample: ${field} should be defined`)
      atLeastOneFieldExists = true
    }
  })
  return atLeastOneFieldExists
}
export const groupInputs = (source: any, clock: any, method: string) => {
  if (isVoid(source)) {
    assertNodeSet(clock, method, 'clock')
    if (Array.isArray(clock)) {
      clock = merge(clock)
    }
    source = clock
  } else if (!is.unit(source)) {
    source = combine(source)
  }
  return [source, clock] as const
}
export function sample(...args: any): any {
  let target
  let name
  let [[source, clock, fn], metadata] = processArgsToConfig(args)
  let sid
  let greedy
  /** config case */
  if (isVoid(clock) && isObject(source) && validateSampleConfig(source)) {
    clock = source.clock
    fn = source.fn
    greedy = source.greedy
    /** optional target & name accepted only from config */
    target = source.target
    name = source.name
    sid = source.sid
    source = source.source
  }
  ;[source, clock] = groupInputs(source, clock, 'sample')
  if (isVoid(clock)) {
    /** still undefined! */
    clock = source
  }
  assertNodeSet(clock, 'sample', 'clock')
  if (!metadata && !name) name = source.shortName
  const isUpward = !!target
  if (!target) {
    if (is.store(source) && is.store(clock)) {
      const initialState = fn
        ? fn(readRef(getStoreState(source)), readRef(getStoreState(clock)))
        : readRef(getStoreState(source))
      target = createStore(initialState, {name, sid, or: metadata})
    } else {
      target = createEvent(name, metadata)
      applyTemplate('sampleTarget', getGraph(target))
    }
  }
  // const targetTemplate =
  //   isUpward && is.unit(target) && getGraph(target).meta.nativeTemplate
  if (is.store(source)) {
    const sourceRef = getStoreState(source)
    own(source, [
      createLinkNode(clock, target, {
        scope: {fn},
        // scope: {fn, targetTemplate},
        node: [
          applyTemplate('sampleSourceLoader'),
          read(sourceRef, !fn, !greedy),
          fn && compute({fn: callARegStack}),
          applyTemplate('sampleSourceUpward', isUpward),
        ],
        meta: {op: SAMPLE, sample: STORE},
      }),
    ])
    applyTemplate('sampleStoreSource', sourceRef)
  } else {
    const hasSource = createStateRef(false)
    const sourceState = createStateRef()
    const clockState = createStateRef()
    applyTemplate('sampleNonStoreSource', hasSource, sourceState, clockState)
    createNode({
      parent: source,
      node: [
        mov({from: STACK, target: sourceState}),
        mov({from: VALUE, store: true, target: hasSource}),
      ],
      family: {owners: [source, target, clock], links: target},
      meta: {op: SAMPLE, sample: 'source'},
      regional: true,
    })
    own(source, [
      createLinkNode(clock, target, {
        scope: {
          fn,
          // targetTemplate,
        },
        node: [
          applyTemplate('sampleSourceLoader'),
          mov({from: STACK, target: clockState}),
          read(hasSource, true),
          calc(hasSource => hasSource, true),
          read(sourceState, true, !greedy),
          read(clockState),
          fn && compute({fn: callStackAReg}),
          applyTemplate('sampleSourceUpward', isUpward),
        ],
        meta: {op: SAMPLE, sample: 'clock'},
      }),
    ])
  }
  return target
}
