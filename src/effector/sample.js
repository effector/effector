//@flow
/* eslint-disable no-nested-ternary */
import {combine} from './combine'
import {
  type Graphite,
  step,
  createStateRef,
  readRef,
  writeRef,
  own,
  is,
} from './stdlib'
import {createStore} from './createStore'
import {createEvent} from './createEvent'
import {createLinkNode} from './forward'

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
        scope: {
          state: source.stateRef,
          fn,
        },
        node: [
          //$off
          !greedy && step.barrier({priority: 'sampler'}),
          step.compute({
            fn: fn
              ? (upd, {state, fn}) => fn(readRef(state), upd)
              : (upd, {state}) => readRef(state),
          }),
        ],
        meta: {op: 'sample', sample: 'store'},
      }),
    ])
  } else {
    const hasSource = createStateRef(false)
    const sourceState = createStateRef()
    const clockState = createStateRef()

    own(clock, [
      createLinkNode(source, target, {
        scope: {hasSource},
        node: [
          step.update({store: sourceState}),
          step.compute({
            fn(upd, {hasSource}) {
              writeRef(hasSource, true)
            },
          }),
          step.filter({fn: () => false}),
        ],
        meta: {op: 'sample', sample: 'source'},
      }),
    ])
    own(source, [
      createLinkNode(clock, target, {
        scope: {sourceState, clockState, hasSource, fn},
        node: [
          step.update({store: clockState}),
          step.filter({
            fn: (upd, {hasSource}) => readRef(hasSource),
          }),
          //$off
          !greedy && step.barrier({priority: 'sampler'}),
          step.compute({
            fn: fn
              ? (upd, {sourceState, clockState, fn}) =>
                fn(readRef(sourceState), readRef(clockState))
              : (upd, {sourceState}) => readRef(sourceState),
          }),
        ],
        meta: {op: 'sample', sample: 'clock'},
      }),
    ])
  }
  return target
}
