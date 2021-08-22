import {combine} from './combine'
import {createEffect, onSettled} from './createEffect'
import {applyParentHook} from './createUnit'
import {onConfigNesting} from './config'
import {getGraph, getStoreState, setMeta} from './getter'
import {own} from './own'
import {is, isFunction} from './is'
import {step} from './typedef'
import {launch, Stack} from './kernel'
import {EFFECT, REG_A} from './tag'

export function attach(config: any) {
  let injected
  onConfigNesting(config, (injectedData, userConfig) => {
    injected = injectedData
    config = userConfig
  })
  let {source, effect, mapParams} = config
  const isPlainFunction = !is.effect(effect) && isFunction(effect)
  if (!mapParams)
    mapParams =
      source && !isPlainFunction
        ? (_: any, source: any) => source
        : (params: any) => params
  if (isPlainFunction) {
    const fn = effect
    effect = createEffect(([params, state]: [any, any]) => fn(params, state))
  }
  const attached = createEffect(config, injected)
  setMeta(attached, 'attached', true)
  const {runner} = getGraph(attached).scope
  let runnerSteps
  const runnerFn = (
    {params, req}: any,
    {finally: anyway, effect, isPlain}: any,
    stack: Stack,
  ) => {
    const rj = onSettled(params, req, false, anyway, stack)
    let computedParams
    try {
      computedParams = mapParams(params, stack.a)
    } catch (err) {
      return rj(err)
    }
    launch({
      target: effect,
      params: {
        params: isPlain ? [computedParams, stack.a] : computedParams,
        req: {
          rs: onSettled(params, req, true, anyway, stack),
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
    runnerSteps = [
      /**
       * let another side-effects run first and then read state
       * assumed that state is already stable here
       * because of priority 'effect'
       **/
      step.mov({
        store: getStoreState(state),
        to: REG_A,
        priority: EFFECT,
      }),
      /* no need for step.run because of first step */
      step.compute({fn: runnerFn}),
    ]
  } else {
    runnerSteps = [step.run({fn: runnerFn})]
  }
  own(effect, [attached])
  runner.scope.effect = effect
  runner.scope.isPlain = isPlainFunction
  runner.seq.splice(0, 1, ...runnerSteps)
  applyParentHook(effect, attached, EFFECT)
  return attached
}
