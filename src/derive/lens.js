//@flow

import {Derivation} from './derivation'
import {atomically} from './transactions'
import {update} from './update'

import type {LensDescriptor} from './index.h'

export class Lens<T> extends Derivation<T> {
 /*::
 _type = ('LENS': 'LENS')
 */
 _descriptor: LensDescriptor<T>

 constructor(descriptor: LensDescriptor<T>) {
  super(descriptor.get)
  this._descriptor = descriptor
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
 value: ('LENS': 'LENS'),
 configurable: true,
})

export function lens<T>(descriptor: LensDescriptor<T>): Lens<T> {
 return new Lens(descriptor)
}
