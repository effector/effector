import {createContext, useContext} from 'solid-js'
import {Scope} from 'effector'

import {throwError} from './throw'

export const ScopeContext = createContext<Scope | null>(null)

export function getScope(forceScope?: boolean) {
  const scope = useContext(ScopeContext)
  if (forceScope && !scope)
    throwError('No scope found, consider adding <Provider> to app root')

  return scope as Scope
}
