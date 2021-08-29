import {combine} from './combine'
import {createEffect, onSettled, runFn} from './createEffect'
import {applyParentHook} from './createUnit'
import {processArgsToConfig} from './config'
import {getGraph, getStoreState, setMeta} from './getter'
import {own} from './own'
import {is} from './is'
import {step} from './typedef'
import {launch} from './kernel'
import {EFFECT, REG_A} from './tag'

export function attach(config: any) {
  let injected
  ;[config, injected] = processArgsToConfig(config, true)
  let {source, effect, mapParams} = config
  const attached = createEffect(config, injected)
  setMeta(attached, 'attached', true)
  const {runner} = getGraph(attached).scope
  let runnerSteps
  const runnerFnStep = step.compute({
    fn(upd, _, stack) {
      const {params, req, handler} = upd
      const anyway = attached.finally
      const rj = onSettled(params, req, false, anyway, stack)
      const sourceData = stack.a
      const isEffectHandler = is.effect(handler)
      let ok = true
      let computedParams: any
      if (mapParams) {
        ;[ok, computedParams] = runFn(mapParams, rj, [params, sourceData])
      } else {
        computedParams = source && isEffectHandler ? sourceData : params
      }
      if (ok) {
        if (isEffectHandler) {
          launch({
            target: handler as any,
            params: {
              params: computedParams,
              req: {rs: onSettled(params, req, true, anyway, stack), rj},
            },
            page: stack.page,
            defer: true,
          })
        } else {
          upd.args = [sourceData, computedParams]
          return true
        }
      }
    },
    filter: true,
    safe: true,
    priority: !source && EFFECT,
  })
  if (source) {
    let state
    if (is.store(source)) {
      state = source
      own(state, [attached])
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
  runner.seq.splice(1, 0, ...runnerSteps)
  attached.use(effect)
  applyParentHook(effect, attached, EFFECT)
  return attached
}
