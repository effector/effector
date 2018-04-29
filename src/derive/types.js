//@flow


export function isDerivable(x: mixed): boolean %checks {
 return (
  x !== undefined
  && x !== null
  && (x._type === 'DERIVATION' || x._type === 'ATOM' || x._type === 'LENS')
 )
}

export function isAtom(x: mixed): boolean %checks {
 return x !== undefined && x !== null && (x._type === 'ATOM' || x._type === 'LENS')
}

export function isDerivation(x: mixed): boolean %checks {
 return (
  x !== undefined && x !== null && (x._type === 'DERIVATION' || x._type === 'LENS')
 )
}
