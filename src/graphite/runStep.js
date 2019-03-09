//@flow

import type {TypeDef} from 'effector/stdlib'
import type {Meta} from './index.h'

import * as stepVisitor from './stepVisitor'
export function runStep(step: TypeDef<*, 'step'>, meta: Meta) {
  meta.stop = false
  meta.callstack.push(step)
  stepVisitor[step.type](meta)
  meta.callstack.pop()
}
