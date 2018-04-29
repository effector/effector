//@flow

import invariant from 'invariant'

export function withEquality(
 instance: {
  _clone(): *,
  _equals: null | ((a: mixed, b: mixed) => boolean),
 },
 equals: (a: mixed, b: mixed) => boolean,
) {
 invariant(typeof equals === 'function', 'equals must be function')
 const result = instance._clone()
 result._equals = equals

 return result
}
