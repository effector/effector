import {sample, forward, guard} from 'effector'

import {sourceCode} from '../editor/state'

import {
  flowToggleChange,
  tsToggleChange,
  typeHoverToggleChange,
  clickPrettify,
  prettier,
  enableAutoScroll,
  disableAutoScroll,
} from '.'
import {
  domain,
  flowToggle,
  tsToggle,
  typeHoverToggle,
  typechecker,
  autoScrollLog,
} from './state'

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

prettier.use(async({code, parser}) => {
  const req = await fetch('https://codebox.now.sh/prettier', {
    method: 'POST',
    body: JSON.stringify({code, config: {parser}}),
  })
  const result = await req.json()
  if (typeof result.code !== 'string') {
    console.error('prettier request error', result)
    throw Error('request failed')
  }
  return result.code
})

sample({
  source: {
    code: sourceCode,
    parser: typechecker.map(parser => parser ?? 'babel'),
  },
  clock: guard(clickPrettify, {
    filter: prettier.pending.map(pending => !pending),
  }),
  target: prettier,
})

forward({
  from: prettier.done.map(({result}) => result),
  to: sourceCode,
})

autoScrollLog.on(enableAutoScroll, _ => true).on(disableAutoScroll, _ => false)
