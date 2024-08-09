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
import {own} from './createNode'
import {is, isVoid, assert} from './validate'
import {read, calc} from './step'
import {launch, type QueueInstance} from './kernel'
import {EFFECT} from './tag'
import {createName, generateErrorTitle} from './naming'
import {Cmd, Node, Stack} from './index.h'

export function attach(config: any) {
  let injected
  ;[config, injected] = processArgsToConfig(config, true)
  const errorTitle = generateErrorTitle('attach', injected)
  let {source, effect, mapParams, domain} = config
  if (is.effect(effect)) {
    assert(
      isVoid(domain),
      '`domain` can only be used with a plain function',
      errorTitle,
    )
  }
  const attached = createEffect(config, injected)
  setMeta(attached, 'attached', true)
  const {runner} = getGraph(attached).scope as {runner: Node}
  let runnerSteps: Array<Cmd>
  const runnerFnStep = (upd: any, _: any, stack: Stack, q: QueueInstance) => {
    const {params, req, handler} = upd
    const anyway = attached.finally
    const rj = onSettled(params, req, false, anyway, stack, q)
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
              rs: onSettled(params, req, true, anyway, stack, q),
              rj,
            },
          },
          page: stack.page,
          defer: true,
          queue: q,
          meta: stack.meta,
        })
      } else {
        upd.args = [sourceData, computedParams]
        return true
      }
    }
  }
  if (source) {
    runner.scope.runnerFn = runnerFnStep
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
       * effect computation should run in effect queue,
       * but reading state too early leads to data races
       * so we add additional empty step
       **/
      calc(upd => upd, false, true),
      read(getStoreState(state)),
    ]
    /**
     * in simple effect, seq consists of two steps
     * first prepares handler and the second actually calls it
     *
     * we delete priority, as we already in effect queue
     * so additional delay is not needed
     *
     * curiously, presence of effect here leads to stale values
     * because if effect step is not first in a sequence
     * it will be placed in queue
     * to prevent data races: effects should be called in order,
     * but before we run effect in a queue, we should run
     * more important tasks at first, so it should execute like this:
     *
     *    pure queue: [node [mov foo reg_a, effect a]]
     *    effect queue: [node [effect b]]
     *
     *    order: mov foo reg_a, effect b, effect a
     *
     * but when node is executed, everything in it will run sequentially
     * so kernel will find "effect a" earlier than already queued "effect b"
     *
     * this behavior leads to state reading happened before another effect handlers
     * execution and in this case we dont want that, as it leads
     * to reading values which are going to change
     */
    delete runner.seq[1].order
  } else {
    runnerSteps = [calc(runnerFnStep, true, true)]
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
