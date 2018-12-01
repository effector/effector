//@flow
import invariant from 'invariant'
import type {Event} from 'effector/event'
import {Ctx} from 'effector/graphite/typedef'
import type {TypeDef} from 'effector/stdlib/typedef'
import {singleStep} from './single-step'

export function walkEvent<T>(payload: T, event: Event<T>) {
  const steps: TypeDef<'seq', 'step'> = event.graphite.seq
  const eventCtx = Ctx.emit(event.getType(), payload)
  const transactions: Array<() => void> = []
  walkSeq(steps, eventCtx, transactions)
  for (const transact of transactions) {
    transact()
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

const stepVisitor = {
  single(step, currentCtx, transactions) {
    const innerData = step.data
    const result = singleStep(innerData, currentCtx, transactions)
    if (!result) return
    if (result.type === ('run': 'run')) return
    if (result.type === ('filter': 'filter') && !result.data.isChanged) return
    return (result: any)
  },
  multi(step, currentCtx, transactions) {
    if (step.data.length === 0) return
    for (const e of step.data) {
      walkStep(e, currentCtx, transactions)
    }
  },
  seq(step, currentCtx, transactions) {
    return walkSeq(step, currentCtx, transactions)
  },
}

function walkStep(
  step: TypeDef<'seq', 'step'>,
  currentCtx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  transactions: Array<() => void>,
): TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'> | void {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  return stepVisitor[step.type](step, currentCtx, transactions)
}
