import type {Unit, Stack} from './index.h'
import type {Effect, Scope} from './unit.h'
import {calc, run} from './step'
import {getForkPage, getGraph, getMeta, getParent, setMeta} from './getter'
import {own} from './own'
import {createNode} from './createNode'
import {launch, setForkPage, forkPage, isWatch} from './kernel'
import {createStore, createEvent} from './createUnit'
import {createDefer} from './defer'
import {isObject, isFunction} from './is'
import {assert} from './throw'
import {EFFECT} from './tag'
import {add, removeItem} from './collection'
import {flattenConfig} from './config'
import {nextEffectID} from './id'

type RunnerData<Params, Done, Fail> = {
  params: Params
  req: {
    rs(data: Done): void
    rj(data: Fail): void
  }
  args?: [params: Params, computedParams: any] | [params: Params]
  handler?: Function
}

export function createEffect<Params, Done, Fail = Error>(
  nameOrConfig: any,
  maybeConfig: any = {},
): Effect<Params, Done, Fail> {
  const config = flattenConfig(
    isFunction(nameOrConfig) ? {handler: nameOrConfig} : nameOrConfig,
    maybeConfig,
  )
  const instance = createEvent(
    isFunction(nameOrConfig) ? {handler: nameOrConfig} : nameOrConfig,
    {...maybeConfig, actualOp: EFFECT},
  ) as unknown as Effect<Params, Done, Fail>
  const node = getGraph(instance)
  setMeta(node, 'op', (instance.kind = EFFECT))
  //@ts-expect-error
  instance.use = (fn: Function) => {
    assert(isFunction(fn), '.use argument should be a function')
    runner.scope.handler = fn
    return instance
  }
  instance.use.getCurrent = () => runner.scope.handler
  const anyway = (instance.finally = createEvent({
    named: 'finally',
    derived: true,
  }))
  const done = (instance.done = (anyway as any).filterMap({
    named: 'done',
    fn({
      status,
      params,
      result,
    }: {
      status: 'done' | 'fail'
      params: Params
      result: Done
      error: Fail
    }) {
      if (status === 'done') return {params, result}
    },
  }))
  const fail = (instance.fail = (anyway as any).filterMap({
    named: 'fail',
    fn({
      status,
      params,
      error,
    }: {
      status: 'done' | 'fail'
      params: Params
      result: Done
      error: Fail
    }) {
      if (status === 'fail') return {params, error}
    },
  }))
  const doneData = (instance.doneData = done.map({
    named: 'doneData',
    fn: ({result}: {result: Done}) => result,
  }))
  const failData = (instance.failData = fail.map({
    named: 'failData',
    fn: ({error}: {error: Fail}) => error,
  }))

  const runner = createNode({
    scope: {
      handler:
        instance.defaultConfig.handler ||
        (() => assert(false, `no handler used in ${instance.getType()}`)),
    },
    node: [
      calc(
        (upd: RunnerData<Params, Done, Fail>, scope_: any, stack) => {
          let handler: Function = scope_.handler
          const scope = getForkPage(stack)
          if (scope) {
            const scopeHandler =
              scope.handlers.unitMap.get(instance) ||
              scope.handlers.sidMap[instance.sid!]
            if (scopeHandler) handler = scopeHandler
          }
          upd.handler = handler
          return upd
        },
        false,
        true,
      ),
      calc(
        (
          {
            params,
            req,
            handler,
            args = [params],
          }: RunnerData<Params, Done, Fail> & {handler: Function},
          _,
          stack,
        ) => {
          const scopeRef = createScopeRef(stack)
          const onResolve = onSettled(
            params,
            req,
            true,
            anyway,
            stack,
            scopeRef,
          )
          const onReject = onSettled(
            params,
            req,
            false,
            anyway,
            stack,
            scopeRef,
          )
          const [ok, result] = runFn(handler, onReject, args)
          if (ok) {
            if (isObject(result) && isFunction(result.then)) {
              result.then(onResolve, onReject)
            } else {
              onResolve(result)
            }
          }
        },
        false,
        true,
      ),
    ],
    meta: {op: 'fx', fx: 'runner'},
  })
  node.scope.runner = runner
  add(
    node.seq,
    calc(
      (params, {runner}, stack) => {
        const upd: RunnerData<Params, Done, Fail> = getParent(stack)
          ? {params, req: {rs(data: Done) {}, rj(data: Fail) {}}}
          : /** empty stack means that this node was launched directly */
            params
        if (!stack.meta) {
          stack.meta = {fxID: nextEffectID()}
        }
        launch({
          target: runner,
          params: upd,
          defer: true,
          scope: getForkPage(stack),
          meta: stack.meta,
        })
        return upd.params
      },
      false,
      true,
    ),
  )
  //@ts-expect-error
  instance.create = (params: Params) => {
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
    }
    launch({
      target: instance,
      params: payload,
      scope: forkPage,
    })
    return req.req
  }

  const inFlight = (instance.inFlight = createStore(0, {
    serialize: 'ignore',
    named: (getMeta(instance, 'name') || instance.graphite.id) + '.inFlight',
  })
    .on(instance, x => x + 1)
    .on(anyway, x => x - 1)
    .map({
      // @ts-expect-error
      fn: x => x,
      named: 'inFlight',
    }))
  setMeta(anyway, 'needFxCounter', 'dec')
  setMeta(instance, 'needFxCounter', true)
  const pending = (instance.pending = inFlight.map({
    //@ts-expect-error
    fn: amount => amount > 0,
    named: 'pending',
  }))

  own(instance, [anyway, done, fail, doneData, failData, pending, inFlight])
  if (config?.domain) {
    config.domain.hooks.effect(instance)
  }
  return instance
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

export const createScopeRef = (stack: Stack) => {
  const scope = getForkPage(stack)
  const scopeRef = {ref: scope}
  if (scope) add(scope.activeEffects, scopeRef)
  return scopeRef
}

export const onSettled =
  (
    params: any,
    req: {
      rs(_: any): void
      rj(_: any): void
    },
    ok: boolean,
    anyway: Unit,
    stack: Stack,
    scopeRef: {ref: Scope | void},
  ) =>
  (data: any) => {
    if (scopeRef.ref) removeItem(scopeRef.ref.activeEffects, scopeRef)
    launch({
      target: [anyway, sidechain],
      params: [
        ok
          ? {status: 'done', params, result: data}
          : {status: 'fail', params, error: data},
        {value: data, fn: ok ? req.rs : req.rj},
      ],
      defer: true,
      // WARN! Will broke forest pages as they arent moved to new scope
      page: stack.page,
      scope: scopeRef.ref,
      meta: stack.meta,
    })
  }
const sidechain = createNode({
  node: [run({fn: ({fn, value}) => fn(value)})],
  meta: {op: 'fx', fx: 'sidechain'},
})
