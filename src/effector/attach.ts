import type {Domain} from './unit.h'
import {combine} from './combine'
import {createEffect, onSettled, runFn} from './createEffect'
import {applyParentHook} from './createUnit'
import {processArgsToConfig} from './config'
import {
  getGraph,
  getParent,
  getStoreState,
  setMeta,
  getCompositeName,
} from './getter'
import {own} from './own'
import {is, isVoid} from './is'
import {read, calc} from './step'
import {launch} from './kernel'
import {EFFECT} from './tag'
import {createName} from './naming'
import {assert} from './throw'

export function attach(config: any) {
  let injected
  ;[[config], injected] = processArgsToConfig([config])
  let {source, effect, mapParams, domain} = config
  if (is.effect(effect)) {
    assert(
      isVoid(domain),
      '`domain` can only be used with a plain function',
    )
  }
  const attached = createEffect(config, injected)
  setMeta(attached, 'attached', true)
  const {runner} = getGraph(attached).scope
  let runnerSteps
  const runnerFnStep = calc(
    (upd, _, stack) => {
      const {params, req, handler} = upd
      const anyway = attached.finally
      const rj = onSettled(params, req, false, anyway, stack)
      const sourceData = stack.a
      const isEffectHandler = is.effect(handler)
      let ok = true
      let computedParams
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
              req: {
                rs: onSettled(params, req, true, anyway, stack),
                rj,
              },
            },
            page: stack.page,
            defer: true,
            meta: stack.meta,
          })
        } else {
          upd.args = [sourceData, computedParams]
          return true
        }
      }
    },
    true,
    true,
  )
  if (source) {
    let state
    if (is.store(source)) {
      state = source
      own(state, [attached])
    } else {
      state = combine(source)
      own(attached, [state])
    }
    runnerSteps = [read(getStoreState(state)), runnerFnStep]
  } else {
    runnerSteps = [runnerFnStep]
  }
  runner.seq.splice(1, 0, ...runnerSteps)
  attached.use(effect)
  const parentDomain: Domain | void = getParent(effect)
  if (parentDomain) {
    Object.assign(
      getCompositeName(attached),
      createName(attached.shortName, parentDomain),
    )
    attached.defaultConfig.parent = parentDomain
  }
  applyParentHook(effect, attached, EFFECT)
  return attached
}
