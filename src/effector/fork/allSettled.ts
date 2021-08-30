import {add} from '../collection'
import {createDefer} from '../defer'
import {is} from '../is'
import {launch, forkPage} from '../kernel'
import type {Scope} from '../unit.h'

export function allSettled(
  start: any,
  {scope, params: ctx}: {scope: Scope; params?: any},
) {
  if (!is.unit(start))
    return Promise.reject(Error('first argument should be unit'))
  const defer = createDefer()
  //@ts-expect-error
  defer.parentFork = forkPage
  const {fxCount} = scope
  add(fxCount.scope.defers, defer)

  const launchUnits = [start]
  const launchParams = [] as Array<{params: any; req: any} | null>
  add(
    launchParams,
    is.effect(start)
      ? {
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
        }
      : ctx,
  )
  add(launchUnits, fxCount)
  add(launchParams, null)
  launch({
    target: launchUnits,
    params: launchParams,
    scope,
  })
  return defer.req
}
