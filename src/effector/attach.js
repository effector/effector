//@flow

import {combine} from './combine'
import {createEffect, onSettled} from './createEffect'
import {applyParentEventHook} from './createUnit'
import {getGraph, getStoreState} from './getter'
import {own} from './own'
import {is} from './is'
import {step} from './typedef'
import {launch} from './kernel'
import {addToReg} from './createNode'

export function attach({source, effect, mapParams}) {
  const attached = createEffect()
  const {runner} = getGraph(attached).scope

  let runnerSteps
  const runnerFn = (
    {params, req},
    {finally: anyway, effect},
    {a: states, page},
  ) =>
    launch({
      target: effect,
      params: {
        params: mapParams(params, states),
        req: {
          rs: onSettled({
            params,
            req,
            ok: true,
            anyway,
            page,
          }),
          rj: onSettled({
            params,
            req,
            ok: false,
            anyway,
            page,
          }),
        },
      },
      page,
      defer: true,
    })

  if (source) {
    let state
    if (is.store(source)) state = source
    else {
      state = combine(source)
      own(attached, [state])
    }
    const readStateRef = step.mov({
      from: 'store',
      store: getStoreState(state),
      to: 'a',
    })
    runnerSteps = [
      /* let another side-effects run first */
      step.run({fn: _ => _}),
      /* read state. assumed it already stable here because of previous step */
      readStateRef,
      /* no need for step.run because of first step */
      step.compute({fn: runnerFn}),
    ]
    addToReg(readStateRef, runner.reg)
  } else {
    runnerSteps = [step.run({fn: runnerFn})]
  }
  runner.scope.effect = effect
  runner.meta.onCopy.push('effect')
  runner.seq.splice(0, 1, ...runnerSteps)
  applyParentEventHook(effect, attached)
  return attached
}
