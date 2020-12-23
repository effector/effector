import {StateRef, Run, Filter, Compute, Barrier, Check, Mov} from './index.h'
import {nextStepID} from './id'
import {bind2} from './bind'
import {BARRIER, FILTER, STACK, STORE} from './tag'

const cmd = (type: any, hasRef: boolean, data: any): any => ({
  id: nextStepID(),
  type,
  data,
  hasRef,
})

let nextBarrierID = 0

export const barrier: (data: {priority?: 'barrier' | 'sampler'}) => Barrier = ({
  priority = BARRIER,
}) =>
  cmd(BARRIER, false, {
    barrierID: ++nextBarrierID,
    priority,
  })
export const mov: (data: {
  from?: 'value' | 'store' | 'stack' | 'a' | 'b'
  to?: 'stack' | 'a' | 'b' | 'store'
  store?: any
  target?: any
}) => Mov = ({from = STORE, store, target, to = target ? STORE : STACK}) =>
  cmd('mov', from === STORE, {from, store, to, target})
export const check: {
  defined(): Check
  changed(config: {store: StateRef}): Check
} = {
  defined: () => cmd('check', false, {type: 'defined'}),
  changed: ({store}) => cmd('check', true, {type: 'changed', store}),
}
export const compute: (data: {
  fn: (data: any, scope: {[key: string]: any}, stack: any) => any
}) => Compute = bind2(cmd, 'compute', false)
export const filter: (data: {
  fn: (data: any, scope: {[key: string]: any}, stack: any) => any
}) => Filter = bind2(cmd, FILTER, false)
export const run: (data: {
  fn: (data: any, scope: {[key: string]: any}, stack: any) => any
}) => Run = bind2(cmd, 'run', false)
export const update: (data: {store: StateRef}) => Mov = ({store}) =>
  mov({from: STACK, target: store})
