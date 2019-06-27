// @flow

import {
  flowToggle,
  flowToggleChange,
  tsToggle,
  tsToggleChange,
} from './domain'

flowToggle
  .on(flowToggleChange, (_, e) => e.currentTarget.checked)
  .on(tsToggleChange, (state, e) => {
    if (e.currentTarget.checked) return false
    return state
  })

tsToggle
  .on(tsToggleChange, (_, e) => e.currentTarget.checked)
  .on(flowToggleChange, (state, e) => {
    if (e.currentTarget.checked) return false
    return state
  })
