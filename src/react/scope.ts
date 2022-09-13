import React from 'react'
import {Scope} from 'effector'
import {throwError} from './throw'

const ScopeContext = React.createContext(null as Scope | null)
export const {Provider} = ScopeContext
export function getScope(forceScope?: boolean) {
  const scope = React.useContext(ScopeContext)
  if (forceScope && !scope)
    throwError('No scope found, consider adding <Provider> to app root')
  return scope as Scope
}
