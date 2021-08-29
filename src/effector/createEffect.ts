import {step} from './typedef'
import {getForkPage, getGraph, getMeta, getParent, setMeta} from './getter'
import {own} from './own'
import {createNode} from './createNode'
import {launch, setForkPage, forkPage, isWatch, Stack} from './kernel'
import {createNamedEvent, createStore, createEvent} from './createUnit'
import {createDefer} from './defer'
import {isObject, isFunction} from './is'
import {assert} from './throw'
import {EFFECT} from './tag'
import type {Unit} from './index.h'

export function createEffect<Payload, Done>(
  nameOrConfig: any,
  maybeConfig?: any,
) {
  const instance: any = createEvent(
    isFunction(nameOrConfig) ? {handler: nameOrConfig} : nameOrConfig,
    maybeConfig,
  )
  const node = getGraph(instance)
  setMeta(node, 'op', (instance.kind = EFFECT))
  instance.use = (fn: Function) => {
    assert(isFunction(fn), '.use argument should be a function')
    node.scope.runner.scope.handler = fn
    return instance
  }
  instance.use.getCurrent = () => node.scope.runner.scope.handler
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

  node.scope.runner = createNode({
    scope: {
      handlerId: getMeta(node, 'sid'),
      handler:
        instance.defaultConfig.handler ||
        (() => assert(false, `no handler used in ${instance.getType()}`)),
    },
    node: [
      step.run({
        fn({params, req, args = [params]}, scope, stack) {
          const onResolve = onSettled(params, req, true, anyway, stack)
          const onReject = onSettled(params, req, false, anyway, stack)
          const handler = getHandler(scope, stack)
          const [ok, result] = runFn(handler, onReject, args)
          if (ok) {
            if (isObject(result) && isFunction(result.then)) {
              result.then(onResolve, onReject)
            } else {
              onResolve(result)
            }
          }
        },
      }),
    ],
    meta: {op: 'fx', fx: 'runner'},
  })
  node.seq.push(
    step.compute({
      fn(params, {runner}, stack) {
        const upd = getParent(stack)
          ? {params, req: {rs(data: any) {}, rj(data: any) {}}}
          : /** empty stack means that this node was launched directly */
            params
        launch({
          target: runner,
          params: upd,
          defer: true,
          scope: getForkPage(stack),
        })
        return upd.params
      },
      safe: true,
      priority: EFFECT,
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
      launch({target: instance, params: payload, scope: forkPage})
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
    //@ts-expect-error
    fn: amount => amount > 0,
    named: 'pending',
  }))

  own(instance, [anyway, done, fail, doneData, failData, pending, inFlight])
  return instance
}
export const getHandler = (scope_: Record<string, any>, stack: Stack) => {
  const scope: {handlerId: string; handler: Function} = scope_ as any
  let handler = scope.handler
  if (getForkPage(stack)) {
    const handler_ = getForkPage(stack)!.handlers[scope.handlerId]
    if (handler_) handler = handler_
  }
  return handler
}
export const runFn = (
  fn: Function,
  onReject: (data: any) => void,
  args: any[],
): [boolean, any] => {
  try {
    return [true, fn(...args)]
  } catch (err) {
    onReject(err)
    return [false, null]
  }
}

export const onSettled =
  (
    params: any,
    req: {
      rs(_: any): any
      rj(_: any): any
    },
    ok: boolean,
    anyway: Unit,
    stack: Stack,
  ) =>
  (data: any) =>
    launch({
      target: [anyway, sidechain],
      params: [
        ok
          ? {status: 'done', params, result: data}
          : {status: 'fail', params, error: data},
        {value: data, fn: ok ? req.rs : req.rj},
      ],
      defer: true,
      page: stack.page,
      scope: getForkPage(stack),
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
