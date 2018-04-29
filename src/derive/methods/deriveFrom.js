//@flow

import invariant from 'invariant'
import {Derivation} from '../derivation'
import type {Readable} from '..'

export function deriveFrom<A, B>(
 readable: Readable<A>,
 fn: (_: A) => B,
): Derivation<B> {
 invariant(typeof fn === 'function', 'derive requires function')
 return new Derivation(() => fn(readable.get()))
}
