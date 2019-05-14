//@flow
import invariant from 'invariant'
import {is} from '../validate'
import type {Event} from './index.h'

export const filter = <T>(
  e: Event<T>,
  filter: (data: T) => boolean,
): Event<T> => {
  invariant(is.event(e), 'first argument should be event')
  return e.filter(data => {
    if (filter(data)) return data
  })
}
