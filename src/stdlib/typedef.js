//@flow
import type {StateRef, TypeDef} from './index.h'
import {stringRefcount} from './refcount'
const nextID = stringRefcount()

const typeDef = (group: string, t: $ReadOnlyArray<string>) => {
  const result = {}
  for (let i = 0; i < t.length; i++) {
    const key = t[i]
    result[key] = type.bind({
      key,
      group,
    })
  }
  return result
}

export const Step: {
  +query: (
    props:
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
  ) => TypeDef<'query', 'step'>,
  single(props: TypeDef<*, 'cmd'>): TypeDef<'single', 'step'>,
  multi(props: $ReadOnlyArray<TypeDef<*, *>>): TypeDef<'multi', 'step'>,
  seq(props: $ReadOnlyArray<TypeDef<*, *>>): TypeDef<'seq', 'step'>,
} = typeDef(('step': 'step'), ['single', 'multi', 'seq', 'query'])

export const Cmd: {
  compute(props: {fn: Function}): TypeDef<'compute', 'cmd'>,
  emit(props: {fullName: string}): TypeDef<'emit', 'cmd'>,
  filter(props: {fn: (data: any) => boolean}): TypeDef<'filter', 'cmd'>,
  run(props: {fn: Function}): TypeDef<'run', 'cmd'>,
  update(
    props: {|store: StateRef|} | {|val: string|},
  ): TypeDef<'update', 'cmd'>,
} = typeDef(('cmd': 'cmd'), ['compute', 'emit', 'run', 'filter', 'update'])

function type(data) {
  return {
    id: nextID(),
    type: this.key,
    group: this.group,
    data,
  }
}
