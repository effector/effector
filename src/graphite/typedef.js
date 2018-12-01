//@flow
export type Declaration<+Type, +Group> = {
  +type: Type,
  +group: Group,
  +data: any,
}
declare function declareType<T: {+[key: string]: any}, Group>(
  group: Group,
  t: T,
): $ObjMapi<T, <K>(k: K) => (data: any) => Declaration<K, Group>>
function declareType(group, t) {
  const result = {}
  for (const key in t) {
    result[key] = data => ({type: key, group, data})
  }
  return result
}
const type = () => null

export const Step = declareType(('step': 'step'), {
  single: type(),
  multi: type(),
  seq: type(),
})

export const Cmd = declareType(('cmd': 'cmd'), {
  compute: type(),
  emit: type(),
  run: type(),
  filter: type(),
  update: type(),
})

export const Ctx = declareType(('ctx': 'ctx'), {
  computeCtx: type(),
  emitCtx: type(),
  runCtx: type(),
  filterCtx: type(),
  updateCtx: type(),
})
