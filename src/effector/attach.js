//@flow

import {getGraph, getStoreState, step, own} from './stdlib'
import {createEffect} from './createEffect'
import {shapeToStore} from './sample'
import {addToReg} from './createNode'

export function attach({source, fn = _ => _, target}) {
  const resultFx = createEffect({
    handler: target,
  })
  const node = getGraph(resultFx)
  node.scope.fn = fn
  const newSteps = [step.barrier({priority: 'sampler'})]
  let copySource
  if (source) {
    source = shapeToStore(source)
    copySource = step.mov({
      store: getStoreState(source),
      to: 'a',
    })
    addToReg(copySource, node.reg)
  }
  newSteps.push(
    step.compute({
      fn: callARegStack,
    }),
  )

  node.seq.splice(
    1,
    0,
    copySource
      ? copySource
      : step.mov({
        from: 'stack',
        to: 'a',
      }),
    step.compute({
      fn: ({params, req}, {fn}, {a}) => ({
        params: fn(a, params),
        req,
      }),
    }),
  )
  own(target, [resultFx])
  return resultFx
}
