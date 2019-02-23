//@flow

import type {TypeDef} from 'effector/stdlib'
// import {__DEV__, __DEBUG__} from 'effector/flags'
import type {CommandList} from './index.h'
declare var __step: TypeDef<*, 'step'>
declare var __single: any
declare function __val(key: string, value: any): any

const cmd = {
  emit(meta, local) {},
  filter(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.__stepArg,
      val: meta.val,
      fn: __single.filter,
    })
    local.isChanged = Boolean(runCtx.result)
  },
  run(meta, local) {
    if ('pushUpdate' in __single) {
      __single.pushUpdate = data => meta.pendingEvents.push(data)
    }
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.__stepArg,
      val: meta.val,
      fn: __single.runner,
    })
    local.isFailed = runCtx.err
  },
  update(meta, local) {
    local.store.current = local.__stepArg
  },
  compute(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.__stepArg,
      val: meta.val,
      fn: __single.fn,
    })
    local.isChanged = !runCtx.err
    ///TODO WARNING!! DIRTY HACK REMOVE ASAP
    ///need to separate pre and post local variables
    local.__stepArg = runCtx.err ? null : runCtx.result
  },
}

const transition = {
  emit: () => true,
  filter: (meta, local) => local.isChanged,
  run: (meta, local) => local.isFailed,
  update: () => true,
  compute: (meta, local) => local.isChanged,
}

const local = {
  emit: meta => ({__stepArg: __val('scope').top.__stepArg}),
  filter: meta => ({__stepArg: __val('scope').top.__stepArg, isChanged: false}),
  run: meta => ({__stepArg: __val('scope').top.__stepArg, isFailed: true}),
  update: meta => ({
    __stepArg: __val('scope').top.__stepArg,
    store: __single.store,
  }),
  compute: meta => ({
    __stepArg: __val('scope').top.__stepArg,
    isChanged: false,
  }),
}

export default ({
  emit: {
    cmd: cmd.emit,
    transition: transition.emit,
    local: local.emit,
  },
  filter: {
    cmd: cmd.filter,
    transition: transition.filter,
    local: local.filter,
  },
  run: {
    cmd: cmd.run,
    transition: transition.run,
    local: local.run,
  },
  update: {
    cmd: cmd.update,
    transition: transition.update,
    local: local.update,
  },
  compute: {
    cmd: cmd.compute,
    transition: transition.compute,
    local: local.compute,
  },
}: CommandList)

const tryRun = ctx => {
  try {
    ctx.result = ctx.fn.call(null, ctx.arg, ctx.val)
  } catch (err) {
    console.error(err)
    ctx.err = true
  }
  return ctx
}
