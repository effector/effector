import {createDefer} from '../defer'
import {is} from '../is'
import {launch, forkPage} from '../kernel'
import {Scope} from '../unit.h'

export function allSettled(
  start: any,
  {scope, params: ctx}: {scope: Scope; params?: any},
) {
  if (!is.unit(start))
    return Promise.reject(Error('first argument should be unit'))
  const defer = createDefer()
  //@ts-ignore
  defer.parentFork = forkPage
  const {fxCount} = scope
  fxCount.scope.defers.push(defer)

  const launchUnits = [start]
  const launchParams = []
  if (is.effect(start)) {
    launchParams.push({
      params: ctx,
      req: {
        rs(value: any) {
          //@ts-ignore
          defer.value = {status: 'done', value}
        },
        rj(value: any) {
          //@ts-ignore
          defer.value = {status: 'fail', value}
        },
      },
    })
  } else {
    launchParams.push(ctx)
  }
  launchUnits.push(fxCount)
  launchParams.push(null)
  launch({
    target: launchUnits,
    params: launchParams,
    scope,
  })
  return defer.req
}
