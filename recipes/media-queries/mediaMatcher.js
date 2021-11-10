//@flow

import {createEvent, createStore, type Store} from 'effector'

export function mediaMatcher(query: string): Store<boolean> {
  const queryChange = createEvent()
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addListener(queryChange)
  
  const $isQueryMatches = createStore(mediaQueryList.matches).on(
    queryChange,
    (_, event) => event.matches,
  )
  
  return $isQueryMatches
}
