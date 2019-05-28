//@flow

export function thru(fn: Function) {
  return fn(this)
}
