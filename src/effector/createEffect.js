//@flow

import type {Effect} from './unit.h'
import {step, own, bind, getGraph} from './stdlib'
import {createNode} from './createNode'
import {launch} from './kernel'
import {
  createNamedEvent,
  createStore,
  createEvent,
  filterMapEvent,
} from './createUnit'
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
  const anyway = (instance.finally = createNamedEvent('finally'))
  const done = (instance.done = filterMapEvent(anyway, {
    named: 'done',
    fn(result) {
      if (result.status === 'done')
        return {
          params: result.params,
          result: result.result,
        }
    },
  }))
  const fail = (instance.fail = filterMapEvent(anyway, {
    named: 'fail',
    fn(result) {
      if (result.status === 'fail')
        return {
          params: result.params,
          error: result.error,
        }
    },
  }))
  const doneData = (instance.doneData = done.map({
    named: 'doneData',
    fn: ({result}) => result,
  }))
  const failData = (instance.failData = fail.map({
    named: 'failData',
    fn: ({error}) => error,
  }))

  const effectRunner = createNode({
    scope: {
      getHandler: (instance.use.getCurrent = () => handler),
      finally: anyway,
    },
    node: [
      step.run({
        fn({params, req}, {finally: anyway, getHandler}) {
          const onResolve = bind(onSettled, {
            params,
            fn: req.rs,
            ok: true,
            anyway,
          })
          const onReject = bind(onSettled, {
            params,
            fn: req.rj,
            ok: false,
            anyway,
          })
          let failedSync = false
          let syncError
          let rawResult
          try {
            rawResult = getHandler()(params)
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
      onCopy: ['finally'],
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

  own(instance, [
    anyway,
    done,
    fail,
    doneData,
    failData,
    pending,
    inFlight,
    effectRunner,
  ])
  return instance
}
const onSettled = ({params, fn, ok, anyway}, data) => {
  launch({
    target: [anyway, sidechain],
    params: [
      ok
        ? {
          status: 'done',
          params,
          result: data,
        }
        : {
          status: 'fail',
          params,
          error: data,
        },
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
