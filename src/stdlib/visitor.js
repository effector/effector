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
  return visitor[String(cfg.__kind || '__')](cfg.args)
}

export function kindReader(eventOrFn: any): kind | void {
  if (typeof eventOrFn === 'function') {
    if (typeof eventOrFn.kind !== 'undefined')
      return ((eventOrFn.kind: any): kind)
  } else if (typeof eventOrFn === 'object' && eventOrFn !== null) {
    if ('kind' in eventOrFn) return (eventOrFn.kind: kind)
  }
}
