// @flow

import {sample, forward} from 'effector'
import {prettier as prettierRequest} from '@zerobias/codebox'

import {sourceCode} from '../domain'

import {
  flowToggle,
  flowToggleChange,
  tsToggle,
  tsToggleChange,
  typeHoverToggle,
  typeHoverToggleChange,
  clickPrettify,
  prettier,
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

prettier.use(async code => {
  const result = await prettierRequest(code)
  if (!result.success) {
    console.error('prettier request error', result)
    throw Error('request failed')
  }
  return result.code
})

forward({
  from: sample({
    source: sourceCode,
    clock: sample(prettier.pending, clickPrettify).filter({
      fn: pending => !pending,
    }),
  }),
  to: prettier,
})

forward({
  from: prettier.done.map(({result}) => result),
  to: sourceCode,
})
