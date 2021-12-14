import {createDefer} from '../defer'
import {is} from '../is'
import {assert} from '../throw'
import {launch, forkPage} from '../kernel'
import type {Scope} from '../unit.h'

/** bind event to scope */
export function scopeBind(unit, {scope}: {scope?: Scope} = {}) {
  assert(
    scope || forkPage,
    'scopeBind cannot be called outside of forked .watch',
  )
  const savedForkPage = scope || forkPage!
  return is.effect(unit)
    ? params => {
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
    : params => {
        launch({target: unit, params, scope: savedForkPage})
        return params
      }
}
