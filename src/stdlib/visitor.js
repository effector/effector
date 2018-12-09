//@flow

import type {kind} from './kind'

export type VisitorRecord<Args, +R, T> = {
  +visitor: $Shape<{
    +none: T,
    +store: T,
    +event: T,
    +effect: T,
    +__: T,
  }>,
  reader(...args: Args): kind | void,
  writer(t: T, ...args: Args): R,
}

//prettier-ignore
declare export function makeVisitorRecordMap<
  Rec
>(rec: Rec): $ObjMap<Rec, <T>(_: T) => $Call<
    <Args, R, T>(
      record: VisitorRecord<Args, R, T>,
    ) => ((...args: Args) => R),
    T,
  >
>
export function makeVisitorRecordMap(rec: Object) {
  const result = {}
  for (const key in rec) {
    result[key] = visitRecordCurry(rec[key])
  }
  return result
}
function visitRecordCurry<Args, R, T>(record: VisitorRecord<Args, R, T>) {
  return (...args: Args) => {
    const value = record.reader(...args)
    if (value === undefined) {
      if ('__' in record.visitor)
        return record.writer(record.visitor.__, ...args)
      throw new Error('unmatched undefined case')
    }
    if (value in record.visitor)
      return record.writer(record.visitor[value], ...args)
    if ('__' in record.visitor) return record.writer(record.visitor.__, ...args)
    throw new Error(`unmatched case ${value}`)
  }
}
