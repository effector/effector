//@flow

import {getGraph, getStoreState, callARegStack, step, own} from './stdlib'
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
    seq.length - 2,
    0,
    step.barrier({priority: 'sampler'}),
    copySource
      ? copySource
      : step.mov({
        from: 'stack',
        to: 'a',
      }),
    step.compute({
      fn: callARegStack,
    }),
  )
  own(target, [resultFx])
  return resultFx
}
