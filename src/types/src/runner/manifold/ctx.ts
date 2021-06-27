import {Declarator, PartialCtxConfig} from './types'

export let ctx: {
  shape: Record<string, any>
  configUsed: boolean
  items: Record<string, Declarator>
  /**
   * references TO id
   *
   * bool({source: {sourceReference}}): referencedBy
   *
   * {[sourceReference]: referencedBy[]}
   * sourceReference -> referencedBy
   * */
  references: Record<string, string[]>
  /**
   * inline references FROM id
   *
   * separate({cases: {_: targetReference}}): referencedBy
   *
   * {[referencedBy]: targetReference[]}
   * referencedBy -> targetReference
   **/
  targets: Record<string, string[]>
  config: PartialCtxConfig
}

export function ctxWrap<T>(val: typeof ctx, fn: (val: typeof ctx) => T): T {
  const prevCtx = ctx
  ctx = val
  try {
    return fn(val)
  } finally {
    ctx = prevCtx
  }
}
