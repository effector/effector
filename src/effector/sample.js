//@flow
import {combine} from './combine'
import {step} from './typedef'
import {createStateRef, readRef} from './stateRef'
import {callStackAReg, callARegStack} from './caller'
import {onConfigNesting} from './config'
import {getStoreState, getGraph} from './getter'
import {own} from './own'
import {is} from './is'
import {createStore} from './createUnit'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {createNode} from './createNode'
import {addToRegion, readTemplate} from './region'
import {throwError} from './throw'

const shapeToStore = (shape, deprecated) => {
  if (!is.unit(shape)) {
    shape = combine(shape)
    if (deprecated) console.error('sample clock shape is deprecated')
  }
  return shape
}

export function sample(...args): any {
  let target
  let name
  let metadata
  onConfigNesting(args[0], (injectedData, userConfig) => {
    metadata = injectedData
    args = userConfig
  })
  let [source, clock, fn, greedy = false] = args
  let sid
  //config case
  if (clock === undefined && 'source' in source) {
    if ('clock' in source && source.clock == null)
      throwError('config.clock should be defined')
    clock = source.clock
    fn = source.fn
    greedy = source.greedy
    //optional target & name accepted only from config
    target = source.target
    name = source.name
    sid = source.sid
    source = source.source
  }
  if (clock === undefined) {
    //still undefined!
    clock = source
  }
  name = metadata || name || source.shortName
  source = shapeToStore(source)
  clock = shapeToStore(clock, true)
  if (typeof fn === 'boolean') {
    greedy = fn
    fn = null
  }
  const template = readTemplate()
  const isUpward = !!target
  if (!target) {
    if (is.store(source) && is.store(clock)) {
      const initialState = fn
        ? fn(readRef(getStoreState(source)), readRef(getStoreState(clock)))
        : readRef(getStoreState(source))
      target = createStore(initialState, {name, sid})
    } else {
      target = createEvent(name)
      if (template) {
        getGraph(target).seq.push(template.loader)
      }
    }
  }
  const targetTemplate =
    isUpward && is.unit(target) && getGraph(target).meta.nativeTemplate
  if (is.store(source)) {
    own(source, [
      createLinkNode(clock, target, {
        scope: {fn, targetTemplate},
        node: [
          template && template.loader,
          //$off
          !greedy && step.barrier({priority: 'sampler'}),
          step.mov({
            store: getStoreState(source),
            to: fn ? 'a' : 'stack',
          }),
          fn && step.compute({fn: callARegStack}),
          template && isUpward && template.upward,
        ],
        meta: {op: 'sample', sample: 'store'},
      }),
    ])
  } else {
    const hasSource = createStateRef(false)
    const sourceState = createStateRef()
    const clockState = createStateRef()
    if (template) {
      template.plain.push(hasSource, sourceState, clockState)
    }
    addToRegion(
      createNode({
        parent: source,
        node: [
          step.update({store: sourceState}),
          step.mov({
            from: 'value',
            store: true,
            target: hasSource,
          }),
        ],
        family: {
          owners: [source, target, clock],
          links: target,
        },
        meta: {op: 'sample', sample: 'source'},
      }),
    )
    own(source, [
      createLinkNode(clock, target, {
        scope: {
          fn,
          targetTemplate,
        },
        node: [
          template && template.loader,
          step.update({store: clockState}),
          step.mov({store: hasSource}),
          step.filter({fn: hasSource => hasSource}),
          //$off
          !greedy && step.barrier({priority: 'sampler'}),
          step.mov({store: sourceState}),
          step.mov({
            store: clockState,
            to: 'a',
          }),
          fn && step.compute({fn: callStackAReg}),
          template && isUpward && template.upward,
        ],
        meta: {op: 'sample', sample: 'clock'},
      }),
    ])
  }
  return target
}
