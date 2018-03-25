//@flow strict

import type {Lazy} from './instance'
import {combine} from './combine'

export function ap<A, B>(fn: Lazy<(x: A) => B>, value: Lazy<A>): Lazy<B> {
  return combine(fn, value, (fn, value) => fn(value))
}
