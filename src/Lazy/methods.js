//@flow strict

import {type Lazy, fromThunk, fromValue} from './instance'
import {ap} from './ap'

export function join<T>(value: Lazy<Lazy<T>>): Lazy<T> {
  if (value.isConst !== true) return fromThunk(() => value.read().read())
  return value.read()
}

export function chain<A, B>(fn: (x: A) => Lazy<B>, value: Lazy<A>): Lazy<B> {
  return join(map(fn, value))
}

export function map<A, B>(fn: (x: A) => B, value: Lazy<A>): Lazy<B> {
  if (value.isConst !== true) return ap(fromValue(fn), value)
  const lazyValue = value.read()
  const computed = fn(lazyValue)
  return fromValue(computed)
}

export function tap<A>(fn: (x: A) => any, value: Lazy<A>): Lazy<A> {
  return map(value => {
    fn(value)
    return value
  }, value)
}
