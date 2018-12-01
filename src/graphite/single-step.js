//@flow
import invariant from 'invariant'
import type {TypeDef} from 'effector/stdlib/typedef'
import {Ctx} from 'effector/graphite/typedef'

export function singleStep(
  single: TypeDef<*, 'cmd'>,
  ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  transactions: Array<() => void>,
): TypeDef<'compute' | 'emit' | 'run' | 'filter' | 'update', 'ctx'> | void {
  invariant(ctx.type in stepArgVisitor, 'impossible case "%s"', ctx.type)
  const arg = stepArgVisitor[ctx.type](ctx.data)
  invariant(single.type in cmdVisitor, 'impossible case "%s"', single.type)
  return cmdVisitor[single.type](arg, single, ctx, transactions)
}

const stepArgVisitor = {
  compute: data => data.result,
  emit: data => data.payload,
  run: data => (data, invariant(false, 'RunContext is not supported')),
  filter: data => data.value,
  update: data => data.value,
}

const cmdVisitor = {
  emit(
    arg: any,
    single: TypeDef<'emit', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    return Ctx.emit(single.data.fullName, arg)
  },
  filter(
    arg: any,
    single: TypeDef<'filter', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    try {
      const isChanged = single.data.filter(arg, ctx)
      return Ctx.filter(arg, isChanged)
    } catch (err) {
      console.error(err)
    }
  },
  run(
    arg: any,
    single: TypeDef<'run', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
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
  },
  update(
    arg: any,
    single: TypeDef<'update', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
    transactions: Array<() => void>,
  ) {
    const newCtx = Ctx.update(arg)
    single.data.store[2](arg)
    return newCtx
  },
  compute(
    arg: any,
    single: TypeDef<'compute', 'cmd'>,
    ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
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
  },
}
