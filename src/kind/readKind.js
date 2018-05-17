//@flow
import type {None, Store, Event, Effect, Kind} from './index.h'

function safeKind(kind): Kind {
 // prettier-ignore
 switch (kind) {
  case (1: Store): return (1: Store)
  case (2: Event): return (2: Event)
  case (3: Effect): return (3: Effect)
  default: return (-1: None)
 }
}

export function readKind(value: mixed): Kind {
 if (typeof value !== 'object' && typeof value !== 'function') return (-1: None)
 if (value === null) return (-1: None)
 return safeKind(value.kind)
}
