//@flow

import type {TypeDef} from 'effector/stdlib'
import type {CommonCtx, Meta} from './index.h'

import * as stepVisitor from './stepVisitor'

export function runStep(step: TypeDef<*, 'step'>, ctx: CommonCtx, meta: Meta) {
  meta.stop = false
  meta.callstack.push(step)
  stepVisitor[step.type](ctx, meta)
  meta.callstack.pop()
}
