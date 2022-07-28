import {createDefer} from '../defer'
import {is} from '../is'
import {assert} from '../throw'
import {launch, forkPage} from '../kernel'
import type {Scope} from '../unit.h'
import type {Unit} from '../index.h'

/** bind event to scope */
export function scopeBind(unit: Unit, {scope}: {scope?: Scope} = {}) {
  assert(
    scope || forkPage,
    'scopeBind cannot be called outside of forked .watch',
  )
  const savedForkPage = scope || forkPage!
  return is.effect(unit)
    ? (params: any) => {
        const req = createDefer()
        launch({
          target: unit,
          params: {
            params,
            req,
          },
          scope: savedForkPage,
        })
        return req.req
      }
    : (params: any) => {
        launch({target: unit, params, scope: savedForkPage})
        return params
      }
}
