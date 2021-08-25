import {combine} from './combine'
import {createEffect, onSettled} from './createEffect'
import {applyParentHook} from './createUnit'
import {processArgsToConfig} from './config'
import {getGraph, getStoreState, setMeta} from './getter'
import {own} from './own'
import {is, isFunction} from './is'
import {step} from './typedef'
import {launch, Stack} from './kernel'
import {EFFECT, REG_A} from './tag'

export function attach(config: any) {
  let injected
  ;[config, injected] = processArgsToConfig(config, true)
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
  const runnerFnStep = step.compute({
    fn: ({params, req}: any, _: any, stack: Stack) => {
      const anyway = attached.finally
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
          params: isPlainFunction ? [computedParams, stack.a] : computedParams,
          req: {rs: onSettled(params, req, true, anyway, stack), rj},
        },
        page: stack.page,
        defer: true,
      })
    },
    safe: true,
    priority: !source && EFFECT,
  })
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
      runnerFnStep,
    ]
  } else {
    runnerSteps = [runnerFnStep]
  }
  runner.seq.splice(0, 1, ...runnerSteps)
  applyParentHook(effect, attached, EFFECT)
  return attached
}
