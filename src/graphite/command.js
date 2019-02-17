//@flow

import {type TypeDef, Ctx, createStateRef} from 'effector/stdlib'
// import {__DEV__, __DEBUG__} from 'effector/flags'
import type {Command} from './index.h'
declare var __step: TypeDef<*, 'step'>
declare var __single: any
declare function __val(key: string, value: any): any

export const emit: Command = {
  cmd: meta =>
    Ctx.emit({
      __stepArg: meta.arg,
    }),
  transition: () => true,
}
export const filter: Command = {
  cmd(meta) {
    const ctx = Ctx.filter({
      __stepArg: meta.arg,
    })
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: meta.arg,
      val: meta.val,
      fn: __single.filter,
    })
    meta.reg.isChanged = Boolean(runCtx.result)
    return ctx
  },
  transition: meta => Boolean(meta.reg.isChanged),
}
export const run: Command = {
  cmd(meta) {
    if ('transactionContext' in __single)
      meta.transactions.push(__single.transactionContext(meta.arg))
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: meta.arg,
      val: meta.val,
      fn: __single.runner,
    })
    meta.reg.isFailed = runCtx.err
    return Ctx.run({})
  },
  transition: meta => Boolean(meta.reg.isFailed),
}
export const update: Command = {
  cmd(meta) {
    let store
    if ('val' in __single) {
      store = meta.val[__single.val] =
        meta.val[__single.val] || createStateRef(null)
    } else {
      store = __single.store
    }
    store.current = meta.arg
    return Ctx.update({
      __stepArg: meta.arg,
    })
  },
  transition: () => true,
}
export const compute: Command = {
  cmd(meta) {
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: meta.arg,
      val: meta.val,
      fn: __single.fn,
    })
    meta.reg.isChanged = !runCtx.err

    return Ctx.compute({
      __stepArg: runCtx.err ? null : runCtx.result,
    })
  },
  transition: meta => Boolean(meta.reg.isChanged),
}

const tryRun = ctx => {
  try {
    ctx.result = ctx.fn.call(null, ctx.arg, ctx.val)
  } catch (err) {
    console.error(err)
    ctx.err = true
  }
  return ctx
}
