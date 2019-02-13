//@flow

import {Ctx, type TypeDef} from 'effector/stdlib'
import {__DEBUG__} from 'effector/flags'
import type {CommonCtx, Meta, StepVisitor} from './index.h'
import * as command from './command'
import {cloneMeta} from './meta'
import {runStep} from './runStep'

declare var __step: TypeDef<*, 'step'>
declare var __single: any
declare function __val(key: string, value: any): any

const querySome = (ctx, meta) => {
  const data: {
    +mode: 'some',
    +fn: (
      arg: any,
      ctx: any,
      meta: *,
    ) => {+arg: any, +list: Array<TypeDef<*, *>>},
  } = __step.data
  const fn = data.fn
  const arg = meta.arg
  const queryResult = fn(arg, ctx, meta)
  const newCtx = Ctx.emit({
    __stepArg: queryResult.arg,
  })
  const items = queryResult.list
  meta.arg = queryResult.arg
  for (let i = 0; i < items.length; i++) {
    runStep(items[i], newCtx, meta)
  }
  meta.arg = arg
  meta.stop = false
}
const queryShape = (ctx, meta) => {
  const data: {
    +mode: 'shape',
    +shape: {[string]: TypeDef<*, *>},
    +fn: (arg: any, ctx: any, meta: *) => {[string]: any},
  } = __step.data
  const fn = data.fn
  const shape = data.shape
  const arg = meta.arg
  const queryResult = fn(arg, ctx, meta)
  for (const key in queryResult) {
    if (!(key in shape)) continue
    const def = shape[key]
    const subArg = queryResult[key]
    const newCtx = Ctx.emit({
      __stepArg: subArg,
    })
    meta.arg = subArg
    runStep(def, newCtx, meta)
  }
  meta.arg = arg
  meta.stop = false
}

export const single: StepVisitor = (ctx, meta) => {
  __val('ctx', ctx)
  meta.arg = ctx.data.__stepArg
  meta.ctx = command[__step.data.type].cmd(meta)
  meta.stop = !command[meta.ctx.type].transition(meta)
}
export const multi: StepVisitor = (ctx, meta) => {
  const items = __step.data.slice()
  for (let i = 0; i < items.length; i++) {
    runStep(items[i], ctx, meta)
  }
  meta.stop = false
  return
}
export const seq: StepVisitor = (ctx, meta) => {
  if (__DEBUG__) {
    __val('watch')(__step)
  }
  meta.ctx = ctx
  const items = __step.data.slice()
  for (let i = 0; i < items.length; i++) {
    runStep(items[i], meta.ctx, meta)
    if (meta.stop) {
      break
    }
  }
}
export const query: StepVisitor = (ctx, meta) => {
  switch (__step.data.mode) {
    case 'some':
      return querySome(ctx, meta)
    case 'shape':
      return queryShape(ctx, meta)
  }
}

//extendWalk(runStep, stepVisitor)
