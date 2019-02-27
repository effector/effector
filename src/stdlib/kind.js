//@flow

//prettier-ignore
export opaque type kind: string =
  | 'store'
  | 'event'
  | 'effect'

export const Kind: {
  +store: kind,
  +event: kind,
  +effect: kind,
} = {
  store: 'store',
  event: 'event',
  effect: 'effect',
}

export const isUnit = (obj: mixed) =>
  (typeof obj === 'function' || (typeof obj === 'object' && obj !== null))
  //$off
  && 'kind' in obj

//$off
export const isStore = (obj: mixed) => isUnit(obj) && obj.kind === 'store'
//$off
export const isEvent = (obj: mixed) => isUnit(obj) && obj.kind === 'event'
//$off
export const isEffect = (obj: mixed) => isUnit(obj) && obj.kind === 'effect'
