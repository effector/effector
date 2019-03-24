//@flow
import {type TypeDef, createStateRef} from 'effector/stdlib'

import type {Meta, CommonCtx} from './index.h'

export const cloneMeta = (meta: Meta): Meta => {
  const val: typeof meta.val = cloneVals(meta.val)
  const transactions: typeof meta.transactions = []
  const reg: typeof meta.reg = {
    isChanged: meta.reg.isChanged,
    isFailed: meta.reg.isFailed,
  }
  return {
    callstack: meta.callstack.slice(),
    reg,
    stop: meta.stop,
    scope: meta.scope.slice(),
    val,
    //TODO avoid this
    transactions,
    pendingEvents: [],
  }
}
export const val = (tag: string, meta: Meta) => meta.val[tag].current
export const step = (meta: Meta): TypeDef<*, 'step'> =>
  meta.callstack[meta.callstack.length - 1]
export const single = (meta: Meta) => step(meta).data.data
export const newMeta = (ctx: CommonCtx): Meta => ({
  callstack: [],
  transactions: [],
  pendingEvents: [],
  stop: false,
  ctx,
  reg: {
    isChanged: true,
    isFailed: false,
  },
  scope: [],
  val: {},
})

const cloneVals = obj => {
  const result = {}
  for (const key in obj) {
    result[key] = createStateRef(obj[key].current)
  }
  return result
}

const stateRefs = obj => {
  const result = {}
  for (const key in obj) {
    result[key] = createStateRef(obj[key])
  }
  return result
}
