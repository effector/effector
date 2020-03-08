//@flow
import {combine} from './combine'
import {step} from './typedef'
import {createStateRef, readRef} from './stateRef'
import {callStackAReg, callARegStack} from './caller'
import {getStoreState, getConfig, getNestedConfig} from './getter'
import {own} from './own'
import {is} from './is'
import {createStore} from './createUnit'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {createNode} from './createNode'
import {addToRegion, readTemplate} from './region'
import {throwError} from './throw'

export const shapeToStore = shape => (is.unit(shape) ? shape : combine(shape))

export function sample(...args): any {
  let target
  let name
  let metadata
  if (getNestedConfig(args[0])) {
    metadata = getConfig(args[0])
    args = getNestedConfig(args[0])
  }
  let [source, clock, fn, greedy = false] = args

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
    source = source.source
  }
  if (clock === undefined) {
    //still undefined!
    clock = source
  }
  name = metadata || name || source.shortName
  source = shapeToStore(source)
  clock = shapeToStore(clock)
  if (typeof fn === 'boolean') {
    greedy = fn
    fn = null
  }
  if (!target) {
    if (is.store(source) && is.store(clock)) {
      const initialState = fn
        ? fn(readRef(getStoreState(source)), readRef(getStoreState(clock)))
        : readRef(getStoreState(source))
      target = createStore(initialState, {name})
    } else {
      target = createEvent(name)
    }
  }
  if (is.store(source)) {
    own(source, [
      createLinkNode(clock, target, {
        scope: {fn},
        node: [
          //$off
          !greedy && step.barrier({priority: 'sampler'}),
          step.mov({
            store: getStoreState(source),
            to: fn ? 'a' : 'stack',
          }),
          fn && step.compute({fn: callARegStack}),
        ],
        meta: {op: 'sample', sample: 'store'},
      }),
    ])
  } else {
    const hasSource = createStateRef(false)
    const sourceState = createStateRef()
    const clockState = createStateRef()
    const template = readTemplate()
    if (template) {
      template.plain[hasSource.id] = false
      template.plain[sourceState.id] = null
      template.plain[clockState.id] = null
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
        scope: {fn},
        node: [
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
        ],
        meta: {op: 'sample', sample: 'clock'},
      }),
    ])
  }
  return target
}
