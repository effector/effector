//@flow

import * as React from 'react'
import {
  createStore,
  createEvent,
  createStoreObject,
  createEffect,
  forward,
  sample,
  type Effect,
  type Store,
  type Event,
} from 'effector'
import {shareCode} from '../graphql'
import {isShareAPISupported} from '../device'

const slug = createStore('').on(
  shareCode.done,
  (state, {result}) => result.slug,
)
export const sharedUrl: Store<string> = createStore('').on(
  slug,
  (state, slug) => `https://share.effector.dev/${slug}`,
)
shareCode.fail.watch(e => console.log('fail', e))

export const canShare: Store<boolean> = slug.map(url => url !== '')

export const clickShare: Event<any> = createEvent()

type Sharing = Effect<{slug: string, sharedUrl: string}, void>
const sharing: Sharing = createEffect('sharing url', {
  async handler({slug, sharedUrl}) {
    if (isShareAPISupported) {
      await (navigator: any).share({
        title: `Notebook ${slug}`,
        url: sharedUrl,
      })
      return
    }
    const ref = urlRef.current
    if (!ref) return
    ref.select()
    document.execCommand('copy')
  },
})
const unexpectedSharingError = sharing.fail.filter({
  fn: ({error}) => error.name !== 'AbortError',
})
unexpectedSharingError.watch(({error}) => {
  console.error(error)
})
forward({
  from: sample(createStoreObject({slug, sharedUrl}), clickShare),
  to: sharing,
})

export const urlRef: any = React.createRef()
export const copyMessage = isShareAPISupported ? 'share' : 'copy to clipboard'
