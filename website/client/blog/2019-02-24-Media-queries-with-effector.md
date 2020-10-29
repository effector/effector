---
slug: мedia-queries
title: Media queries with effector
author: Zero Bias
author_title: Effector Core Team
authorURL: https://github.com/zerobias
author_image_url: https://avatars1.githubusercontent.com/u/15912112?v=4
tags: [effector, media-queries]

---

Hi!

In this article I will show how to make react component which will work like this

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```jsx
const Button = () => (
  <>
    <Screen landscape large>
      [large wide button]
    </Screen>
    <Screen portrait small medium>
      [compact button]
    </Screen>
  </>
)
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--truncate-->

Media queries itself could been handled in such way:

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
const mediaQueryList = window.matchMedia('(orientation: portrait)')
mediaQueryList.addListener(e => {
  if (e.matches) {
    // The viewport is currently in portrait orientation
  } else {
    // The viewport is currently in landscape orientation
  }
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

But how this could been used in react components? (actually, we’ll make more universal thing, which can be used in various ways)

Effector can reacts on media queries changes and provide current query state as store

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
import {createEvent, createStore} from 'effector'

const orientationChange = createEvent('orientation changed')
const isPortrait = createStore(false).on(
  orientationChange,
  (state, e) => e.matches,
)

const orientationMediaQuery = window.matchMedia('(orientation: portrait)')
orientationMediaQuery.addListener(orientationChange)
```

<!--END_DOCUSAURUS_CODE_TABS-->

`orientationChange` is just a function

We can rewrite it for reuse with any query

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
import {createEvent, createStore} from 'effector'

export function mediaMatcher(query) {
  const queryChange = createEvent('query change')
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addListener(queryChange)
  const isQueryMatches = createStore(mediaQueryList.matches).on(
    queryChange,
    (state, e) => e.matches,
  )
  return isQueryMatches
}

/* declaring queries */

const small = mediaMatcher('(max-width: 768px)')
const medium = mediaMatcher('(min-width: 769px) and (max-width: 1024px)')
const large = mediaMatcher('(min-width: 1025px)')
const portrait = mediaMatcher('(orientation: portrait)')

/* using queries */

small.watch(isSmall => {
  console.log('is small screen?', isSmall)
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

For my device currently it prints `is small screen? false`

Lets make it single store, thereby creating common base to connect it to view framework further

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
//mediaMatcher.js
import {createEvent, createStore} from 'effector'

export function mediaMatcher(query) {
  const queryChange = createEvent()
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addListener(queryChange)
  const isQueryMatches = createStore(mediaQueryList.matches).on(
    queryChange,
    (state, e) => e.matches,
  )
  return isQueryMatches
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
import {combine} from 'effector'
import {mediaMatcher} from './mediaMatcher'

/* declaring queries and merge them into single store*/

export const screenQueries = combine({
  small: mediaMatcher('(max-width: 768px)'),
  medium: mediaMatcher('(min-width: 769px) and (max-width: 1024px)'),
  large: mediaMatcher('(min-width: 1025px)'),
  portrait: mediaMatcher('(orientation: portrait)'),
})

/* using queries */

screenQueries.watch(queries => {
  const {small, medium, large, portrait} = queries
  console.log(`
    is small ${small}
    is medium ${medium}
    is large ${large}
    is portrait ${portrait}
    is landscape ${!portrait}
  `)
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

Now we could connect it to view framework, react, using `effector-react` library

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
//mediaMatcher.js
import {createEvent, createStore} from 'effector'

export function mediaMatcher(query) {
  const queryChange = createEvent()
  const mediaQueryList = window.matchMedia(query)
  mediaQueryList.addListener(queryChange)
  const isQueryMatches = createStore(mediaQueryList.matches).on(
    queryChange,
    (state, e) => e.matches,
  )
  return isQueryMatches
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
//screenQueries.js
import {combine} from 'effector'
import {mediaMatcher} from './mediaMatcher'

/* declaring queries and merge them into single store*/

export const screenQueries = combine({
  small: mediaMatcher('(max-width: 768px)'),
  medium: mediaMatcher('(min-width: 769px) and (max-width: 1024px)'),
  large: mediaMatcher('(min-width: 1025px)'),
  portrait: mediaMatcher('(orientation: portrait)'),
})
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```js
import {useStore} from 'effector-react'
import {screenQueries} from './screenQueries'

function orientationCheck(props, queries) {
  //if there no constraint on orientation
  if (!props.portrait && !props.landscape) return true
  return (
    (props.portrait && queries.portrait) ||
    (props.landscape && !queries.portrait)
  )
}

function screenSizeCheck(props, queries) {
  //if there no constraint on screen size
  if (!props.small && !props.medium && !props.large) return true
  return (
    (props.small && queries.small) ||
    (props.medium && queries.medium) ||
    (props.large && queries.large)
  )
}

export const Screen = props => {
  const queries = useStore(screenQueries)
  const orientationAllowed = orientationCheck(props, queries)
  const screenSizeAllowed = screenSizeCheck(props, queries)
  if (orientationAllowed && screenSizeAllowed) {
    return props.children
  }
  return null
}

Screen.defaultProps = {
  children: null,
  small: false,
  medium: false,
  large: false,
  portrait: false,
  landscape: false,
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

Done!

It support nesting out from a box

<!--DOCUSAURUS_CODE_TABS-->

<!--JavaScript-->

```jsx
export const AppLogo = ({brandName, fullLogo, squareLogo}) => (
  <>
    <Screen landscape>
      <img src={fullLogo} />
      <Screen large>{brandName}</Screen>
    </Screen>
    <Screen portrait>
      <img src={squareLogo} />
    </Screen>
  </>
)
```

<!--END_DOCUSAURUS_CODE_TABS-->
