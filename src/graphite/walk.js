//@flow
// import invariant from 'invariant'
import type {SingleStepValidContext} from '../effector/index.h'
import type {Event} from 'effector/event'
import {step as Step, ctx as Ctx} from 'effector/datatype/FullDatatype.bs'
import {singleStep} from './single-step'

type PendingEvent<T> = [T, Event<T>]

/**
 * ## Stages:
 * 1. Trigger event
 * 2. Optimize execution sequence
 * 3. Apply changes
 * 4. Free run.
 *
 *     Calling side-effects until some event will be triggered again
 *
 */
function walkAlt(
 pendingEvents: Array<PendingEvent<any>>,
 clonedStates: number[],
 sideEffects: Array<() => void>,
) {
 for (let i = 0; i < pendingEvents.length; i++) {
  const [payload, event] = pendingEvents[i]
  const steps = event.graphite.seq
  const step = steps
  stepAlt(step, clonedStates, sideEffects)
 }
}

function* stepAlt(
 step: Step.Step,
 clonedStates: number[],
 sideEffects: Array<() => void>,
) {
 if (step.type === Step.SINGLE) {
  const innerData = step.data
  yield step
 }
 switch (step.type) {
  case Step.SINGLE:
  case Step.MULTI:
  case Step.SEQ:
   return
 }
}

export function walkEvent<T>(payload: T, event: Event<T>) {
 // const ctx = Ctx.context()
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

function walkStep(
 step: Step.Step,
 currentCtx: SingleStepValidContext,
 transactions: Array<() => void>,
): SingleStepValidContext | void {
 switch (step.type) {
  case Step.SINGLE: {
   const innerData = step.data
   const result = singleStep(innerData, currentCtx, transactions)
   if (!result) return
   if (result.type === Ctx.RUN) return
   if (result.type === Ctx.FILTER && !result.data.isChanged) return
   return (result: any)
  }
  case Step.MULTI: {
   if (step.data.length === 0) return
   for (const e of step.data) {
    walkStep(e, currentCtx, transactions)
   }
   return
  }
  case Step.SEQ: {
   return walkSeq(step, currentCtx, transactions)
  }
  default: {
   /*::(step.type: empty)*/
   throw new Error('impossible case')
  }
 }
}
