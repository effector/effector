// @flow

import {
  flowToggle,
  flowToggleChange,
  tsToggle,
  tsToggleChange,
  typeHoverToggle,
  typeHoverToggleChange,
} from './domain'

const handler = (_, e) => e.currentTarget.checked

flowToggle.on(flowToggleChange, handler).on(tsToggleChange, (state, e) => {
  if (e.currentTarget.checked) return false
  return state
})

tsToggle.on(tsToggleChange, handler).on(flowToggleChange, (state, e) => {
  if (e.currentTarget.checked) return false
  return state
})

typeHoverToggle.on(typeHoverToggleChange, handler)
