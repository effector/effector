//@flow
import invariant from 'invariant'
import type {SingleStepValidContext} from '../effector/index.h'
import type {Event} from 'effector/event'
import {ctx as Ctx} from 'effector/datatype/FullDatatype.bs'
import {show} from 'effector/datatype/showstep'
import {singleStep} from './single-step'

const stepTag = {
  single: 'single',
  multi: 'multi',
  seq: 'seq',
}

const Step = {
  single: data => ({
    type: stepTag.single,
    data,
  }),
  multi: () => ({
    type: stepTag.multi,
    data: [],
  }),
  seq: data => ({
    type: stepTag.seq,
    data,
  }),
  show,
}
export {Step as step}
export function walkEvent<T>(payload: T, event: Event<T>) {
  const steps: Step.Seq = event.graphite.seq
  const eventCtx = Ctx.emit(event.getType(), payload)
  const transactions: Array<() => void> = []
  walkSeq(steps, eventCtx, transactions)
  for (const transact of transactions) {
    transact()
  }
}

function walkSeq(
  steps: Step.Seq,
  prev: SingleStepValidContext,
  transactions: Array<() => void>,
) {
  if (steps.data.length === 0) return
  let currentCtx: SingleStepValidContext = prev
  for (const step of steps.data) {
    const isMulti = step.type === Step.MULTI
    const stepResult = walkStep(step, currentCtx, transactions)
    if (isMulti) continue
    if (stepResult === undefined) return
    if (stepResult.type === Ctx.FILTER && !stepResult.data.isChanged) return
    currentCtx = stepResult
  }
}

const stepVisitor = {
  single(step, currentCtx, transactions) {
    const innerData = step.data
    const result = singleStep(innerData, currentCtx, transactions)
    if (!result) return
    if (result.type === Ctx.RUN) return
    if (result.type === Ctx.FILTER && !result.data.isChanged) return
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
  step: Step.Step,
  currentCtx: SingleStepValidContext,
  transactions: Array<() => void>,
): SingleStepValidContext | void {
  invariant(step.type in stepVisitor, 'impossible case "%s"', step.type)
  return stepVisitor[step.type](step, currentCtx, transactions)
}
