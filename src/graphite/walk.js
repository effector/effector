//@flow
import type {Event} from 'effector/event'
import type {TypeDef} from 'effector/stdlib'

import {newMeta} from './meta'
import {runStep} from './runStep'
declare var __step: TypeDef<*, 'step'>
declare var __single: any
declare function __val(key: string, value: any): any
export function walkEvent<T>(payload: T, event: Event<T>) {
  walkNode(event.graphite.seq, {
    __stepArg: payload,
  })
}

export function walkNode(
  seq: TypeDef<'seq', 'step'>,
  ctx: {__stepArg: any, ...},
) {
  const meta = newMeta(ctx)
  __val('scope').push(ctx)
  runStep(seq, meta)
  runTransactions(meta.transactions)
}

const runTransactions = transactions => {
  for (let i = 0; i < transactions.length; i++) {
    ;(0, transactions[i])()
  }
  transactions.length = 0
}
