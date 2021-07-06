import type {StateRef, StateRefOp} from './index.h'
import {nextStepID} from './id'

export const createStateRef = (current?: any): StateRef => ({
  id: nextStepID(),
  current,
})
export const readRef = ({current}: StateRef | {current: any}) => current

export const addRefOp = (ref: StateRef, op: StateRefOp) => {
  if (!ref.before) ref.before = []
  ref.before!.push(op as any)
}
