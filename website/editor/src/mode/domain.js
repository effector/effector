// @flow

import type {Store} from 'effector'
import {typechecker} from '../settings/domain'

export const mode: Store<
  'text/typescript-jsx' | 'text/flow-jsx',
> = typechecker.map(typechecker => {
  if (typechecker === 'typescript') return 'text/typescript-jsx'
  return 'text/flow-jsx'
})
