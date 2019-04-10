//@flow

import {step, readRef} from 'effector/stdlib'

//prettier-ignore
export const filterChanged = step.filter({
  fn: (data, {state}) => (
    data !== readRef(state)
    && data !== undefined
  ),
})

export const noop = step.compute({
  fn: n => n,
})
