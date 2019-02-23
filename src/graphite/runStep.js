//@flow

import type {TypeDef} from 'effector/stdlib'
import type {CommonCtx, Meta} from './index.h'

import * as stepVisitor from './stepVisitor'
declare function __val(key: string, value: any): any
export function runStep(step: TypeDef<*, 'step'>, meta: Meta) {
  meta.stop = false
  /*

event.watch(data => {
  const trace = getTrace()
  const {step, data, callstack} = trace
})

  */
  // meta.callstack.push({
  //   step,
  //   payload: getPayload(meta),
  //   callstack: [...callstack],
  // })
  meta.callstack.push(step)
  stepVisitor[step.type](meta)
  meta.callstack.pop()
}


function getPayload(meta) {
  ///kind of internal magic, return event's payload
  return __val('scope').top
}