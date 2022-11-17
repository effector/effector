import {add} from '../collection'
import {createDefer} from '../defer'
import {assert} from '../throw'
import {is} from '../is'
import {launch, forkPage} from '../kernel'
import type {Scope, Event, Effect, DataCarrier, SettledDefer} from '../unit.h'

export function allSettled<T>(
  start: Event<T> | Effect<T, any, any>,
  {scope, params: ctx}: {scope: Scope; params?: unknown},
) {
  if (!is.unit(start))
    return Promise.reject(new Error('first argument should be unit'))
  if (!is.effect(start) && !is.event(start) && !is.store(start))
    return Promise.reject(
      new Error('first argument accepts only effects, events and stores'),
    )
  assert(scope, 'scope is required')
  assert(scope.alive, 'allSettled cannot be called on dead scope')

  const defer = createDefer() as SettledDefer
  defer.parentFork = forkPage
  const {fxCount} = scope
  add(fxCount.scope.defers, defer)

  const launchUnits: DataCarrier[] = [start]
  const launchParams = [] as Array<{params: unknown; req: unknown} | null>
  add(
    launchParams,
    is.effect(start)
      ? {
          params: ctx,
          req: {
            rs(value: unknown) {
              defer.value = {status: 'done', value}
            },
            rj(value: unknown) {
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
