import type {Defer} from './unit.h'

export function createDefer(): Defer {
  const result = {} as Defer
  result.req = new Promise((rs, rj) => {
    result.rs = rs
    result.rj = rj
  })
  result.req.catch(() => {})
  return result
}
