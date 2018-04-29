//@flow

import {Atom} from '../atom'
import {Derivation} from '../derivation'
import {Lens} from '../lens'

declare export function clone<T>(instance: Lens<T>): Lens<T>
declare export function clone<T>(instance: Atom<T>): Atom<T>
declare export function clone<T>(instance: Derivation<T>): Derivation<T>
export function clone<T>(instance: Lens<T> | Atom<T> | Derivation<T>) {
 let result
 if (instance instanceof Lens) result = new Lens(instance._descriptor)
 else if (instance instanceof Atom) result = new Atom(instance._value)
 else if (instance instanceof Derivation)
  result = new Derivation(instance._deriver)
 else {
  throw new TypeError('unmatched case')
 }
 result._equals = instance._equals
 return result
}
