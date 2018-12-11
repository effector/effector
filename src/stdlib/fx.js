//@flow

import type {TypeDef} from 'effector/stdlib/typedef'
import {Step, Cmd} from 'effector/graphite/typedef'

/* Step */
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
  props: {reduce: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'compute', 'cmd'>
declare export default function fx(
  tag: 'emit',
  props: {subtype: 'event', fullName: string},
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
  props: {store: *},
  ...childrens: $ReadOnlyArray<void>
): TypeDef<'update', 'cmd'>
export default function fx(
  tag:
    | 'single'
    | 'multi'
    | 'seq'
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
    return Cmd[tag_](props)
  }
  const tag_: 'single' | 'multi' | 'seq' = (tag: any)
  switch (tag_) {
    case 'single':
      return Step.single(childrens[0])
    case 'multi':
      return Step.multi(childrens)
    case 'seq':
      return Step.seq(childrens.filter(Boolean))
  }
  if (typeof tag === 'function') return tag(props, childrens)
  console.error('unknown node "%s"', tag)
  return null
}
