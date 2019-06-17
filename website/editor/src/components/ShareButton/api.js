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

export const clickInputUrl: Event<*> = createEvent('click input url')
export const clickShare: Event<*> = createEvent('click "share"')

const showingConfirmation = createEffect('show confirmation', {
  handler: () => new Promise(rs => setTimeout(rs, 2000)),
})

const confirmationStatus: Store<
  'init' | 'pending' | 'done' | 'fail',
> = createStore('init')
  .reset(showingConfirmation.done)
  .on(shareCode, () => 'pending')
  .on(shareCode.done, () => 'done')
  .on(shareCode.fail, () => 'fail')

export const message: Store<string> = confirmationStatus.map(status => {
  switch (status) {
    case 'init':
      return 'click to share'
    case 'done':
      return 'copied to clipboard'
    case 'fail':
      return 'share error :('
    case 'pending':
    default:
      return 'in progress...'
  }
})

{
  const validClickShare = sample(shareCode.pending, clickShare).filter({
    fn: pending => !pending,
  })
  const shareCodeMessage = sample(sourceCode, validClickShare)

  forward({
    from: shareCodeMessage,
    to: shareCode,
  })
}
forward({
  from: shareCode.done,
  to: showingConfirmation,
})

clickInputUrl.watch(e => {
  e.currentTarget.select()
  document.execCommand('copy')
})
shareCode.done.watch(() => {
  const input = inputRef.current
  if (input) input.select()
  document.execCommand('copy')
})
