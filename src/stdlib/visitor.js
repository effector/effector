//@flow

import type {kind} from './kind'

export function visitRecord<Args, R>(
  visitor: $Shape<{
    none(_: Args): R,
    store(_: Args): R,
    event(_: Args): R,
    effect(_: Args): R,
    __(_: Args): R,
  }>,
  cfg: {+__kind?: kind, +args: Args},
): R {
  const args = cfg.args
  const value = cfg.__kind
  if (value === undefined) {
    if ('__' in visitor) return visitor.__(args)
    throw new Error('unmatched undefined case')
  }
  if (value in visitor) return visitor[String(value)](args)
  if ('__' in visitor) return visitor.__(args)
  throw new Error('unmatched case ' + value)
}

export function kindReader(eventOrFn: any): kind | void {
  if (typeof eventOrFn === 'function') {
    if (typeof eventOrFn.kind !== 'undefined')
      return ((eventOrFn.kind: any): kind)
  } else if (typeof eventOrFn === 'object' && eventOrFn !== null) {
    if ('kind' in eventOrFn) return (eventOrFn.kind: kind)
  }
}
