//@flow
import type {
  StateRef,
  NodeMeta,
  Update,
  Run,
  Filter,
  Emit,
  Compute,
} from './index.h'
import {stringRefcount} from './refcount'
const nextID = stringRefcount()

//eslint-disable-next-line no-unused-vars
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
