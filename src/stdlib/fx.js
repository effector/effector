//@flow
/* eslint-disable no-unused-vars */

import type {StateRef} from './stateref'
import {Step, Cmd, type TypeDef} from './typedef'

/* Step */
declare export default function fx(
  tag: 'query',
  props: {
    +mode: 'some',
    +fn: (
      arg: any,
      ctx: any,
      meta: *,
    ) => {+arg: any, +list: Array<TypeDef<*, *>>},
  },
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'query', 'step'>
declare export default function fx(
  tag: 'query',
  props: {
    +mode: 'shape',
    +shape: {[string]: TypeDef<*, *>},
    +fn: (arg: any, ctx: any, meta: *) => {+[string]: any},
  },
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'query', 'step'>
declare export default function fx(
  tag: 'single',
  props: null,
  childrens: *,
): TypeDef<'single', 'step'>
declare export default function fx(
  tag: 'multi',
  props: null,
  ...childrens: *
): TypeDef<'multi', 'step'>
declare export default function fx(
  tag: 'seq',
  props: null,
  ...childrens: *
): TypeDef<'seq', 'step'>

/* Cmd */
declare export default function fx(
  tag: 'compute',
  props: {fn: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'compute', 'cmd'>
declare export default function fx(
  tag: 'emit',
  props: {fullName: string},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'emit', 'cmd'>
declare export default function fx(
  tag: 'filter',
  props: {filter: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'filter', 'cmd'>
declare export default function fx(
  tag: 'run',
  props: {runner: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'run', 'cmd'>
declare export default function fx(
  tag: 'update',
  props: {|store: StateRef|} | {|val: string|},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'update', 'cmd'>
export default function fx(
  tag:
    | 'single'
    | 'multi'
    | 'seq'
    | 'query'
    | 'compute'
    | 'emit'
    | 'filter'
    | 'run'
    | 'update',
  props: *,
  ...childrens: *
) {
  if (tag in Cmd) {
    const tag_: 'compute' | 'emit' | 'filter' | 'run' | 'update' = (tag: any)
    return Step.single(Cmd[tag_](props))
  }
  const tag_: 'single' | 'multi' | 'seq' | 'query' = (tag: any)
  switch (tag_) {
    case 'seq':
      return Step.seq(childrens)
    case 'multi':
      return Step.multi(childrens)
    case 'single':
      return Step.single(childrens[0])
    case 'query':
      return Step.query(props)
  }
  // if (typeof tag === 'function') return tag(props, childrens)
  // console.error('unknown node "%s"', tag)
  return null
}
