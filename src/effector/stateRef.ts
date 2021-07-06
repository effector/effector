import type {StateRef, StateRefOpAfter, StateRefOpBefore} from './index.h'
import {nextStepID} from './id'

export const createStateRef = (current?: any): StateRef => ({
  id: nextStepID(),
  current,
})
export const readRef = ({current}: StateRef | {current: any}) => current

export const addRefOp: {
  (ref: StateRef, isBefore: true, op: StateRefOpBefore): void
  (ref: StateRef, isBefore: false, op: StateRefOpAfter): void
} = (ref, isBefore, op) => {
  const field = isBefore ? 'before' : 'after'
  if (!ref[field]) ref[field] = []
  ref[field]!.push(op as any)
}
