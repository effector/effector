//@flow

import invariant from 'invariant'
import type {Derivation} from '../derivation'
import type {Readable} from '../index.h'

export function maybe<A, B>(
 Derivation: Class<Derivation<B | null>>,
 readable: Readable<A>,
 fn: (_: A) => B,
): Derivation<B> {
 invariant(typeof fn === 'function', 'maybe requires function')
 return new Derivation(() => {
  const arg = readable.get()
  if (arg === undefined || arg === null) return null
  return fn(arg)
 })
}
