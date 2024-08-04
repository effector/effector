import {add} from '../collection'
import {createDefer} from '../defer'
import {getGraph} from '../getter'
import {is} from '../validate'
import {launch, forkPage} from '../kernel'
import {generateErrorTitle} from '../naming'
import type {Scope, Event, Effect, DataCarrier, SettledDefer} from '../unit.h'

export function allSettled<T>(
  start: Event<T> | Effect<T, any, any> | Scope,
  //@ts-expect-error its optional in correct cases
  {scope, params: ctx}: {scope: Scope; params?: unknown} = {},
) {
  if (!is.unit(start))
    return Promise.reject(new Error('first argument should be unit'))
  if (
    !is.effect(start) &&
    !is.event(start) &&
    !is.store(start) &&
    !is.scope(start)
  )
    return Promise.reject(
      new Error(
        'first argument accepts only effects, events, stores or scopes',
      ),
    )
  /** duplicated check because of ts validation */
  if (is.scope(start)) {
    scope = start
  } else if (!is.targetable(start)) {
    const errorTitle = generateErrorTitle('allSettled', getGraph(start).meta)
    return Promise.reject(Error(`${errorTitle}: unit should be targetable`))
  }
  const defer = createDefer() as SettledDefer
  defer.parentFork = forkPage
  const {fxCount} = scope
  add(fxCount.scope.defers, defer)

  const launchUnits: DataCarrier[] = []
  const launchParams: Array<{params: unknown; req: unknown} | null> = []
  if (!is.scope(start)) {
    add(launchUnits, start)
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
  }
  add(launchUnits, fxCount)
  add(launchParams, null)
  launch({
    target: launchUnits,
    params: launchParams,
    scope,
  })
  return defer.req
}
