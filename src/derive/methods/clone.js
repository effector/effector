//@flow

import {Atom} from '../atom'
import {Derivation} from '../derivation'
import {Lens} from '../lens'
import * as Kind from '../../kind'

declare export function clone<T>(instance: Lens<T>): Lens<T>
declare export function clone<T>(instance: Atom<T>): Atom<T>
declare export function clone<T>(instance: Derivation<T>): Derivation<T>
export function clone<T>(instance: Lens<T> | Atom<T> | Derivation<T>) {
 const result = cloner(instance)
 result.equality = instance.equality
 return result
}

function cloner<T>(instance: Lens<T> | Atom<T> | Derivation<T>) {
 const atomInstance: Atom<T> = (instance: any)
 const lensInstance: Lens<T> = (instance: any)
 const derivationInstance: Derivation<T> = (instance: any)
 switch (Kind.readKind(instance)) {
  case Kind.LENS:
   return new Lens(lensInstance.descriptor)
  case Kind.ATOM:
   return new Atom(atomInstance.value)
  case Kind.DERIVATION:
   return new Derivation(derivationInstance.deriver)
  default: {
   throw new TypeError('unmatched case')
  }
 }
}
