//@flow
import type {
  StateRef,
  Run,
  Tap,
  Filter,
  Compute,
  Barrier,
  Check,
  Batch,
  ID,
  Graph,
  Mov,
} from './index.h'
import {nextStepID, nextBarrierID} from './refcount'
import {bind2} from './bind'

const cmd = (type: any, hasRef: boolean, data: any): any => ({
  id: nextStepID(),
  type,
  data,
  hasRef,
})

export const step: {|
  batch(data: {|
    +blocks: Graph,
  |}): Batch,
  barrier(data: {|
    +priority?: 'barrier' | 'sampler',
  |}): Barrier,
  mov(data: {|
    from?: 'value' | 'store' | 'stack' | 'a' | 'b',
    to?: 'stack' | 'a' | 'b',
    store?: any,
    target?: any,
  |}): Mov,
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
  |}): Mov,
|} = {
  batch: bind2(cmd, 'batch', false),
  barrier: ({priority = 'barrier'}) =>
    cmd('barrier', false, {
      barrierID: nextBarrierID(),
      priority,
    }),
  mov: ({from = 'store', store, target, to = target ? 'store' : 'stack'}) =>
    cmd('mov', from === 'store', {from, store, to, target}),
  check: {
    defined: () => cmd('check', false, {type: 'defined'}),
    changed: ({store}) => cmd('check', true, {type: 'changed', store}),
  },
  compute: bind2(cmd, 'compute', false),
  filter: bind2(cmd, 'filter', false),
  run: bind2(cmd, 'run', false),
  update: ({store}) => step.mov({from: 'stack', target: store}),
}
