//@flow

import type {CommandList} from './index.h'
import {single} from './meta'

const cmd = {
  emit(meta, local) {},
  filter(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.__stepArg,
      val: meta.val,
      fn: single(meta).fn,
    })
    local.isChanged = Boolean(runCtx.result)
  },
  run(meta, local) {
    const data = single(meta)
    if ('pushUpdate' in data) {
      data.pushUpdate = data => meta.pendingEvents.push(data)
    }
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.__stepArg,
      val: meta.val,
      fn: data.fn,
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
      fn: single(meta).fn,
    })
    local.isChanged = !runCtx.err
    ///TODO WARNING!! DIRTY HACK REMOVE ASAP
    ///need to separate pre and post local variables
    local.__stepArg = runCtx.err ? null : runCtx.result
  },
}

export default ({
  emit: {
    cmd: cmd.emit,
    transition: () => true,
    local: (meta, __stepArg) => ({__stepArg}),
  },
  filter: {
    cmd: cmd.filter,
    transition: (meta, local) => local.isChanged,
    local: (meta, __stepArg) => ({__stepArg, isChanged: false}),
  },
  run: {
    cmd: cmd.run,
    transition: (meta, local) => local.isFailed,
    local: (meta, __stepArg) => ({__stepArg, isFailed: true}),
  },
  update: {
    cmd: cmd.update,
    transition: () => true,
    local: (meta, __stepArg) => ({
      __stepArg,
      store: single(meta).store,
    }),
  },
  compute: {
    cmd: cmd.compute,
    transition: (meta, local) => local.isChanged,
    local: (meta, __stepArg) => ({
      __stepArg,
      isChanged: false,
    }),
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
