//@flow
import invariant from 'invariant'
import type {Event} from 'effector/event'
import {Ctx} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'

export function walkEvent<T>(payload: T, event: Event<T>) {
  const steps: TypeDef<'seq', 'step'> = event.graphite.seq
  const eventCtx = Ctx.emit(event.getType(), payload)
  const transactions: Array<() => void> = []
  walkSeq(steps, eventCtx, transactions)
  for (let i = 0; i < transactions.length; i++) {
    transactions[i]()
  }
}

function walkSeq(
  steps: TypeDef<'seq', 'step'>,
  prev: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  transactions: Array<() => void>,
) {
  if (steps.data.length === 0) return
  let currentCtx: TypeDef<
    'compute' | 'emit' | 'filter' | 'update',
    'ctx',
  > = prev
  for (const step of steps.data) {
    const isMulti = step.type === ('multi': 'multi')
    const stepResult = walkStep(step, currentCtx, transactions)
    if (isMulti) continue
    if (stepResult === undefined) return
    if (stepResult.type === ('filter': 'filter') && !stepResult.data.isChanged)
      return
    currentCtx = stepResult
  }
}

function walkStep(
  step: TypeDef<'seq', 'step'>,
  currentCtx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  transactions: Array<() => void>,
): TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'> | void {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  return stepVisitor[step.type](step, currentCtx, transactions)
}

const stepVisitor = {
  single(step, currentCtx, transactions) {
    const innerData = step.data
    const single: TypeDef<*, 'cmd'> = innerData
    const ctx: TypeDef<
      'compute' | 'emit' | 'filter' | 'update',
      'ctx',
    > = currentCtx
    invariant(ctx.type in stepArgVisitor, 'impossible case "%s"', ctx.type)
    const arg = stepArgVisitor[ctx.type](ctx.data)
    invariant(single.type in cmdVisitor, 'impossible case "%s"', single.type)
    const result = cmdVisitor[single.type](arg, single, ctx, transactions)
    if (!result) return
    if (result.type === ('run': 'run')) return
    if (result.type === ('filter': 'filter') && !result.data.isChanged) return
    return (result: any)
  },
  multi(step, currentCtx, transactions) {
    if (step.data.length === 0) return
    for (let i = 0; i < step.data.length; i++) {
      walkStep(step.data[i], currentCtx, transactions)
    }
  },
  seq(step, currentCtx, transactions) {
    return walkSeq(step, currentCtx, transactions)
  },
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
