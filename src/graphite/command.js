//@flow

import type {CommandList} from './index.h'
import {single} from './meta'

const cmd = {
  emit(meta, local) {},
  filter(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.arg,
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
      arg: local.arg,
      val: meta.val,
      fn: data.fn,
    })
    local.isFailed = runCtx.err
  },
  update(meta, local) {
    local.store.current = local.arg
  },
  compute(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null: any),
      arg: local.arg,
      val: meta.val,
      fn: single(meta).fn,
    })
    local.isChanged = !runCtx.err
    ///TODO WARNING!! DIRTY HACK REMOVE ASAP
    ///need to separate pre and post local variables
    local.arg = runCtx.err ? null : runCtx.result
  },
}

export default ({
  emit: {
    cmd: cmd.emit,
    transition: () => true,
    local: (meta, arg) => ({arg}),
  },
  filter: {
    cmd: cmd.filter,
    transition: (meta, local) => local.isChanged,
    local: (meta, arg) => ({arg, isChanged: false}),
  },
  run: {
    cmd: cmd.run,
    transition: (meta, local) => local.isFailed,
    local: (meta, arg) => ({arg, isFailed: true}),
  },
  update: {
    cmd: cmd.update,
    transition: () => true,
    local: (meta, arg) => ({
      arg,
      store: single(meta).store,
    }),
  },
  compute: {
    cmd: cmd.compute,
    transition: (meta, local) => local.isChanged,
    local: (meta, arg) => ({
      arg,
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
