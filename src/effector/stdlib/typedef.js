//@flow
import type {
  StateRef,
  Update,
  Run,
  Tap,
  Filter,
  Compute,
  Barrier,
  Check,
  Batch,
  ID,
  Graph,
  ReadStack,
} from './index.h'
import {nextStepID, nextBarrierID} from './refcount'

const cmd = (type: any, data: any): any => ({
  id: nextStepID(),
  type,
  data,
})

export const step: {|
  batch(data: {|
    +blocks: Graph,
  |}): Batch,
  stack(data: {|
    +to: Graph,
  |}): ReadStack,
  barrier(data: {|
    +priority?: 'barrier' | 'sampler',
  |}): Barrier,
  check: {
    defined(): Check,
    changed({store: StateRef}): Check,
  },
  compute(data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |}): Compute,
  filter(data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |}): Filter,
  run(data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |}): Run,
  tap(data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |}): Tap,
  update(data: {|
    store: StateRef,
  |}): Update,
|} = {
  batch: cmd.bind(null, 'batch'),
  stack: cmd.bind(null, 'stack'),
  barrier: ({priority = 'barrier'}) =>
    cmd('barrier', {
      barrierID: nextBarrierID(),
      priority,
    }),
  check: {
    defined: () => cmd('check', {type: 'defined'}),
    changed: ({store}) => cmd('check', {type: 'changed', store}),
  },
  compute: cmd.bind(null, 'compute'),
  filter: cmd.bind(null, 'filter'),
  run: cmd.bind(null, 'run'),
  tap: cmd.bind(null, 'tap'),
  update: cmd.bind(null, 'update'),
}
