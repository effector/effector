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
 eventCtx.needToRun = false
 const transactions: Set<() => void> = new Set()
 // ctx.emit.set(event.graphite.cmd, eventCtx)
 walkSeq(steps, eventCtx, transactions)
 for (const transact of transactions) {
  transact()
 }
}

function walkSeq(
 steps: Step.Seq,
 prev: Ctx.EmitContext | Ctx.ComputeContext,
 transactions: Set<() => void>,
) {
 if (steps.data.length === 0) return
 let currentCtx: Ctx.EmitContext | Ctx.ComputeContext = prev
 for (const step of steps.data) {
  const stepResult = walkStep(step, currentCtx, transactions)
  if (stepResult === undefined) return
  currentCtx = stepResult
 }
}

function walkStep(
 step: Step.Step,
 currentCtx: Ctx.EmitContext | Ctx.ComputeContext,
 transactions: Set<() => void>,
): Ctx.EmitContext | Ctx.ComputeContext | void {
 switch (step.type) {
  case ('single': Step.SingleType): {
   const innerData = step.data
   const result = singleStep(innerData, currentCtx, transactions)
   if (!result) return
   if (result.meta.isRun) return
   return (result: any)
  }
  case ('multi': Step.MultiType): {
   if (step.data.size === 0) return
   for (const e of step.data) {
    walkStep(e, currentCtx, transactions)
   }
   return
  }
  case ('seq': Step.SeqType): {
   return walkSeq(step, currentCtx, transactions)
  }
  default: {
   throw new Error('impossible case')
  }
 }
}

function singleStep(
 single: Cmd.Cmd,
 ctx: Ctx.EmitContext | Ctx.ComputeContext,
 transactions: Set<() => void>,
): Ctx.EmitContext | Ctx.ComputeContext | Ctx.RunContext | void {
 let arg
 if (ctx.meta.isEmit) {
  arg = ((ctx: any): Ctx.EmitContext).payload
 } else if (ctx.meta.isCompute) {
  arg = ((ctx: any): Ctx.ComputeContext).result
 } else {
  throw new Error(`RunContext is not supported`)
 }
 switch (single.type) {
  case ('emit': Cmd.EmitType): {
   if (ctx.meta.isEmit) {
    const rectx = ((ctx: any): Ctx.EmitContext)
    if (rectx.eventName === single.data.fullName && rectx.needToRun) {
     rectx.needToRun = false
     single.data.runner(arg)
    }
   }

   return Ctx.emitContext(arg, single.data.fullName)
  }
  case ('run': Cmd.RunType): {
   const transCtx = single.data.transactionContext
   if (transCtx) transactions.add(transCtx(arg))
   try {
    single.data.runner(arg)
   } catch (err) {
    console.error(err)
   }
   return Ctx.runContext([arg])
  }
  case ('compute': Cmd.ComputeType): {
   const newCtx = Ctx.computeContext([undefined, arg, ctx])
   try {
    const result = single.data.reduce(undefined, arg, ctx)
    newCtx.result = result
    newCtx.isNone = result === undefined || result === null
   } catch (err) {
    newCtx.isError = true
    newCtx.error = err
    newCtx.isChanged = false
   }
   if (!newCtx.isChanged) return
   return newCtx
  }
  default: {
   throw new Error('impossible case')
  }
 }
}
