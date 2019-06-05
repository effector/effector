//@flow

import warning from 'warning'
import type {Effect} from './index.h'
import {Kind, step} from '../stdlib'
import {upsertLaunch} from '../kernel'
import {eventFabric, type Event} from '../event'
import {createStore} from '../store'
import type {EffectConfigPart} from '../config'
import type {CompositeName} from '../compositeName'

function OnResolve(result) {
  const {event, params, handler} = this
  //prettier-ignore
  upsertLaunch(event, {
    handler,
    toHandler: result,
    result: {
      params,
      result,
    },
  })
}
function OnReject(error) {
  const {event, params, handler} = this
  //prettier-ignore
  upsertLaunch(event, {
    handler,
    toHandler: error,
    result: {
      params,
      error,
    },
  })
}

function Def() {
  /*::
  this.rs = result => {}
  this.rj = error => {}
  */
  const req = new Promise((rs, rj) => {
    this.rs = rs
    this.rj = rj
  })
  //$off
  req.anyway = () => {
    warning(false, '.anyway is deprecated, use .finally')
    return req.then(() => {}, () => {})
  }
  this.req = req
}

const notifyHandler = step.run({
  fn({handler, toHandler, result}, scope) {
    handler(toHandler)
    return result
  },
})
export function effectFabric<Payload, Done>({
  name,
  domainName,
  parent,
  config,
}: {
  name?: string,
  domainName: string,
  parent?: CompositeName,
  config: EffectConfigPart<Payload, Done>,
  ...
}): Effect<Payload, Done, *> {
  const {handler} = config

  //$off
  const instance: Effect<Payload, Done, any> = eventFabric({
    name,
    parent,
    config,
  })

  const eventCreate = instance.create
  const done: Event<{|
    params: Payload,
    result: Done
  |}> = eventFabric({
    name: '' + instance.shortName + ' done',
    parent,
    config,
  })
  const fail: Event<{|
    params: Payload,
    error: *
  |}> = eventFabric({
    name: '' + instance.shortName + ' fail',
    parent,
    config,
  })
  done.graphite.seq.push(notifyHandler)
  fail.graphite.seq.push(notifyHandler)
  //eslint-disable-next-line no-unused-vars
  let thunk: Function = handler || defaultThunk.bind(instance)

  instance.done = done
  instance.fail = fail
  ;(instance: any).use = fn => {
    thunk = fn
    return instance
  }
  const getCurrent = (): any => thunk
  ;(instance: any).use.getCurrent = getCurrent
  ;(instance: any).kind = Kind.effect
  //assume that fresh event has empty scope
  ;(instance: any).graphite.scope = {done, fail, getHandler: getCurrent}
  instance.graphite.seq.push(
    step.compute({
      fn(params, scope) {
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
      fn({params, req}, {getHandler, done, fail}) {
        runEffect(
          getHandler(),
          params,
          OnResolve.bind({event: done, params, handler: req.rs}),
          OnReject.bind({event: fail, params, handler: req.rj}),
        )
        return params
      },
    }),
  )
  ;(instance: any).create = (params: Payload, fullName, args) => {
    const req = new Def()
    eventCreate({ɔ: {params, req}}, instance.getType(), args)
    return req.req
  }
  /* terser will minify true and false to 1 and 0,
    thereby we need to define true as Boolean(1)
    and false as Boolean(0) */
  instance.pending = createStore(Boolean(0))
    .on(instance, () => Boolean(1))
    .reset(done)
    .reset(fail)
  return instance
}
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
//eslint-disable-next-line no-unused-vars
function defaultThunk(value) {
  warning(false, 'no thunk used in %s', this.getType())
  return Promise.resolve()
}
