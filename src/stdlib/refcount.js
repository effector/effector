//@flow

export const stringRefcount = (): (() => string) => {
  let id = 0
  return () => (++id).toString(36)
}
