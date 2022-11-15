import {createDefer} from '../defer'
import {is} from '../is'
import {assert} from '../throw'
import {launch, forkPage} from '../kernel'
import type {Scope} from '../unit.h'
import type {Unit} from '../index.h'

/** bind event to scope */
export function scopeBind(
  unit: Unit,
  {scope, safe}: {scope?: Scope; safe?: true} = {},
) {
  assert(
    scope || forkPage || safe,
    'scopeBind cannot be called outside of forked .watch',
  )
  const forkRoot = scope || forkPage;

  assert(!forkRoot || forkRoot.live, 'scopeBind cannot be called on dead scope')

  const savedScopeRef = forkRoot?.scopeRef
  return is.effect(unit)
    ? (params: any) => {
        const req = createDefer()
        launch({
          target: unit,
          params: {
            params,
            req,
          },
          scope: savedScopeRef?.ref,
        })
        return req.req
      }
    : (params: any) => {
        launch({target: unit, params, scope: savedScopeRef?.ref})
        return params
      }
}
