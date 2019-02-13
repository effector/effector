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
