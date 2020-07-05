import {step} from './typedef'
import {readRef} from './stateRef'

//prettier-ignore
export const filterChanged = step.filter({
  fn: (data, {state}) => (
    data !== undefined &&
    data !== readRef(state)
  ),
})

export const noop = step.compute({
  fn: n => n,
})
