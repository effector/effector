import {combine} from './combine'
import {createEffect, onSettled} from './createEffect'
import {applyParentHook} from './createUnit'
import {onConfigNesting} from './config'
import {getGraph, getStoreState, setMeta} from './getter'
import {own} from './own'
import {is} from './is'
import {step} from './typedef'
import {launch} from './kernel'
import {EFFECT, REG_A} from './tag'

export function attach(config: any) {
  let injected
  onConfigNesting(config, (injectedData, userConfig) => {
    injected = injectedData
    config = userConfig
  })
  let {source, effect, mapParams} = config
  if (!mapParams)
    mapParams = source
      ? (_: any, source: any) => source
      : (params: any) => params
  const attached = createEffect(config, injected)
  setMeta(attached, 'attached', true)
  const {runner} = getGraph(attached).scope
  let runnerSteps
  const runnerFn = (
    {params, req}: any,
    {finally: anyway, effect}: any,
    stack: any,
  ) => {
    const rj = onSettled({
      params,
      req,
      ok: false,
      anyway,
      stack,
    })
    let computedParams
    try {
      computedParams = mapParams(params, stack.a)
    } catch (err) {
      return rj(err)
    }
    launch({
      target: effect,
      params: {
        params: computedParams,
        req: {
          rs: onSettled({
            params,
            req,
            ok: true,
            anyway,
            stack,
          }),
          rj,
        },
      },
      page: stack.page,
      defer: true,
    })
  }
  if (source) {
    let state
    if (is.store(source)) {
      state = source
      own(source, [attached])
    } else {
      state = combine(source)
      own(attached, [state])
    }
    const readStateRef = step.mov({
      store: getStoreState(state),
      to: REG_A,
    })
    runnerSteps = [
      /* let another side-effects run first */
      step.run({fn: _ => _}),
      /* read state. assumed it already stable here because of previous step */
      readStateRef,
      /* no need for step.run because of first step */
      step.compute({fn: runnerFn}),
    ]
  } else {
    runnerSteps = [step.run({fn: runnerFn})]
  }
  own(effect, [attached])
  runner.scope.effect = effect
  runner.seq.splice(0, 1, ...runnerSteps)
  applyParentHook(effect, attached, EFFECT)
  return attached
}
