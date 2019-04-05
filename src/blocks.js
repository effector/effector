//@flow

import {step} from 'effector/stdlib'

//prettier-ignore
export const filterChanged = step.filter({
  fn: (data, {state}) => (
    data !== state.current
    && data !== undefined
  ),
})

export const noop = step.compute({
  fn: n => n,
})
