//@flow

import * as React from 'react'
import {createStore, createEvent} from 'effector'
import {useStore} from 'effector-react'

export function mediaQuery(
  query: string,
): React.ComponentType<{children: React.Node, ...}> {
  const queryChange = createEvent('query change')
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addListener(queryChange)
  const isQueryMatches = createStore(mediaQueryList.matches).on(
    queryChange,
    (state, e) => e.matches,
  )
  function MediaQuery({children}) {
    return useStore(isQueryMatches) ? children : null
  }
  MediaQuery.displayName = `MediaQuery(${query})`
  return MediaQuery
}
