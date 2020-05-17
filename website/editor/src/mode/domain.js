import {Store} from 'effector'
import {typechecker} from '../settings/state'

export const mode: Store<
  'text/typescript-jsx' | 'text/flow-jsx',
> = typechecker.map(typechecker => {
  if (typechecker === 'typescript') return 'text/typescript-jsx'
  return 'text/flow-jsx'
})
