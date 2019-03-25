//@flow
import type {TypeDef} from 'effector/stdlib'

import type {Meta, CommonCtx} from './index.h'

export const val = (tag: string, meta: Meta) => meta.val[tag].current
export const step = (meta: Meta): TypeDef<*, 'step'> =>
  meta.callstack[meta.callstack.length - 1]
export const single = (meta: Meta) => step(meta).data.data
export const newMeta = (/*ctx: CommonCtx*/): Meta => ({
  callstack: [],
  pendingEvents: [],
  stop: false,
  // ctx,
  scope: [],
  val: {},
})
