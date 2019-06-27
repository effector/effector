//@flow
import type {
  StateRef,
  NodeMeta,
  Update,
  Run,
  Tap,
  Filter,
  Compute,
  Barrier,
  ID,
} from './index.h'
import {stringRefcount} from './refcount'
const nextID = stringRefcount()

const cmd = (type: any, data: any): any => ({
  id: nextID(),
  type,
  data,
})

export const step: {|
  barrier(data: {|
    +barrierID: ID,
    +priority?: 'barrier' | 'sampler',
    meta?: NodeMeta,
  |}): Barrier,
  compute(data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  |}): Compute,
  filter(data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  |}): Filter,
  run(data: {
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  }): Run,
  tap(data: {
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  }): Tap,
  update(data: {|
    store: StateRef,
    meta?: NodeMeta,
  |}): Update,
|} = {
  barrier: ({barrierID, priority = 'barrier'}) =>
    cmd('barrier', {
      barrierID,
      priority,
    }),
  compute: cmd.bind(null, 'compute'),
  filter: cmd.bind(null, 'filter'),
  run: cmd.bind(null, 'run'),
  tap: cmd.bind(null, 'tap'),
  update: cmd.bind(null, 'update'),
}
