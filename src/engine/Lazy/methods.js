//@flow strict

import {type Lazy, fromThunk, fromValue} from './instance'
import {ap} from './ap'

export function join<T>(value: Lazy<Lazy<T>>): Lazy<T> {
  return fromThunk(() => value.read().read())
}

export function chain<A, B>(fn: (x: A) => Lazy<B>, value: Lazy<A>): Lazy<B> {
  return join(map(fn, value))
}

export function map<A, B>(fn: (x: A) => B, value: Lazy<A>): Lazy<B> {
  return ap(fromValue(fn), value)
}

export function tap<A>(fn: (x: A) => any, value: Lazy<A>): Lazy<A> {
  return ap(
    fromValue(value => {
      fn(value)
      return value
    }),
    value,
  )
}
