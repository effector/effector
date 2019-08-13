//@flow

import * as React from 'react'
import {createComponent} from 'effector-react'
import {screenQueries} from './screenQueries'
import {orientationCheck, screenSizeCheck} from './queryCheck'

export const Screen = createComponent<
  {
    children: React.Node,
    small?: boolean,
    medium?: boolean,
    large?: boolean,
    portrait?: boolean,
    landscape?: boolean,
    ...
  },
  {|
    large: boolean,
    medium: boolean,
    portrait: boolean,
    small: boolean,
  |},
>(screenQueries, (props, queries) => {
  const orientationAllowed = orientationCheck(props, queries)
  const screenSizeAllowed = screenSizeCheck(props, queries)
  if (orientationAllowed && screenSizeAllowed) {
    return props.children
  }
  return null
})

//$todo
Screen.defaultProps = {
  children: null,
  small: false,
  medium: false,
  large: false,
  portrait: false,
  landscape: false,
}
