//@flow

import type {Readable} from './index.h'
import {isDerivable} from './types'

export function deepUnpack(thing: any) {
 if (isDerivable(thing)) {
  return thing.get()
 } else if (Array.isArray(thing)) {
  return thing.map(deepUnpack)
 } else if (thing.constructor === Object) {
  const result = {}
  const keys = Object.keys(thing)
  for (let i = keys.length; i--; ) {
   const prop = keys[i]
   result[prop] = deepUnpack(thing[prop])
  }
  return result
 } else {
  return thing
 }
}

/**
 * dereferences a thing if it is dereferencable, otherwise just returns it.
 */

declare export function unpack<T>(thing: Readable<T>): T
declare export function unpack<T>(thing: T): T
export function unpack(thing: any) {
 if (isDerivable(thing)) {
  return thing.get()
 }
 return thing
}
