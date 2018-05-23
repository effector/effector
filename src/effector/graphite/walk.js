//@flow
// import invariant from 'invariant'
import type {SingleStepValidContext} from '../index.h'
import type {Event} from 'effector/event'
import * as Ctx from '../datatype/context'
import * as Step from '../datatype/step'
import {singleStep} from './single-step'

export function walkEvent<T>(payload: T, event: Event<T>) {
 // const ctx = Ctx.context()
 const steps: Step.Seq = event.graphite.seq
 const eventCtx = new Ctx.EmitContext({
  payload,
  eventName: event.getType(),
  needToRun: false,
 })
 const transactions: Set<() => void> = new Set()
 // ctx.emit.set(event.graphite.cmd, eventCtx)
 walkSeq(steps, eventCtx, transactions)
 for (const transact of transactions) {
  transact()
 }
}

function walkSeq(
 steps: Step.Seq,
 prev: SingleStepValidContext,
 transactions: Set<() => void>,
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
 transactions: Set<() => void>,
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
   if (step.data.size === 0) return
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
