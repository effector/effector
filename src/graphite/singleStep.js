//@flow
// import invariant from 'invariant'
import type {SingleStepValidContext} from '../effector/index.h'
import {cmd as Cmd, ctx as Ctx} from 'effector/datatype/FullDatatype.bs'

export function singleEmit(
  arg: any,
  single: Cmd.emit,
  ctx: SingleStepValidContext,
  transactions: Array<() => void>,
) {
  return Ctx.emit(single.data.fullName, arg)
}
export function singleFilter(
  arg: any,
  single: Cmd.filter,
  ctx: SingleStepValidContext,
  transactions: Array<() => void>,
) {
  try {
    const isChanged = single.data.filter(arg, ctx)
    return Ctx.filter(arg, isChanged)
  } catch (err) {
    console.error(err)
    return
  }
}
export function singleRun(
  arg: any,
  single: Cmd.run,
  ctx: SingleStepValidContext,
  transactions: Array<() => void>,
) {
  const transCtx = single.data.transactionContext
  if (transCtx) transactions.push(transCtx(arg))
  try {
    single.data.runner(arg)
  } catch (err) {
    console.error(err)
  }
  return Ctx.run([arg], ctx)
}
export function singleUpdate(
  arg: any,
  single: Cmd.update,
  ctx: SingleStepValidContext,
  transactions: Array<() => void>,
) {
  const newCtx = Ctx.update(arg)
  single.data.store[2](arg)
  return newCtx
}
export function singleCompute(
  arg: any,
  single: Cmd.compute,
  ctx: SingleStepValidContext,
  transactions: Array<() => void>,
) {
  const newCtx = Ctx.compute(
    [undefined, arg, ctx],
    null,
    null,
    false,
    true,
    true,
  )
  try {
    const result = single.data.reduce(undefined, arg, newCtx)
    newCtx.data.result = result
    newCtx.data.isNone = result === undefined
  } catch (err) {
    newCtx.data.isError = true
    newCtx.data.error = err
    newCtx.data.isChanged = false
  }
  if (!newCtx.data.isChanged) return
  return newCtx
}
