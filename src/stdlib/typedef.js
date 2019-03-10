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

function type(data) {
  return {
    id: nextID(),
    type: this.key,
    group: this.group,
    data,
  }
}
//eslint-disable-next-line no-unused-vars
declare export function cmd(
  tag: 'compute',
  data: {fn: Function},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'emit',
  data: {fullName: string},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'filter',
  data: {fn: (data: any) => boolean},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'run',
  data: {fn: Function},
): TypeDef<'single', 'step'>
declare export function cmd(
  tag: 'update',
  data: {|store: StateRef|} | {|val: string|},
): TypeDef<'single', 'step'>
export function cmd(type: string, data: Object): TypeDef<'single', 'step'> {
  return {
    id: nextID(),
    type: 'single',
    group: 'step',
    data: {
      id: nextID(),
      type,
      group: 'cmd',
      data,
    },
  }
}
