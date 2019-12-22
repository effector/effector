//@flow
/* eslint-disable no-nested-ternary */
import {combine} from './combine'
import {
  type Graphite,
  step,
  createStateRef,
  readRef,
  own,
  callStackAReg,
  callARegStack,
} from './stdlib'
import {is} from './is'
import {createStore} from './createUnit'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {createNode} from './createNode'

export function sample(
  source: any,
  clock: Graphite,
  fn?: boolean | ((source: any, clock: any) => any),
  greedy: boolean = false,
): any {
  let target
  let name = null
  //config case
  if (clock === undefined && 'source' in source) {
    if ('clock' in source && source.clock == null)
      throw Error('config.clock should be defined')
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
  source = is.unit(source) ? source : combine(source)
  clock = is.unit(clock) ? clock : combine(clock)
  if (typeof fn === 'boolean') {
    greedy = fn
    fn = null
  }
  if (!target) {
    const config = {
      name: name || source.shortName,
      parent: source.domainName,
    }
    if (is.store(source) && is.store(clock)) {
      const initialState = fn
        ? fn(readRef(source.stateRef), readRef(clock.stateRef))
        : readRef(source.stateRef)
      target = createStore(initialState, config)
    } else {
      target = createEvent(config)
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
            store: source.stateRef,
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
    })
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
