//@flow
// import invariant from 'invariant'
import type {Event} from './index.h'
import * as Ctx from './datatype/context'
import * as Step from './datatype/step'
import * as Cmd from './datatype/cmd'

export function walkEvent<T>(payload: T, event: Event<T>) {
 // const ctx = Ctx.context()
 const steps: Step.Seq = event.graphite.seq
 const eventCtx = Ctx.emitContext(payload, event.getType())
 eventCtx.data.needToRun = false
 const transactions: Set<() => void> = new Set()
 // ctx.emit.set(event.graphite.cmd, eventCtx)
 walkSeq(steps, eventCtx, transactions)
 for (const transact of transactions) {
  transact()
 }
}

function walkSeq(
 steps: Step.Seq,
 prev: Ctx.EmitContext | Ctx.ComputeContext | Ctx.FilterContext,
 transactions: Set<() => void>,
) {
 if (steps.data.length === 0) return
 let currentCtx: Ctx.EmitContext | Ctx.ComputeContext | Ctx.FilterContext = prev
 for (const step of steps.data) {
  const stepResult = walkStep(step, currentCtx, transactions)
  if (stepResult === undefined) return
  if (stepResult.type === Ctx.FILTER && !stepResult.data.isChanged) return
  currentCtx = stepResult
 }
}

function walkStep(
 step: Step.Step,
 currentCtx: Ctx.EmitContext | Ctx.ComputeContext | Ctx.FilterContext,
 transactions: Set<() => void>,
): Ctx.EmitContext | Ctx.ComputeContext | Ctx.FilterContext | void {
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
function stepArg(
 ctx: Ctx.EmitContext | Ctx.ComputeContext | Ctx.FilterContext,
) {
 switch (ctx.type) {
  case Ctx.EMIT:
   return ctx.data.payload
  case Ctx.COMPUTE:
   return ctx.data.result
  case Ctx.FILTER:
   return ctx.data.value
  default:
   throw new Error('RunContext is not supported')
 }
}
function singleStep(
 single: Cmd.Cmd,
 ctx: Ctx.EmitContext | Ctx.ComputeContext | Ctx.FilterContext,
 transactions: Set<() => void>,
):
 | Ctx.EmitContext
 | Ctx.ComputeContext
 | Ctx.RunContext
 | Ctx.FilterContext
 | void {
 const arg = stepArg(ctx)
 if (ctx.type === Ctx.FILTER && !ctx.data.isChanged) return
 switch (single.type) {
  case Cmd.EMIT: {
   if (ctx.type === Ctx.EMIT) {
    const rectx = ctx //((ctx: any): Ctx.EmitContext)
    if (rectx.data.eventName === single.data.fullName && rectx.data.needToRun) {
     rectx.data.needToRun = false
     single.data.runner(arg)
    }
   }

   return Ctx.emitContext(arg, single.data.fullName)
  }
  case Cmd.FILTER: {
   try {
    const isChanged = single.data.filter(arg, ctx)
    return Ctx.filterContext(arg, isChanged)
   } catch (err) {
    console.error(err)
    return
   }
  }
  case Cmd.RUN: {
   const transCtx = single.data.transactionContext
   if (transCtx) transactions.add(transCtx(arg))
   try {
    single.data.runner(arg)
   } catch (err) {
    console.error(err)
   }
   return Ctx.runContext([arg])
  }
  case Cmd.COMPUTE: {
   const newCtx = Ctx.computeContext([undefined, arg, ctx])
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
  default:
   /*::(single.type: empty)*/
   throw new Error('impossible case')
 }
}
