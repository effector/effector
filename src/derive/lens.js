//@flow

import {setEquals} from './util'
import {LENS} from './types'
import {Derivation} from './derivation'
import {atomically} from './transactions'
import {update} from './update'

import type {LensDescriptor} from '.'

export class Lens<T> extends Derivation<T> {
 /*::
 _type: *
 */
 _descriptor: LensDescriptor<T>

 constructor(descriptor: LensDescriptor<T>) {
  super(descriptor.get)
  this._descriptor = descriptor
 }

 _clone() {
  return setEquals(new Lens(this._descriptor), this._equals)
 }

 set(value: T) {
  atomically(() => {
   this._descriptor.set(value)
  })
 }
 update(f: Function, ...args: any[]) {
  return update(this, f, args)
 }
}

Object.defineProperty(Lens.prototype, '_type', {
 value: LENS,
 configurable: true,
})

export function lens<T>(descriptor: LensDescriptor<T>): Lens<T> {
 return new Lens(descriptor)
}
