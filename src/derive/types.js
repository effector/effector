//@flow
import * as Kind from '../kind'

export function isDerivable(x: mixed): boolean {
 switch (Kind.readKind(x)) {
  case Kind.DERIVATION:
  case Kind.ATOM:
  case Kind.LENS:
   return true
  default:
   return false
 }
}

export function isAtom(x: mixed): boolean {
 switch (Kind.readKind(x)) {
  case Kind.ATOM:
  case Kind.LENS:
   return true
  default:
   return false
 }
}

export function isDerivation(x: mixed): boolean {
 switch (Kind.readKind(x)) {
  case Kind.DERIVATION:
  case Kind.LENS:
   return true
  default:
   return false
 }
}
