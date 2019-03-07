//@flow

import {createComponent} from 'effector-react'
import {screenQueries} from './screenQueries'
import {orientationCheck, screenSizeCheck} from './queryCheck'

export const Screen: React.AbstractComponent<
  React.Config<
    {
      children?: React.Node,
      small?: boolean,
      medium?: boolean,
      large?: boolean,
      portrait?: boolean,
      landscape?: boolean,
    },
    {
      children: null,
      small: boolean,
      medium: boolean,
      large: boolean,
      portrait: boolean,
      landscape: boolean,
    },
  >,
> = createComponent(screenQueries, (props, queries) => {
  const orientationAllowed = orientationCheck(props, queries)
  const screenSizeAllowed = screenSizeCheck(props, queries)
  if (orientationAllowed && screenSizeAllowed) {
    return props.children
  }
  return null
})

Screen.defaultProps = {
  children: null,
  small: false,
  medium: false,
  large: false,
  portrait: false,
  landscape: false,
}
