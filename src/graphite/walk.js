//@flow

import type {Event} from 'effector/event'
import {type TypeDef, Ctx} from 'effector/stdlib'

import {newMeta} from './meta'
import {runStep} from './runStep'

declare var __step: TypeDef<*, 'step'>
declare var __single: any
declare function __val(key: string, value: any): any
export function walkEvent<T>(payload: T, event: Event<T>) {
  walkNode(
    event.graphite.seq,
    Ctx.emit({
      __stepArg: payload,
    }),
  )
}

export function walkNode(seq: TypeDef<'seq', 'step'>, ctx: TypeDef<*, 'ctx'>) {
  const meta = newMeta(ctx)
  // __val('active', 'run')
  runStep(seq, meta.ctx, meta)
  runTransactions(meta.transactions)
}
const runTransactions = transactions => {
  for (let i = 0; i < transactions.length; i++) {
    ;(0, transactions[i])()
  }
  transactions.length = 0
}
