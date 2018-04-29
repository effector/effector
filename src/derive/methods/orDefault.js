//@flow

import invariant from 'invariant'
import {deriveFrom} from './deriveFrom'

export function orDefault<T>(instance: *, def: T) {
 invariant(
  def !== undefined && def !== null,
  'orDefault requires non-null value',
 )
 return deriveFrom(
  instance,
  value => (value !== undefined && value !== null ? value : def),
 )
}
