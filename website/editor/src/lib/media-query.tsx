import React from 'react'
import {createStore, createEvent, Store} from 'effector'
import {useStore} from 'effector-react'

export function createMediaQuery(query: string): React.ComponentType {
  const $isQueryMatches = createMediaMatcher(query)

  const MediaQuery: React.FC = ({children}) => {
    const matches = useStore($isQueryMatches)

    if (matches) {
      return <>{children}</>
    }

    return null
  }

  MediaQuery.displayName = `MediaQuery(${query})`

  return MediaQuery
}

export function createMediaMatcher(query: string): Store<boolean> {
  const mediaQuery = window.matchMedia(query)
  const queryChanged = createEvent<MediaQueryListEvent>()
  const $isQueryMatches = createStore(mediaQuery.matches)

  mediaQuery.addListener(queryChanged)

  $isQueryMatches.on(queryChanged, (_, event) => event.matches)

  return $isQueryMatches
}
