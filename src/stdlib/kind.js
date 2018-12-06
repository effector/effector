//@flow

//prettier-ignore
export opaque type kind =
  | 'none'
  | 'store'
  | 'event'
  | 'effect'

export function matchKind<T>(
  value: kind,
  matcher: $Shape<{
    +none: T,
    +store: T,
    +event: T,
    +effect: T,
    +__: T,
  }>,
) {
  // assertKind(value)
  if (value in matcher) return matcher[value]
  if ('__' in matcher) return matcher.__
}
// export function
export function readKind(value: mixed): kind {
  let kindValue
  if (typeof value === 'object' && value !== null) {
    kindValue = value.kind
    if (typeof kindValue === 'string') {
      assertKind(kindValue)
      //$off
      return kindValue
    }
  } else if (typeof value === 'function' && typeof value.kind === 'string') {
    assertKind(value.kind)
    return value.kind
  }
  throw new Error(`wrong kind ${String(value)}`)
}

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

function assertKind(kind: mixed) {
  switch (kind) {
    case 'none':
    case 'store':
    case 'event':
    case 'effect':
      return
    default:
      throw new Error(`wrong kind "${String(kind)}"`)
  }
}
