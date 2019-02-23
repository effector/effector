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
  runPendings(meta.pendingEvents)
}
const runPendings = pendings => {
  if (pendings.length === 0) return
  const ordered = []
  const orderedIDs = []
  for (let i = pendings.length - 1; i >= 0; i--) {
    const item = pendings[i]
    if (orderedIDs.indexOf(item.event.id) !== -1) continue
    orderedIDs.push(item.event.id)
    ordered.push(item)
  }
  if (ordered.length === 0) return
  for (let i = ordered.length - 1; i >= 0; i--) {
    const item = ordered[i]
    item.event(item.data)
  }
}
