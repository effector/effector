//@flow strict

import {type Lazy, fromThunk, fromValue} from '../instance'

const noop = () => {}

function withInit<T>(init: () => T, read: () => T): Lazy<T> {
 let value /*:: = init()*/
 let run = () => {
  value = init()
  run = read
  return value
 }
 return fromThunk(() => run())
}

function bit<T>(lazy: Lazy<T>) {}

export function combineWeak<A, B, C>(
 a: Lazy<A>,
 weak: Lazy<B>,
 fn: (a: A, b: B) => C,
): Lazy<C> {
 let aCached = a.read()
 let weakCached /*:: = weak.read()*/
 let resultVal /*:: = fn(aCached, weakCached)*/
 let init = () => {
  aCached = a.read()
  weakCached = weak.read()
  resultVal = fn(aCached, weakCached)
  init = read
  return resultVal
 }
 const read = () => {
  const aValue = a.read()
  if (aValue !== aCached) {
   aCached = aValue
   weakCached = weak.read()
   resultVal = fn(aCached, weakCached)
  }
  return resultVal
 }

 return withInit(init, read)
}

export function combine<A, B, C>(
 a: Lazy<A>,
 b: Lazy<B>,
 fn: (a: A, b: B) => C,
): Lazy<C> {
 if (a.isConst === true) {
  if (b.isConst === true) return combineConstConst(a, b, fn)
  return combineConstLazy(a, b, fn)
 }
 if (b.isConst === true) return combineLazyConst(a, b, fn)

 return combineLazyLazy(a, b, fn)
}

function combineConstConst<A, B, C>(
 a: Lazy<A>,
 b: Lazy<B>,
 fn: (a: A, b: B) => C,
): Lazy<C> {
 const valueA = a.read()
 const valueB = b.read()
 const computed = fn(valueA, valueB)
 return fromValue(computed)
}

function combineConstLazy<A, B, C>(
 a: Lazy<A>,
 b: Lazy<B>,
 fn: (a: A, b: B) => C,
): Lazy<C> {
 const aCached = a.read()
 let bCached /*:: = b.read()*/
 let resultVal /*:: = fn(aCached, bCached)*/
 const result = fromThunk(() => {
  const bValue = b.read()
  if (bValue !== bCached) {
   bCached = bValue
   resultVal = fn(aCached, bCached)
  }
  return resultVal
 })
 return result
}

function combineLazyConst<A, B, C>(
 a: Lazy<A>,
 b: Lazy<B>,
 fn: (a: A, b: B) => C,
): Lazy<C> {
 let aCached /*:: = a.read()*/
 const bCached = b.read()
 let resultVal /*:: = fn(aCached, bCached)*/
 const result = fromThunk(() => {
  const aValue = a.read()
  if (aValue !== aCached) {
   aCached = aValue
   resultVal = fn(aCached, bCached)
  }
  return resultVal
 })
 return result
}

function combineLazyLazy<A, B, C>(
 a: Lazy<A>,
 b: Lazy<B>,
 fn: (a: A, b: B) => C,
): Lazy<C> {
 let aCached /*:: = a.read()*/
 let bCached /*:: = b.read()*/
 let resultVal /*:: = fn(aCached, bCached)*/
 const result = fromThunk(() => {
  const aValue = a.read()
  const bValue = b.read()
  if (aValue !== aCached || bValue !== bCached) {
   aCached = aValue
   bCached = bValue
   resultVal = fn(aValue, bValue)
  }
  return resultVal
 })
 return result
}
