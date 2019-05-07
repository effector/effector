//@flow

import {
  createStore,
  createEffect,
  createEvent,
  forward,
  type Event,
  type Store,
} from 'effector'

import {copyShareableUrl} from '../../domain'

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
  from: clickShare,
  to: showingConfirmation,
})

clickShare.watch(copyShareableUrl)
