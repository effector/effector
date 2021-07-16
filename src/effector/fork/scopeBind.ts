import {createDefer} from '../defer'
import {is} from '../is'
import {throwError} from '../throw'
import {launch, forkPage} from '../kernel'
import {Scope} from '../unit.h'

/** bind event to scope */
export function scopeBind(unit: any, {scope}: {scope?: Scope} = {}) {
  if (!scope && !forkPage) {
    throwError('scopeBind cannot be called outside of forked .watch')
  }
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
          forkPage: savedForkPage,
        })
      }
    : (params: any) => {
        launch({target: unit, params, forkPage: savedForkPage})
        return params
      }
}
