//@flow

import type {Event, Effect} from './unit.h'
import {step, own, bind, getGraph} from './stdlib'
import {createNode} from './createNode'
import {launch} from './kernel'
import {createNamedEvent, createStore, createEvent} from './createUnit'
import type {EffectConfigPart, Config} from './config'
import {createDefer} from './defer'

export function createEffect<Payload, Done>(
  nameOrConfig: any,
  maybeConfig: any,
): Effect<Payload, Done, *> {
  const instance = createEvent(nameOrConfig, maybeConfig)
  let handler =
    instance.defaultConfig.handler ||
    (value => {
      console.error(`no handler used in ${instance.getType()}`)
      return Promise.resolve()
    })

  getGraph(instance).meta.onCopy = ['runner']
  getGraph(instance).meta.unit = instance.kind = 'effect'
  instance.use = fn => {
    handler = fn
    return instance
  }
  const onCopy = ['done', 'fail', 'doneData', 'failData', 'finally']
  const namedEvents = onCopy.map(createNamedEvent)
  const [done, fail, doneData, failData, anyway] = namedEvents
  const scope = {}
  scope.getHandler = instance.use.getCurrent = () => handler
  scope.done = instance.done = done
  scope.fail = instance.fail = fail
  scope.doneData = instance.doneData = doneData
  scope.failData = instance.failData = failData
  scope.finally = instance.finally = anyway

  const effectRunner = createNode({
    scope,
    node: [
      step.run({
        fn({params, req}, scope) {
          const onResolve = bind(onSettled, {
            params,
            fn: req.rs,
            ok: true,
            api: scope,
          })
          const onReject = bind(onSettled, {
            params,
            fn: req.rj,
            ok: false,
            api: scope,
          })
          let failedSync = false
          let syncError
          let rawResult
          try {
            rawResult = scope.getHandler()(params)
          } catch (err) {
            failedSync = true
            syncError = err
          }
          if (failedSync) {
            onReject(syncError)
            return params
          }
          if (
            Object(rawResult) === rawResult &&
            typeof rawResult.then === 'function'
          ) {
            rawResult.then(onResolve, onReject)
            return params
          }
          onResolve(rawResult)
          return params
        },
      }),
    ],
    meta: {
      op: 'fx',
      fx: 'runner',
      onCopy,
    },
  })
  getGraph(instance).scope.runner = effectRunner
  getGraph(instance).seq.push(
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
        launch({
          target: runner,
          params: upd,
          defer: true,
        })
        return upd.params
      },
    }),
  )
  instance.create = (params: Payload) => {
    const req = createDefer()
    launch(instance, {params, req})
    return req.req
  }

  const inFlight = (instance.inFlight = createStore(0, {named: 'inFlight'})
    .on(instance, x => x + 1)
    .on(done, x => x - 1)
    .on(fail, x => x - 1))

  const pending = (instance.pending = inFlight.map({
    fn: amount => amount > 0,
    named: 'pending',
  }))

  own(instance, namedEvents)
  own(instance, [pending, inFlight, effectRunner])
  return instance
}
const onSettled = ({params, fn, ok, api}, data) => {
  launch({
    target: [
      api.finally,
      ok ? api.done : api.fail,
      ok ? api.doneData : api.failData,
      sidechain,
    ],
    params: ok
      ? [
        {
          status: 'done',
          params,
          result: data,
        },
        {
          params,
          result: data,
        },
        data,
        {
          fn,
          value: data,
        },
      ]
      : [
        {
          status: 'fail',
          params,
          error: data,
        },
        {
          params,
          error: data,
        },
        data,
        {
          fn,
          value: data,
        },
      ],
    defer: true,
  })
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
