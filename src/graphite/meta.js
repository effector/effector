//@flow
import {type TypeDef, createStateRef} from 'effector/stdlib'

import type {Meta} from './index.h'

export const cloneMeta = (meta: Meta): Meta => ({
  callstack: meta.callstack.slice(),
  ctx: meta.ctx,
  reg: meta.reg,
  stop: meta.stop,
  val: meta.val,
  //TODO avoid this
  transactions: meta.transactions,
  arg: meta.arg,
})
export const newMeta = (ctx: TypeDef<*, 'ctx'>): Meta => ({
  callstack: [],
  transactions: [],
  stop: false,
  ctx,
  reg: {
    isChanged: true,
  },
  val: stateRefs({
    watch(ctx) {
      // console.log('watch', ctx)
    },
    ctx: null,
  }),
  arg: null,
})

const stateRefs = obj => {
  const result = {}
  for (const key in obj) {
    result[key] = createStateRef(obj[key])
  }
  return result
}
