//@flow

export function stringRefcount(): () => string {
  let id = 0
  return () => (++id).toString(36)
}

export function intRefcount(): () => number {
  let id = 0
  return () => ++id
}

export const eventRefcount = stringRefcount()
