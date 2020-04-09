//@flow

import {combine} from 'effector'
import {mediaMatcher} from './mediaMatcher'

/* declaring queries and merge them into single store*/

export const screenQueries = combine({
  small: mediaMatcher('(max-width: 768px)'),
  medium: mediaMatcher('(min-width: 769px) and (max-width: 1024px)'),
  large: mediaMatcher('(min-width: 1025px)'),
  portrait: mediaMatcher('(orientation: portrait)'),
})
