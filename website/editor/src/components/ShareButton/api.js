//@flow
import {createRef} from 'react'
import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
  type Event,
  type Store,
} from 'effector'

import {sourceCode} from '../../domain'
import {shareCode} from '../../graphql'

export const inputRef: any = createRef()

const sharedSlug: Store<string | null> = createStore(null)
  .on(shareCode.done, (state, {result: {slug}}) => slug)
  .reset(shareCode.fail)

export const sharedUrl: Store<string | null> = sharedSlug.map(url => {
  if (url === null) return null
  return `https://share.effector.dev/${url}`
})

export const clickShare: Event<*> = createEvent('click "share"')

const showingConfirmation = createEffect('show confirmation', {
  handler: () => new Promise(rs => setTimeout(rs, 2000)),
})

const showConfirmation = createStore(false)
  .on(showingConfirmation, () => true)
  .on(showingConfirmation.done, () => false)

export const message: Store<string> = showConfirmation.map(show =>
  show ? 'Copied' : 'Click to copy to clipboard',
)
forward({
  from: sample(sourceCode, clickShare),
  to: shareCode,
})

forward({
  from: shareCode.done,
  to: showingConfirmation,
})

shareCode.done.watch(() => {
  const input = inputRef.current
  if (input) input.select()
  document.execCommand('copy')
})
