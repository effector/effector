//@flow
import type {StateRef, NodeMeta, TypeDef} from './index.h'
import {stringRefcount} from './refcount'
const nextID = stringRefcount()

declare export function step(
  type: 'query',
  data:
    | {|
        +mode: 'some',
        +fn: (
          arg: any,
          ctx: any,
          meta: *,
        ) => {+arg: any, +list: Array<TypeDef<*, *>>},
      |}
    | {|
        +mode: 'shape',
        +shape: {[string]: TypeDef<*, *>},
        +fn: (arg: any, ctx: any, meta: *) => {+[string]: any},
      |},
): TypeDef<'query', 'step'>
declare export function step(
  type: 'single',
  data: TypeDef<*, 'cmd'>,
): TypeDef<'single', 'step'>
declare export function step(
  type: 'multi',
  data: $ReadOnlyArray<TypeDef<*, *>>,
): TypeDef<'multi', 'step'>
declare export function step(
  type: 'seq',
  data: $ReadOnlyArray<TypeDef<*, *>>,
): TypeDef<'seq', 'step'>
export function step(type: string, data: Object) {
  return {
    id: nextID(),
    type,
    group: 'step',
    data,
  }
}

//eslint-disable-next-line no-unused-vars
declare export function cmd(
  tag: 'compute',
  data: {|
    fn: Function,
    meta?: NodeMeta,
  |},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'emit',
  data: {|
    fullName: string,
    meta?: NodeMeta,
  |},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'filter',
  data: {|
    fn: (data: any) => boolean,
    meta?: NodeMeta,
  |},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'run',
  data: {
    fn: Function,
    meta?: NodeMeta,
  },
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'update',
  data:
    | {|
        store: StateRef,
        meta?: NodeMeta,
      |}
    | {|
        val: string,
        meta?: NodeMeta,
      |},
): TypeDef<'single', 'step'>
export function cmd(type: string, data: Object): TypeDef<'single', 'step'> {
  return step('single', {
    id: nextID(),
    type,
    group: 'cmd',
    data,
  })
}
