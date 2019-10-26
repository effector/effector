//@flow

import type {Event, Effect} from '../unit.h'
import {Kind, step, addLinkToOwner, bind, createNode} from '../stdlib'
import {upsertLaunch} from '../kernel'
import {createEvent} from '../event'
import {createStore} from '../store'
import {normalizeConfig, type EffectConfigPart, type Config} from '../config'
import {joinName, type CompositeName} from '../naming'
import {Defer} from './defer'

export function createEffect<Payload, Done>(
  name?: string | EffectConfigPart<Payload, Done>,
  config?: Config<EffectConfigPart<Payload, Done>>,
): Effect<Payload, Done, *> {
  return effectFabric({name, config})
}

export function effectFabric<Payload, Done>(opts: {
  +name?: string,
  +parent?: CompositeName,
  +config: EffectConfigPart<Payload, Done>,
  ...
}): Effect<Payload, Done, *> {
  const config = normalizeConfig(opts)
  const {name, parent, handler: defaultHandler} = config

  //$off
  const instance: Effect<Payload, Done, any> = createEvent(name, {
    parent,
    config,
  })
  const eventCreate = instance.create
  //$off
  instance.graphite.meta.unit = 'effect'
  const done: Event<{|
    params: Payload,
    result: Done,
  |}> = createEvent(joinName(instance, ' done'), {
    parent,
    config,
  })
  const fail: Event<{|
    params: Payload,
    error: *,
  |}> = createEvent(joinName(instance, ' fail'), {
    parent,
    config,
  })
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
  > = createEvent(joinName(instance, ' finally'), {
    parent,
    config,
  })
  const doneSideChain = createNode({
    node: [notifyHandler],
    meta: {op: 'fx', fx: 'done'},
  })
  const failSideChain = createNode({
    node: [notifyHandler],
    meta: {op: 'fx', fx: 'fail'},
  })
  done.graphite.seq.push(
    step.compute({
      fn(upd, scope) {
        upsertLaunch([doneSideChain], [upd])
        return upd.result
      },
    }),
  )
  fail.graphite.seq.push(
    step.compute({
      fn(upd, scope) {
        upsertLaunch([failSideChain], [upd])
        return upd.result
      },
    }),
  )
  let handler: Function =
    defaultHandler ||
    (value => {
      console.error(`no handler used in ${instance.getType()}`)
      return Promise.resolve()
    })

  instance.done = done
  instance.fail = fail
  instance.finally = anyway
  ;(instance: any).use = fn => {
    handler = fn
    return instance
  }
  const getCurrent = (): any => handler
  ;(instance: any).use.getCurrent = getCurrent
  ;(instance: any).kind = Kind.effect
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
            bind(onResolve, {event: done, anyway, params, handler: req.rs}),
            bind(onReject, {event: fail, anyway, params, handler: req.rj}),
          )
          return params
        },
      }),
    ],
    meta: {op: 'fx', fx: 'runner'},
  })
  instance.graphite.scope.runner = effectRunner
  instance.graphite.seq.push(
    step.compute({
      fn(params) {
        if (typeof params === 'object' && params !== null) {
          if ('ɔ' in params) return params.ɔ
        }
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
  ;(instance: any).create = (params: Payload, fullName, args) => {
    const req: any = new Defer()
    eventCreate({ɔ: {params, req}}, instance.getType(), args)
    return req.req
  }

  /* terser will minify true and false to 1 and 0,
    thereby we need to define true as Boolean(1)
    and false as Boolean(0) */
  const pending = createStore(Boolean(0))
    .on(instance, () => Boolean(1))
    .reset(done, fail)
  instance.pending = pending

  addLinkToOwner(instance, [
    done,
    doneSideChain,
    fail,
    failSideChain,
    anyway,
    pending,
    effectRunner,
  ])
  return instance
}

const onResolve = ({event, anyway, params, handler}, result) => {
  upsertLaunch(
    [anyway, event],
    [
      {
        status: 'done',
        params,
        result,
      },
      {
        handler,
        toHandler: result,
        result: {
          params,
          result,
        },
      },
    ],
  )
}
const onReject = ({event, anyway, params, handler}, error) => {
  upsertLaunch(
    [anyway, event],
    [
      {
        status: 'fail',
        params,
        error,
      },
      {
        handler,
        toHandler: error,
        result: {
          params,
          error,
        },
      },
    ],
  )
}

const notifyHandler = step.run({
  fn({handler, toHandler, result}, scope) {
    handler(toHandler)
    return result
  },
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
  if (typeof rawResult === 'object' && rawResult !== null) {
    if (typeof rawResult.then === 'function') {
      rawResult.then(onResolve, onReject)
      return
    }
  }
  onResolve(rawResult)
}
