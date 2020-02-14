//@flow

import * as React from 'react'
import {
  createStore,
  createEvent,
  createEffect,
  forward,
  sample,
  guard,
  type Effect,
  type Store,
  type Event,
} from 'effector'
import {sourceCode} from '../editor/state'
import {shareCode} from '../graphql'
import {isShareAPISupported} from '../device'

const pressCtrlS = createEvent()

sample({
  source: sourceCode,
  clock: guard(pressCtrlS, {
    filter: shareCode.pending.map(pending => !pending),
  }),
  target: shareCode,
})

document.addEventListener(
  'keydown',
  e => {
    if ((e.metaKey || e.ctrlKey) && e.keyCode === 83) {
      e.preventDefault()
      pressCtrlS()
    }
  },
  false,
)

shareCode.done.watch(({result: {slug}}) => {
  if (/https\:\/\/(share\.)?effector\.dev/.test(location.origin)) {
    history.pushState({slug}, slug, `https://share.effector.dev/${slug}`)
  }
})

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

type Sharing = Effect<{|slug: string, sharedUrl: string|}, void>
const sharing: Sharing = createEffect('sharing url', {
  async handler({slug, sharedUrl}) {
    if (isShareAPISupported) {
      await (navigator: any).share({
        title: `Share url ${slug}`,
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
sample({
  source: {slug, sharedUrl},
  clock: clickShare,
  target: sharing,
})

export const urlRef: any = React.createRef()
