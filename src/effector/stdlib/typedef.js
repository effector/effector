//@flow
import type {
  StateRef,
  NodeMeta,
  Update,
  Run,
  Tap,
  Filter,
  Emit,
  Compute,
  Barrier,
  ID,
} from './index.h'
import {stringRefcount} from './refcount'
const nextID = stringRefcount()

export const step: {
  barrier(data: {|
    +barrierID: ID,
    meta?: NodeMeta,
  |}): Barrier,
  emit(data: {|
    fullName: string,
    meta?: NodeMeta,
  |}): Emit,
  compute(data: {|
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  |}): Compute,
  filter(data: {|
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  |}): Filter,
  run(data: {
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  }): Run,
  tap(data: {
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  }): Tap,
  update(data: {|
    store: StateRef,
    meta?: NodeMeta,
  |}): Update,
} = {
  barrier: cmd.bind(null, 'barrier'),
  compute: cmd.bind(null, 'compute'),
  emit: cmd.bind(null, 'emit'),
  filter: cmd.bind(null, 'filter'),
  run: cmd.bind(null, 'run'),
  tap: cmd.bind(null, 'tap'),
  update: cmd.bind(null, 'update'),
}

//eslint-disable-next-line no-unused-vars
declare export function cmd(
  tag: 'barrier',
  data: {|
    +barrierID: ID,
    meta?: NodeMeta,
  |},
): Barrier
declare export function cmd(
  tag: 'compute',
  data: {|
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  |},
): Compute
declare export function cmd(
  tag: 'emit',
  data: {|
    fullName: string,
    meta?: NodeMeta,
  |},
): Emit
declare export function cmd(
  tag: 'filter',
  data: {|
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  |},
): Filter
declare export function cmd(
  tag: 'run',
  data: {
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  },
): Run
declare export function cmd(
  tag: 'tap',
  data: {
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  },
): Run
declare export function cmd(
  tag: 'update',
  data: {|
    store: StateRef,
    meta?: NodeMeta,
  |},
): Update
export function cmd(type: string, data: Object) {
  return {
    id: nextID(),
    type,
    group: 'cmd',
    data,
  }
}
