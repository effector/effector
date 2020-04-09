//@flow

import {useStore} from 'effector-react'
import {screenQueries} from './screenQueries'
import {orientationCheck, screenSizeCheck} from './queryCheck'

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
