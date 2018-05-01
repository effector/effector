//@flow

export type Kind = 'store' | 'event' | 'effect' | 'none'

export function readKind(value: mixed): Kind {
 if (typeof value !== 'object' && typeof value !== 'function') return 'none'
 if (value === null) return 'none'
 if (typeof value.kind !== 'function') return 'none'
 const kind = value.kind()
 switch (kind) {
  case 'store':
  case 'event':
  case 'effect':
  case 'none':
   return kind
  default:
   return 'none'
 }
}
