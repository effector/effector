//@flow
import invariant from 'invariant'
export type TypeDef<+Type, +Group> = {
  +type: Type,
  +group: Group,
  +data: any,
}

export type GraphiteMeta = {+next: TypeDef<*, 'step'>, +seq: TypeDef<*, 'step'>}

function fabricHandler(create) {
  if (typeof create === 'function') return create
  return _ => _
}

declare export function typeDef<T: {+[key: string]: any}, Group>(
  group: Group,
  t: T,
): $ObjMapi<T, <K>(k: K) => (data: any) => TypeDef<K, Group>>
export function typeDef(group, t) {
  const result = {}
  for (const key in t) {
    const handler = fabricHandler(t[key])
    result[key] = (...args) => ({
      type: key,
      group,
      data: handler(...args),
    })
  }
  return result
}
