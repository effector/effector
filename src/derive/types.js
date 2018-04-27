//@flow

export const ATOM: 'ATOM' = 'ATOM'
export const DERIVATION: 'DERIVATION' = 'DERIVATION'
export const LENS: 'LENS' = 'LENS'
export const REACTOR: 'REACTOR' = 'REACTOR'

export function isDerivable(x: mixed): boolean %checks {
 return (
  x !== undefined
  && x !== null
  && (x._type === DERIVATION || x._type === ATOM || x._type === LENS)
 )
}

export function isAtom(x: mixed): boolean %checks {
 return x !== undefined && x !== null && (x._type === ATOM || x._type === LENS)
}

export function isDerivation(x: mixed): boolean %checks {
 return (
  x !== undefined && x !== null && (x._type === DERIVATION || x._type === LENS)
 )
}

export function isLens(x: mixed): boolean %checks {
 return x !== undefined && x !== null && x._type === LENS
}
