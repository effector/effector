//@flow
/* eslint-disable no-unused-vars */

import type {StateRef, TypeDef} from './index.h'
import {step, cmd} from './typedef'

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
  props: {fn: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'filter', 'cmd'>
declare export default function fx(
  tag: 'run',
  props: {fn: *},
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
  switch (tag) {
    case 'seq':
      return step('seq', childrens)
    case 'multi':
      return step('multi', childrens)
    case 'single':
      return step('single', childrens[0])
    case 'query':
      return step('query', props)
    default:
      return cmd(tag, props)
  }
}
