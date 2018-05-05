//@flow

import invariant from 'invariant'

import {deriveFrom} from './deriveFrom'
import {isDerivable} from '../types'
import {reactorFabric} from '../reactorFabric'
import type {Lifecycle} from '../index.h'
import {Derivation} from '../derivation'

export function maybeStatic<T>(
 instance: Derivation<T>,
 f: T => void,
 opts?: Lifecycle<T>,
) {
 let maybeWhen = deriveFrom(instance, Boolean)
 if (opts && 'when' in opts && opts.when !== true) {
  let when = opts.when
  if (typeof when === 'function' || when === false) {
   //$todo
   when = new Derivation(when)
  }
  invariant(
   isDerivable(when),
   'when condition must be bool, function, or derivable',
  )
  maybeWhen = maybeWhen.map(d => d && when && when.get())
 }
 reactorFabric(Derivation, instance, f, {...opts, when: maybeWhen})
}
