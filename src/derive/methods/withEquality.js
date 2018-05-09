//@flow

import invariant from 'invariant'

import type {Derivation} from '../derivation'
import type {Atom} from '../atom'
import type {Lens} from '../lens'

import {clone} from './clone'

declare export function withEquality<A>(
 value: Atom<A>,
 equals: (a: A, b: A) => boolean,
): Atom<A>

declare export function withEquality<A>(
 value: Lens<A>,
 equals: (a: A, b: A) => boolean,
): Lens<A>

declare export function withEquality<A>(
 value: Derivation<A>,
 equals: (a: A, b: A) => boolean,
): Derivation<A>

export function withEquality(
 instance: *,
 equals: (a: mixed, b: mixed) => boolean,
) {
 invariant(typeof equals === 'function', 'equals must be function')
 const result = clone(instance)
 result.equality = equals

 return result
}
