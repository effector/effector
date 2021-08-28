import {combine} from './combine'
import {step} from './typedef'
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
import {REG_A, SAMPLE, SAMPLER, STACK, STORE, VALUE} from './tag'
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
  if (isVoid(source)) {
    assertNodeSet(clock, 'sample', 'clock')
    if (Array.isArray(clock)) {
      clock = merge(clock)
    }
    source = clock
  } else if (!is.unit(source)) {
    source = combine(source)
  }
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
          step.mov({
            store: sourceRef,
            to: fn ? REG_A : STACK,
            priority: !greedy && SAMPLER,
            batch: true,
          }),
          fn && step.compute({fn: callARegStack}),
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
        step.update({store: sourceState}),
        step.mov({from: VALUE, store: true, target: hasSource}),
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
          step.update({store: clockState}),
          step.mov({store: hasSource}),
          step.filter({fn: hasSource => hasSource}),
          step.mov({
            store: sourceState,
            batch: true,
            priority: !greedy && SAMPLER,
          }),
          step.mov({store: clockState, to: REG_A}),
          fn && step.compute({fn: callStackAReg}),
          applyTemplate('sampleSourceUpward', isUpward),
        ],
        meta: {op: SAMPLE, sample: 'clock'},
      }),
    ])
  }
  return target
}
