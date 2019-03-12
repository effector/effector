//@flow
import type {Event} from 'effector/event'
import type {TypeDef} from 'effector/stdlib'

import {newMeta, val} from './meta'
import {runStep, runStepAlt} from './runStep'

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
  val('scope', meta).push(ctx)
  runStepAlt(seq, meta)
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
