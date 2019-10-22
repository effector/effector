// @flow

import {sample, forward} from 'effector'
import {prettier as prettierRequest} from '@zerobias/codebox'

import {sourceCode} from '../editor/state'

import {
  flowToggleChange,
  tsToggleChange,
  typeHoverToggleChange,
  clickPrettify,
  prettier,
} from '.'
import {domain, flowToggle, tsToggle, typeHoverToggle} from './state'

domain.onCreateStore(store => {
  const snapshot = localStorage.getItem(store.compositeName.fullName)
  if (snapshot != null) {
    const data = JSON.parse(snapshot)
    store.setState(data)
  }

  store.updates.watch(newState => {
    localStorage.setItem(store.compositeName.fullName, JSON.stringify(newState))
  })
  return store
})

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
  if (typeof result.code !== 'string') {
    console.error('prettier request error', result)
    throw Error('request failed')
  }
  return result.code
})

sample({
  source: sourceCode,
  clock: sample(prettier.pending, clickPrettify).filter({
    fn: pending => !pending,
  }),
  target: prettier,
})

forward({
  from: prettier.done.map(({result}) => result),
  to: sourceCode,
})
