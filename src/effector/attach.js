//@flow

import {combine} from './combine'
import {createEffect, sidechain} from './createEffect'
import {applyParentEventHook} from './createUnit'
import {getGraph, getStoreState} from './getter'
import {own} from './own'
import {step} from './typedef'
import {launch} from './kernel'
import {addToReg, createNode} from './createNode'

export function attach(config) {
  const {source, effect, mapParams, mapResult, mapError} = config
  const attached = createEffect()
  const {runner} = getGraph(attached).scope

  let runnerSteps
  const sidechainSteps = [
    step.compute({
      fn({params, req, ok, anyway, data}, _, {a: states, page}) {
        const mapped = optionalCall(data, states, ok ? mapResult : mapError)
        launch({
          target: [anyway, sidechain],
          params: [
            ok
              ? {
                status: 'done',
                params,
                result: mapped,
              }
              : {
                status: 'fail',
                params,
                error: mapped,
              },
            {
              fn: ok ? req.rs : req.rj,
              value: mapped,
            },
          ],
          defer: true,
          page,
        })
      },
    }),
  ]
  const runnerFn = (
    {params, req},
    {finally: anyway, sidechain, effect},
    {a: states, page},
  ) => {
    const sidechainRunner = ok => data =>
      launch({
        target: sidechain,
        params: {params, req, ok, anyway, data},
        defer: true,
        page,
      })
    launch({
      target: effect,
      params: {
        params: optionalCall(params, states, mapParams),
        req: {
          rs: sidechainRunner(true),
          rj: sidechainRunner(false),
        },
      },
      page,
      defer: true,
    })
  }
  if (source) {
    const state = combine(source)
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
    own(attached, [state])
    addToReg(readStateRef, runner.reg)
    sidechainSteps.unshift(readStateRef)
  } else {
    runnerSteps = [step.run({fn: runnerFn})]
  }
  runner.scope.sidechain = createNode({
    node: sidechainSteps,
    family: {owners: attached},
    meta: {op: 'fx', fx: 'attachSidechain'},
  })
  runner.scope.effect = effect
  runner.meta.onCopy.push('effect', 'sidechain')
  runner.seq.splice(0, 1, ...runnerSteps)
  applyParentEventHook(effect, attached)
  return attached
}

const optionalCall = (
  data: any,
  states?: any,
  fn?: (data: any, states?: any) => any,
) => (fn ? fn(data, states) : data)
