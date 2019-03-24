//@flow

import {createEvent, createStore, type Store} from 'effector'

export function mediaMatcher(query: string): Store<boolean> {
  const queryChange = createEvent('query change')
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addListener(queryChange)
  const isQueryMatches = createStore(mediaQueryList.matches).on(
    queryChange,
    (state, e) => e.matches,
  )
  return isQueryMatches
}
