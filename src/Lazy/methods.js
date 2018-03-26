//@flow strict

import {
 type Lazy,
 type Sync,
 type Async,
 fromThunk,
 fromValue,
} from './instance'
import {ap} from './ap'

declare export function join<T>(value: Sync<Lazy<T>>): Lazy<T>
declare export function join<T>(value: Async<Lazy<T>>): Async<T>
declare export function join<T>(value: Lazy<Lazy<T>>): Lazy<T>
declare export function join<T>(value: Sync<Sync<T>>): Sync<T>
declare export function join<T>(value: Async<Sync<T>>): Async<T>
declare export function join<T>(value: Lazy<Sync<T>>): Lazy<T>
declare export function join<T>(value: Sync<Async<T>>): Async<T>
declare export function join<T>(value: Async<Async<T>>): Async<T>
declare export function join<T>(value: Lazy<Async<T>>): Async<T>
// declare export function join<T>(value: Lazy<Lazy<T>>): Lazy<T>
export function join<T>(value: Lazy<Lazy<T>>): Lazy<T> {
 if (value.isConst !== true) return fromThunk(() => value.read().read())
 return value.read()
}

export function filter<T>(
 pred: (x: T) => boolean,
 defaultValue: T,
 lazy: Lazy<T>,
): Lazy<T> {
 let val = defaultValue
 return map(value => {
  if (value === val) return val
  if (pred(value)) val = value
  return val
 }, lazy)
}

export function chain<A, B>(fn: (x: A) => Lazy<B>, value: Lazy<A>): Lazy<B> {
 return join(map(fn, value))
}

declare export function map<A, B>(fn: (x: A) => B, value: Sync<A>): Sync<B>
declare export function map<A, B>(fn: (x: A) => B, value: Async<A>): Async<B>
declare export function map<A, B>(fn: (x: A) => B, value: Lazy<A>): Lazy<B>
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
