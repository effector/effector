import {add} from '../collection'
import {createDefer} from '../defer'
import {is} from '../is'
import {launch, forkPage} from '../kernel'
import type {Scope} from '../unit.h'

export function allSettled(
  start,
  {scope, params: ctx}: {scope: Scope; params?},
) {
  if (!is.unit(start))
    return Promise.reject(Error('first argument should be unit'))
  const defer = createDefer()
  //@ts-expect-error
  defer.parentFork = forkPage
  const {fxCount} = scope
  add(fxCount.scope.defers, defer)

  const launchUnits = [start]
  const launchParams = [] as Array<{params; req} | null>
  add(
    launchParams,
    is.effect(start)
      ? {
          params: ctx,
          req: {
            rs(value) {
              //@ts-expect-error
              defer.value = {status: 'done', value}
            },
            rj(value) {
              //@ts-expect-error
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
