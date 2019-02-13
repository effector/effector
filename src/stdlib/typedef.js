//@flow
import {stringRefcount} from './refcount'
const nextID = stringRefcount()
export type ID = string
export type TypeDef<+Type, +Group> = {
  +id: ID,
  +type: Type,
  +group: Group,
  +data: any,
}

export type GraphiteMeta = {
  +next: TypeDef<'multi', 'step'>,
  +seq: TypeDef<'seq', 'step'>,
}

export const Step = typeDef(('step': 'step'), {
  single: null,
  multi: null,
  seq: null,
  query: null,
})

export const Cmd = typeDef(('cmd': 'cmd'), {
  compute: null,
  emit: null,
  run: null,
  filter: null,
  update: null,
})

export const Ctx = typeDef(('ctx': 'ctx'), {
  compute: null,
  emit: null,
  run: null,
  filter: null,
  update: null,
})

//eslint-disable-next-line no-unused-vars
declare function typeDef<T: {+[key: string]: any}, Group>(
  group: Group,
  t: T,
): $ObjMapi<T, <K>(k: K) => (data: any) => TypeDef<K, Group>>
function typeDef(group, t) {
  const result = {}
  for (const key in t) {
    result[key] = type.bind({
      key,
      group,
    })
  }
  return result
}
function type(data) {
  return {
    id: nextID(),
    type: this.key,
    group: this.group,
    data,
  }
}
