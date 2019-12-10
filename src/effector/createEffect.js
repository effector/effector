//@flow

import type {Event, Effect} from './unit.h'
import {step, own, bind} from './stdlib'
import {createNode} from './createNode'
import {upsertLaunch, launch} from './kernel'
import {createNamedEvent, createStore, createEvent} from './createUnit'
import type {EffectConfigPart, Config} from './config'
import {Defer} from './defer'

declare export function createEffect<Payload, Done>(
  name?: string | EffectConfigPart<Payload, Done>,
  config?: Config<EffectConfigPart<Payload, Done>>,
): Effect<Payload, Done, *>
export function createEffect<Payload, Done>(
  nameOrConfig: any,
  maybeConfig: any,
): Effect<Payload, Done, *> {
  //$off
  const instance: Effect<Payload, Done, any> = createEvent(
    nameOrConfig,
    maybeConfig,
  )
  let handler =
    instance.defaultConfig.handler ||
    (value => {
      console.error(`no handler used in ${instance.getType()}`)
      return Promise.resolve()
    })

  instance.graphite.meta.onCopy = ['runner']
  instance.graphite.meta.unit = 'effect'
  const done: Event<{|
    params: Payload,
    result: Done,
  |}> = createNamedEvent('done')
  const fail: Event<{|
    params: Payload,
    error: *,
  |}> = createNamedEvent('fail')
  const anyway: Event<
    | {|
        +status: 'done',
        +params: Payload,
        +result: Done,
      |}
    | {|
        +status: 'fail',
        +params: Payload,
        +error: *,
      |},
  > = createNamedEvent('finally')

  instance.done = done
  instance.fail = fail
  instance.finally = anyway
  ;(instance: any).use = fn => {
    handler = fn
    return instance
  }
  const getCurrent = (): any => handler
  ;(instance: any).use.getCurrent = getCurrent
  ;(instance: any).kind = 'effect'
  const effectRunner = createNode({
    scope: {
      done,
      fail,
      anyway,
      getHandler: getCurrent,
    },
    node: [
      step.run({
        fn({params, req}, {getHandler, done, fail, anyway}) {
          runEffect(
            getHandler(),
            params,
            bind(onResolve, {
              event: done,
              anyway,
              params,
              fn: req.rs,
            }),
            bind(onReject, {
              event: fail,
              anyway,
              params,
              fn: req.rj,
            }),
          )
          return params
        },
      }),
    ],
    meta: {op: 'fx', fx: 'runner', onCopy: ['done', 'fail', 'anyway']},
  })
  instance.graphite.scope.runner = effectRunner
  instance.graphite.seq.push(
    step.compute({
      fn(params, scope, stack) {
        // empty stack means that this node was launched directly
        if (!stack.parent) return params
        return {
          params,
          req: {
            rs(data) {},
            rj(data) {},
          },
        }
      },
    }),
    step.run({
      fn(upd, {runner}) {
        upsertLaunch([runner], [upd])
        return upd.params
      },
    }),
  )
  ;(instance: any).create = (params: Payload) => {
    const req: any = new Defer()
    launch(instance, {params, req})
    return req.req
  }

  /* terser will minify true and false to 1 and 0,
    thereby we need to define true as Boolean(1)
    and false as Boolean(0) */
  const pending = createStore(Boolean(0), {named: 'pending'})
    .on(instance, () => Boolean(1))
    .reset(done, fail)
  instance.pending = pending

  own(instance, [done, fail, anyway, pending, effectRunner])
  return instance
}

const onResolve = ({event, anyway, params, fn}, result) => {
  upsertLaunch(
    [anyway, event, sidechain],
    [
      {
        status: 'done',
        params,
        result,
      },
      {
        params,
        result,
      },
      {
        fn,
        value: result,
      },
    ],
  )
}
const onReject = ({event, anyway, params, fn}, error) => {
  upsertLaunch(
    [anyway, event, sidechain],
    [
      {
        status: 'fail',
        params,
        error,
      },
      {
        params,
        error,
      },
      {
        fn,
        value: error,
      },
    ],
  )
}
const sidechain = createNode({
  node: [
    step.run({
      fn({fn, value}) {
        fn(value)
      },
    }),
  ],
  meta: {op: 'fx', fx: 'sidechain'},
})

function runEffect(handler, params, onResolve, onReject) {
  let failedSync = false
  let syncError
  let rawResult
  try {
    rawResult = handler(params)
  } catch (err) {
    failedSync = true
    syncError = err
  }
  if (failedSync) {
    onReject(syncError)
    return
  }
  if (Object(rawResult) === rawResult && typeof rawResult.then === 'function') {
    rawResult.then(onResolve, onReject)
    return
  }
  onResolve(rawResult)
}
