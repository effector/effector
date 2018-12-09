//@flow

//prettier-ignore
export opaque type kind: string =
  | 'none'
  | 'store'
  | 'event'
  | 'effect'

export const Kind: {
  +none: kind,
  +store: kind,
  +event: kind,
  +effect: kind,
} = {
  none: 'none',
  store: 'store',
  event: 'event',
  effect: 'effect',
}
