//@flow

import {Derivation} from './derivation'
import {atomically} from './transactions'
import {update} from './update'
import {LENS} from '../kind/case/derive'
import type {LensDescriptor} from './index.h'
import {setLens} from './methods/set'

export class Lens<T> extends Derivation<T> {
 _descriptor: LensDescriptor<T>

 /*::+*/ kind = LENS
 constructor(descriptor: LensDescriptor<T>) {
  super(descriptor.get)
  this._descriptor = descriptor
 }

 set(value: T) {
  setLens(this, value)
 }
 update(f: Function, ...args: any[]) {
  return update(this, f, args)
 }
}

export function lens<T>(descriptor: LensDescriptor<T>): Lens<T> {
 return new Lens(descriptor)
}
