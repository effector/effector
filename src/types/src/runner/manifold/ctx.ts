import {Ctx} from './types'

export let ctx: Ctx

export function ctxWrap<T>(val: Ctx, fn: (val: Ctx) => T): T {
  const prevCtx = ctx
  ctx = val
  try {
    return fn(val)
  } finally {
    ctx = prevCtx
  }
}
