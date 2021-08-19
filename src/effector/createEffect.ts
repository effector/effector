import {step} from './typedef'
import {getForkPage, getGraph, getMeta, getParent, setMeta} from './getter'
import {own} from './own'
import {createNode} from './createNode'
import {launch, setForkPage, forkPage, isWatch} from './kernel'
import {createNamedEvent, createStore, createEvent} from './createUnit'
import {createDefer} from './defer'
import {isObject, isFunction} from './is'
import {throwError} from './throw'
import {EFFECT} from './tag'

export function createEffect<Payload, Done>(
  nameOrConfig: any,
  maybeConfig: any,
) {
  const instance: any = createEvent(nameOrConfig, maybeConfig)
  let handler =
    instance.defaultConfig.handler ||
    (() => throwError(`no handler used in ${instance.getType()}`))
  const node = getGraph(instance)
  setMeta(node, 'unit', (instance.kind = EFFECT))
  instance.use = (fn: Function) => {
    if (!isFunction(fn)) throwError('.use argument should be a function')
    handler = fn
    return instance
  }
  const anyway = (instance.finally = createNamedEvent('finally'))
  const done = (instance.done = (anyway as any).filterMap({
    named: 'done',
    fn({status, params, result}: any) {
      if (status === 'done') return {params, result}
    },
  }))
  const fail = (instance.fail = (anyway as any).filterMap({
    named: 'fail',
    fn({status, params, error}: any) {
      if (status === 'fail') return {params, error}
    },
  }))
  const doneData = (instance.doneData = done.map({
    named: 'doneData',
    fn: ({result}: any) => result,
  }))
  const failData = (instance.failData = fail.map({
    named: 'failData',
    fn: ({error}: any) => error,
  }))

  const effectRunner = createNode({
    scope: {
      getHandler: (instance.use.getCurrent = () => handler),
      finally: anyway,
      handlerId: getMeta(node, 'sid'),
    },
    node: [
      step.run({
        fn({params, req}, {finally: anyway, getHandler, handlerId}, stack) {
          const onResolve = onSettled({
            params,
            req,
            ok: true,
            anyway,
            stack,
          })
          const onReject = onSettled({
            params,
            req,
            ok: false,
            anyway,
            stack,
          })
          let result
          try {
            let handler: (data: any) => any
            if (getForkPage(stack)) {
              const handler_ = getForkPage(stack).handlers[handlerId]
              handler = handler_ ? handler_ : getHandler()
            } else {
              handler = getHandler()
            }
            result = handler(params)
          } catch (err) {
            return void onReject(err)
          }
          if (isObject(result) && isFunction(result.then)) {
            result.then(onResolve, onReject)
          } else {
            onResolve(result)
          }
        },
      }),
    ],
    meta: {
      op: 'fx',
      fx: 'runner',
    },
  })
  node.scope.runner = effectRunner
  node.seq.push(
    step.compute({
      fn(params, scope, stack) {
        // empty stack means that this node was launched directly
        if (!getParent(stack)) return params
        return {
          params,
          req: {
            rs(data: any) {},
            rj(data: any) {},
          },
        }
      },
    }),
    step.run({
      fn(upd, {runner}, stack) {
        launch({
          target: runner,
          params: upd,
          defer: true,
          forkPage: getForkPage(stack),
        })
        return upd.params
      },
    }),
  )
  instance.create = (params: Payload) => {
    const req = createDefer()
    const payload = {params, req}
    if (forkPage) {
      if (!isWatch) {
        const savedFork = forkPage
        req.req
          .finally(() => {
            setForkPage(savedFork)
          })
          .catch(() => {})
      }
      launch({
        target: instance,
        params: payload,
        forkPage,
      })
    } else {
      launch(instance, payload)
    }
    return req.req
  }

  const inFlight = (instance.inFlight = createStore(0, {named: 'inFlight'})
    .on(instance, x => x + 1)
    .on(anyway, x => x - 1))
  setMeta(anyway, 'needFxCounter', true)
  setMeta(instance, 'needFxCounter', true)
  const pending = (instance.pending = inFlight.map({
    //@ts-ignore
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

export const onSettled =
  ({
    params,
    req,
    ok,
    anyway,
    stack,
  }: {
    params: any
    req: {
      rs(_: any): any
      rj(_: any): any
    }
    ok: boolean
    anyway: any
    stack: any
  }) =>
  (data: any) =>
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
          fn: ok ? req.rs : req.rj,
          value: data,
        },
      ],
      defer: true,
      page: stack.page,
      forkPage: getForkPage(stack),
    })

export const sidechain = createNode({
  node: [
    step.run({
      fn({fn, value}) {
        fn(value)
      },
    }),
  ],
  meta: {op: 'fx', fx: 'sidechain'},
})
