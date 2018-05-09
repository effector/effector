//@flow

// import invariant from 'invariant'
import {equals} from '../util'
import {unpack} from '../unpack'
import {derive} from '../derivation'
import type {Derivation} from '../derivation'

export function is<T>(
 instance: {
  get(): T,
  equality: null | ((a: T, b: T) => boolean),
 },
 other: mixed,
): Derivation<boolean> {
 return derive(() => equals(instance, instance.get(), unpack(other)))
}
